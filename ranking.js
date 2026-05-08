// GLOBAL RANKING

async function loadRanking(){

  const rankingList =
    document.getElementById(
      "rankingList"
    );

  rankingList.innerHTML = "";

  const snapshot =
    await db
      .collection("users")
      .orderBy("xp","desc")
      .limit(25)
      .get();

  let rank = 1;

  snapshot.forEach(doc=>{

    const data =
      doc.data();

    const li =
      document.createElement(
        "li"
      );

    li.innerHTML = `

      <div>

        🏆 #${rank}

        <br><br>

        ${data.email}

      </div>

      <strong>

        Level ${data.level}

        (${data.xp} XP)

      </strong>

    `;

    rankingList.appendChild(li);

    rank++;

  });

}