// Original practice problems covering the same topics listed on the book cover.
// answer = index (0-3) of the correct choice. points: easy 10, medium 15, hard 20.
window.QUESTIONS = [
  {
    id: 1, topic: "DC Circuits", difficulty: "easy", points: 10,
    question: "Three resistors of 6 Ω, 12 Ω and 4 Ω are connected in parallel. What is the equivalent resistance?",
    choices: ["1 Ω", "2 Ω", "4 Ω", "22 Ω"], answer: 1,
    solution: "1/Req = 1/6 + 1/12 + 1/4\n1/Req = 2/12 + 1/12 + 3/12 = 6/12\nReq = 12/6 = 2 Ω"
  },
  {
    id: 2, topic: "DC Circuits", difficulty: "easy", points: 10,
    question: "A 12 V source is connected to a 4 Ω and an 8 Ω resistor in series. What is the voltage across the 8 Ω resistor?",
    choices: ["4 V", "6 V", "8 V", "12 V"], answer: 2,
    solution: "Rt = 4 + 8 = 12 Ω\nI = V/Rt = 12/12 = 1 A\nV(8 Ω) = I × R = 1 × 8 = 8 V"
  },
  {
    id: 3, topic: "DC Circuits", difficulty: "medium", points: 15,
    question: "A heater rated 1500 W at 120 V is operating at its rating. What is its resistance?",
    choices: ["8.0 Ω", "9.6 Ω", "12.5 Ω", "18.0 Ω"], answer: 1,
    solution: "P = V²/R\nR = V²/P = 120² / 1500 = 14,400 / 1500 = 9.6 Ω"
  },
  {
    id: 4, topic: "AC Circuits", difficulty: "medium", points: 15,
    question: "A series RL circuit has R = 30 Ω and XL = 40 Ω and is connected to a 120 V source. Find the current.",
    choices: ["1.7 A", "2.4 A", "3.0 A", "4.0 A"], answer: 1,
    solution: "Z = √(R² + XL²) = √(30² + 40²) = √2500 = 50 Ω\nI = V/Z = 120/50 = 2.4 A"
  },
  {
    id: 5, topic: "AC Circuits", difficulty: "medium", points: 15,
    question: "For the same series RL circuit (R = 30 Ω, XL = 40 Ω, 120 V), what is the real power consumed?",
    choices: ["288 W", "172.8 W", "230.4 W", "120 W"], answer: 1,
    solution: "I = 120/50 = 2.4 A\nReal power is dissipated only in R:\nP = I²R = (2.4)² × 30 = 5.76 × 30 = 172.8 W\n(Check: S = VI = 288 VA, pf = R/Z = 0.6, P = 288 × 0.6 = 172.8 W)"
  },
  {
    id: 6, topic: "AC Circuits", difficulty: "hard", points: 20,
    question: "A series RLC circuit has L = 10 mH and C = 10 µF. What is its resonant frequency?",
    choices: ["159 Hz", "503 Hz", "1007 Hz", "3162 Hz"], answer: 1,
    solution: "fr = 1 / (2π√(LC))\nLC = (10×10⁻³)(10×10⁻⁶) = 1×10⁻⁷\n√(LC) = 3.162×10⁻⁴\nfr = 1 / (2π × 3.162×10⁻⁴) = 1 / 1.987×10⁻³ ≈ 503 Hz"
  },
  {
    id: 7, topic: "Electrostatics", difficulty: "easy", points: 10,
    question: "Two point charges of 2 µC each are placed 0.3 m apart in air. What is the force between them? (k = 9×10⁹ N·m²/C²)",
    choices: ["0.12 N", "0.4 N", "1.2 N", "4.0 N"], answer: 1,
    solution: "F = k q1 q2 / r²\nF = (9×10⁹)(2×10⁻⁶)(2×10⁻⁶) / (0.3)²\nF = 0.036 / 0.09 = 0.4 N (repulsive)"
  },
  {
    id: 8, topic: "Electrostatics", difficulty: "easy", points: 10,
    question: "A 10 µF and a 20 µF capacitor are connected in series. What is the equivalent capacitance?",
    choices: ["30 µF", "15 µF", "6.67 µF", "5 µF"], answer: 2,
    solution: "Series capacitors: Ceq = (C1 × C2)/(C1 + C2)\nCeq = (10 × 20)/(10 + 20) = 200/30 = 6.67 µF"
  },
  {
    id: 9, topic: "Electrostatics", difficulty: "medium", points: 15,
    question: "How much energy is stored in a 100 µF capacitor charged to 200 V?",
    choices: ["0.02 J", "1 J", "2 J", "4 J"], answer: 2,
    solution: "W = ½ C V²\nW = ½ (100×10⁻⁶)(200)² = ½ (100×10⁻⁶)(40,000) = 2 J"
  },
  {
    id: 10, topic: "Electromagnetic Induction", difficulty: "medium", points: 15,
    question: "A coil of 200 turns is linked by a flux that changes uniformly from 0.05 Wb to 0.01 Wb in 0.2 s. What is the average induced emf?",
    choices: ["8 V", "10 V", "40 V", "200 V"], answer: 2,
    solution: "e = N (ΔΦ/Δt)\nΔΦ = 0.05 − 0.01 = 0.04 Wb\ne = 200 × (0.04 / 0.2) = 200 × 0.2 = 40 V"
  },
  {
    id: 11, topic: "Magnetic Circuits", difficulty: "easy", points: 10,
    question: "A coil of 500 turns carries 2 A around a magnetic path 0.4 m long. What is the magnetic field intensity H?",
    choices: ["1000 AT/m", "1250 AT/m", "2500 AT/m", "5000 AT/m"], answer: 2,
    solution: "mmf = NI = 500 × 2 = 1000 ampere-turns\nH = mmf / l = 1000 / 0.4 = 2500 AT/m"
  },
  {
    id: 12, topic: "Instrumentation", difficulty: "medium", points: 15,
    question: "A d'Arsonval movement has a full-scale current of 50 µA. If it is used as a 100 V voltmeter, what is the total resistance of the meter (movement + multiplier)?",
    choices: ["20 kΩ", "200 kΩ", "2 MΩ", "20 MΩ"], answer: 2,
    solution: "Total resistance = Vfs / Ifs\n= 100 / (50×10⁻⁶) = 2×10⁶ Ω = 2 MΩ\n(Sensitivity = 1/Ifs = 20,000 Ω/V; 20,000 × 100 V = 2 MΩ)"
  },
  {
    id: 13, topic: "DC Generators", difficulty: "medium", points: 15,
    question: "A shunt generator delivers 100 A to the load at 230 V terminal voltage. The field current is 5 A and the armature resistance is 0.1 Ω. Find the generated emf (neglect brush drop).",
    choices: ["230.0 V", "240.0 V", "240.5 V", "241.0 V"], answer: 2,
    solution: "Ia = IL + If = 100 + 5 = 105 A\nEg = Vt + Ia·Ra = 230 + (105)(0.1) = 230 + 10.5 = 240.5 V"
  },
  {
    id: 14, topic: "DC Motors", difficulty: "medium", points: 15,
    question: "A shunt motor is connected to a 230 V supply and draws an armature current of 40 A. If Ra = 0.5 Ω, what is the mechanical power developed by the armature?",
    choices: ["8.4 kW", "9.2 kW", "8.0 kW", "20 kW"], answer: 0,
    solution: "Back emf Eb = V − Ia·Ra = 230 − (40)(0.5) = 210 V\nPd = Eb × Ia = 210 × 40 = 8400 W = 8.4 kW\n(9.2 kW is the electrical input to the armature, V × Ia)"
  },
  {
    id: 15, topic: "Alternators", difficulty: "easy", points: 10,
    question: "An 8-pole alternator generates 60 Hz. What is its synchronous speed?",
    choices: ["600 rpm", "900 rpm", "1200 rpm", "1800 rpm"], answer: 1,
    solution: "Ns = 120 f / P\nNs = 120 × 60 / 8 = 7200 / 8 = 900 rpm"
  },
  {
    id: 16, topic: "Transformers", difficulty: "medium", points: 15,
    question: "A 50 kVA, 2400/240 V single-phase transformer. What is the rated secondary current?",
    choices: ["20.8 A", "104.2 A", "208.3 A", "2083 A"], answer: 2,
    solution: "I2 = kVA × 1000 / V2 = 50,000 / 240 = 208.3 A\n(The primary current is 50,000/2400 = 20.8 A)"
  },
  {
    id: 17, topic: "Transformers", difficulty: "hard", points: 20,
    question: "A 10 kVA transformer has a core loss of 100 W and a copper loss of 150 W at full load. What is the full-load efficiency at unity power factor?",
    choices: ["95.0%", "96.6%", "97.6%", "98.5%"], answer: 2,
    solution: "Output = 10 kVA × 1.0 = 10,000 W\nTotal losses = 100 + 150 = 250 W\nInput = 10,000 + 250 = 10,250 W\nη = 10,000 / 10,250 = 0.9756 = 97.6%"
  },
  {
    id: 18, topic: "Induction Motors", difficulty: "medium", points: 15,
    question: "A 6-pole, 60 Hz induction motor runs at 1140 rpm. What is the slip?",
    choices: ["3%", "4%", "5%", "6%"], answer: 2,
    solution: "Ns = 120 f / P = 120 × 60 / 6 = 1200 rpm\ns = (Ns − N)/Ns = (1200 − 1140)/1200 = 60/1200 = 0.05 = 5%"
  },
  {
    id: 19, topic: "Synchronous Motors", difficulty: "easy", points: 10,
    // Hard mode (typed) version of this conceptual question:
    hardQuestion: "An over-excited synchronous motor operates at what kind of power factor (leading or lagging)?",
    accept: ["leading"], answerText: "Leading power factor",
    question: "Which statement about an over-excited synchronous motor is correct?",
    choices: [
      "It operates at a lagging power factor",
      "It operates at a leading power factor and can be used to correct the power factor of a system",
      "It runs below synchronous speed",
      "It cannot be started without a load"
    ], answer: 1,
    solution: "When the field is over-excited, the motor's back emf is large and the armature draws a leading current, so it acts like a capacitor to the supply. That is why synchronous condensers are used for power factor correction. A synchronous motor always runs at exactly synchronous speed."
  },
  {
    id: 20, topic: "Transmission Lines", difficulty: "medium", points: 15,
    question: "The receiving-end voltage of a line is 13.2 kV at no load and 12 kV at full load. What is the voltage regulation?",
    choices: ["9.1%", "10%", "11%", "1.2%"], answer: 1,
    solution: "VR = (VNL − VFL)/VFL × 100\nVR = (13.2 − 12)/12 × 100 = 1.2/12 × 100 = 10%\n(Dividing by the no-load voltage would wrongly give 9.1%.)"
  },
  {
    id: 21, topic: "Faults", difficulty: "hard", points: 20,
    question: "A generator rated 10 MVA has a total fault impedance of 0.2 per unit on its own base. What is the three-phase short-circuit MVA?",
    choices: ["2 MVA", "10 MVA", "50 MVA", "200 MVA"], answer: 2,
    solution: "Fault current (pu) = 1 / Zpu = 1 / 0.2 = 5 pu\nShort-circuit MVA = MVAbase × Ipu = 10 × 5 = 50 MVA\n(or MVAsc = MVAbase / Zpu = 10/0.2 = 50 MVA)"
  },
  {
    id: 22, topic: "Illumination", difficulty: "easy", points: 10,
    question: "A point source of 1000 cd hangs 4 m directly above a table. What is the illuminance on the table directly below it?",
    choices: ["62.5 lux", "250 lux", "1000 lux", "15.6 lux"], answer: 0,
    solution: "Inverse-square law: E = I / d²\nE = 1000 / 4² = 1000 / 16 = 62.5 lux"
  },
  {
    id: 23, topic: "Rectifiers & Converters", difficulty: "medium", points: 15,
    question: "A single-phase full-wave rectifier has a peak output voltage Vm = 170 V. What is the average (dc) output voltage?",
    choices: ["54.1 V", "108.2 V", "120.2 V", "170 V"], answer: 1,
    solution: "For a full-wave rectifier: Vdc = 2 Vm / π\nVdc = 2 × 170 / 3.1416 = 340 / 3.1416 ≈ 108.2 V\n(A half-wave rectifier would give Vm/π = 54.1 V.)"
  },
  {
    id: 24, topic: "Power Plants", difficulty: "hard", points: 20,
    question: "A hydroelectric plant has a net head of 50 m and a flow of 10 m³/s. If the overall efficiency is 80%, what is the electrical output?",
    choices: ["3.14 MW", "3.92 MW", "4.91 MW", "39.2 MW"], answer: 1,
    solution: "P = ρ g Q H η\nP = (1000)(9.81)(10)(50)(0.80)\nP = 4,905,000 × 0.80 = 3,924,000 W ≈ 3.92 MW"
  },
  {
    id: 25, topic: "Power Plants", difficulty: "medium", points: 15,
    question: "A 100 MW plant generates 438,000 MWh in a year (8760 hours). What is its capacity factor?",
    choices: ["25%", "50%", "75%", "100%"], answer: 1,
    solution: "Maximum possible energy = 100 MW × 8760 h = 876,000 MWh\nCapacity factor = actual / maximum = 438,000 / 876,000 = 0.50 = 50%"
  }
];

// ===== Additional practice problems (ids continue from 26) =====
(function () {
  const PTS = { easy: 10, medium: 15, hard: 20 };
  let nextId = Math.max(...window.QUESTIONS.map(q => q.id)) + 1;
  const Q = (topic, difficulty, question, choices, answer, solution) =>
    window.QUESTIONS.push({ id: nextId++, topic, difficulty, points: PTS[difficulty], question, choices, answer, solution });

  // ---------- DC Circuits ----------
  Q("DC Circuits", "easy", "A 24 V source is connected across an 8 Ω resistor. What is the current?",
    ["0.33 A", "3 A", "8 A", "192 A"], 1, "I = V/R = 24/8 = 3 A");
  Q("DC Circuits", "medium", "Resistors of 12 Ω and 6 Ω are connected in parallel across a 24 V source. What is the total current drawn?",
    ["2 A", "4 A", "6 A", "8 A"], 2, "I1 = 24/12 = 2 A\nI2 = 24/6 = 4 A\nIt = 2 + 4 = 6 A\n(Check: Req = 4 Ω, I = 24/4 = 6 A)");
  Q("DC Circuits", "medium", "A 100 V source is connected to 20 kΩ and 30 kΩ resistors in series. What is the voltage across the 30 kΩ resistor?",
    ["40 V", "50 V", "60 V", "75 V"], 2, "Voltage divider:\nV = 100 × 30k/(20k + 30k) = 100 × 0.6 = 60 V");
  Q("DC Circuits", "hard", "A 24 V source has an internal resistance of 4 Ω. A variable load is connected to it. What is the maximum power that can be delivered to the load?",
    ["18 W", "36 W", "72 W", "144 W"], 1, "Max power transfer occurs when RL = Rint = 4 Ω\nI = 24/(4 + 4) = 3 A\nP = I²RL = 3² × 4 = 36 W\n(Formula check: Pmax = V²/4R = 576/16 = 36 W)");

  // ---------- AC Circuits ----------
  Q("AC Circuits", "easy", "What is the period of a 60 Hz sine wave?",
    ["8.33 ms", "16.67 ms", "33.3 ms", "60 ms"], 1, "T = 1/f = 1/60 = 0.01667 s = 16.67 ms");
  Q("AC Circuits", "easy", "A sinusoidal voltage has a peak value of 170 V. What is its RMS value?",
    ["85 V", "120 V", "170 V", "240 V"], 1, "Vrms = Vm/√2 = 170/1.414 ≈ 120 V");
  Q("AC Circuits", "medium", "What is the capacitive reactance of a 100 µF capacitor at 60 Hz?",
    ["2.65 Ω", "26.5 Ω", "37.7 Ω", "265 Ω"], 1, "XC = 1/(2πfC)\nXC = 1/(2π × 60 × 100×10⁻⁶) = 1/0.0377 ≈ 26.5 Ω");
  Q("AC Circuits", "medium", "A load draws 8 kW and 10 kVA. What is its power factor?",
    ["0.6", "0.7", "0.8", "1.25"], 2, "pf = P/S = 8/10 = 0.8");
  Q("AC Circuits", "hard", "A series RLC circuit has R = 12 Ω, XL = 30 Ω and XC = 14 Ω, connected to 120 V. What is the current?",
    ["4 A", "6 A", "8.6 A", "10 A"], 1, "X = XL − XC = 30 − 14 = 16 Ω\nZ = √(12² + 16²) = √400 = 20 Ω\nI = 120/20 = 6 A");

  // ---------- Electrostatics ----------
  Q("Electrostatics", "easy", "Two point charges of 2 µC and 4 µC are 0.2 m apart in air. What is the force between them? (k = 9×10⁹)",
    ["0.36 N", "1.8 N", "3.6 N", "18 N"], 1, "F = kq1q2/r²\nF = (9×10⁹)(2×10⁻⁶)(4×10⁻⁶)/(0.2)²\nF = 0.072/0.04 = 1.8 N");
  Q("Electrostatics", "easy", "A 4 µF and a 6 µF capacitor are connected in parallel. What is the equivalent capacitance?",
    ["2.4 µF", "5 µF", "10 µF", "24 µF"], 2, "Parallel capacitors add:\nCeq = 4 + 6 = 10 µF");
  Q("Electrostatics", "medium", "A 4 µF and a 6 µF capacitor are connected in series. What is the equivalent capacitance?",
    ["2.4 µF", "5 µF", "10 µF", "24 µF"], 0, "Ceq = (C1 × C2)/(C1 + C2)\nCeq = (4 × 6)/(4 + 6) = 24/10 = 2.4 µF");
  Q("Electrostatics", "medium", "How much energy is stored in a 50 µF capacitor charged to 300 V?",
    ["1.125 J", "2.25 J", "4.5 J", "15 J"], 1, "W = ½CV²\nW = ½ × 50×10⁻⁶ × 300² = ½ × 50×10⁻⁶ × 90,000 = 2.25 J");
  Q("Electrostatics", "medium", "A parallel-plate air capacitor has plate area 0.01 m² and spacing 1 mm. What is its capacitance? (ε0 = 8.854×10⁻¹² F/m)",
    ["8.85 pF", "88.5 pF", "885 pF", "8.85 nF"], 1, "C = ε0A/d\nC = (8.854×10⁻¹²)(0.01)/(1×10⁻³) = 8.854×10⁻¹¹ F ≈ 88.5 pF");

  // ---------- Electromagnetic Induction ----------
  Q("Electromagnetic Induction", "easy", "A coil of 200 turns has its flux change by 0.5 mWb in 0.1 s. What is the average induced emf?",
    ["0.1 V", "1 V", "10 V", "100 V"], 1, "e = N ΔΦ/Δt\ne = 200 × (0.5×10⁻³)/0.1 = 200 × 0.005 = 1 V");
  Q("Electromagnetic Induction", "easy", "According to Lenz's law, the induced emf is in a direction such that it:",
    ["aids the change that produces it", "opposes the change that produces it", "is always clockwise", "depends only on the coil resistance"], 1,
    "Lenz's law: the induced emf (and current) opposes the change in flux that produced it. This is the reason for the negative sign in Faraday's law.");
  Q("Electromagnetic Induction", "medium", "A 0.4 m conductor moves at 10 m/s perpendicular to a uniform field of 0.5 T. What emf is induced?",
    ["0.2 V", "2 V", "5 V", "20 V"], 1, "e = B l v = 0.5 × 0.4 × 10 = 2 V");
  Q("Electromagnetic Induction", "medium", "An inductor of 2 H carries a current of 3 A. How much energy is stored in its magnetic field?",
    ["6 J", "9 J", "18 J", "3 J"], 1, "W = ½LI² = ½ × 2 × 3² = 9 J");
  Q("Electromagnetic Induction", "medium", "Two coils have L1 = 4 H, L2 = 9 H and a coupling coefficient k = 0.5. What is their mutual inductance?",
    ["1.5 H", "3 H", "6 H", "18 H"], 1, "M = k√(L1L2) = 0.5 × √(4 × 9) = 0.5 × 6 = 3 H");
  Q("Electromagnetic Induction", "hard", "The current in a 50 mH inductor changes uniformly from 2 A to 6 A in 0.1 s. What is the average induced emf?",
    ["0.4 V", "2 V", "4 V", "20 V"], 1, "e = L ΔI/Δt = 0.05 × (6 − 2)/0.1 = 0.05 × 40 = 2 V");

  // ---------- Magnetic Circuits ----------
  Q("Magnetic Circuits", "easy", "A coil has 500 turns and carries 2 A. What is the magnetomotive force (mmf)?",
    ["250 AT", "1000 AT", "1002 AT", "2500 AT"], 1, "mmf = N × I = 500 × 2 = 1000 ampere-turns");
  Q("Magnetic Circuits", "easy", "A flux of 0.002 Wb passes through a core of cross-section 0.004 m². What is the flux density?",
    ["0.5 T", "2 T", "8 T", "0.008 T"], 0, "B = Φ/A = 0.002/0.004 = 0.5 T");
  Q("Magnetic Circuits", "medium", "A core has length 0.5 m, cross-section 0.001 m² and relative permeability 1000. What is its reluctance? (μ0 = 4π×10⁻⁷)",
    ["3.98×10⁵ AT/Wb", "3.98×10⁶ AT/Wb", "1.26×10⁻³ AT/Wb", "2.5×10⁵ AT/Wb"], 0, "S = l/(μ0 μr A)\nS = 0.5/(4π×10⁻⁷ × 1000 × 0.001) = 0.5/1.2566×10⁻⁶ ≈ 3.98×10⁵ AT/Wb");
  Q("Magnetic Circuits", "medium", "A 400-turn coil carries 1.5 A around a core path 0.3 m long. What is H?",
    ["200 AT/m", "600 AT/m", "2000 AT/m", "5000 AT/m"], 2, "H = NI/l = (400 × 1.5)/0.3 = 600/0.3 = 2000 AT/m");
  Q("Magnetic Circuits", "medium", "Eddy-current loss in a magnetic core varies approximately as which power of frequency?",
    ["f", "f²", "f³", "1/f"], 1, "Eddy-current loss ∝ Bm² f² t² (t = lamination thickness).\nHysteresis loss, in contrast, varies linearly with f.");
  Q("Magnetic Circuits", "hard", "An air gap of 2 mm must carry a flux density of 1 T. Neglecting the iron's reluctance, what mmf is needed for the gap? (μ0 = 4π×10⁻⁷)",
    ["796 AT", "1592 AT", "3183 AT", "6366 AT"], 1, "H = B/μ0 = 1/(4π×10⁻⁷) ≈ 795,775 AT/m\nmmf = H × lg = 795,775 × 0.002 ≈ 1592 AT");

  // ---------- Instrumentation ----------
  Q("Instrumentation", "easy", "How is an ammeter connected in a circuit, and what should its resistance be?",
    ["In series; very low", "In series; very high", "In parallel; very low", "In parallel; very high"], 0, "An ammeter carries the circuit current, so it goes in series and must have very low resistance so it does not disturb the circuit.");
  Q("Instrumentation", "easy", "An ideal voltmeter has ___ internal resistance and is connected ___ with the component.",
    ["infinite; in parallel", "zero; in parallel", "infinite; in series", "zero; in series"], 0, "A voltmeter measures potential difference across a component, so it is placed in parallel with very high (ideally infinite) resistance to draw negligible current.");
  Q("Instrumentation", "medium", "A 1 mA, 50 Ω meter movement is to read 10 mA full scale. What shunt resistance is needed?",
    ["0.5 Ω", "5.56 Ω", "50 Ω", "450 Ω"], 1, "Ish = 10 − 1 = 9 mA\nRsh = Im Rm / Ish = (1 × 50)/9 = 5.56 Ω");
  Q("Instrumentation", "medium", "A 1 mA, 50 Ω meter movement is to be a 10 V full-scale voltmeter. What series multiplier resistance is needed?",
    ["9.95 kΩ", "10 kΩ", "50 kΩ", "100 Ω"], 0, "Rtotal = V/Im = 10/0.001 = 10,000 Ω\nRs = Rtotal − Rm = 10,000 − 50 = 9,950 Ω = 9.95 kΩ");
  Q("Instrumentation", "hard", "Two wattmeters measure a balanced three-phase load and read 4 kW and 2 kW (both positive). What is the power factor?",
    ["0.5", "0.707", "0.866", "0.95"], 2, "tan φ = √3 (W1 − W2)/(W1 + W2) = √3 × 2/6 = 0.577\nφ = 30°\npf = cos 30° = 0.866\n(Total power = 6 kW)");

  // ---------- DC Generators ----------
  Q("DC Generators", "easy", "How many parallel paths does a lap-wound armature have in a 4-pole machine?",
    ["2", "4", "6", "8"], 1, "For lap winding, A = P (number of parallel paths equals number of poles). For wave winding, A = 2 always.");
  Q("DC Generators", "easy", "A 4-pole lap-wound generator has Z = 400 conductors, flux 0.02 Wb per pole and runs at 1000 rpm. What is the generated emf?",
    ["100 V", "133.3 V", "266.7 V", "400 V"], 1, "E = PΦZN/(60A), with A = P = 4 for lap\nE = (4 × 0.02 × 400 × 1000)/(60 × 4) = 32,000/240 = 133.3 V");
  Q("DC Generators", "medium", "The same machine (4 poles, Z = 400, Φ = 0.02 Wb, 1000 rpm) is rewound as wave-wound. What is the emf now?",
    ["133.3 V", "200 V", "266.7 V", "533 V"], 2, "Wave winding: A = 2\nE = (4 × 0.02 × 400 × 1000)/(60 × 2) = 32,000/120 = 266.7 V");
  Q("DC Generators", "medium", "A shunt generator has a terminal voltage of 230 V, load current 50 A, field current 2 A and Ra = 0.1 Ω. What is the generated emf?",
    ["230 V", "232 V", "235.2 V", "240 V"], 2, "Ia = IL + If = 50 + 2 = 52 A\nE = Vt + IaRa = 230 + 52 × 0.1 = 235.2 V");
  Q("DC Generators", "medium", "A DC generator delivers 10 kW and its total losses are 1 kW. What is its efficiency?",
    ["88%", "90.9%", "91.5%", "95%"], 1, "Input = output + losses = 10 + 1 = 11 kW\nη = 10/11 = 0.909 = 90.9%");
  Q("DC Generators", "hard", "Because of armature reaction in a DC generator, the magnetic neutral axis shifts:",
    ["against the direction of rotation", "in the direction of rotation", "not at all", "only if interpoles are fitted"], 1,
    "In a generator the neutral axis shifts in the direction of armature rotation (in a motor, it shifts against rotation). Armature reaction is cross-magnetizing and also slightly demagnetizing.");

  // ---------- DC Motors ----------
  Q("DC Motors", "easy", "A DC motor on a 240 V supply draws 20 A armature current and Ra = 0.5 Ω. What is the back emf?",
    ["220 V", "230 V", "240 V", "250 V"], 1, "Eb = V − IaRa = 240 − 20 × 0.5 = 230 V");
  Q("DC Motors", "medium", "The motor above (Eb = 230 V, Ia = 20 A) runs at 1000 rpm. What is the armature torque?",
    ["21.9 N·m", "43.9 N·m", "46 N·m", "92 N·m"], 1, "P = Eb Ia = 230 × 20 = 4600 W\nω = 2π × 1000/60 = 104.72 rad/s\nT = P/ω = 4600/104.72 ≈ 43.9 N·m");
  Q("DC Motors", "medium", "Weakening the field flux of a DC shunt motor (adding resistance in the field circuit) causes its speed to:",
    ["decrease", "increase", "stay the same", "drop to zero"], 1, "N ∝ Eb/Φ. With Eb nearly constant, a smaller flux Φ makes the speed rise.");
  Q("DC Motors", "medium", "A 240 V DC motor has Ra = 0.5 Ω. What would the starting armature current be without a starter?",
    ["20 A", "48 A", "240 A", "480 A"], 3, "At start, Eb = 0\nIa = V/Ra = 240/0.5 = 480 A\nThis is dangerously high, which is why a starter is used.");
  Q("DC Motors", "medium", "Why should a DC series motor never be started with no load?",
    ["Its field current is too high", "The speed rises dangerously because the flux is very small", "It draws no starting current", "The brushes would stick"], 1,
    "In a series motor, flux ∝ armature current. At no load the current and flux are very small, so N ∝ 1/Φ rises to a destructive speed (racing).");
  Q("DC Motors", "hard", "A 220 V shunt motor (Ra = 0.4 Ω) runs at 1000 rpm with Ia = 25 A. The load increases until Ia = 40 A at constant flux. What is the new speed?",
    ["944 rpm", "971 rpm", "1000 rpm", "1030 rpm"], 1, "Eb1 = 220 − 25 × 0.4 = 210 V\nEb2 = 220 − 40 × 0.4 = 204 V\nN2 = N1 × Eb2/Eb1 = 1000 × 204/210 ≈ 971 rpm");

  // ---------- Alternators ----------
  Q("Alternators", "easy", "What frequency does a 4-pole alternator generate at 1800 rpm?",
    ["30 Hz", "50 Hz", "60 Hz", "120 Hz"], 2, "f = PN/120 = (4 × 1800)/120 = 60 Hz");
  Q("Alternators", "easy", "At what speed must a 6-pole alternator run to generate 50 Hz?",
    ["500 rpm", "750 rpm", "1000 rpm", "1500 rpm"], 2, "N = 120f/P = (120 × 50)/6 = 1000 rpm");
  Q("Alternators", "medium", "An alternator has a no-load terminal voltage of 460 V and a full-load voltage of 400 V. What is its voltage regulation?",
    ["12%", "13%", "15%", "18%"], 2, "VR = (E − V)/V × 100 = (460 − 400)/400 × 100 = 15%");
  Q("Alternators", "medium", "A Y-connected alternator has a line voltage of 400 V. What is the phase voltage?",
    ["133 V", "231 V", "400 V", "693 V"], 1, "For Y connection, VL = √3 Vph\nVph = 400/1.732 ≈ 231 V");
  Q("Alternators", "medium", "A three-phase alternator delivers 200 A at 11 kV line voltage. What is its kVA output?",
    ["2.2 MVA", "3.81 MVA", "6.6 MVA", "11 MVA"], 1, "S = √3 VL IL = 1.732 × 11,000 × 200 ≈ 3.81 MVA");
  Q("Alternators", "hard", "A coil is short-pitched by 30 electrical degrees. What is the pitch factor?",
    ["0.866", "0.966", "0.985", "1.0"], 1, "Pitch factor kp = cos(α/2) where α is the short-pitch angle\nkp = cos(15°) = 0.966");

  // ---------- Transformers ----------
  Q("Transformers", "easy", "A 2400/240 V transformer has 1200 turns on the primary. How many turns does the secondary have?",
    ["60", "120", "1200", "12,000"], 1, "N2/N1 = V2/V1\nN2 = 1200 × 240/2400 = 120 turns");
  Q("Transformers", "easy", "A 10 kVA, 2300/230 V transformer. What is the rated secondary current?",
    ["4.35 A", "10 A", "43.5 A", "435 A"], 2, "I2 = S/V2 = 10,000/230 = 43.5 A");
  Q("Transformers", "medium", "A transformer delivers 50 kW to its load, with a core loss of 0.5 kW and a copper loss of 1 kW. What is its efficiency?",
    ["96.2%", "97.1%", "98.0%", "99.0%"], 1, "Input = 50 + 0.5 + 1 = 51.5 kW\nη = 50/51.5 = 0.9709 = 97.1%");
  Q("Transformers", "medium", "A transformer operates at maximum efficiency when:",
    ["copper loss equals iron (core) loss", "the load is zero", "copper loss is zero", "the power factor is zero"], 0, "Maximum efficiency occurs when the variable loss (copper, ∝ I²) equals the constant loss (iron).");
  Q("Transformers", "medium", "The open-circuit test of a transformer is mainly used to determine:",
    ["copper loss and equivalent impedance", "core loss and no-load parameters", "efficiency at overload", "insulation resistance"], 1, "At rated voltage with the secondary open, the input power is essentially the core (iron) loss, and the test gives the magnetizing branch parameters.");
  Q("Transformers", "hard", "A 10:1 step-down transformer has a 2 Ω load on its secondary. What is this load's impedance as seen from the primary?",
    ["0.02 Ω", "20 Ω", "200 Ω", "2000 Ω"], 2, "Z' = a² Z = 10² × 2 = 200 Ω");

  // ---------- Induction Motors ----------
  Q("Induction Motors", "easy", "What is the synchronous speed of a 4-pole, 60 Hz induction motor?",
    ["900 rpm", "1200 rpm", "1800 rpm", "3600 rpm"], 2, "Ns = 120f/P = (120 × 60)/4 = 1800 rpm");
  Q("Induction Motors", "easy", "An induction motor has Ns = 1500 rpm and runs at 1440 rpm. What is the slip?",
    ["2%", "4%", "6%", "10%"], 1, "s = (Ns − N)/Ns = (1500 − 1440)/1500 = 0.04 = 4%");
  Q("Induction Motors", "medium", "A 50 Hz induction motor runs at 4% slip. What is the rotor current frequency?",
    ["1 Hz", "2 Hz", "4 Hz", "50 Hz"], 1, "fr = s × f = 0.04 × 50 = 2 Hz");
  Q("Induction Motors", "medium", "A 4-pole, 50 Hz induction motor runs at 3% slip. What is its rotor speed?",
    ["1455 rpm", "1485 rpm", "1500 rpm", "1545 rpm"], 0, "Ns = 120 × 50/4 = 1500 rpm\nN = Ns(1 − s) = 1500 × 0.97 = 1455 rpm");
  Q("Induction Motors", "medium", "The air-gap power of an induction motor is 10 kW at a slip of 0.03. What is the rotor copper loss?",
    ["30 W", "300 W", "3 kW", "9.7 kW"], 1, "Rotor copper loss = s × Pag = 0.03 × 10,000 = 300 W\n(Mechanical power developed = (1 − s)Pag = 9.7 kW)");
  Q("Induction Motors", "hard", "If the stator voltage of an induction motor at starting is reduced to 50% of rated, the starting torque becomes what fraction of its full-voltage value?",
    ["50%", "25%", "70.7%", "12.5%"], 1, "Torque ∝ V²\nT' = (0.5)² T = 0.25 T = 25%");

  // ---------- Synchronous Motors ----------
  Q("Synchronous Motors", "easy", "Is a synchronous motor inherently self-starting?",
    ["Yes, at any load", "No, it needs a starting method such as damper windings", "Yes, but only when over-excited", "Only when supplied with DC"], 1,
    "A synchronous motor produces no average torque at standstill. It must be brought near synchronous speed first (e.g. by damper windings as an induction motor, or a pony motor).");
  Q("Synchronous Motors", "medium", "An over-excited synchronous motor operates at what power factor?",
    ["Lagging", "Unity only", "Leading", "Zero"], 2, "Over-excitation (E > V) makes the motor draw leading current, acting like a capacitor to the supply.");
  Q("Synchronous Motors", "medium", "A synchronous condenser is:",
    ["an over-excited synchronous motor running without mechanical load to supply reactive power", "an induction generator", "a bank of DC capacitors", "a transformer with a tap changer"], 0,
    "It is used for power-factor correction and voltage support on transmission systems.");
  Q("Synchronous Motors", "medium", "At what speed does an 8-pole synchronous motor run on a 60 Hz supply?",
    ["600 rpm", "900 rpm", "1200 rpm", "1800 rpm"], 1, "Ns = 120f/P = (120 × 60)/8 = 900 rpm");
  Q("Synchronous Motors", "medium", "Hunting in a synchronous motor refers to:",
    ["oscillation of the rotor about its synchronous position", "loss of residual magnetism", "overheating of the damper bars", "a sudden speed rise above synchronous speed"], 0,
    "Sudden load or supply changes cause the rotor to swing about its steady-state load angle. Damper windings help suppress it.");
  Q("Synchronous Motors", "hard", "A synchronous motor has per-phase V = 230 V, E = 300 V, Xs = 5 Ω (Ra neglected), and load angle δ = 30°. What is the power developed per phase?",
    ["3450 W", "6900 W", "13,800 W", "20,700 W"], 1, "P = (V E/Xs) sin δ\nP = (230 × 300/5) × sin 30° = 13,800 × 0.5 = 6900 W per phase");

  // ---------- Transmission Lines ----------
  Q("Transmission Lines", "easy", "The skin effect in a conductor carrying AC means that:",
    ["current crowds toward the conductor surface, raising the effective AC resistance", "current flows only through the center", "voltage drop disappears", "DC resistance increases"], 0, "At higher frequency or larger conductor size, current density is greatest near the surface, so effective resistance is higher than the DC value.");
  Q("Transmission Lines", "medium", "A 10 MW, unity-power-factor load is supplied by a three-phase 33 kV line. What is the line current?",
    ["100 A", "175 A", "303 A", "525 A"], 1, "I = P/(√3 VL pf) = 10×10⁶/(1.732 × 33,000 × 1) ≈ 175 A");
  Q("Transmission Lines", "medium", "A line has a no-load receiving-end voltage of 33 kV and a full-load receiving-end voltage of 30 kV. What is its voltage regulation?",
    ["9.1%", "10%", "11%", "13%"], 1, "VR = (VNL − VFL)/VFL × 100 = (33 − 30)/30 × 100 = 10%");
  Q("Transmission Lines", "medium", "Why is power transmitted at high voltage?",
    ["For the same power, the current and I²R loss are reduced", "It increases the line current", "It makes insulation unnecessary", "It raises the system frequency"], 0, "P = √3 V I pf. Higher V means lower I for the same power, so I²R losses and voltage drop fall.");
  Q("Transmission Lines", "medium", "A conductor weighs 1.5 kg/m, the span is 200 m (level supports) and the tension is 2000 kg. What is the sag?",
    ["1.5 m", "3.75 m", "7.5 m", "15 m"], 1, "S = wL²/(8T) = (1.5 × 200²)/(8 × 2000) = 60,000/16,000 = 3.75 m");
  Q("Transmission Lines", "hard", "The Ferranti effect refers to:",
    ["the receiving-end voltage rising above the sending-end voltage on a lightly loaded long line", "voltage dropping at the receiving end under heavy load", "corona discharge at high voltage", "current crowding at the conductor surface"], 0, "Line charging current flowing through the line inductance raises the receiving-end voltage at no load or light load.");

  // ---------- Faults ----------
  Q("Faults", "easy", "Which type of fault occurs most frequently on overhead transmission lines?",
    ["Three-phase", "Line-to-line", "Single line-to-ground", "Double line-to-ground"], 2, "Roughly 70–80% of transmission-line faults are single line-to-ground faults (e.g. from lightning or contact with trees).");
  Q("Faults", "easy", "On a 100 MVA base, what is a 50 MVA quantity in per unit?",
    ["0.2 pu", "0.5 pu", "2 pu", "50 pu"], 1, "pu = actual/base = 50/100 = 0.5 pu");
  Q("Faults", "medium", "A bus has a three-phase short-circuit capacity of 500 MVA at 11 kV. What is the fault current?",
    ["15.1 kA", "26.2 kA", "45.5 kA", "500 A"], 1, "I = S/(√3 V) = 500×10⁶/(1.732 × 11,000) ≈ 26,240 A ≈ 26.2 kA");
  Q("Faults", "medium", "The Thevenin reactance at a bus is 0.05 pu on a 100 MVA base. What is the short-circuit MVA?",
    ["500 MVA", "1000 MVA", "2000 MVA", "5000 MVA"], 2, "Isc = 1/X = 20 pu\nMVAsc = base MVA/X = 100/0.05 = 2000 MVA");
  Q("Faults", "medium", "Which type of fault is symmetrical, involving only positive-sequence current?",
    ["Single line-to-ground", "Line-to-line", "Double line-to-ground", "Three-phase fault"], 3, "A three-phase fault is balanced, so it has no negative- or zero-sequence components. All other common faults are unsymmetrical.");
  Q("Faults", "hard", "A generator reactance is 0.1 pu on a 50 MVA base. What is it on a 100 MVA base at the same voltage?",
    ["0.05 pu", "0.1 pu", "0.2 pu", "0.4 pu"], 2, "Xnew = Xold × (MVAnew/MVAold) = 0.1 × 100/50 = 0.2 pu");

  // ---------- Illumination ----------
  Q("Illumination", "easy", "What is the SI unit of luminous flux?",
    ["Candela", "Lux", "Lumen", "Lambert"], 2, "Luminous flux is measured in lumens (lm). Candela is luminous intensity and lux is illuminance (lm/m²).");
  Q("Illumination", "easy", "One lux is equal to:",
    ["1 lumen per square metre", "1 candela per square metre", "1 lumen per candela", "1 watt per square metre"], 0, "Illuminance: 1 lux = 1 lm/m²");
  Q("Illumination", "medium", "A total flux of 4800 lm falls uniformly on a surface of 12 m². What is the illuminance?",
    ["200 lux", "400 lux", "800 lux", "1600 lux"], 1, "E = Φ/A = 4800/12 = 400 lux");
  Q("Illumination", "medium", "A 500 cd point source is 2.5 m directly above a surface. What is the illuminance directly below it?",
    ["50 lux", "80 lux", "200 lux", "1250 lux"], 1, "Inverse-square law: E = I/d² = 500/2.5² = 500/6.25 = 80 lux");
  Q("Illumination", "medium", "A 20 m² room needs 300 lux. If the combined utilization × maintenance factor is 0.5, what total lamp flux is required?",
    ["3000 lm", "6000 lm", "12,000 lm", "24,000 lm"], 2, "Φ = E × A/(UF × MF) = (300 × 20)/0.5 = 12,000 lm");
  Q("Illumination", "hard", "A 800 cd source hangs 3 m above a floor. What is the illuminance on the floor at a point 4 m horizontally from the point directly beneath it?",
    ["12.8 lux", "19.2 lux", "32 lux", "64 lux"], 1, "Distance d = √(3² + 4²) = 5 m\ncos θ = h/d = 3/5 = 0.6\nE = I cos θ/d² = 800 × 0.6/25 = 19.2 lux");

  // ---------- Rectifiers & Converters ----------
  Q("Rectifiers & Converters", "easy", "A single-phase half-wave rectifier has Vm = 100 V. What is the average output voltage?",
    ["31.8 V", "50 V", "63.7 V", "70.7 V"], 0, "Vdc = Vm/π = 100/3.1416 = 31.8 V");
  Q("Rectifiers & Converters", "easy", "A single-phase full-wave rectifier has Vm = 100 V. What is the average output voltage?",
    ["31.8 V", "63.7 V", "70.7 V", "100 V"], 1, "Vdc = 2Vm/π = 200/3.1416 = 63.7 V");
  Q("Rectifiers & Converters", "medium", "What is the output ripple frequency of a single-phase full-wave rectifier on a 60 Hz supply?",
    ["60 Hz", "120 Hz", "180 Hz", "360 Hz"], 1, "A full-wave rectifier produces two pulses per input cycle, so f ripple = 2 × 60 = 120 Hz.");
  Q("Rectifiers & Converters", "medium", "A buck converter has Vin = 48 V and a duty cycle D = 0.25. What is the output voltage (ideal, continuous conduction)?",
    ["12 V", "24 V", "36 V", "192 V"], 0, "Vo = D × Vin = 0.25 × 48 = 12 V");
  Q("Rectifiers & Converters", "medium", "A boost converter has Vin = 12 V and D = 0.5. What is the output voltage (ideal)?",
    ["6 V", "12 V", "24 V", "36 V"], 2, "Vo = Vin/(1 − D) = 12/0.5 = 24 V");
  Q("Rectifiers & Converters", "hard", "A three-phase six-pulse diode bridge rectifier is fed from a 400 V line-to-line supply. What is the approximate average dc output voltage?",
    ["400 V", "510 V", "540 V", "565 V"], 2, "Vdc = (3√2/π) VLL ≈ 1.35 × 400 = 540 V\n(565 V is the peak line voltage, 400√2)");

  // ---------- Power Plants ----------
  Q("Power Plants", "easy", "A plant has an average load of 60 MW and a peak load of 100 MW. What is its load factor?",
    ["0.4", "0.6", "1.0", "1.67"], 1, "Load factor = average load/peak load = 60/100 = 0.6");
  Q("Power Plants", "easy", "A consumer has a connected load of 50 kW and a maximum demand of 30 kW. What is the demand factor?",
    ["0.4", "0.6", "1.2", "1.67"], 1, "Demand factor = maximum demand/connected load = 30/50 = 0.6");
  Q("Power Plants", "medium", "The diversity factor of a group of consumers is always:",
    ["less than 1", "equal to 1", "equal to or greater than 1", "negative"], 2, "Diversity factor = sum of individual maximum demands / maximum demand of the group. Because individual peaks do not coincide, it is ≥ 1.");
  Q("Power Plants", "medium", "A hydro plant has a head of 40 m and flow of 20 m³/s with an overall efficiency of 85%. What is its electrical output?",
    ["4.41 MW", "6.67 MW", "7.85 MW", "66.7 MW"], 1, "P = ρ g Q H η = 1000 × 9.81 × 20 × 40 × 0.85 = 6,670,800 W ≈ 6.67 MW");
  Q("Power Plants", "medium", "A thermal plant burns 1 kg of coal (25 MJ/kg) for each kWh generated. What is its overall efficiency?",
    ["14.4%", "25%", "36%", "50%"], 0, "1 kWh = 3.6 MJ\nη = 3.6/25 = 0.144 = 14.4%");
  Q("Power Plants", "medium", "Which material is commonly used for control rods in a nuclear reactor?",
    ["Cadmium or boron", "Graphite", "Heavy water", "Uranium-238"], 0, "Cadmium and boron absorb neutrons strongly, so inserting the rods lowers the reaction rate. Graphite and heavy water act as moderators.");
})();
