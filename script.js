function displayAttackFeedback(damage, attack) {
  const damageOutput = document.getElementById("damage-output");

  // Display damage
  if(attack.isSpecialAttack){
    damageOutput.textContent = `${attack.name} dealt ${damage} damage to all enemies!`;
  } else {
    damageOutput.textContent = `${attack.name} dealt ${damage} damage!`;
  }

  // Add animation classes for the pop effect
  damageOutput.classList.add("pop-animation", "damage-feedback");

  // Remove only the pop animation after it finishes, keeping the persistent styles
  setTimeout(() => {
    damageOutput.classList.remove("pop-animation");
  }, 500); // Match animation timing
}


function displayEffectFeedback(effect = null) {
  // Get the damage output element
  const damageOutput = document.getElementById("damage-output");
  
  // Animate the damage output (pop effect)
  damageOutput.classList.add('pop-animation');
  
  // Show damage in the output
  damageOutput.textContent = effect;

  // Reset the animation after it finishes
  setTimeout(() => {
    damageOutput.classList.remove('pop-animation');
  }, 500); // Reset after 500ms
  
  // Optional: Change background color temporarily for extra emphasis
  damageOutput.classList.add('damage-feedback');
  setTimeout(() => {
    damageOutput.classList.remove('damage-feedback');
  }, 1000); // Feedback duration (1 second)
}

document.addEventListener("DOMContentLoaded", () => {
  const enemyData = {
    xorathian: {
      name: "Xorathian",
      description: "A vicious alien predator.",
      hp: 23,
      attacks: [
        { name: "Bite", damage: [1, 2] },
        { name: "Squirm", damage: [2, 3], cooldown: 2 },
      ],
    },
    cyclops: {
      name: "Cyclops",
      description: "A one-eyed brute with immense strength.",
      hp: 30,
      attacks: [
        { name: "Stab", damage: [1, 3] },
        { name: "Lunge", damage: [2, 4], cooldown: 2 },
      ],
    },
    veldraxi: {
      name: "Veldraxi",
      description: "A stealthy creature with deadly pincers.",
      hp: 20,
      attacks: [
        { name: "Pincer Attack", damage: [1, 3] },
        { name: "Web Sling", effect: "Reduces enemy attack by 1", cooldown: 4 },
      ],
    },
    mindflayer: {
      name: "Mindflayer",
      description: "A mysterious entity that manipulates thoughts.",
      hp: 35,
      attacks: [
        { name: "Scream", damage: [2, 3], effect: "Hits 2 enemies" },
        { name: "Imagery", effect: "Reduces damage taken by 1", cooldown: 3 },
      ],
    },
    eldritch_spawn: {
      name: "Eldritch Spawn",
      description: "A grotesque creature from beyond reality.",
      hp: 40,
      attacks: [
        { name: "Tentacle Slash", damage: [1, 4] },
        { name: "Fear Factor", effect: "Reduces damage taken by 1" },
      ],
    },
    infected_wretch: {
      name: "Infected Wretch",
      description: "A diseased creature spreading decay.",
      hp: 30,
      attacks: [
        { name: "Lunge", damage: [2, 4] },
        { name: "Vomit", effect: "Decreases enemy attack by 2", cooldown: 3 },
      ],
    },
    vile_abomination: {
      name: "Vile Abomination",
      description: "A twisted fusion of organic and mechanical parts.",
      hp: 10,
      attacks: [{ name: "Bite", damage: [1, 2] }],
    },
    ravaging_phantasmals: {
      name: "Ravaging Phantasmals",
      description: "Ethereal entities spreading chaos.",
      hp: 25,
      attacks: [
        { name: "Screech", damage: [1, 3] },
        { name: "Haunt", effect: "Reduces all enemy attack by 1" },
      ],
    },
    expurge: {
      name: "Expurge",
      description: "A being of pure psychic energy.",
      hp: 30,
      attacks: [
        { name: "Thought Shatter", damage: [2, 4] },
        { name: "Cognitive Recoil", effect: "Heals by damage done (1 to 5)", cooldown: 4 },
      ],
    },
    eye_from_faraway: {
      name: "Eye From Faraway",
      description: "A massive eye watching from the void.",
      hp: 25,
      attacks: [
        { name: "Mental Rend", damage: [1, 4] },
        { name: "Binding Will", damage: [2, 3], damage: [2, 3], cooldown: 2 },
      ],
    },
    rouge_nexus_machine: {
      name: "Rogue Nexus Machine",
      description: "A corrupted machine from a distant future.",
      hp: 25,
      attacks: [
        { name: "Exo Slam", damage: [1, 3] },
        { name: "Repulsion Field", damage: [1, 3], cooldown: 3 },
      ],
    },
    cyanox_sentry: {
      name: "Cyanox Sentry",
      description: "A sentinel armed with advanced weaponry.",
      hp: 30,
      attacks: [
        { name: "Thermal Bolt", damage: [2, 4] },
        { name: "Barrage", damage: [2, 4], damage: [2, 4], effect: "Hits all enemies", cooldown: 3 },
      ],
    },
    orcish_captive: {
      name: "Orcish Captive",
      description: "A battered and bruised orc prisoner.",
      hp: 15,
      attacks: [{ name: "Punch", damage: [1, 2] }],
    },
   // Add more enemies as needed...
  };

  const enemies = Object.keys(enemyData);
  const enemyDisplay = document.getElementById("enemy-display");
  const enemyName = document.getElementById("enemy-name");
  const enemyDescription = document.getElementById("enemy-description");
  const attackOptionsDiv = document.getElementById("attack-options");
  const damageOutput = document.getElementById("damage-output");
  const rerollButton = document.getElementById("reroll-enemy");

  function generateRandomDamage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function renderAttackButtons(enemy) {
    attackOptionsDiv.innerHTML = ""; // Clear old buttons
    enemy.attacks.forEach((attack) => {
      const button = document.createElement("button");
      button.textContent = attack.name;
      button.className = "attack-option-btn";

      button.addEventListener("click", () => {
        if (attack.damage) {
          const damage = generateRandomDamage(attack.damage[0], attack.damage[1]);
          displayAttackFeedback(damage, attack);
        } else {
          displayEffectFeedback(attack.effect || "No effect!");
        }
      });      

      attackOptionsDiv.appendChild(button);
    });
  }

  function selectRandomEnemy() {
    const randomEnemyKey = enemies[Math.floor(Math.random() * enemies.length)];
    const enemy = enemyData[randomEnemyKey];
    enemyName.textContent = enemy.name;
    enemyDescription.textContent = enemy.description;
    renderAttackButtons(enemy);
  }

  // Initial Enemy
  selectRandomEnemy();

  rerollButton.addEventListener("click", () => {
    selectRandomEnemy();
  
    // Reset the damage feedback text without modifying CSS
    damageOutput.textContent = "Choose an attack";

    // Remove any animation or styling classes
    damageOutput.classList.remove("pop-animation", "damage-feedback");
  });  
});
