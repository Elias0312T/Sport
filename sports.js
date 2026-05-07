// ALLE SPORTARTEN

const sports = [

  // CARDIO
  {
    name: "Laufen",
    category: "Cardio",
    xp: 15,
    unit: "KM"
  },

  {
    name: "Joggen",
    category: "Cardio",
    xp: 10,
    unit: "Minuten"
  },

  {
    name: "Sprint",
    category: "Cardio",
    xp: 20,
    unit: "Minuten"
  },

  {
    name: "Fahrrad",
    category: "Cardio",
    xp: 8,
    unit: "KM"
  },

  {
    name: "Schwimmen",
    category: "Cardio",
    xp: 18,
    unit: "Minuten"
  },

  {
    name: "Seilspringen",
    category: "Cardio",
    xp: 12,
    unit: "Minuten"
  },

  {
    name: "Wandern",
    category: "Cardio",
    xp: 10,
    unit: "KM"
  },

  // KRAFT

  {
    name: "Liegestütze",
    category: "Kraft",
    xp: 1,
    unit: "Wiederholungen"
  },

  {
    name: "Klimmzüge",
    category: "Kraft",
    xp: 3,
    unit: "Wiederholungen"
  },

  {
    name: "Situps",
    category: "Kraft",
    xp: 1,
    unit: "Wiederholungen"
  },

  {
    name: "Kniebeugen",
    category: "Kraft",
    xp: 1,
    unit: "Wiederholungen"
  },

  {
    name: "Plank",
    category: "Kraft",
    xp: 5,
    unit: "Minuten"
  },

  {
    name: "Burpees",
    category: "Kraft",
    xp: 2,
    unit: "Wiederholungen"
  },

  {
    name: "Bankdrücken",
    category: "Kraft",
    xp: 2,
    unit: "Wiederholungen"
  },

  {
    name: "Deadlift",
    category: "Kraft",
    xp: 3,
    unit: "Wiederholungen"
  },

  {
    name: "Bizepscurls",
    category: "Kraft",
    xp: 1,
    unit: "Wiederholungen"
  },

  {
    name: "Trizeps",
    category: "Kraft",
    xp: 1,
    unit: "Wiederholungen"
  },

  // SPORT

  {
    name: "Fußball",
    category: "Sport",
    xp: 10,
    unit: "Minuten"
  },

  {
    name: "Basketball",
    category: "Sport",
    xp: 10,
    unit: "Minuten"
  },

  {
    name: "Volleyball",
    category: "Sport",
    xp: 9,
    unit: "Minuten"
  },

  {
    name: "Tennis",
    category: "Sport",
    xp: 12,
    unit: "Minuten"
  },

  {
    name: "Badminton",
    category: "Sport",
    xp: 8,
    unit: "Minuten"
  },

  {
    name: "Boxen",
    category: "Sport",
    xp: 15,
    unit: "Minuten"
  },

  {
    name: "Karate",
    category: "Sport",
    xp: 14,
    unit: "Minuten"
  },

  {
    name: "Judo",
    category: "Sport",
    xp: 14,
    unit: "Minuten"
  },

  {
    name: "Taekwondo",
    category: "Sport",
    xp: 14,
    unit: "Minuten"
  },

  // FITNESS

  {
    name: "Fitnessstudio",
    category: "Fitness",
    xp: 12,
    unit: "Minuten"
  },

  {
    name: "Yoga",
    category: "Fitness",
    xp: 8,
    unit: "Minuten"
  },

  {
    name: "Pilates",
    category: "Fitness",
    xp: 8,
    unit: "Minuten"
  },

  {
    name: "Calisthenics",
    category: "Fitness",
    xp: 15,
    unit: "Minuten"
  },

  {
    name: "Crossfit",
    category: "Fitness",
    xp: 18,
    unit: "Minuten"
  },

  {
    name: "Rudern",
    category: "Fitness",
    xp: 12,
    unit: "Minuten"
  }

];

// SPORT SELECT LADEN

window.addEventListener("load", () => {

  const select =
    document.getElementById("sportSelect");

  sports.forEach(sport => {

    const option =
      document.createElement("option");

    option.value = sport.name;

    option.innerText =
      `${sport.name}
       (${sport.unit})`;

    select.appendChild(option);

  });

});
