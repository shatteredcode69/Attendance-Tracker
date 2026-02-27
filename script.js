// const PASS_PERCENT = 75;

// let subjects = JSON.parse(localStorage.getItem("attendanceData")) || [
//   createSubject("Parallel & Distributed Computing", 16, true),
//   createSubject("Web Development", 16, true),
//   createSubject("Mobile App Development", 16, true),
//   createSubject("Graph Theory", 32, false),
//   createSubject("Psychology", 16, false),
//   createSubject("Technical & Business Writing", 16, false),
// ];

// function createSubject(name, total, hasLab) {
//   return {
//     name,
//     hasLab,
//     theory: createSection(total),
//     lab: hasLab ? createSection(total) : null,
//   };
// }

// function createSection(total) {
//   return {
//     total,
//     conducted: 0,
//     present: 0,
//     streak: 0,
//     history: []
//   };
// }

// function save() {
//   localStorage.setItem("attendanceData", JSON.stringify(subjects));
// }

// function mark(index, type, isPresent) {
//   const s = subjects[index][type];
//   if (s.conducted >= s.total) return;

//   s.conducted++;
//   s.history.push(isPresent);

//   if (isPresent) {
//     s.present++;
//     s.streak++;
//   } else {
//     s.streak = 0;
//   }

//   save();
//   render();
// }

// function undo(index, type) {
//   const s = subjects[index][type];
//   if (s.history.length === 0) return;

//   const last = s.history.pop();
//   s.conducted--;
//   if (last) s.present--;
//   s.streak = 0;

//   save();
//   render();
// }

// function percent(s) {
//   return s.conducted === 0 ? 0 :
//     ((s.present / s.conducted) * 100);
// }

// function missRemaining(s) {
//   return Math.floor(s.total * 0.25) -
//     (s.conducted - s.present);
// }

// function recoveryNeeded(s) {
//   let p = s.present;
//   let c = s.conducted;
//   let needed = 0;

//   while (((p + needed) / (c + needed)) * 100 < PASS_PERCENT) {
//     needed++;
//   }
//   return needed;
// }

// function simulate(index, type) {
//   const s = subjects[index][type];
//   const needed = recoveryNeeded(s);

//   alert(
//     needed === 0
//       ? "You are already safe."
//       : `You need ${needed} consecutive presents to reach 75%.`
//   );
// }

// function renderSection(s, i, type) {
//   const p = percent(s).toFixed(1);
//   const riskColor =
//     p >= 75 ? "#00e676" :
//     p >= 70 ? "#ffab00" :
//     "#ff1744";

//   return `
//   <div class="section">
//     <strong>${type.toUpperCase()}</strong>

//     <div class="progress-bar">
//       <div class="progress" style="width:${p}%;background:${riskColor}"></div>
//     </div>

//     <div class="stats-row">
//       <span>${p}%</span>
//       <span>${s.present}/${s.conducted}/${s.total}</span>
//     </div>

//     <div class="stats-row">
//       <span>🎯 Miss Left: ${missRemaining(s)}</span>
//       <span>🔥 Streak: ${s.streak}</span>
//     </div>

//     <div class="stats-row">
//       <span>🛡 Recovery: ${recoveryNeeded(s)}</span>
//     </div>

//     <button class="present" onclick="mark(${i}, '${type}', true)">Present</button>
//     <button class="absent" onclick="mark(${i}, '${type}', false)">Absent</button>
//     <button class="undo" onclick="undo(${i}, '${type}')">Undo</button>
//     <button class="simulate" onclick="simulate(${i}, '${type}')">Simulate</button>
//   </div>
//   `;
// }

// function generateRanking() {
//   const list = document.getElementById("rankingList");
//   list.innerHTML = "";

//   let ranking = [];

//   subjects.forEach(sub => {

//     // Theory Ranking Entry
//     ranking.push({
//       name: sub.name + " (Theory)",
//       percent: percent(sub.theory)
//     });

//     // Lab Ranking Entry (if exists)
//     if (sub.hasLab) {
//       ranking.push({
//         name: sub.name + " (Lab)",
//         percent: percent(sub.lab)
//       });
//     }

//   });

//   // Sort descending
//   ranking.sort((a, b) => b.percent - a.percent);

// ranking.forEach((item, index) => {

//   let color =
//     item.percent >= 75 ? "#00e676" :
//     item.percent >= 70 ? "#ffab00" :
//     "#ff1744";

//   list.innerHTML += `
//     <li style="color:${color}">
//       ${index === 0 ? "👑" : ""}
//       ${item.name} – ${item.percent.toFixed(1)}%
//     </li>
//   `;
// });
// }

// let previousStatus = {};

// function examEligibility() {
//   const div = document.getElementById("examStatus");
//   const alertDiv = document.getElementById("riskAlert");
//   const scoreDiv = document.getElementById("semesterScore");

//   div.innerHTML = "";
//   alertDiv.innerHTML = "";

//   let totalPercentSum = 0;
//   let totalSections = 0;
//   let highRiskSubjects = [];

//   subjects.forEach(sub => {

//     function getLevel(p) {
//       if (p >= 75) return "safe";
//       if (p >= 70) return "warning";
//       return "danger";
//     }

//     function trendArrow(key, currentPercent) {
//       let arrow = "";
//       if (previousStatus[key] !== undefined) {
//         if (currentPercent > previousStatus[key]) arrow = " ↑";
//         else if (currentPercent < previousStatus[key]) arrow = " ↓";
//       }
//       previousStatus[key] = currentPercent;
//       return arrow;
//     }

//     function renderSection(typeName, section) {

//       let p = percent(section);
//       let level = getLevel(p);
//       let recovery = recoveryNeeded(section);
//       let key = sub.name + typeName;

//       totalPercentSum += p;
//       totalSections++;

//       if (p < 70) highRiskSubjects.push(`${sub.name} (${typeName})`);

//       div.innerHTML += `
//         <div class="exam-card ${level} glow-${level}">
//           <div style="font-weight:bold;">
//             ${sub.name} — ${typeName}
//           </div>

//           <div style="display:flex;justify-content:space-between;">
//             <span>${p.toFixed(1)}%${trendArrow(key, p)}</span>
//             <span class="badge ${level}">
//               ${p >= 75 ? "Eligible" : "Not Eligible"}
//             </span>
//           </div>

//           <div class="mini-progress">
//             <div class="mini-bar"
//               style="width:${p}%;
//               background:${level === "safe" ? "#00e676" :
//                           level === "warning" ? "#ffab00" :
//                           "#ff1744"}">
//             </div>
//           </div>

//           ${
//             p < 75
//               ? `<div style="font-size:11px;margin-top:4px;">
//                   Needs ${recovery} consecutive presents
//                 </div>`
//               : ""
//           }
//         </div>
//       `;
//     }

//     renderSection("Theory", sub.theory);

//     if (sub.hasLab) {
//       renderSection("Lab", sub.lab);
//     }

//   });

//   // Semester Risk Score
//   let semesterScore = totalSections === 0
//     ? 0
//     : (totalPercentSum / totalSections);

//   scoreDiv.innerHTML =
//     `🎯 Semester Risk Score: ${semesterScore.toFixed(1)}%`;

//   // High Risk Alert
//   if (highRiskSubjects.length > 0) {
//     alertDiv.style.background = "#ff1744";
//     alertDiv.innerHTML =
//       `⚠ High Risk Sections: ${highRiskSubjects.join(", ")}`;
//   } else {
//     alertDiv.style.background = "#00e676";
//     alertDiv.innerHTML =
//       "✔ No High Risk Subjects";
//   }
// }

// function insights() {
//   const div = document.getElementById("insightContent");
//   const risky = subjects.filter(sub => {
//     let total = sub.theory.conducted +
//       (sub.hasLab ? sub.lab.conducted : 0);
//     let present = sub.theory.present +
//       (sub.hasLab ? sub.lab.present : 0);

//     return total > 0 && (present / total) * 100 < 70;
//   });

//   div.innerHTML =
//     risky.length > 0
//       ? `⚠ Focus needed in: ${risky.map(s => s.name).join(", ")}`
//       : "✔ Excellent attendance discipline.";
// }

// function heatmap() {
//   const grid = document.getElementById("heatmapGrid");
//   grid.innerHTML = "";

//   subjects.forEach(sub => {
//     sub.theory.history.forEach(h => {
//       const box = document.createElement("div");
//       box.classList.add("heatmap-box");
//       if (h) box.classList.add("high");
//       grid.appendChild(box);
//     });

//     if (sub.hasLab) {
//       sub.lab.history.forEach(h => {
//         const box = document.createElement("div");
//         box.classList.add("heatmap-box");
//         if (h) box.classList.add("mid");
//         grid.appendChild(box);
//       });
//     }
//   });
// }

// function render() {
//   const container = document.getElementById("subjects");
//   container.innerHTML = "";

//   subjects.forEach((sub, i) => {
//     container.innerHTML += `
//       <div class="card">
//         <h3>${sub.name}</h3>
//         ${renderSection(sub.theory, i, "theory")}
//         ${sub.hasLab ? renderSection(sub.lab, i, "lab") : ""}
//       </div>
//     `;
//   });

//   generateRanking();
//   examEligibility();
//   insights();
// }

// render();
const PASS_PERCENT = 75;

let subjects = JSON.parse(localStorage.getItem("attendanceData")) || [
  createSubject("Parallel & Distributed Computing", 16, true),
  createSubject("Web Development", 16, true),
  createSubject("Mobile App Development", 16, true),
  createSubject("Graph Theory", 32, false),
  createSubject("Psychology", 16, false),
  createSubject("Technical & Business Writing", 16, false),
];

function createSubject(name, total, hasLab) {
  return {
    name,
    hasLab,
    theory: createSection(total),
    lab: hasLab ? createSection(total) : null,
  };
}

function createSection(total) {
  return {
    total,
    conducted: 0,
    present: 0,
    streak: 0,
    history: []
  };
}

function save() {
  localStorage.setItem("attendanceData", JSON.stringify(subjects));
}

function mark(index, type, isPresent) {
  const s = subjects[index][type];
  if (s.conducted >= s.total) return;

  s.conducted++;
  s.history.push(isPresent);

  if (isPresent) {
    s.present++;
    s.streak++;
  } else {
    s.streak = 0;
  }

  save();
  render();
}

function undo(index, type) {
  const s = subjects[index][type];
  if (s.history.length === 0) return;

  const last = s.history.pop();
  s.conducted--;
  if (last) s.present--;
  s.streak = 0;

  save();
  render();
}

function percent(s) {
  return s.conducted === 0 ? 0 :
    ((s.present / s.conducted) * 100);
}

/* =========================
   UPDATED MISS LOGIC
   ========================= */

function missRemaining(s) {
  let maxAllowed;

  if (s.total === 16) {
    maxAllowed = 4;
  } 
  else if (s.total === 32) {
    maxAllowed = 8;
  } 
  else {
    maxAllowed = Math.floor(s.total * 0.25);
  }

  // Count actual absences from history
  const absencesTaken = s.history.filter(h => h === false).length;

  return maxAllowed - absencesTaken;
}

/* ========================= */

function recoveryNeeded(s) {
  let p = s.present;
  let c = s.conducted;
  let needed = 0;

  while (((p + needed) / (c + needed)) * 100 < PASS_PERCENT) {
    needed++;
  }
  return needed;
}

function simulate(index, type) {
  const s = subjects[index][type];
  const needed = recoveryNeeded(s);

  alert(
    needed === 0
      ? "You are already safe."
      : `You need ${needed} consecutive presents to reach 75%.`
  );
}

function renderSection(s, i, type) {
  const p = percent(s).toFixed(1);
  const riskColor =
    p >= 75 ? "#00e676" :
    p >= 70 ? "#ffab00" :
    "#ff1744";

  return `
  <div class="section">
    <strong>${type.toUpperCase()}</strong>

    <div class="progress-bar">
      <div class="progress" style="width:${p}%;background:${riskColor}"></div>
    </div>

    <div class="stats-row">
      <span>${p}%</span>
      <span>${s.present}/${s.conducted}/${s.total}</span>
    </div>

    <div class="stats-row">
      <span>🎯 Miss Left: ${missRemaining(s)}</span>
      <span>🔥 Streak: ${s.streak}</span>
    </div>

    <div class="stats-row">
      <span>🛡 Recovery: ${recoveryNeeded(s)}</span>
    </div>

    <button class="present" onclick="mark(${i}, '${type}', true)">Present</button>
    <button class="absent" onclick="mark(${i}, '${type}', false)">Absent</button>
    <button class="undo" onclick="undo(${i}, '${type}')">Undo</button>
    <button class="simulate" onclick="simulate(${i}, '${type}')">Simulate</button>
  </div>
  `;
}

function generateRanking() {
  const list = document.getElementById("rankingList");
  list.innerHTML = "";

  let ranking = [];

  subjects.forEach(sub => {

    ranking.push({
      name: sub.name + " (Theory)",
      percent: percent(sub.theory)
    });

    if (sub.hasLab) {
      ranking.push({
        name: sub.name + " (Lab)",
        percent: percent(sub.lab)
      });
    }

  });

  ranking.sort((a, b) => b.percent - a.percent);

  ranking.forEach((item, index) => {

    let color =
      item.percent >= 75 ? "#00e676" :
      item.percent >= 70 ? "#ffab00" :
      "#ff1744";

    list.innerHTML += `
      <li style="color:${color}">
        ${index === 0 ? "👑" : ""}
        ${item.name} – ${item.percent.toFixed(1)}%
      </li>
    `;
  });
}

let previousStatus = {};

function examEligibility() {
  const div = document.getElementById("examStatus");
  const alertDiv = document.getElementById("riskAlert");
  const scoreDiv = document.getElementById("semesterScore");

  div.innerHTML = "";
  alertDiv.innerHTML = "";

  let totalPercentSum = 0;
  let totalSections = 0;
  let highRiskSubjects = [];

  subjects.forEach(sub => {

    function getLevel(p) {
      if (p >= 75) return "safe";
      if (p >= 70) return "warning";
      return "danger";
    }

    function trendArrow(key, currentPercent) {
      let arrow = "";
      if (previousStatus[key] !== undefined) {
        if (currentPercent > previousStatus[key]) arrow = " ↑";
        else if (currentPercent < previousStatus[key]) arrow = " ↓";
      }
      previousStatus[key] = currentPercent;
      return arrow;
    }

    function renderSec(typeName, section) {

      let p = percent(section);
      let level = getLevel(p);
      let recovery = recoveryNeeded(section);
      let key = sub.name + typeName;

      totalPercentSum += p;
      totalSections++;

      if (p < 70) highRiskSubjects.push(`${sub.name} (${typeName})`);

      div.innerHTML += `
        <div class="exam-card ${level}">
          <div style="font-weight:bold;">
            ${sub.name} — ${typeName}
          </div>

          <div style="display:flex;justify-content:space-between;">
            <span>${p.toFixed(1)}%${trendArrow(key, p)}</span>
            <span class="badge ${level}">
              ${p >= 75 ? "Eligible" : "Not Eligible"}
            </span>
          </div>

          <div class="mini-progress">
            <div class="mini-bar"
              style="width:${p}%">
            </div>
          </div>

          ${
            p < 75
              ? `<div style="font-size:11px;margin-top:4px;">
                  Needs ${recovery} consecutive presents
                </div>`
              : ""
          }
        </div>
      `;
    }

    renderSec("Theory", sub.theory);
    if (sub.hasLab) renderSec("Lab", sub.lab);
  });

  let semesterScore = totalSections === 0
    ? 0
    : (totalPercentSum / totalSections);

  scoreDiv.innerHTML =
    `🎯 Semester Risk Score: ${semesterScore.toFixed(1)}%`;

  if (highRiskSubjects.length > 0) {
    alertDiv.innerHTML =
      `⚠ High Risk Sections: ${highRiskSubjects.join(", ")}`;
  } else {
    alertDiv.innerHTML =
      "✔ No High Risk Subjects";
  }
}

function insights() {
  const div = document.getElementById("insightContent");
  const risky = subjects.filter(sub => {
    let total = sub.theory.conducted +
      (sub.hasLab ? sub.lab.conducted : 0);
    let present = sub.theory.present +
      (sub.hasLab ? sub.lab.present : 0);

    return total > 0 && (present / total) * 100 < 70;
  });

  div.innerHTML =
    risky.length > 0
      ? `⚠ Focus needed in: ${risky.map(s => s.name).join(", ")}`
      : "✔ Excellent attendance discipline.";
}

function render() {
  const container = document.getElementById("subjects");
  container.innerHTML = "";

  subjects.forEach((sub, i) => {
    container.innerHTML += `
      <div class="card">
        <h3>${sub.name}</h3>
        ${renderSection(sub.theory, i, "theory")}
        ${sub.hasLab ? renderSection(sub.lab, i, "lab") : ""}
      </div>
    `;
  });

  generateRanking();
  examEligibility();
  insights();
  heatmap();
}

render();