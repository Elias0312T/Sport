// FIREBASE CONFIG

const firebaseConfig = {

  apiKey:
    "AIzaSyBUDnQCtE7PoquOGjArchkZaYZJmT7oRBY",

  authDomain:
    "elias-fitness-friends.firebaseapp.com",

  projectId:
    "elias-fitness-friends",

  storageBucket:
    "elias-fitness-friends.appspot.com",

  messagingSenderId:
    "387221074867",

  appId:
    "1:387221074867:web:9538df426a919c3be811c6"
};

// FIREBASE START

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

let currentUser = null;

// AUTH STATE

auth.onAuthStateChanged(async user => {

  if (user) {

    currentUser = user;

    document.getElementById("user")
      .innerText =
      "👤 " + user.email;

    loadUserData();

    loadRanking();

  } else {

    currentUser = null;

    document.getElementById("user")
      .innerText =
      "Nicht eingeloggt";

  }

});

// REGISTER

function register() {

  const email =
    prompt("Email:");

  const password =
    prompt("Passwort:");

  auth
    .createUserWithEmailAndPassword(
      email,
      password
    )

    .then(async userCredential => {

      await db
        .collection("users")
        .doc(userCredential.user.uid)
        .set({

          email: email,

          xp: 0,

          level: 1,

          streak: 0

        });

      alert("✅ Account erstellt!");

    })

    .catch(err => {

      alert(err.message);

    });

}

// LOGIN

function login() {

  const email =
    prompt("Email:");

  const password =
    prompt("Passwort:");

  auth
    .signInWithEmailAndPassword(
      email,
      password
    )

    .then(() => {

      alert("🔥 Login erfolgreich!");

    })

    .catch(err => {

      alert(err.message);

    });

}

// LOGOUT

function logout() {

  auth.signOut();

}

// GOAL ERSTELLEN

async function createGoal() {

  if (!currentUser) {

    alert("Bitte zuerst einloggen!");

    return;
  }

  const sportName =
    document.getElementById(
      "sportSelect"
    ).value;

  const amount =
    parseInt(
      document.getElementById(
        "amount"
      ).value
    );

  if (!amount || amount <= 0) {

    alert("Ungültige Zahl!");

    return;
  }

  // SPORT SUCHEN

  const sport =
    sports.find(
      s => s.name === sportName
    );

  // XP

  const xp =
    sport.xp * amount;

  // GOAL SPEICHERN

  await db
    .collection("goals")
    .add({

      uid: currentUser.uid,

      sport: sport.name,

      amount: amount,

      xp: xp,

      created:
        new Date()

    });

  // USER XP

  const userRef =
    db
      .collection("users")
      .doc(currentUser.uid);

  const userDoc =
    await userRef.get();

  let currentXP =
    userDoc.data().xp || 0;

  currentXP += xp;

  const level =
    calculateLevel(currentXP);

  await userRef.update({

    xp: currentXP,

    level: level

  });

  // RESET

  document
    .getElementById("amount")
    .value = "";

  loadUserData();

  loadRanking();

}

// USER DATEN LADEN

async function loadUserData() {

  if (!currentUser) return;

  // USER

  const userDoc =
    await db
      .collection("users")
      .doc(currentUser.uid)
      .get();

  const userData =
    userDoc.data();

  document
    .getElementById("xp")
    .innerText =
    userData.xp;

  document
    .getElementById("level")
    .innerText =
    userData.level;

  // GOALS

  const goalsList =
    document.getElementById(
      "goalsList"
    );

  goalsList.innerHTML = "";

  const snapshot =
    await db
      .collection("goals")
      .where(
        "uid",
        "==",
        currentUser.uid
      )
      .get();

  snapshot.forEach(doc => {

    const data =
      doc.data();

    const li =
      document.createElement("li");

    li.innerHTML = `

      <div>

        <strong>
          ${data.sport}
        </strong>

        <br>

        ${data.amount}

        —

        ${data.xp} XP

      </div>

      <button
        onclick="
          completeGoal(
            '${doc.id}'
          )
        "
      >
        ✅ Erledigt
      </button>

    `;

    goalsList.appendChild(li);

  });

}

// GOAL ABSCHLIESSEN

async function completeGoal(goalId) {

  await db
    .collection("goals")
    .doc(goalId)
    .delete();

  loadUserData();

}