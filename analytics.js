function generateRanking() {
  const rankingList = document.getElementById("rankingList");
  rankingList.innerHTML = "";

  const ranked = subjects.map(sub => {
    const total = sub.theory.conducted +
      (sub.hasLab ? sub.lab.conducted : 0);

    const present = sub.theory.present +
      (sub.hasLab ? sub.lab.present : 0);

    const percent = total === 0 ? 0 : (present / total) * 100;

    return { name: sub.name, percent };
  });

  ranked.sort((a, b) => b.percent - a.percent);

  ranked.forEach((item, i) => {
    rankingList.innerHTML += `
      <li>
        ${i === 0 ? "👑" : ""} ${item.name} - ${item.percent.toFixed(1)}%
      </li>
    `;
  });
}
function checkExamEligibility() {
  let totalConducted = 0;
  let totalPresent = 0;

  subjects.forEach(sub => {
    totalConducted += sub.theory.conducted;
    totalPresent += sub.theory.present;

    if (sub.hasLab) {
      totalConducted += sub.lab.conducted;
      totalPresent += sub.lab.present;
    }
  });

  const percent = totalConducted === 0 ? 0 :
    (totalPresent / totalConducted) * 100;

  const statusDiv = document.getElementById("examStatus");

  if (percent >= 75) {
    statusDiv.innerHTML =
      `<span style="color:#00e676">✔ Eligible for Exam (${percent.toFixed(1)}%)</span>`;
  } else {
    statusDiv.innerHTML =
      `<span style="color:#ff1744">❌ Not Eligible (${percent.toFixed(1)}%)</span>`;
  }
}
function generateInsights() {
  const insightDiv = document.getElementById("insightContent");
  insightDiv.innerHTML = "";

  const lowSubjects = subjects.filter(sub => {
    const total = sub.theory.conducted +
      (sub.hasLab ? sub.lab.conducted : 0);

    const present = sub.theory.present +
      (sub.hasLab ? sub.lab.present : 0);

    return total > 0 && (present / total) * 100 < 70;
  });

  if (lowSubjects.length > 0) {
    insightDiv.innerHTML += `
      ⚠ You are at risk in:
      ${lowSubjects.map(s => s.name).join(", ")}
    `;
  } else {
    insightDiv.innerHTML = "✔ You are performing well in all subjects.";
  }
}