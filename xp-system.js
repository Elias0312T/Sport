// LEVEL SYSTEM

function calculateLevel(xp){

  return Math.floor(xp / 100) + 1;

}

// STREAK BONUS

function calculateBonus(streak){

  return streak * 5;

}