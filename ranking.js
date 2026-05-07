async function loadRanking() {

  const rankingList =
    document.getElementById("rankingList");

  rankingList.innerHTML = "";

  const snapshot =
    await db
      .collection("users")
      .orderBy("xp", "desc")
      .limit(20)
      .get();

  let rank = 1;

  snapshot.forEach(doc => {

    const data = doc.data();

    const li =
      document.createElement("li");

    li.innerHTML = `
      🏆 #${rank}
      ${data.email}
      —
      Level ${data.level}
      (${data.xp} XP)
    `;

    rankingList.appendChild(li);

    rank++;

  });

}
