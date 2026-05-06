// Firebase Config (fix & ready)
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

// USER STATUS LIVE UPDATEN
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("user").innerText =
      "Eingeloggt: " + user.email;
  } else {
    document.getElementById("user").innerText =
      "Nicht eingeloggt";
  }
});

// REGISTRIEREN
function register() {
  const email = prompt("Email eingeben:");
  const password = prompt("Passwort eingeben:");

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Account erstellt!");
    })
    .catch(err => {
      alert("Fehler: " + err.message);
    });
}

// LOGIN
function login() {
  const email = prompt("Email eingeben:");
  const password = prompt("Passwort eingeben:");

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login erfolgreich!");
    })
    .catch(err => {
      alert("Fehler: " + err.message);
    });
}

// LOGOUT
function logout() {
  auth.signOut();
}