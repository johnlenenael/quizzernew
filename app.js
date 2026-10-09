(() => {
  'use strict';

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const LET = ['A', 'B', 'C', 'D', 'E', 'F'];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  let toastTimer;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => (t.hidden = true), 4500);
  }

  /* ---------- supabase (optional) ---------- */
  const cfg = window.QUIZ_CONFIG || {};
  let sb = null;
  if (cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && !/YOUR/i.test(cfg.SUPABASE_URL + cfg.SUPABASE_ANON_KEY) && window.supabase) {
    try { sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY); } catch (e) { console.warn(e); }
  }

  /* ---------- local fallback storage ---------- */
  const LS = {
    read() { try { return JSON.parse(localStorage.getItem('eeq_local')) || { attempts: [], progress: {} }; } catch { return { attempts: [], progress: {} }; } },
    write(d) { localStorage.setItem('eeq_local', JSON.stringify(d)); }
  };

  /* ---------- data layer ---------- */
  const db = {
    async questions() {
      if (sb) {
        const { data, error } = await sb.from('questions').select('*').order('id');
        if (!error && data && data.length) {
          return data.map(r => ({ id: r.id, topic: r.topic, difficulty: r.difficulty, question: r.question, choices: r.choices, answer: r.answer_index, solution: r.solution, points: r.points }));
        }
        toast('No questions found in Supabase yet (run seed.sql). Using the built-in set.');
      }
      return window.QUESTIONS.slice();
    },
    async progress(user) {
      const local = LS.read().progress[user] || {};
      if (sb) {
        const { data, error } = await sb.from('user_progress').select('question_id,status').eq('user_name', user);
        if (!error) {
          const remote = Object.fromEntries(data.map(r => [r.question_id, r.status]));
          // push anything that only exists on this device (e.g. an earlier save that failed)
          const merged = { ...remote }, pending = [];
          Object.entries(local).forEach(([id, st]) => {
            const m = remote[id] ? mergeStatus(remote[id], st) : st;
            merged[id] = m;
            if (m !== remote[id]) pending.push({ user_name: user, question_id: +id, status: m, updated_at: new Date().toISOString() });
          });
          if (pending.length) {
            const up = await sb.from('user_progress').upsert(pending, { onConflict: 'user_name,question_id' });
            if (up.error) { console.error(up.error); toast('Could not sync saved progress to Supabase: ' + up.error.message); return merged; }
          }
          return merged;
        }
        console.error(error);
        toast('Could not load progress from Supabase: ' + error.message);
      }
      return local;
    },
    async save(user, summary, answers, progress) {
      // always keep a local copy as a safety net
      const l = LS.read();
      l.progress[user] = progress;
      l.attempts.push({ user, ...summary, at: Date.now() });
      LS.write(l);
      if (!sb) return true;
      try {
        // 1) progress first: the leaderboard is built from this table
        const prog = answers.map(x => ({ user_name: user, question_id: x.qid, status: progress[x.qid], updated_at: new Date().toISOString() }));
        const c = await sb.from('user_progress').upsert(prog, { onConflict: 'user_name,question_id' });
        if (c.error) throw c.error;
        // 2) attempt history (does not affect the leaderboard)
        const a = await sb.from('attempts').insert({
          user_name: user, score: summary.score, total_points: summary.total,
          correct: summary.correct, wrong: summary.wrong, unanswered: summary.unanswered
        }).select('id').single();
        if (a.error) throw a.error;
        let rows = answers.map(x => ({
          attempt_id: a.data.id, question_id: x.qid, selected_index: x.selected, typed_answer: x.typed || null,
          is_correct: x.correct, points_earned: x.points
        }));
        let b = await sb.from('attempt_answers').insert(rows);
        if (b.error && /typed_answer/i.test(b.error.message || '')) { // column not added yet: retry without it
          rows = rows.map(({ typed_answer, ...r }) => r);
          b = await sb.from('attempt_answers').insert(rows);
        }
        if (b.error) throw b.error;
        return true;
      } catch (e) {
        console.error(e);
        toast('Supabase error: ' + (e.message || e) + ' (progress kept on this device and will retry next time)');
        return false;
      }
    },
    async leaderboard() {
      if (sb) {
        const v = await sb.from('leaderboard').select('user_name,points,correct')
          .order('points', { ascending: false }).order('correct', { ascending: false }).limit(10);
        if (!v.error) return v.data || [];
        console.warn('leaderboard view unavailable, computing from user_progress:', v.error.message);
        // fallback: build the board from the user_progress table (no view needed)
        try {
          const pts = Object.fromEntries(state.bank.map(q => [q.id, q.points]));
          const agg = {}; let from = 0;
          for (;;) {
            const r = await sb.from('user_progress').select('user_name,question_id').eq('status', 'correct').range(from, from + 999);
            if (r.error) throw r.error;
            r.data.forEach(x => { const u = agg[x.user_name] || (agg[x.user_name] = { user_name: x.user_name, points: 0, correct: 0 }); u.points += pts[x.question_id] || 0; u.correct++; });
            if (r.data.length < 1000) break; from += 1000;
          }
          return Object.values(agg).sort((x, y) => y.points - x.points || y.correct - x.correct).slice(0, 10);
        } catch (e) {
          console.error(e);
          toast('Leaderboard error: ' + (e.message || e) + ' (showing this device only).');
        }
      }
      const p = LS.read().progress; const byId = Object.fromEntries(state.bank.map(q => [q.id, q]));
      return Object.entries(p).map(([u, pr]) => ({
        user_name: u,
        points: Object.entries(pr).reduce((s, [id, st]) => s + (st === 'correct' && byId[id] ? byId[id].points : 0), 0),
        correct: Object.values(pr).filter(s => s === 'correct').length
      })).sort((a, b) => b.points - a.points).slice(0, 10);
    }
  };

  /* ---------- state ---------- */
  const state = { user: localStorage.getItem('eeq_user') || '', bank: [], progress: {}, topics: new Set(), quiz: null, last: null };

  const statusOf = q => state.progress[q.id] || 'new';
  const totalPoints = () => state.bank.reduce((s, q) => s + (statusOf(q) === 'correct' ? q.points : 0), 0);
  const mergeStatus = (old, cur) => (old === 'correct' || cur === 'correct') ? 'correct' : cur === 'wrong' ? 'wrong' : (old === 'wrong' ? 'wrong' : 'unanswered');

  function show(name) {
    ['home', 'quiz', 'result', 'review'].forEach(n => ($('#screen-' + n).hidden = n !== name));
    window.scrollTo(0, 0);
  }

  /* ---------- home ---------- */
  function renderHome() {
    const c = { correct: 0, wrong: 0, unanswered: 0, new: 0 };
    state.bank.forEach(q => c[statusOf(q)]++);
    $('#stPoints').textContent = totalPoints();
    $('#pointsTop').textContent = totalPoints();
    $('#stCorrect').textContent = c.correct;
    $('#stWrong').textContent = c.wrong;
    $('#stSkipped').textContent = c.unanswered;
    $('#stNew').textContent = c.new;
    $('#skippedCount').textContent = c.unanswered;
    $('#wrongCount').textContent = c.wrong;
    $('#skippedBtn').disabled = !c.unanswered;
    $('#wrongBtn').disabled = !c.wrong;
    $('#userName').textContent = state.user || 'Guest';

    const topics = [...new Set(state.bank.map(q => q.topic))];
    $('#topics').innerHTML = topics.map(t => `<button class="topic ${state.topics.has(t) ? 'on' : ''}" data-t="${esc(t)}">${esc(t)}</button>`).join('');
    $$('#topics .topic').forEach(b => b.onclick = () => {
      const t = b.dataset.t; state.topics.has(t) ? state.topics.delete(t) : state.topics.add(t); renderHome();
    });
  }

  async function renderBoard() {
    const el = $('#board');
    try {
      const rows = await db.leaderboard();
      if (!rows.length) { el.textContent = 'No scores yet. Be the first!'; return; }
      el.innerHTML = '<table><thead><tr><th>#</th><th>Player</th><th>Correct</th><th>Points</th></tr></thead><tbody>' +
        rows.map((r, i) => `<tr class="${r.user_name === state.user ? 'me' : ''}"><td>${i + 1}</td><td>${esc(r.user_name)}</td><td>${r.correct}</td><td>${r.points}</td></tr>`).join('') +
        '</tbody></table>';
    } catch (e) { console.error(e); el.textContent = 'Leaderboard unavailable: ' + (e.message || e); }
  }

  function pool(kind) {
    let list = state.bank;
    if (kind === 'unanswered') return list.filter(q => statusOf(q) === 'unanswered');
    if (kind === 'wrong') return list.filter(q => statusOf(q) === 'wrong');
    if (state.topics.size) list = list.filter(q => state.topics.has(q.topic));
    // prefer questions not yet mastered
    const open = list.filter(q => statusOf(q) !== 'correct');
    const done = list.filter(q => statusOf(q) === 'correct');
    const n = $('#countSel').value === 'all' ? list.length : +$('#countSel').value;
    return [...shuffle(open), ...shuffle(done)].slice(0, n);
  }

  /* ---------- quiz ---------- */
  function startQuiz(list, practice) {
    if (!list.length) { toast('No questions for this selection.'); return; }
    const hard = $('#hardChk').checked;
    const items = shuffle(list).map(q => ({
      q, hard, sel: null, text: '', locked: false,
      ch: shuffle(q.choices.map((t, i) => ({ t, i })))
    }));
    state.quiz = { items, idx: 0, practice, hard };
    show('quiz'); renderQuiz();
  }

  /* ---------- hard mode: typed answers ---------- */
  // <<typed-start>>
  const ext = q => (window.QUESTIONS || []).find(x => x.id === q.id) || {};

  function parseQty(raw) {
    let s = String(raw).trim().replace(/,/g, '').replace(/[µμ]/g, 'u').replace(/\s+/g, ' ');
    s = s.replace(/\bohms?\b/gi, 'Ω').replace(/\bvolts?\b/gi, 'V').replace(/\bamp(ere)?s?\b/gi, 'A')
      .replace(/\bwatts?\b/gi, 'W').replace(/\bjoules?\b/gi, 'J').replace(/\bfarads?\b/gi, 'F')
      .replace(/\bhertz\b/gi, 'Hz').replace(/\bpercent\b/gi, '%');
    const m = s.match(/^([-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)\s*(.*)$/i);
    if (!m) return null;
    return { num: parseFloat(m[1]), unit: m[2].trim() };
  }

  // all plausible (scale, base) readings of a unit string, e.g. "kW" -> W x1000
  function unitReadings(unit) {
    const u = unit.trim();
    if (!u) return [{ scale: 1, base: '' }];
    const lower = u.toLowerCase();
    const out = [{ scale: 1, base: lower }];
    const BASES = ['ω', 'v', 'a', 'w', 'f', 'j', 'hz', 'va', 'var', 'h', 'c'];
    const PRE = { k: [1e3], m: [1e-3, 1e6], g: [1e9], u: [1e-6] };
    if (lower.length > 1 && PRE[lower[0]] && BASES.includes(lower.slice(1))) {
      let sc = PRE[lower[0]];
      if (u[0] === 'M') sc = [1e6];            // "MW", "MVA", "MΩ" are always mega
      out.push(...sc.map(s => ({ scale: s, base: lower.slice(1) })));
    }
    return out;
  }

  const closeTo = (a, b) => Math.abs(a - b) <= Math.max(Math.abs(b) * 0.01, 1e-12);

  function checkTyped(q, text) {
    const t = String(text || '').trim();
    if (!t) return false;
    const e = ext(q);
    const acc = q.accept || e.accept;
    if (acc && acc.length) { const n = t.toLowerCase(); return acc.some(k => n.includes(String(k).toLowerCase())); }
    const ansText = q.choices[q.answer];
    const A = parseQty(ansText), U = parseQty(t);
    if (!A) return t.toLowerCase().replace(/\s+/g, ' ') === ansText.toLowerCase();
    if (!U) return false;
    const aR = unitReadings(A.unit);
    if (!U.unit) return aR.some(r => closeTo(U.num, A.num) || closeTo(U.num, A.num * r.scale));
    return unitReadings(U.unit).some(ur => aR.some(r => ur.base === r.base && closeTo(U.num * ur.scale, A.num * r.scale)));
  }
  // <<typed-end>>

  const answered = it => it.hard ? it.text.trim() !== '' : it.sel !== null;
  const isRight = it => it.hard ? checkTyped(it.q, it.text) : (it.sel !== null && it.ch[it.sel].i === it.q.answer);
  const correctText = it => (it.hard && ext(it.q).answerText) || it.q.choices[it.q.answer];

  function renderNav() {
    const { items, idx } = state.quiz;
    $('#barFill').style.width = (items.filter(answered).length / items.length * 100) + '%';
    $('#nav').innerHTML = items.map((x, i) => `<button class="${answered(x) ? 'done' : ''} ${i === idx ? 'cur' : ''}" data-i="${i}">${i + 1}</button>`).join('');
    $$('#nav button').forEach(b => b.onclick = () => { state.quiz.idx = +b.dataset.i; renderQuiz(); });
  }

  function typedBox(it) {
    const cls = it.locked ? (isRight(it) ? 'right' : 'wrong') : '';
    return `<input id="typed" class="typed ${cls}" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer (e.g. 12.5 A)" value="${esc(it.text)}" ${it.locked ? 'disabled' : ''}>` +
      (state.quiz.practice && !it.locked ? '<button id="checkBtn" class="btn primary" style="margin-top:10px">Check answer</button>' : '') +
      '<p class="muted small">Units are optional. Answers within 1% are accepted.</p>';
  }
  function checkNow(it) { if (!it.text.trim()) { toast('Type an answer first.'); return; } it.locked = true; renderQuiz(); }
  function bindTyped(it) {
    const inp = $('#typed'); if (!inp || it.locked) return;
    inp.oninput = () => { it.text = inp.value; renderNav(); };
    inp.focus();
    const cb = $('#checkBtn'); if (cb) cb.onclick = () => checkNow(it);
  }
  function typedReview(a) {
    const mine = a.answered ? esc(a.typed) : '(no answer)';
    return `<div class="choice ${a.correct ? 'right' : (a.answered ? 'wrong' : '')}"><span class="ltr">✎</span><span>Your answer: ${mine}</span></div>` +
      `<div class="choice right"><span class="ltr">✔</span><span>Correct answer: ${esc(correctText(a.it))}</span></div>`;
  }

  function renderQuiz() {
    const { items, idx, practice } = state.quiz; const it = items[idx]; const q = it.q;
    $('#qmeta').textContent = `Question ${idx + 1} of ${items.length} · ${q.topic} · ${q.difficulty} · ${q.points} pts${it.hard ? ' · HARD MODE' : ''}`;
    renderNav();
    $('#qtext').textContent = (it.hard && ext(q).hardQuestion) || q.question;

    $('#choices').innerHTML = it.hard ? typedBox(it) : it.ch.map((c, k) => {
      let cls = 'choice';
      if (it.locked) { if (c.i === q.answer) cls += ' right'; else if (it.sel === k) cls += ' wrong'; }
      else if (it.sel === k) cls += ' sel';
      return `<button class="${cls}" data-k="${k}" ${it.locked ? 'disabled' : ''}><span class="ltr">${LET[k]}</span><span>${esc(c.t)}</span></button>`;
    }).join('');
    $$('#choices .choice').forEach(b => b.onclick = () => choose(+b.dataset.k));
    if (it.hard) bindTyped(it);

    const fb = $('#feedback');
    if (it.locked) {
      const ok = isRight(it);
      fb.hidden = false;
      fb.innerHTML = `<div class="verdict ${ok ? 'v-good' : 'v-bad'}">${ok ? '✔ Correct! +' + q.points + ' pts' : '✘ Not quite'}</div>` +
        `<div><b>Answer:</b> ${esc(correctText(it))}</div><div class="sol-text" style="margin-top:8px">${esc(q.solution)}</div>`;
    } else fb.hidden = true;

    $('#prevBtn').disabled = idx === 0;
    $('#nextBtn').disabled = idx === items.length - 1;
    $('#nextBtn').textContent = (!answered(it) && idx < items.length - 1) ? 'Skip →' : 'Next →';
  }

  function choose(k) {
    const it = state.quiz.items[state.quiz.idx]; if (it.hard || it.locked) return;
    it.sel = k; if (state.quiz.practice) it.locked = true;
    renderQuiz();
  }
  const go = d => { const q = state.quiz; const n = q.idx + d; if (n >= 0 && n < q.items.length) { q.idx = n; renderQuiz(); } };

  async function finish() {
    const { items } = state.quiz;
    const left = items.filter(i => !answered(i)).length;
    if (left && !confirm(`${left} question(s) are unanswered. They will be saved in "Review unanswered" so you can come back to them. Submit now?`)) return;
    $('#finishBtn').disabled = true;

    const before = totalPoints();
    const answers = items.map(it => {
      const done = answered(it), correct = isRight(it);
      return {
        qid: it.q.id, selected: (done && !it.hard) ? it.ch[it.sel].i : null, typed: it.hard ? it.text.trim() : null,
        correct, points: correct ? it.q.points : 0, answered: done, it
      };
    });
    const progress = { ...state.progress };
    answers.forEach(a => { progress[a.qid] = mergeStatus(progress[a.qid], !a.answered ? 'unanswered' : a.correct ? 'correct' : 'wrong'); });

    const summary = {
      score: answers.reduce((s, a) => s + a.points, 0), total: items.reduce((s, i) => s + i.q.points, 0),
      correct: answers.filter(a => a.correct).length, wrong: answers.filter(a => a.answered && !a.correct).length,
      unanswered: answers.filter(a => !a.answered).length
    };
    await db.save(state.user, summary, answers, progress);
    state.progress = progress;
    state.last = { answers, summary, gained: totalPoints() - before };
    $('#finishBtn').disabled = false;
    renderResult(); renderHome(); renderBoard();
  }

  function renderResult() {
    const { summary: s, gained } = state.last;
    $('#rScore').textContent = s.score; $('#rTotal').textContent = s.total;
    $('#rCorrect').textContent = s.correct; $('#rWrong').textContent = s.wrong; $('#rSkipped').textContent = s.unanswered;
    $('#rNew').textContent = `+${gained} new points added to your total (questions you already mastered don't add points again).`;
    $('#rRetrySkipped').hidden = !s.unanswered;
    show('result');
  }

  /* ---------- review ---------- */
  function renderReview(filter = 'all') {
    $$('#revTabs .tab').forEach(t => t.classList.toggle('active', t.dataset.f === filter));
    const list = state.last.answers.filter(a => {
      const st = !a.answered ? 'unanswered' : a.correct ? 'correct' : 'wrong';
      return filter === 'all' || st === filter;
    });
    $('#revList').innerHTML = list.length ? list.map(a => {
      const it = a.it, q = it.q, st = !a.answered ? 'unanswered' : a.correct ? 'correct' : 'wrong';
      const ch = it.hard ? typedReview(a) : it.ch.map((c, k) => {
        let cls = 'choice';
        if (c.i === q.answer) cls += ' right'; else if (it.sel === k) cls += ' wrong';
        const tag = c.i === q.answer ? ' ✔' : (it.sel === k ? ' (your answer)' : '');
        return `<div class="${cls}"><span class="ltr">${LET[k]}</span><span>${esc(c.t)}${tag}</span></div>`;
      }).join('');
      return `<div class="rev"><div class="top"><span>${esc(q.topic)} · ${q.points} pts</span><span class="pill ${st}">${st}</span></div>
        <b>${esc((it.hard && ext(q).hardQuestion) || q.question)}</b><div class="choices" style="margin-top:10px">${ch}</div>
        <div class="solution"><div class="verdict v-warn">Solution</div><div class="sol-text">${esc(q.solution)}</div></div></div>`;
    }).join('') : '<p class="muted">Nothing here.</p>';
  }

  /* ---------- user ---------- */
  async function setUser(name) {
    state.user = name.trim().slice(0, 24); localStorage.setItem('eeq_user', state.user);
    state.progress = await db.progress(state.user);
    renderHome(); renderBoard();
  }
  const askName = () => { $('#nameModal').hidden = false; $('#nameInput').value = state.user; $('#nameInput').focus(); };

  /* ---------- events ---------- */
  $('#startBtn').onclick = () => startQuiz(pool('mix'), $('#practiceChk').checked);
  $('#skippedBtn').onclick = () => startQuiz(pool('unanswered'), $('#practiceChk').checked);
  $('#wrongBtn').onclick = () => startQuiz(pool('wrong'), $('#practiceChk').checked);
  $('#prevBtn').onclick = () => go(-1);
  $('#nextBtn').onclick = () => go(1);
  $('#finishBtn').onclick = finish;
  $('#quitBtn').onclick = () => { if (confirm('Quit this quiz? Your answers so far will not be saved.')) show('home'); };
  $('#rHome').onclick = () => show('home');
  $('#revHome').onclick = () => show('home');
  $('#rReview').onclick = () => { renderReview('all'); show('review'); };
  $('#rRetrySkipped').onclick = () => startQuiz(pool('unanswered'), $('#practiceChk').checked);
  $$('#revTabs .tab').forEach(t => t.onclick = () => renderReview(t.dataset.f));
  $('#userBtn').onclick = askName;
  $('#nameForm').onsubmit = async e => {
    e.preventDefault(); const v = $('#nameInput').value.trim(); if (!v) return;
    $('#nameModal').hidden = true; await setUser(v);
  };
  document.addEventListener('keydown', e => {
    if ($('#screen-quiz').hidden || !$('#nameModal').hidden) return;
    const cur = state.quiz && state.quiz.items[state.quiz.idx];
    if (cur && cur.hard) {
      if (e.key === 'Enter' && state.quiz.practice && !cur.locked) checkNow(cur);
      else if (e.target.tagName !== 'INPUT') { if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1); }
      return;
    }
    const k = e.key.toLowerCase();
    if (['1', '2', '3', '4'].includes(k)) choose(+k - 1);
    else if (['a', 'b', 'c', 'd'].includes(k)) choose('abcd'.indexOf(k));
    else if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
  });

  setInterval(() => { if (!document.hidden && !$('#screen-home').hidden) renderBoard(); }, 30000);

  /* ---------- boot ---------- */
  (async function init() {
    const badge = $('#modeBadge');
    badge.textContent = sb ? 'Supabase connected' : 'Local mode';
    badge.classList.toggle('on', !!sb);
    state.bank = await db.questions();
    if (state.user) { state.progress = await db.progress(state.user); } else askName();
    renderHome(); renderBoard(); show('home');
  })();
})();