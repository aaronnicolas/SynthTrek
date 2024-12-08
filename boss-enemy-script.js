document.addEventListener("DOMContentLoaded", () => {
  const enemyData = {
    infernal_cinder: {
      name: "Infernal Cinder",
      description: "A fiery elemental being of destruction.",
      boss: true,
      hp: { 1: 30, 2: 35, 3: 45, 4: 55 },
      attacks: [
        { name: "Wicked Bane", damage: [2, 4], effect: "Reduces damage taken by 1 next turn", cooldown: 2 },
        { name: "Flesh Rending", damage: [1, 3], effect: "Hits two enemies" },
        { name: "Cataclysmic Strike", damage: [5, 5], cooldown: 5 },
      ],
    },
    neurovoid: {
      name: "Neurovoid",
      description: "An entity that twists reality with its mind.",
      boss: true,
      hp: { 1: 30, 2: 35, 3: 45, 4: 60 },
      attacks: [
        { name: "Energy Shove", damage: [1, 3], effect: "Hits 2 players" },
        { name: "Neural Intoxication", damage: [2, 5], isSpecialAttack: true, cooldown: 4 },
      ],
    },
  };

  const enemies = Object.keys(enemyData);
  const enemyDisplay = document.getElementById("enemy-display");
  const enemyName = document.getElementById("enemy-name");
  const enemyDescription = document.getElementById("enemy-description");
  const attackOptionsDiv = document.getElementById("attack-options");
  const damageOutput = document.getElementById("damage-output");
  const rerollButton = document.getElementById("reroll-enemy");
  const playerCountSelect = document.getElementById("player-count");

  // Function to generate random damage based on player count
  function generateRandomDamage(min, max) {
    const playerCount = playerCountSelect.value;
    if (playerCount === "1-2") {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else if (playerCount === "3-4") {
      return Math.floor(Math.random() * (max - min + 1)) + min + 1; // Increase the damage for 3-4 players
    }
  }

  // Function to render the attack buttons for the selected enemy
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

  // Function to display the attack feedback
  function displayAttackFeedback(damage, attack) {
    const damageOutput = document.getElementById("damage-output");

    // Display damage
    if (attack.isSpecialAttack) {
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

  // Function to display the effect feedback
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

  // Function to select a random enemy from the pool
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
