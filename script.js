// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBUDnQCtE7PoquOGjArchkZaYZJmT7oRBY",
  authDomain: "elias-fitness-friends.firebaseapp.com",
  projectId: "elias-fitness-friends",
  storageBucket: "elias-fitness-friends.firebasestorage.app",
  messagingSenderId: "387221074867",
  appId: "1:387221074867:web:9538df426a919c3be811c6"
};

// Firebase starten
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Registrierung
function register() {
  const email = prompt("Email:");
  const password = prompt("Passwort:");

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Account erstellt"))
    .catch(err => alert(err.message));
}

// Login
function login() {
  const email = prompt("Email:");
  const password = prompt("Passwort:");

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById("user").innerText =
        "Eingeloggt: " + userCredential.user.email;
    })
    .catch(err => alert(err.message));
}

// Logout
function logout() {
  auth.signOut();
  document.getElementById("user").innerText = "Nicht eingeloggt";
}