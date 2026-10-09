// Generates 100 new questions (ids 26-125). Every answer + solution number is COMPUTED here,
// so the answer key cannot disagree with the solution.
// Usage: node gen-questions.js   -> writes questions-new.txt (JS text to append to questions.js)
const fs = require('fs');
const PI = Math.PI, S3 = Math.sqrt(3), S2 = Math.SQRT2;
const r = (x, d = 2) => String(parseFloat((+x).toFixed(d)));
const PTS = { easy: 10, medium: 15, hard: 20 };
const OUT = [];
let nextId = 26;

function add(topic, diff, question, ans, wrong, unit, dec, sol) {
  const vals = [ans, ...wrong];
  const fmt = v => r(v, dec) + (unit ? (unit === '%' ? '%' : ' ' + unit) : '');
  const strs = vals.map(fmt);
  if (new Set(strs).size !== 4) throw new Error('Duplicate choices in: ' + question + ' -> ' + strs);
  const order = vals.map((v, i) => ({ v, i })).sort((a, b) => a.v - b.v);
  const choices = order.map(o => fmt(o.v));
  const answer = order.findIndex(o => o.i === 0);
  OUT.push({ id: nextId++, topic, difficulty: diff, points: PTS[diff], question, choices, answer, solution: sol.join('\n') });
}

/* ================= DC CIRCUITS (8) ================= */
{ const a = 10 * 15 / 25;
  add('DC Circuits', 'easy', 'A 10 Ω and a 15 Ω resistor are connected in parallel. What is the equivalent resistance?',
    a, [25, 12.5, 150], 'Ω', 1,
    ['1/Req = 1/10 + 1/15 = 3/30 + 2/30 = 5/30', 'Req = 30/5 = ' + r(a) + ' Ω', '(Product over sum: 10 × 15 / (10 + 15) = 150/25 = 6 Ω)']); }
{ const a = 5 * 5 * 12;
  add('DC Circuits', 'easy', 'A 12 Ω resistor carries a current of 5 A. How much power does it dissipate?',
    a, [60, 144, 1500], 'W', 0,
    ['P = I²R', 'P = 5² × 12 = 25 × 12 = ' + a + ' W']); }
{ const a = 9 / (0.5 + 4.5);
  add('DC Circuits', 'easy', 'A 9 V battery with an internal resistance of 0.5 Ω is connected to a 4.5 Ω load. What is the load current?',
    a, [2, 18, 1.5], 'A', 1,
    ['Total resistance = r + R = 0.5 + 4.5 = 5 Ω', 'I = E/(r + R) = 9/5 = ' + r(a, 1) + ' A', '(Ignoring the internal resistance would wrongly give 9/4.5 = 2 A.)']); }
{ const a = 24 * 6 / 8;
  add('DC Circuits', 'medium', 'A 24 V source feeds a 2 kΩ and a 6 kΩ resistor in series. What is the voltage across the 6 kΩ resistor?',
    a, [6, 12, 8], 'V', 0,
    ['Voltage divider: V2 = Vs × R2/(R1 + R2)', 'V2 = 24 × 6k/(2k + 6k) = 24 × 0.75 = ' + a + ' V']); }
{ const a = 200 * 150 / 100;
  add('DC Circuits', 'medium', 'A Wheatstone bridge is balanced with ratio arms P = 100 Ω and Q = 200 Ω and a known arm R = 150 Ω. At balance P/Q = R/X. Find the unknown resistance X.',
    a, [75, 100 * 200 / 150, 450], 'Ω', 1,
    ['P/Q = R/X  →  X = Q × R / P', 'X = 200 × 150 / 100 = ' + a + ' Ω']); }
{ const a = 5 * 4 / 10;
  add('DC Circuits', 'medium', 'A 5 A current source feeds a 4 Ω and a 6 Ω resistor in parallel. What is the current through the 6 Ω resistor?',
    a, [3, 2.5, 5], 'A', 1,
    ['Current divider: the current in a branch = I × (the OTHER resistor)/(sum)', 'I6 = 5 × 4/(4 + 6) = ' + r(a, 1) + ' A', '(The 4 Ω branch takes 5 × 6/10 = 3 A. Check: 3 + 2 = 5 A)']); }
{ const a = 1.5 * 4 * 30 * 12;
  add('DC Circuits', 'medium', 'A 1500 W heater runs 4 hours a day for 30 days. If electricity costs 12 pesos per kWh, what is the monthly cost of running it?',
    a, [72, 180, 540], 'pesos', 0,
    ['Energy per day = 1.5 kW × 4 h = 6 kWh', 'Energy per month = 6 × 30 = 180 kWh', 'Cost = 180 × 12 = ' + a + ' pesos']); }
{ const a = 24 * 24 / (4 * 6);
  add('DC Circuits', 'hard', 'A 24 V source with an internal resistance of 6 Ω supplies a variable load. What is the maximum power that can be delivered to the load?',
    a, [12, 48, 96], 'W', 0,
    ['Maximum power transfer occurs when RL = Rs = 6 Ω', 'I = 24/(6 + 6) = 2 A', 'Pmax = I² RL = 2² × 6 = ' + a + ' W', '(Formula: Pmax = V²/(4Rs) = 576/24 = 24 W)']); }

/* ================= AC CIRCUITS (8) ================= */
{ const a = 170 / S2;
  add('AC Circuits', 'easy', 'A sinusoidal voltage has a peak value of 170 V. What is its rms value?',
    a, [85, 2 * 170 / PI, 170 * S2], 'V', 1,
    ['Vrms = Vm/√2 = 170/1.414 = ' + r(a, 1) + ' V', '(The average of a full-wave rectified sine, 2Vm/π = 108.2 V, is a different quantity.)']); }
{ const a = 1 / 60 * 1000;
  add('AC Circuits', 'easy', 'What is the period of a 60 Hz ac waveform?',
    a, [60, 1000 / 600, 1000 / 120], 'ms', 2,
    ['T = 1/f = 1/60 = 0.01667 s', 'T = ' + r(a) + ' ms']); }
{ const f = 60, C = 100e-6, a = 1 / (2 * PI * f * C);
  add('AC Circuits', 'easy', 'What is the capacitive reactance of a 100 µF capacitor at 60 Hz?',
    a, [1 / (f * C), 1 / (PI * f * C), 1 / (2 * PI * f * 10e-6)], 'Ω', 2,
    ['XC = 1/(2πfC)', 'XC = 1/(2π × 60 × 100×10⁻⁶) = 1/0.03770', 'XC = ' + r(a) + ' Ω']); }
{ const a = 100 / Math.sqrt(10 * 10 + (25 - 15) ** 2);
  add('AC Circuits', 'medium', 'A series circuit has R = 10 Ω, XL = 25 Ω and XC = 15 Ω across a 100 V source. What is the current?',
    a, [10, 4, 2], 'A', 2,
    ['Net reactance X = XL − XC = 25 − 15 = 10 Ω', 'Z = √(R² + X²) = √(10² + 10²) = ' + r(Math.sqrt(200)) + ' Ω', 'I = V/Z = 100/' + r(Math.sqrt(200)) + ' = ' + r(a) + ' A']); }
{ const L = 10e-3, C = 25e-6, a = 1 / (2 * PI * Math.sqrt(L * C));
  add('AC Circuits', 'medium', 'A series RLC circuit has L = 10 mH and C = 25 µF. What is its resonant frequency?',
    a, [1 / Math.sqrt(L * C), 1 / (PI * Math.sqrt(L * C)), a / 2], 'Hz', 1,
    ['f0 = 1/(2π√(LC))', 'LC = 10×10⁻³ × 25×10⁻⁶ = 2.5×10⁻⁷ → √(LC) = 5×10⁻⁴', 'f0 = 1/(2π × 5×10⁻⁴) = ' + r(a, 1) + ' Hz', '(2000 is ω0 in rad/s, not f0 in Hz.)']); }
{ const P = 4, Q = 3, S = Math.hypot(P, Q), a = P / S;
  add('AC Circuits', 'medium', 'A load draws 4 kW of real power and 3 kvar of reactive power. What is its power factor?',
    a, [0.75, 0.6, 1.33], '', 2,
    ['S = √(P² + Q²) = √(4² + 3²) = 5 kVA', 'pf = P/S = 4/5 = ' + r(a)]); }
{ const P = 10, a = P * Math.tan(Math.acos(0.8));
  add('AC Circuits', 'medium', 'A 10 kW load operates at 0.8 power factor lagging. How many kvar of capacitors are needed to bring the power factor to unity?',
    a, [6, 10, 12.5], 'kvar', 1,
    ['θ = cos⁻¹(0.8) = 36.87°, tan θ = 0.75', 'Q = P tan θ = 10 × 0.75 = ' + r(a, 1) + ' kvar', 'The capacitors must supply this same amount of reactive power.']); }
{ const P = 10000, VL = 208, pf = 0.8, a = P / (S3 * VL * pf);
  add('AC Circuits', 'hard', 'A balanced 3-phase load takes 10 kW at 0.8 power factor from a 208 V (line-to-line) supply. What is the line current?',
    a, [P / (S3 * VL), P / (VL * pf), P / (120 * pf)], 'A', 2,
    ['P = √3 VL IL pf', 'IL = P/(√3 VL pf) = 10,000/(1.732 × 208 × 0.8)', 'IL = 10,000/' + r(S3 * VL * pf) + ' = ' + r(a) + ' A']); }

/* ================= ELECTROSTATICS (5) ================= */
{ const k = 9e9, q = 2e-6, d = 0.3, a = k * q * q / (d * d);
  add('Electrostatics', 'easy', 'Two point charges of 2 µC each are 0.3 m apart in air. What is the force between them?',
    a, [k * q * q / d, a / 2, a * 10], 'N', 2,
    ['F = k q1 q2 / r²', 'F = (9×10⁹)(2×10⁻⁶)² / (0.3)² = 0.036 / 0.09 = ' + r(a) + ' N', '(Repel, since both charges are positive.)']); }
{ const a = 6 * 3 / 9;
  add('Electrostatics', 'easy', 'A 6 µF and a 3 µF capacitor are connected in series. What is the equivalent capacitance?',
    a, [9, 4.5, 18], 'µF', 1,
    ['1/Ceq = 1/6 + 1/3 = 1/6 + 2/6 = 3/6', 'Ceq = 6/3 = ' + r(a) + ' µF', '(Series capacitors give a SMALLER value than either one.)']); }
{ const a = 0.5 * 100e-6 * 200 * 200;
  add('Electrostatics', 'medium', 'How much energy is stored in a 100 µF capacitor charged to 200 V?',
    a, [4, 0.02, 1], 'J', 2,
    ['W = ½ C V²', 'W = 0.5 × 100×10⁻⁶ × 200² = 0.5 × 10⁻⁴ × 40,000 = ' + r(a) + ' J']); }
{ const e0 = 8.854e-12, A = 0.02, d = 1e-3, a = e0 * A / d * 1e12;
  add('Electrostatics', 'medium', 'A parallel-plate capacitor has plates of area 0.02 m² separated by 1 mm of air (ε0 = 8.854×10⁻¹² F/m). What is its capacitance?',
    a, [a / 10, a * 10, a / 2], 'pF', 2,
    ['C = ε0 A / d', 'C = (8.854×10⁻¹²)(0.02)/(1×10⁻³) = 1.771×10⁻¹⁰ F', 'C = ' + r(a, 1) + ' pF']); }
{ const a = 20e-6 * 100 / (20e-6 + 30e-6);
  add('Electrostatics', 'hard', 'A 20 µF capacitor charged to 100 V is connected in parallel with an uncharged 30 µF capacitor. What is the final voltage across the combination?',
    a, [100, 50, 60], 'V', 0,
    ['Charge is conserved: Q = C1 V1 = 20 µF × 100 V = 2000 µC', 'Ctotal = 20 + 30 = 50 µF', 'V = Q/Ctotal = 2000/50 = ' + r(a) + ' V']); }

/* ================= ELECTROMAGNETIC INDUCTION (5) ================= */
{ const a = 200 * 0.5e-3 / 0.1;
  add('Electromagnetic Induction', 'easy', 'A 200-turn coil experiences a flux change from 0 to 0.5 mWb in 0.1 s. What is the average induced emf?',
    a, [0.005, 0.1, 10], 'V', 3,
    ['e = N ΔΦ/Δt', 'e = 200 × (0.5×10⁻³)/0.1 = 0.1/0.1 = ' + r(a) + ' V']); }
{ const a = 0.8 * 0.5 * 10;
  add('Electromagnetic Induction', 'easy', 'A conductor 0.5 m long moves at 10 m/s perpendicular to a uniform field of 0.8 T. What emf is induced in it?',
    a, [8, 2, 40], 'V', 0,
    ['e = B l v', 'e = 0.8 × 0.5 × 10 = ' + r(a) + ' V']); }
{ const a = 40 / ((6 - 2) / 0.2);
  add('Electromagnetic Induction', 'medium', 'The current in a coil changes from 2 A to 6 A in 0.2 s and induces 40 V. What is the self-inductance?',
    a, [0.5, 8, 20], 'H', 1,
    ['di/dt = (6 − 2)/0.2 = 20 A/s', 'e = L di/dt  →  L = 40/20 = ' + r(a) + ' H']); }
{ const a = 0.5 * 0.5 * 16;
  add('Electromagnetic Induction', 'medium', 'How much energy is stored in the magnetic field of a 0.5 H inductor carrying 4 A?',
    a, [2, 8, 16], 'J', 0,
    ['W = ½ L I²', 'W = 0.5 × 0.5 × 4² = 0.25 × 16 = ' + r(a) + ' J']); }
{ const M = 0.5 * Math.sqrt(0.4 * 0.9), a = M * 50;
  add('Electromagnetic Induction', 'hard', 'Two coils have L1 = 0.4 H, L2 = 0.9 H and a coupling coefficient k = 0.5. If the current in coil 1 changes at 50 A/s, what emf is induced in coil 2?',
    a, [0.6 * 50, 0.18 * 50, 0.65 * 50], 'V', 1,
    ['M = k √(L1 L2) = 0.5 × √(0.4 × 0.9) = 0.5 × 0.6 = ' + r(M, 1) + ' H', 'e2 = M di1/dt = 0.3 × 50 = ' + r(a, 1) + ' V']); }

/* ================= MAGNETIC CIRCUITS (5) ================= */
{ const a = 500 * 2;
  add('Magnetic Circuits', 'easy', 'A coil of 500 turns carries 2 A. What is the magnetomotive force (mmf)?',
    a, [250, 502, 2000], 'At', 0,
    ['mmf = N I', 'mmf = 500 × 2 = ' + a + ' ampere-turns']); }
{ const a = 0.6e-3 / 4e-4;
  add('Magnetic Circuits', 'easy', 'A core of cross-section 4 cm² carries a flux of 0.6 mWb. What is the flux density?',
    a, [0.15, 15, 0.67], 'T', 2,
    ['A = 4 cm² = 4×10⁻⁴ m²', 'B = Φ/A = 0.6×10⁻³ / 4×10⁻⁴ = ' + r(a, 1) + ' T']); }
{ const mu0 = 4 * PI * 1e-7, S = 0.4 / (mu0 * 1000 * 4e-4) / 1000;
  add('Magnetic Circuits', 'medium', 'A core has length 0.4 m, cross-section 4 cm² and relative permeability 1000. What is its reluctance?',
    S, [S / 10, S * 10, S / 2], 'kAt/Wb', 2,
    ['S = l / (μ0 μr A)', 'S = 0.4 / (4π×10⁻⁷ × 1000 × 4×10⁻⁴)', 'S = 0.4 / (5.027×10⁻⁷) = ' + r(S * 1000, 0) + ' At/Wb = ' + r(S, 1) + ' kAt/Wb']); }
{ const a = 400 * 0.5 / 2e5 * 1000;
  add('Magnetic Circuits', 'medium', 'A 400-turn coil carries 0.5 A on a magnetic circuit whose total reluctance is 2×10⁵ At/Wb. What is the flux?',
    a, [0.5, 2, 10], 'mWb', 1,
    ['mmf = N I = 400 × 0.5 = 200 At', 'Φ = mmf / S = 200 / (2×10⁵) = 1×10⁻³ Wb', 'Φ = ' + r(a, 1) + ' mWb']); }
{ const mu0 = 4 * PI * 1e-7, Hi = 1 / (mu0 * 1500), Ni = Hi * 0.5, Ng = 1 / mu0 * 1e-3, tot = Ni + Ng, a = tot / 500;
  add('Magnetic Circuits', 'hard', 'An iron core (μr = 1500, path 0.5 m) has a 1 mm air gap, both with the same cross-section. How much current must a 500-turn coil carry to produce B = 1 T? (Ignore leakage and fringing.)',
    a, [Ng / 500, Ni / 500, 2 * a], 'A', 2,
    ['Iron: H = B/(μ0 μr) = 1/(4π×10⁻⁷ × 1500) = ' + r(Hi, 1) + ' A/m → mmf = H l = ' + r(Ni, 1) + ' At', 'Gap: mmf = B lg/μ0 = (1)(10⁻³)/(4π×10⁻⁷) = ' + r(Ng, 1) + ' At', 'Total mmf = ' + r(tot, 1) + ' At', 'I = mmf/N = ' + r(tot, 1) + '/500 = ' + r(a) + ' A', '(Note the tiny air gap needs about 3× more mmf than the whole iron path.)']); }

/* ================= INSTRUMENTATION (5) ================= */
{ const a = 1e-3 * 50 / (11e-3 - 1e-3);
  add('Instrumentation', 'easy', 'A 1 mA, 50 Ω meter movement is to read up to 11 mA. What shunt resistance is needed?',
    a, [0.5, 50 * 1 / 11, 50], 'Ω', 2,
    ['Shunt current = 11 − 1 = 10 mA', 'The shunt and the meter have the same voltage: Ish Rsh = Im Rm', 'Rsh = (1 mA × 50 Ω)/10 mA = ' + r(a) + ' Ω']); }
{ const a = 10 / 1e-3 - 100;
  add('Instrumentation', 'easy', 'A 1 mA, 100 Ω meter movement is to be used as a 10 V full-scale voltmeter. What series multiplier resistance is needed?',
    a, [100, 10000, 99000], 'Ω', 0,
    ['Total resistance needed = V/Im = 10/0.001 = 10,000 Ω', 'Rseries = 10,000 − Rm = 10,000 − 100 = ' + a + ' Ω']); }
{ const W1 = 3000, W2 = 1000, th = Math.atan(S3 * (W1 - W2) / (W1 + W2)), a = Math.cos(th);
  add('Instrumentation', 'hard', 'In the two-wattmeter method, the readings of a balanced 3-phase load are 3000 W and 1000 W. What is the power factor?',
    a, [S3 * 2000 / 4000, 0.5, 1000 / 3000], '', 3,
    ['tan θ = √3 (W1 − W2)/(W1 + W2) = 1.732 × 2000/4000 = 0.866', 'θ = ' + r(th * 180 / PI, 2) + '°', 'pf = cos θ = ' + r(a, 3), '(Total power = 3000 + 1000 = 4000 W)']); }
{ const a = 150 * 0.01 / 50 * 100;
  add('Instrumentation', 'medium', 'A 150 V voltmeter is accurate to ±1% of full scale. What is the maximum possible percentage error in the reading when it shows 50 V?',
    a, [1, 1.5, 6], '%', 1,
    ['Maximum error = 1% of 150 V = 1.5 V (it does not shrink at lower readings)', '% error of reading = 1.5/50 × 100 = ' + r(a, 1) + '%', '(This is why meters should be read near full scale.)']); }
{ const a = 600 * (2 * 0.5);
  add('Instrumentation', 'medium', 'An energy meter has a disc constant of 600 revolutions per kWh. A 2 kW load runs for 30 minutes. How many revolutions does the disc make?',
    a, [300, 1200, 60], 'rev', 0,
    ['Energy = 2 kW × 0.5 h = 1 kWh', 'Revolutions = 600 × 1 = ' + a]); }

/* ================= DC GENERATORS (6) ================= */
{ const a = 0.02 * 400 * 600 * 4 / (60 * 4);
  add('DC Generators', 'easy', 'A 4-pole, lap-wound dc generator has 400 conductors and 0.02 Wb flux per pole. What is the generated emf at 600 rpm?',
    a, [0.02 * 400 * 600 * 4 / (60 * 2), 0.02 * 400 * 600 * 4 / 60, 0.02 * 400 * 600 * 4 / 4], 'V', 0,
    ['Eg = Φ Z N P / (60 A)', 'For a lap winding A = P = 4', 'Eg = (0.02)(400)(600)(4) / (60 × 4) = ' + r(a) + ' V']); }
{ const a = 240 - 50 * 0.2;
  add('DC Generators', 'easy', 'A dc generator develops 240 V, delivers 50 A and has an armature resistance of 0.2 Ω. What is the terminal voltage?',
    a, [240, 250, 10], 'V', 0,
    ['The armature resistance drop = Ia Ra = 50 × 0.2 = 10 V', 'V = Eg − Ia Ra = 240 − 10 = ' + r(a) + ' V']); }
{ const IL = 50000 / 250, If = 250 / 50, a = IL + If;
  add('DC Generators', 'medium', 'A 50 kW, 250 V shunt generator has a field resistance of 50 Ω. What is its armature current at full load?',
    a, [IL - If, IL, 250], 'A', 0,
    ['Load current IL = P/V = 50,000/250 = ' + IL + ' A', 'Field current If = V/Rf = 250/50 = ' + If + ' A', 'Ia = IL + If = ' + IL + ' + ' + If + ' = ' + a + ' A']); }
{ const a = 40 / 45 * 100;
  add('DC Generators', 'medium', 'A dc generator delivers 40 kW and has total losses of 5 kW. What is its efficiency?',
    a, [87.5, 95, 112.5], '%', 1,
    ['Input = output + losses = 40 + 5 = 45 kW', 'η = output/input = 40/45 = ' + r(a, 1) + '%', '(87.5% would result from dividing the losses by the output, which is not the efficiency.)']); }
{ const a = (240 - 220) / 220 * 100;
  add('DC Generators', 'medium', 'A dc generator has a no-load terminal voltage of 240 V and a full-load voltage of 220 V. What is its voltage regulation?',
    a, [20 / 240 * 100, 20, 220 / 240 * 100], '%', 2,
    ['VR = (VNL − VFL)/VFL × 100', 'VR = (240 − 220)/220 × 100 = ' + r(a) + '%']); }
{ const a = 240 * (1000 / 1200) * (0.04 / 0.05);
  add('DC Generators', 'hard', 'A dc generator produces 240 V at 1200 rpm with a flux of 0.05 Wb per pole. What emf results at 1000 rpm if the flux falls to 0.04 Wb?',
    a, [240 * 0.04 / 0.05, 240 * 1000 / 1200, 240 * 1.2 * 0.8], 'V', 1,
    ['Eg is proportional to Φ × N', 'E2 = 240 × (1000/1200) × (0.04/0.05)', 'E2 = 240 × 0.8333 × 0.8 = ' + r(a, 1) + ' V']); }

/* ================= DC MOTORS (6) ================= */
{ const a = 230 - 20 * 0.5;
  add('DC Motors', 'easy', 'A dc motor on a 230 V supply draws 20 A and has an armature resistance of 0.5 Ω. What is its back emf?',
    a, [240, 230, 10], 'V', 0,
    ['Eb = V − Ia Ra = 230 − 20 × 0.5 = 230 − 10 = ' + r(a) + ' V']); }
{ const w = 1500 * 2 * PI / 60, a = 5000 / w;
  add('DC Motors', 'easy', 'A motor delivers 5 kW at 1500 rpm. What is the shaft torque?',
    a, [5000 / 1500, 2 * a, 10 * a], 'N·m', 2,
    ['ω = 2πN/60 = 2π × 1500/60 = ' + r(w) + ' rad/s', 'T = P/ω = 5000/' + r(w) + ' = ' + r(a) + ' N·m']); }
{ const Eb1 = 220 - 20 * 0.4, Eb2 = 220 - 40 * 0.4, a = 1000 * Eb2 / Eb1;
  add('DC Motors', 'medium', 'A 220 V shunt motor (Ra = 0.4 Ω) runs at 1000 rpm with Ia = 20 A. At what speed does it run when Ia = 40 A? (Flux constant.)',
    a, [500, 1000, 1000 * Eb1 / Eb2], 'rpm', 1,
    ['Eb1 = 220 − 20 × 0.4 = ' + Eb1 + ' V', 'Eb2 = 220 − 40 × 0.4 = ' + Eb2 + ' V', 'N ∝ Eb (flux constant): N2 = 1000 × ' + Eb2 + '/' + Eb1 + ' = ' + r(a, 1) + ' rpm']); }
{ const total = 240 / 40, a = total - 0.6;
  add('DC Motors', 'medium', 'A 240 V dc motor with Ra = 0.6 Ω has a rated current of 20 A. What external starting resistance limits the starting current to twice the rated current?',
    a, [total, 240 / 20, 240 / 20 - 0.6], 'Ω', 1,
    ['At starting Eb = 0, so Istart = V/(Ra + Rext)', 'Istart = 2 × 20 = 40 A → Ra + Rext = 240/40 = ' + total + ' Ω', 'Rext = ' + total + ' − 0.6 = ' + r(a, 1) + ' Ω']); }
{ const out = 10 * 746, inp = 220 * 40, a = out / inp * 100;
  add('DC Motors', 'medium', 'A 10 hp dc motor (1 hp = 746 W) takes 40 A from a 220 V supply at full load. What is its efficiency?',
    a, [inp / out * 100, 74.6, 95], '%', 1,
    ['Output = 10 × 746 = ' + out + ' W', 'Input = V I = 220 × 40 = ' + inp + ' W', 'η = ' + out + '/' + inp + ' = ' + r(a, 1) + '%']); }
{ const a = 100 * (30 / 20) ** 2;
  add('DC Motors', 'hard', 'A dc series motor develops 100 N·m of torque at 20 A. Assuming an unsaturated field, what torque does it develop at 30 A?',
    a, [150, 100 * 1.5 ** 3, 100 / 2.25], 'N·m', 1,
    ['In a series motor Φ ∝ Ia, so T ∝ Φ Ia ∝ Ia²', 'T2 = 100 × (30/20)² = 100 × 2.25 = ' + r(a, 1) + ' N·m']); }

/* ================= ALTERNATORS (6) ================= */
{ const a = 8 * 900 / 120;
  add('Alternators', 'easy', 'An 8-pole alternator is driven at 900 rpm. What is the frequency of the generated emf?',
    a, [30, 120, 900], 'Hz', 0,
    ['f = P N / 120', 'f = 8 × 900 / 120 = ' + a + ' Hz']); }
{ const a = 120 * 50 / 6;
  add('Alternators', 'easy', 'At what speed must a 6-pole alternator be driven to generate 50 Hz?',
    a, [500, 1500, 3000], 'rpm', 0,
    ['N = 120 f / P', 'N = 120 × 50 / 6 = ' + a + ' rpm']); }
{ const a = 500000 / (S3 * 2400);
  add('Alternators', 'medium', 'A 3-phase alternator is rated 500 kVA at 2.4 kV (line-to-line). What is its rated line current?',
    a, [500000 / (3 * 2400), 500000 / 2400, 3 * a], 'A', 1,
    ['I = S/(√3 VL)', 'I = 500,000/(1.732 × 2400) = ' + r(a, 1) + ' A']); }
{ const a = (2645 - 2300) / 2300 * 100;
  add('Alternators', 'medium', 'An alternator has a no-load terminal voltage of 2645 V and a full-load voltage of 2300 V. What is its voltage regulation?',
    a, [(2645 - 2300) / 2645 * 100, 18, 2645 / 2300 * 100], '%', 2,
    ['VR = (E − V)/V × 100', 'VR = (2645 − 2300)/2300 × 100 = ' + r(a) + '%']); }
{ const a = 4.44 * 60 * 0.05 * 0.95 * 100;
  add('Alternators', 'medium', 'An alternator winding has 100 turns per phase, a winding factor of 0.95, 0.05 Wb flux per pole and runs at 60 Hz. What is the emf per phase?',
    a, [4.44 * 60 * 0.05 * 100, a / 2, a * 2], 'V', 1,
    ['E = 4.44 f Φ Kw N', 'E = 4.44 × 60 × 0.05 × 0.95 × 100 = ' + r(a, 1) + ' V']); }
{ const Vph = 6600 / S3, I = 100, th = Math.acos(0.8), Xs = 10;
  const Ire = I * Math.cos(th), Iim = -I * Math.sin(th);          // lagging current
  const Er = Vph + (-Xs * Iim), Ei = Xs * Ire, E = Math.hypot(Er, Ei);
  const a = (E - Vph) / Vph * 100;
  const Eu = Math.hypot(Vph, Xs * I), unity = (Eu - Vph) / Vph * 100;
  const Erl = Vph - Xs * (I * Math.sin(th)), Eil = Xs * I * Math.cos(th), El = Math.hypot(Erl, Eil), lead = (El - Vph) / Vph * 100;
  const arith = (Vph + Xs * I - Vph) / Vph * 100;
  add('Alternators', 'hard', 'A 3-phase, Y-connected alternator (6.6 kV line voltage) has a synchronous reactance of 10 Ω per phase and negligible resistance. At full load of 100 A and 0.8 power factor lagging, what is the voltage regulation?',
    a, [unity, arith, lead], '%', 1,
    ['Vph = 6600/√3 = ' + r(Vph, 1) + ' V', 'I = 100∠−36.87° A = 80 − j60 A', 'jXsI = j10 × (80 − j60) = 600 + j800 V', 'E = Vph + jXsI = ' + r(Vph + 600, 1) + ' + j800 → |E| = ' + r(E, 1) + ' V', 'VR = (E − V)/V × 100 = (' + r(E, 1) + ' − ' + r(Vph, 1) + ')/' + r(Vph, 1) + ' = ' + r(a, 1) + '%']); }

/* ================= TRANSFORMERS (8) ================= */
{ const a = 800 * 240 / 2400;
  add('Transformers', 'easy', 'A 2400 V / 240 V transformer has 800 turns on the primary. How many turns are on the secondary?',
    a, [8, 800, 8000], 'turns', 0,
    ['N2/N1 = V2/V1', 'N2 = 800 × 240/2400 = ' + a + ' turns']); }
{ const a = 5 * 12 / 120;
  add('Transformers', 'easy', 'An ideal 120 V / 12 V transformer supplies a load current of 5 A on the secondary. What is the primary current?',
    a, [50, 5, 0.05], 'A', 2,
    ['For an ideal transformer V1 I1 = V2 I2', 'I1 = I2 × V2/V1 = 5 × 12/120 = ' + r(a) + ' A']); }
{ const out = 25 * 0.5 * 0.8, cu = 0.5 * 0.5 ** 2, core = 0.2, a = out / (out + cu + core) * 100;
  const full = 20 / (20 + 0.7) * 100, noscale = out / (out + 0.7) * 100, unity = 12.5 / (12.5 + cu + core) * 100;
  add('Transformers', 'medium', 'A 25 kVA transformer has a core loss of 200 W and a full-load copper loss of 500 W. What is its efficiency at half load, 0.8 power factor?',
    a, [noscale, full, unity], '%', 2,
    ['Output = 25 × 0.5 × 0.8 = 10 kW', 'Copper loss varies with load²: 500 × (0.5)² = 125 W', 'Losses = 200 + 125 = 325 W', 'η = 10,000/(10,000 + 325) = ' + r(a) + '%']); }
{ const a = (240 - 230) / 230 * 100;
  add('Transformers', 'medium', 'A transformer secondary reads 240 V at no load and 230 V at full load. What is its voltage regulation?',
    a, [10 / 240 * 100, 10, 230 / 240 * 100], '%', 2,
    ['VR = (VNL − VFL)/VFL × 100', 'VR = (240 − 230)/230 × 100 = ' + r(a) + '%']); }
{ const a = 2 * (2400 / 240) ** 2;
  add('Transformers', 'medium', 'A 2400/240 V transformer has a 2 Ω load on its secondary. What is this load referred to the primary side?',
    a, [0.02, 20, 2000], 'Ω', 2,
    ['Turns ratio a = 2400/240 = 10', 'Z′ = a² Z = 10² × 2 = ' + r(a) + ' Ω']); }
{ const a = 400000 / (S3 * 480);
  add('Transformers', 'medium', 'A 3-phase, 400 kVA transformer is rated 13.2 kV / 480 V (line-to-line). What is its rated secondary line current?',
    a, [400000 / 480, 400000 / (3 * 480), 3 * a], 'A', 1,
    ['I2 = S/(√3 VL) = 400,000/(1.732 × 480)', 'I2 = ' + r(a, 1) + ' A']); }
{ const out = 20 * 6, core = 0.1 * 24, cu = 0.4 * 6, a = out / (out + core + cu) * 100;
  add('Transformers', 'hard', 'A 20 kVA distribution transformer has a core loss of 100 W and a full-load copper loss of 400 W. It carries full load at unity pf for 6 h and is on no load for the other 18 h. What is its all-day efficiency?',
    a, [out / (out + core + 0.4 * 24) * 100, 20 / (20 + 0.5) * 100, out / (out + core - 0.1 * 18) * 100 * 0 + out / (out + 0.1 * 6 * 0 + core) * 100], '%', 2,
    ['Energy out = 20 kW × 6 h = ' + out + ' kWh', 'Core loss runs all 24 h: 0.1 kW × 24 = ' + r(core, 1) + ' kWh', 'Copper loss only while loaded: 0.4 kW × 6 = ' + r(cu, 1) + ' kWh', 'η = ' + out + '/(' + out + ' + ' + r(core, 1) + ' + ' + r(cu, 1) + ') = ' + r(a) + '%', '(The ordinary full-load efficiency would be 20/20.5 = 97.56%, but the no-load hours lower the all-day value.)']); }
{ const Irated = 100000 / 2400, Zpu = 96 / 2400, a = Irated / Zpu;
  add('Transformers', 'hard', 'A 100 kVA, 2400 V transformer needs only 96 V on the high-voltage side to circulate rated current in a short-circuit test. What current flows in the HV winding if a short circuit occurs at rated voltage?',
    a, [Irated, Irated * 10, Irated * 100], 'A', 1,
    ['Rated HV current = 100,000/2400 = ' + r(Irated, 2) + ' A', 'Z(pu) = 96/2400 = ' + r(Zpu, 2), 'Isc = Irated/Zpu = ' + r(Irated, 2) + '/' + r(Zpu, 2) + ' = ' + r(a, 1) + ' A']); }

/* ================= INDUCTION MOTORS (6) ================= */
{ const a = 120 * 60 / 4;
  add('Induction Motors', 'easy', 'What is the synchronous speed of a 4-pole, 60 Hz induction motor?',
    a, [3600, 1200, 900], 'rpm', 0,
    ['Ns = 120 f / P = 120 × 60 / 4 = ' + a + ' rpm']); }
{ const a = (1500 - 1440) / 1500 * 100;
  add('Induction Motors', 'easy', 'An induction motor with a synchronous speed of 1500 rpm runs at 1440 rpm. What is its slip?',
    a, [60 / 1440 * 100, 6, 40], '%', 2,
    ['s = (Ns − N)/Ns = (1500 − 1440)/1500', 's = 60/1500 = 0.04 = ' + r(a) + '%']); }
{ const a = 0.04 * 50;
  add('Induction Motors', 'medium', 'A 50 Hz induction motor runs at 4% slip. What is the frequency of the rotor currents?',
    a, [4, 48, 50], 'Hz', 0,
    ['fr = s f = 0.04 × 50 = ' + r(a) + ' Hz']); }
{ const a = 20 * (1 - 0.05);
  add('Induction Motors', 'medium', 'The air-gap power of an induction motor is 20 kW and its slip is 0.05. Neglecting rotational losses, what is the mechanical power developed?',
    a, [1, 20, 21], 'kW', 0,
    ['Rotor copper loss = s × Pag = 0.05 × 20 = 1 kW', 'Pmech = (1 − s) Pag = 0.95 × 20 = ' + r(a) + ' kW']); }
{ const P = 10 * 746, w = 1750 * 2 * PI / 60, a = P / w;
  add('Induction Motors', 'medium', 'A 10 hp (7460 W) induction motor runs at 1750 rpm. What is its shaft torque?',
    a, [P / 1750, 2 * a, 10 * a], 'N·m', 2,
    ['ω = 2π × 1750/60 = ' + r(w) + ' rad/s', 'T = P/ω = 7460/' + r(w) + ' = ' + r(a) + ' N·m']); }
{ const Ifl = 50, Ist = 6 * Ifl, tap = 0.65, Im = tap * Ist, a = tap * Im;
  add('Induction Motors', 'hard', 'A motor has a full-load current of 50 A and a direct-on-line starting current of 6 times full load. It is started through an autotransformer with a 65% tap. What starting line current is drawn from the supply?',
    a, [Ist / 3, Im, Ist], 'A', 2,
    ['Direct starting current = 6 × 50 = ' + Ist + ' A', 'Motor current at 65% voltage = 0.65 × ' + Ist + ' = ' + r(Im) + ' A', 'The autotransformer also reduces the line current by the tap ratio: Iline = 0.65 × ' + r(Im) + ' = ' + r(a) + ' A', '(Line current falls with the SQUARE of the tap setting.)']); }

/* ================= SYNCHRONOUS MOTORS (5) ================= */
{ const a = 120 * 60 / 6;
  add('Synchronous Motors', 'easy', 'At what speed does a 6-pole, 60 Hz synchronous motor run?',
    a, [900, 1800, 3600], 'rpm', 0,
    ['A synchronous motor always runs at synchronous speed', 'Ns = 120 f / P = 120 × 60 / 6 = ' + a + ' rpm']); }
{ const a = S3 * 460 * 50 * 0.9 / 1000;
  add('Synchronous Motors', 'medium', 'A 3-phase synchronous motor draws 50 A at 460 V (line) and 0.9 power factor. What is the electrical input power?',
    a, [S3 * 460 * 50 / 1000, 460 * 50 * 0.9 / 1000, 3 * 460 * 50 * 0.9 / 1000], 'kW', 2,
    ['P = √3 VL IL pf', 'P = 1.732 × 460 × 50 × 0.9 = ' + r(a * 1000, 0) + ' W = ' + r(a) + ' kW']); }
{ const w = 1500 * 2 * PI / 60, a = 40000 / w;
  add('Synchronous Motors', 'easy', 'A synchronous motor develops 40 kW at 1500 rpm. What torque does it develop?',
    a, [40000 / 1500, 2 * a, 10 * a], 'N·m', 2,
    ['ω = 2π × 1500/60 = ' + r(w) + ' rad/s', 'T = P/ω = 40,000/' + r(w) + ' = ' + r(a) + ' N·m']); }
{ const per = 1000 * 1200 / 5 * Math.sin(30 * PI / 180), a = 3 * per / 1000;
  add('Synchronous Motors', 'medium', 'A 3-phase synchronous machine has Vt = 1000 V and E = 1200 V per phase, Xs = 5 Ω per phase, and a power angle of 30°. What is the total power transferred?',
    a, [per / 1000, S3 * per / 1000, 2 * a], 'kW', 1,
    ['P per phase = (V E / Xs) sin δ = (1000 × 1200/5) × sin 30° = 240,000 × 0.5 = ' + r(per / 1000, 0) + ' kW', 'Total (3 phases) = 3 × ' + r(per / 1000, 0) + ' = ' + r(a, 0) + ' kW']); }
{ const Pl = 800, Ql = 800 * 0.75, Pm = 200, Qm = 200 * 0.75, P = Pl + Pm, Q = Ql - Qm, a = P / Math.hypot(P, Q);
  const bad = Pl / Math.hypot(Pl, Q);
  add('Synchronous Motors', 'hard', 'A plant load of 800 kW at 0.8 pf lagging is joined by a 200 kW synchronous motor running at 0.8 pf leading. What is the new overall power factor?',
    a, [bad, 0.8, 0.96], '', 3,
    ['Load: Q = 800 × tan(36.87°) = 800 × 0.75 = ' + Ql + ' kvar lagging', 'Motor: P = 200 kW, Q = 200 × 0.75 = ' + Qm + ' kvar leading', 'Total P = 800 + 200 = ' + P + ' kW; net Q = ' + Ql + ' − ' + Qm + ' = ' + Q + ' kvar lagging', 'S = √(1000² + 450²) = ' + r(Math.hypot(P, Q), 1) + ' kVA', 'pf = 1000/' + r(Math.hypot(P, Q), 1) + ' = ' + r(a, 3) + ' lagging']); }

/* ================= TRANSMISSION LINES (6) ================= */
{ const a = 2.83e-8 * 1000 / 1e-4;
  add('Transmission Lines', 'easy', 'An aluminium conductor (ρ = 2.83×10⁻⁸ Ω·m) is 1000 m long with a cross-section of 100 mm². What is its resistance?',
    a, [a * 10, a / 10, a * 100], 'Ω', 4,
    ['A = 100 mm² = 1×10⁻⁴ m²', 'R = ρ l / A = (2.83×10⁻⁸)(1000)/(1×10⁻⁴) = ' + r(a, 3) + ' Ω']); }
{ const a = 3 * 100 ** 2 * 0.5 / 1000;
  add('Transmission Lines', 'easy', 'A 3-phase line carries 100 A per conductor and each conductor has a resistance of 0.5 Ω. What is the total copper loss in the line?',
    a, [a / 3, 3 * a, 2 * a], 'kW', 0,
    ['Loss = 3 I² R = 3 × 100² × 0.5', 'Loss = 15,000 W = ' + r(a) + ' kW']); }
{ const th = Math.acos(0.8), a = 100 * (0.2 * 0.8 + 0.4 * Math.sin(th));
  add('Transmission Lines', 'medium', 'A single-phase line (total R = 0.2 Ω, X = 0.4 Ω) feeds a 100 A load at 0.8 pf lagging. Approximately how large is the voltage drop?',
    a, [100 * 0.2, 100 * Math.hypot(0.2, 0.4), 100 * 0.6], 'V', 1,
    ['Vd ≈ I (R cos θ + X sin θ)', 'cos θ = 0.8, sin θ = 0.6', 'Vd = 100 × (0.2 × 0.8 + 0.4 × 0.6) = 100 × 0.40 = ' + r(a) + ' V']); }
{ const a = 4.6 / 5 * 100;
  add('Transmission Lines', 'easy', 'A line receives 5 MW at the sending end and delivers 4.6 MW at the receiving end. What is its transmission efficiency?',
    a, [8, 0.4 / 4.6 * 100, 5 / 4.6 * 100], '%', 1,
    ['η = receiving-end power / sending-end power', 'η = 4.6/5 × 100 = ' + r(a) + '%', '(The loss is 0.4 MW, which is 8% of the sending power.)']); }
{ const L = 1.3e-3, C = 9e-9, a = Math.sqrt(L / C);
  add('Transmission Lines', 'medium', 'A line has an inductance of 1.3 mH/km and a capacitance of 0.009 µF/km. What is its surge (characteristic) impedance?',
    a, [a / 2, 2 * a, 10 * a], 'Ω', 1,
    ['Zc = √(L/C) = √(1.3×10⁻³ / 9×10⁻⁹)', 'Zc = √(144,444) = ' + r(a, 1) + ' Ω']); }
{ const Vr = 33000 / S3, I = 10e6 / (S3 * 33000 * 0.9), th = Math.acos(0.9);
  const Ire = I * Math.cos(th), Iim = -I * Math.sin(th), R = 5, X = 10;
  const dr = Ire * R - Iim * X, di = Ire * X + Iim * R;
  const Vs = Math.hypot(Vr + dr, di), a = (Vs - Vr) / Vr * 100;
  add('Transmission Lines', 'hard', 'A short 3-phase line (Z = 5 + j10 Ω per phase) delivers 10 MW at 0.9 pf lagging to a load at 33 kV (line-to-line). What is the voltage regulation?',
    a, [I * (R + X) / Vr * 100, I * Math.hypot(R, X) / Vr * 100, I * R / Vr * 100], '%', 2,
    ['Vr(phase) = 33,000/√3 = ' + r(Vr, 1) + ' V', 'I = 10×10⁶/(√3 × 33,000 × 0.9) = ' + r(I, 1) + ' A at −25.84°', 'I Z = ' + r(dr, 1) + ' + j' + r(di, 1) + ' V', 'Vs = ' + r(Vr, 1) + ' + ' + r(dr, 1) + ' + j' + r(di, 1) + ' → |Vs| = ' + r(Vs, 1) + ' V', 'VR = (Vs − Vr)/Vr × 100 = ' + r(a, 2) + '%']); }

/* ================= FAULTS (4) ================= */
{ const a = 0.2 * 100 / 10;
  add('Faults', 'easy', 'A 10 MVA generator has a reactance of 0.2 per unit on its own base. What is this reactance on a 100 MVA base?',
    a, [0.02, 0.2, 20], 'pu', 2,
    ['Zpu(new) = Zpu(old) × (MVAnew/MVAold)', 'X = 0.2 × 100/10 = ' + r(a) + ' pu']); }
{ const sc = 20 / 0.1, a = sc * 1e6 / (S3 * 11000) / 1000;
  add('Faults', 'medium', 'A 20 MVA, 11 kV generator has a reactance of 0.1 per unit. What is the three-phase fault current at its terminals (in kA)?',
    a, [sc * 1e6 / (3 * 11000) / 1000, sc * 1e6 / 11000 / 1000, 10 * a], 'kA', 2,
    ['Short-circuit MVA = 20/0.1 = ' + sc + ' MVA', 'Isc = MVAsc/(√3 kV) = 200×10⁶/(1.732 × 11,000)', 'Isc = ' + r(a * 1000, 0) + ' A = ' + r(a, 2) + ' kA']); }
{ const a = (30 + 0 + 0) / 3;
  add('Faults', 'medium', 'During a line-to-ground fault the phase currents are Ia = 30 A, Ib = 0 and Ic = 0. What is the zero-sequence current I0?',
    a, [0, 30, 90], 'A', 0,
    ['I0 = (Ia + Ib + Ic)/3', 'I0 = (30 + 0 + 0)/3 = ' + r(a) + ' A']); }
{ const X = (0.15 + 0.05) / 2, a = 10 / X;
  add('Faults', 'hard', 'Two identical 10 MVA generators (X = 0.15 pu each) feed a common bus through two identical 10 MVA transformers (X = 0.05 pu each), one transformer per generator. What is the three-phase short-circuit MVA at the bus on the transformer side? (10 MVA base)',
    a, [50, 200, 10 / 0.15], 'MVA', 1,
    ['Each branch: X = 0.15 + 0.05 = 0.20 pu (generator + transformer in series)', 'Two identical branches in parallel: X = 0.20/2 = ' + r(X) + ' pu', 'MVAsc = MVAbase/X = 10/0.10 = ' + r(a, 0) + ' MVA']); }

/* ================= ILLUMINATION (6) ================= */
{ const a = 1200 / 100;
  add('Illumination', 'easy', 'A lamp rated 100 W emits 1200 lumens. What is its luminous efficacy?',
    a, [100 / 1200, 1.2, 120], 'lm/W', 2,
    ['Efficacy = luminous flux / power = 1200/100 = ' + r(a) + ' lm/W']); }
{ const a = 800 / 4;
  add('Illumination', 'easy', 'A point source of 800 cd is 2 m directly above a surface. What is the illuminance on the surface?',
    a, [400, 100, 1600], 'lux', 0,
    ['E = I/d² = 800/2² = 800/4 = ' + r(a) + ' lux']); }
{ const d = 5, a = 1000 * (3 / d) / (d * d);
  add('Illumination', 'medium', 'A 1000 cd point source (assume uniform in all directions) hangs 3 m above the floor. What is the illuminance on the floor at a point 4 m horizontally from the base of the lamp?',
    a, [1000 / 25, 1000 / 9, 1000 * (3 / 5) ** 2 / 25], 'lux', 1,
    ['Distance d = √(3² + 4²) = 5 m, cos θ = 3/5 = 0.6', 'E = I cos θ / d² = 1000 × 0.6 / 25 = ' + r(a, 1) + ' lux', '(I/d² = 40 lux ignores the angle at which the light strikes the floor.)']); }
{ const a = 300 * 80 / (0.5 * 0.8);
  add('Illumination', 'medium', 'A 10 m × 8 m room needs 300 lux. The coefficient of utilisation is 0.5 and the maintenance factor is 0.8. What total lamp lumens are required?',
    a, [24000, 24000 / 0.8, 24000 / 0.5], 'lm', 0,
    ['Area = 10 × 8 = 80 m²', 'Φ = E A / (CU × MF) = 300 × 80 / (0.5 × 0.8)', 'Φ = 24,000/0.4 = ' + r(a, 0) + ' lm']); }
{ const F = 3770, a = F / (4 * PI);
  add('Illumination', 'medium', 'A lamp emits 3770 lumens uniformly in all directions. What is its luminous intensity?',
    a, [F / 4, F / PI, F * 4 * PI], 'cd', 0,
    ['A full sphere subtends 4π steradians', 'I = Φ/ω = 3770/(4π) = 3770/12.566 = ' + r(a, 0) + ' cd']); }
{ const I = 2000, h = 8, x = 6, d = Math.hypot(h, x), a = I * (x / d) / (d * d);
  add('Illumination', 'hard', 'A street lamp is 8 m above the road and has an intensity of 2000 cd toward a point on the road 6 m horizontally away. What is the illuminance on a VERTICAL plane at that point, facing the lamp?',
    a, [I * (h / d) / (d * d), I / (d * d), I * (x / d) ** 2 * (h / d) / (d * d) * 5 * 0 + 9.6], 'lux', 1,
    ['d = √(8² + 6²) = 10 m; sin θ = 6/10 = 0.6; cos θ = 8/10 = 0.8 (θ measured from the vertical)', 'Horizontal plane: Eh = I cos θ / d² = 2000 × 0.8/100 = 16 lux', 'Vertical plane facing the lamp: Ev = I sin θ / d² = 2000 × 0.6/100 = ' + r(a, 1) + ' lux']); }

/* ================= RECTIFIERS & CONVERTERS (5) ================= */
{ const a = 100 / PI;
  add('Rectifiers & Converters', 'easy', 'A half-wave rectifier has a peak output voltage Vm = 100 V. What is the average (dc) output voltage?',
    a, [2 * 100 / PI, 100 / S2, 100], 'V', 2,
    ['For a half-wave rectifier: Vdc = Vm/π', 'Vdc = 100/3.1416 = ' + r(a) + ' V']); }
{ const a = 2 * 60;
  add('Rectifiers & Converters', 'easy', 'A full-wave rectifier is supplied from a 60 Hz source. What is the ripple frequency at its output?',
    a, [60, 180, 240], 'Hz', 0,
    ['A full-wave rectifier produces two output pulses per input cycle', 'fripple = 2 × 60 = ' + a + ' Hz']); }
{ const Vm = 12 * S2, a = 2 * (Vm - 1.4) / PI;
  add('Rectifiers & Converters', 'medium', 'A 120 V rms source feeds a 10:1 step-down transformer and a bridge rectifier with silicon diodes (0.7 V drop each). What is the average dc output voltage?',
    a, [Vm - 1.4, 2 * Vm / PI, (Vm - 1.4) / PI], 'V', 2,
    ['Secondary rms = 120/10 = 12 V → peak = 12 × 1.414 = ' + r(Vm) + ' V', 'A bridge conducts through 2 diodes: Vm(out) = ' + r(Vm) + ' − 1.4 = ' + r(Vm - 1.4) + ' V', 'Vdc = 2 Vm(out)/π = ' + r(a) + ' V']); }
{ const a = 12 / (1 - 0.6);
  add('Rectifiers & Converters', 'medium', 'A boost converter has Vin = 12 V and a duty cycle D = 0.6. What is the output voltage?',
    a, [12 * 0.6, 12 * 1.6, 12 / 0.6], 'V', 1,
    ['Boost converter: Vout = Vin/(1 − D)', 'Vout = 12/(1 − 0.6) = 12/0.4 = ' + r(a) + ' V', '(12 × 0.6 = 7.2 V is the buck-converter formula.)']); }
{ const a = 3 * S2 / PI * 480;
  add('Rectifiers & Converters', 'hard', 'A 3-phase full-wave (six-pulse) bridge rectifier is fed from a 480 V (line-to-line, rms) supply. What is the average dc output voltage? (Ideal diodes)',
    a, [3 * S3 / (2 * PI) * (480 / S3 * S2), 1.35 * 480 / S3, 2 * S2 / PI * 480], 'V', 1,
    ['Vdc = (3√2/π) × VLL = 1.35 × VLL', 'Vdc = 1.3505 × 480 = ' + r(a, 1) + ' V', '(The three-phase half-wave circuit would give only about 324 V.)']); }

/* ================= POWER PLANTS (6) ================= */
{ const a = 40 / 80 * 100;
  add('Power Plants', 'easy', 'A plant has an average load of 40 MW and a peak load of 80 MW. What is its load factor?',
    a, [25, 75, 200], '%', 0,
    ['Load factor = average load / peak load', '= 40/80 = 0.5 = ' + r(a) + '%']); }
{ const a = 3600 / 10000 * 100;
  add('Power Plants', 'easy', 'A thermal plant has a heat rate of 10,000 kJ per kWh generated. What is its thermal efficiency? (1 kWh = 3600 kJ)',
    a, [3.6, 64, 278], '%', 0,
    ['Efficiency = energy output / energy input', 'η = 3600/10,000 = 0.36 = ' + r(a) + '%']); }
{ const a = 900 / 600;
  add('Power Plants', 'medium', 'The individual maximum demands of several consumers add up to 900 kW, but the maximum demand of the whole group occurring together is 600 kW. What is the diversity factor?',
    a, [600 / 900, 1.33, 2], '', 2,
    ['Diversity factor = sum of individual maximum demands / coincident maximum demand', '= 900/600 = ' + r(a) + '  (it is always ≥ 1)']); }
{ const a = 1000 * 9.81 * 20 * 100 * 0.9 / 1e6;
  add('Power Plants', 'medium', 'A hydro plant has a net head of 100 m and a flow of 20 m³/s. If its overall efficiency is 90%, what is the electrical output?',
    a, [a * 0.9, a / 0.9, a / 0.9 * 0.9 / 0.9 * 0 + 19.62], 'MW', 2,
    ['P = ρ g Q H η = (1000)(9.81)(20)(100)(0.90)', 'P = 17,658,000 W = ' + r(a) + ' MW', '(Without efficiency the water power would be 19.62 MW.)']); }
{ const kJh = 100e3 * 3600, a = kJh / (0.30 * 24000) / 1000;
  add('Power Plants', 'medium', 'A 100 MW coal plant has an overall efficiency of 30% and burns coal of heating value 24,000 kJ/kg. How many tonnes of coal does it burn per hour at full load?',
    a, [kJh / 24000 / 1000, a * 0.09, a / 0.3], 't/h', 1,
    ['Energy output = 100 MW × 3600 s = 3.6×10⁸ kJ per hour', 'Heat input = 3.6×10⁸/0.30 = 1.2×10⁹ kJ per hour', 'Coal = 1.2×10⁹/24,000 = ' + r(a * 1000, 0) + ' kg/h = ' + r(a, 1) + ' t/h']); }
{ const a = (0.35 + 0.65 * 0.30) * 100;
  add('Power Plants', 'hard', 'In a combined-cycle plant the gas turbine has an efficiency of 35%, and a steam bottoming cycle converts 30% of the heat rejected by the gas turbine into electricity. What is the overall efficiency?',
    a, [0.65 * 30, 35, 65], '%', 1,
    ['Gas turbine output = 0.35 of the fuel heat; rejected heat = 0.65', 'Steam cycle output = 0.30 × 0.65 = 0.195', 'η = 0.35 + 0.195 = 0.545 = ' + r(a, 1) + '%']); }

/* ---------- sanity + output ---------- */
if (OUT.length !== 100) throw new Error('Expected 100, got ' + OUT.length);
const q = s => JSON.stringify(s);
const text = OUT.map(o =>
  `  {\n    id: ${o.id}, topic: ${q(o.topic)}, difficulty: ${q(o.difficulty)}, points: ${o.points},\n    question: ${q(o.question)},\n    choices: [${o.choices.map(q).join(', ')}], answer: ${o.answer},\n    solution: ${q(o.solution)}\n  }`
).join(',\n');
fs.writeFileSync(__dirname + '/questions-new.txt', text);
fs.writeFileSync(__dirname + '/questions-new.json', JSON.stringify(OUT, null, 1));
console.log('generated', OUT.length);
