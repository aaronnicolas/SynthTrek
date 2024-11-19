function displayAttackFeedback(damage, attack) {
  // Get the damage output element
  const damageOutput = document.getElementById("damage-output");

  // Animate the damage output (pop effect)
  damageOutput.classList.add('pop-animation');

  // Show damage in the output
  damageOutput.textContent = `${attack.name} dealt ${damage} damage!`;

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
        hp: 23,
        attacks: [
          { name: "Bite", damage: [1, 2] },
          { name: "Squirm", damage: [2, 3], cooldown: 2 },
        ],
      },
      cyclops: {
        hp: 30,
        attacks: [
          { name: "Stab", damage: [1, 3] },
          { name: "Lunge", damage: [2, 4], cooldown: 2 },
        ],
      },
      veldraxi: {
        hp: 20,
        attacks: [
          { name: "Pincer Attack", damage: [1, 3] },
          { name: "Web Sling", effect: "Reduces enemy attack by 1", cooldown: 4 },
        ],
      },
      mindflayer: {
        hp: 35,
        attacks: [
          { name: "Scream", damage: [2, 3], effect: "Hits 2 enemies" },
          { name: "Imagery", effect: "Reduces damage taken by 1", cooldown: 3 },
        ],
      },
      eldritch_spawn: {
        hp: 40,
        attacks: [
          { name: "Tentacle Slash", damage: [1, 4] },
          { name: "Fear Factor", effect: "Reduces damage taken by 1" },
        ],
      },
      infected_wretch: {
        hp: 30,
        attacks: [
          { name: "Lunge", damage: [2, 4] },
          { name: "Vomit", effect: "Decreases enemy attack by 2", cooldown: 3 },
        ],
      },
      vile_abomination: {
        hp: 10,
        attacks: [{ name: "Bite", damage: [1, 2] }],
      },
      ravaging_phantasmals: {
        hp: 25,
        attacks: [
          { name: "Screech", damage: [1, 3] },
          { name: "Haunt", effect: "Reduces all enemy attack by 1" },
        ],
      },
      expurge: {
        hp: 30,
        attacks: [
          { name: "Thought Shatter", damage: [2, 4] },
          { name: "Cognitive Recoil", effect: "Heals by damage done (1 to 5)", cooldown: 4 },
        ],
      },
      eye_from_faraway: {
        hp: 25,
        attacks: [
          { name: "Mental Rend", damage: [1, 4] },
          { name: "Binding Will", damage: [2, 3], effect: "Reduces damage taken by 1", cooldown: 2 },
        ],
      },
      rouge_nexus_machine: {
        hp: 25,
        attacks: [
          { name: "Exo Slam", damage: [1, 3] },
          { name: "Repulsion Field", damage: [1, 3], effect: "Lowers enemy attack by 1", cooldown: 3 },
        ],
      },
      cyanox_sentry: {
        hp: 30,
        attacks: [
          { name: "Thermal Bolt", damage: [2, 4] },
          { name: "Barrage", damage: [2, 4], effect: "Hits all enemies", cooldown: 3 },
        ],
      },
      orcish_captive: {
        hp: 15,
        attacks: [{ name: "Punch", damage: [1, 2] }],
      },
      infernal_cinder: {
        boss: true,
        hp: { 1: 30, 2: 35, 3: 45, 4: 55 },
        attacks: [
          { name: "Wicked Bane", damage: [2, 4], effect: "Reduces damage taken by 1 next turn", cooldown: 2 },
          { name: "Flesh Rending", damage: [1, 3], effect: "Hits two enemies" },
          { name: "Cataclysmic Strike", damage: [5, 5], cooldown: 5 },
        ],
      },
      neurovoid: {
        boss: true,
        hp: { 1: 30, 2: 35, 3: 45, 4: 60 },
        attacks: [
          { name: "Energy Shove", damage: [1, 3], effect: "Hits 2 players" },
          { name: "Neural Intoxication", damage: [2, 5], effect: "Hits all enemies", cooldown: 4 },
        ],
      },
    };
  
    const enemyTypeSelect = document.getElementById("enemy-type");
    const attackOptionsDiv = document.getElementById("attack-options");
    const damageOutput = document.getElementById("damage-output");
  
    function generateRandomDamage(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    function renderAttackButtons(enemyKey) {
      attackOptionsDiv.innerHTML = "";
      const enemy = enemyData[enemyKey];

      enemy.attacks.forEach((attack, index) => {
          const button = document.createElement("button");
          button.textContent = attack.name;

          button.onclick = () => {
              // Disable button temporarily (cooldown)
              button.disabled = true;
              setTimeout(() => (button.disabled = false), 1000); // 1-second cooldown

              if (attack.damage) {
                  const damage = generateRandomDamage(attack.damage[0], attack.damage[1]);
                  displayAttackFeedback(damage, attack); // Pass attack object to the feedback function
              } else if (attack.effect) {
                  displayEffectFeedback(attack.effect);
              }
          };

          attackOptionsDiv.appendChild(button);
      });
  }
  
    // Initialize with the first enemy
    renderAttackButtons("xorathian");
  
    // Update UI on enemy change
    enemyTypeSelect.addEventListener("change", (e) => {
      // Reset the damage output to an instruction when changing enemy
      damageOutput.textContent = "Pick an attack";

      // Render attack buttons for the selected enemy
      renderAttackButtons(e.target.value);
    });
});  