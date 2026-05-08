// FIREBASE

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

firebase.initializeApp(firebaseConfig);

const auth =
  firebase.auth();

const db =
  firebase.firestore();

let currentUser = null;

// AUTH STATE

auth.onAuthStateChanged(async user=>{

  if(user){

    currentUser = user;

    document
      .getElementById("authScreen")
      .classList.add("hidden");

    document
      .getElementById("app")
      .classList.remove("hidden");

    document
      .getElementById("profileEmail")
      .innerText =
      user.email;

    await loadUserData();

    await loadRanking();

  }else{

    currentUser = null;

    document
      .getElementById("authScreen")
      .classList.remove("hidden");

    document
      .getElementById("app")
      .classList.add("hidden");

  }

});

// REGISTER

async function register(){

  const email =
    document.getElementById(
      "email"
    ).value;

  const password =
    document.getElementById(
      "password"
    ).value;

  if(!email || !password){

    alert(
      "Bitte alles ausfüllen!"
    );

    return;
  }

  try{

    const userCredential =
      await auth
        .createUserWithEmailAndPassword(
          email,
          password
        );

    await db
      .collection("users")
      .doc(
        userCredential.user.uid
      )
      .set({

        email:email,

        xp:0,

        level:1,

        streak:0,

        created:
          new Date()

      });

    alert(
      "✅ Account erstellt!"
    );

  }catch(err){

    alert(err.message);

  }

}

// LOGIN

async function login(){

  const email =
    document.getElementById(
      "email"
    ).value;

  const password =
    document.getElementById(
      "password"
    ).value;

  try{

    await auth
      .signInWithEmailAndPassword(
        email,
        password
      );

  }catch(err){

    alert(err.message);

  }

}

// LOGOUT

function logout(){

  auth.signOut();

}

// CREATE GOAL

async function createGoal(){

  if(!currentUser){

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

  if(!amount || amount <= 0){

    alert(
      "Ungültige Zahl!"
    );

    return;
  }

  const sport =
    sports.find(
      s => s.name === sportName
    );

  const xp =
    sport.xp * amount;

  // GOAL

  await db
    .collection("goals")
    .add({

      uid:
        currentUser.uid,

      sport:
        sport.name,

      amount:
        amount,

      xp:
        xp,

      done:false,

      created:
        new Date()

    });

  // XP

  const userRef =
    db.collection("users")
      .doc(currentUser.uid);

  const userDoc =
    await userRef.get();

  let currentXP =
    userDoc.data().xp || 0;

  currentXP += xp;

  const level =
    calculateLevel(
      currentXP
    );

  await userRef.update({

    xp:
      currentXP,

    level:
      level

  });

  document
    .getElementById(
      "amount"
    ).value = "";

  await loadUserData();

  await loadRanking();

}

// LOAD USER

async function loadUserData(){

  if(!currentUser){

    return;
  }

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

  document
    .getElementById("streak")
    .innerText =
    userData.streak || 0;

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

  snapshot.forEach(doc=>{

    const data =
      doc.data();

    const li =
      document.createElement(
        "li"
      );

    li.innerHTML = `

      <div>

        <strong>
          ${data.sport}
        </strong>

        <br><br>

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
        ✅ Fertig
      </button>

    `;

    goalsList.appendChild(li);

  });

}

// COMPLETE GOAL

async function completeGoal(goalId){

  await db
    .collection("goals")
    .doc(goalId)
    .delete();

  await loadUserData();

}

// RESET

async function resetProgress(){

  const reset =
    confirm(
      "Fortschritt löschen?"
    );

  if(!reset){

    return;
  }

  await db
    .collection("users")
    .doc(currentUser.uid)
    .update({

      xp:0,

      level:1,

      streak:0

    });

  const snapshot =
    await db
      .collection("goals")
      .where(
        "uid",
        "==",
        currentUser.uid
      )
      .get();

  snapshot.forEach(async doc=>{

    await db
      .collection("goals")
      .doc(doc.id)
      .delete();

  });

  await loadUserData();

  await loadRanking();

}

// DELETE ACCOUNT

async function deleteAccount(){

  const confirmDelete =
    confirm(
      "ACCOUNT LÖSCHEN?"
    );

  if(!confirmDelete){

    return;
  }

  const snapshot =
    await db
      .collection("goals")
      .where(
        "uid",
        "==",
        currentUser.uid
      )
      .get();

  snapshot.forEach(async doc=>{

    await db
      .collection("goals")
      .doc(doc.id)
      .delete();

  });

  await db
    .collection("users")
    .doc(currentUser.uid)
    .delete();

  await currentUser.delete();

  alert(
    "🗑️ Account gelöscht!"
  );

}