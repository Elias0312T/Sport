// SPORT DATENBANK

const sports = [

  {name:"Laufen",xp:15,unit:"KM"},
  {name:"Joggen",xp:10,unit:"Minuten"},
  {name:"Sprint",xp:20,unit:"Minuten"},
  {name:"Schwimmen",xp:18,unit:"Minuten"},
  {name:"Fahrrad",xp:8,unit:"KM"},
  {name:"Seilspringen",xp:12,unit:"Minuten"},
  {name:"Wandern",xp:10,unit:"KM"},

  {name:"Liegestütze",xp:1,unit:"Wiederholungen"},
  {name:"Klimmzüge",xp:3,unit:"Wiederholungen"},
  {name:"Situps",xp:1,unit:"Wiederholungen"},
  {name:"Kniebeugen",xp:1,unit:"Wiederholungen"},
  {name:"Plank",xp:5,unit:"Minuten"},
  {name:"Burpees",xp:2,unit:"Wiederholungen"},

  {name:"Fußball",xp:10,unit:"Minuten"},
  {name:"Basketball",xp:10,unit:"Minuten"},
  {name:"Tennis",xp:12,unit:"Minuten"},
  {name:"Volleyball",xp:9,unit:"Minuten"},
  {name:"Boxen",xp:15,unit:"Minuten"},
  {name:"Karate",xp:14,unit:"Minuten"},

  {name:"Fitnessstudio",xp:12,unit:"Minuten"},
  {name:"Yoga",xp:8,unit:"Minuten"},
  {name:"Calisthenics",xp:15,unit:"Minuten"},
  {name:"Crossfit",xp:18,unit:"Minuten"}

];

// SPORT SELECT

window.addEventListener("load",()=>{

  const select =
    document.getElementById(
      "sportSelect"
    );

  sports.forEach(sport=>{

    const option =
      document.createElement(
        "option"
      );

    option.value =
      sport.name;

    option.innerText =
      `${sport.name}
      (${sport.unit})`;

    select.appendChild(option);

  });

});