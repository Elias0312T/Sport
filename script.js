// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBUDnQCtE7PoquOGjArchkZaYZJmT7oRBY",
  authDomain: "elias-fitness-friends.firebaseapp.com",
  projectId: "elias-fitness-friends",
  storageBucket: "elias-fitness-friends.appspot.com",
  messagingSenderId: "387221074867",
  appId: "1:387221074867:web:9538df426a919c3be811c6"
};

// Firebase starten
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;

// LOGIN STATUS
auth.onAuthStateChanged(async user => {

  if (user) {

    currentUser = user;

    document.getElementById("user").innerText =
      "👤 " + user.email;

    loadUserData();

  } else {

    currentUser = null;

    document.getElementById("user").innerText =
      "Nicht eingeloggt";

    document.getElementById("goals").innerHTML = "";

    document.getElementById("xp").innerText = "0";
    document.getElementById("level").innerText = "1";
  }

});

// REGISTRIEREN
function register() {

  const email = prompt("Email:");
  const password = prompt("Passwort:");

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("✅ Account erstellt!");
    })
    .catch(err => {
      alert(err.message);
    });

}

// LOGIN
function login() {

  const email = prompt("Email:");
  const password = prompt("Passwort:");

  auth.signInWithEmailAndPassword(email, password)
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

// ZIEL SPEICHERN
async function saveGoal() {

  if (!currentUser) {
    alert("Bitte zuerst einloggen!");
    return;
  }

  const sport = document.getElementById("sport").value;
  const amount = document.getElementById("amount").value;

  if (sport === "" || amount === "") {
    alert("Bitte alles ausfüllen!");
    return;
  }

  const gainedXP = parseInt(amount);

  // GOAL SPEICHERN
  await db.collection("goals").add({
    uid: currentUser.uid,
    sport: sport,
    amount: amount,
    xp: gainedXP,
    created: new Date()
  });

  // USER XP
  const userRef = db.collection("users").doc(currentUser.uid);

  const doc = await userRef.get();

  let totalXP = gainedXP;

  if (doc.exists) {
    totalXP += doc.data().xp || 0;
  }

  const level = Math.floor(totalXP / 100) + 1;

  await userRef.set({
    email: currentUser.email,
    xp: totalXP,
    level: level
  });

  document.getElementById("sport").value = "";
  document.getElementById("amount").value = "";

  loadUserData();

}

// USER DATEN LADEN
async function loadUserData() {

  if (!currentUser) return;

  // USER
  const userDoc = await db
    .collection("users")
    .doc(currentUser.uid)
    .get();

  if (userDoc.exists) {

    document.getElementById("xp").innerText =
      userDoc.data().xp || 0;

    document.getElementById("level").innerText =
      userDoc.data().level || 1;

  }

  // GOALS
  const snapshot = await db
    .collection("goals")
    .where("uid", "==", currentUser.uid)
    .get();

  const goalsList = document.getElementById("goals");

  goalsList.innerHTML = "";

  snapshot.forEach(doc => {

    const data = doc.data();

    const li = document.createElement("li");

    li.innerHTML = `
      🏋️ ${data.sport} -
      ${data.amount} Wiederholungen
      (+${data.xp} XP)

      <button onclick="completeGoal('${doc.id}', ${data.xp})">
        Erledigt
      </button>
    `;

    goalsList.appendChild(li);

  });

}

// ZIEL ABSCHLIESSEN
async function completeGoal(goalId, xp) {

  await db.collection("goals").doc(goalId).delete();

  const userRef = db.collection("users").doc(currentUser.uid);

  const userDoc = await userRef.get();

  let currentXP = userDoc.data().xp || 0;

  currentXP += xp;

  const level = Math.floor(currentXP / 100) + 1;

  await userRef.update({
    xp: currentXP,
    level: level
  });

  loadUserData();

}