// Event Data
const events = {
  "Cosmic Anomaly": {
    description: "A small rift in space has opened and threatens to change the environment.",
    outcomes: [
      "➡️ Move to a tile adjacent to the current location",
      "💪 Player gains 1 Attack Up for the rest of the floor but loses 5HP",
      "❌ Ignore the anomaly (summons an enemy)"
    ]
  },
  "Collapsing Star": {
    description: "A container which holds the energy of a harvested star has threatened to leak.",
    outcomes: [
      "🚶‍♂️ Leave current tile",
      "💪 If any scientist class is present: Contain the energy and gain an extra action every first turn for this floor"
    ]
  },
  "Awakening": {
    description: "An item which seals an ancient entity weakens, making the influence of said entity stronger.",
    outcomes: [
      "⚔️ Fight and seal the entity (miniboss)",
      "🤝 Make a deal with said entity: Lose 5 HP but all enemies deal 1 less damage to the player"
    ]
  },
  "Callousness": {
    description: "A trap was activated.",
    outcomes: [
      "🏃‍♂️ Run through the trap (Lose 10HP for the person who triggered it and 5 for the rest of the party)",
      "💥 Dismantle the trap (Option available only if SCNTST character is in the party) Party gains five gold"
    ]
  },
  "Discovery": {
    description: "An experimental weapon was found in the midst of development.",
    outcomes: [
      "💪 Player who discovered can gain 1 max damage but loses 5 HP",
      "❌ Ignore the weapon",
      "💰 Take the weapon but gain 10 gold upon entering the shop"
    ]
  },
  "Alert": {
    description: "A patrol unit of the AI has discovered the group.",
    outcomes: [
      "⚔️ Immediately fight a miniboss variant of an enemy and all players gain 5 extra gold after defeating it",
      "🏃‍♂️ Run away but all players lose 3 HP"
    ]
  },
  "Anxiety": {
    description: "A recording made by a previous prisoner offers a chance to help the party.",
    outcomes: [
      "👂 Listen (Gain 1 random item)",
      "❌ Ignore the recording (does not gain an item)"
    ]
  },
  "Rampage": {
    description: "A rampaging experiment was discovered amidst all the chaos in the research facility.",
    outcomes: [
      "🛑 Stop the experiment (Miniboss variant of a random enemy). Upon defeating the boss, all players gain a random item and the player who discovered the event gains two items",
      "🏃‍♂️ Run away but all players lose 3 HP"
    ]
  },
  "Guards": {
    description: "The party discovered a group of robots that are patrolling the facility.",
    outcomes: [
      "🔍 Hack the robots and immediately discover where the boss room is located",
      "🛒 Hack the robots and discover where the shops are located"
    ]
  }
};

// Pop-up logic
function showEventPopup(eventName) {
  const event = events[eventName];
  if (!event) return;

  // Create the pop-up
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
    <div class="popup-content">
      <h1>The tile has triggered...</h1>
      <h2>📣 ${eventName} 📣</h2>
      <p>${event.description}</p>
      <h3>Pick an Outcome: </h3>
      <p>${event.outcomes.map(outcome => `<p>- ${outcome}</p>`).join('')}</p>
      <button id="close-popup">Close</button>
    </div>
  `;

  // Add styles for the popup
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 15, 30, 0.9); /* Dark background with slight transparency */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }

      .popup-content {
        background: linear-gradient(to bottom right, #1f3c88, #2ed9e9); /* Dark blue to teal gradient */
        border: 3px solid #2ed9e9; /* Teal border */
        border-radius: 20px; /* Rounded corners */
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Subtle shadow for depth */
        padding: 20px;
        text-align: center;
        width: 90%; /* Adjust width for responsiveness */
        max-width: 400px; /* Cap maximum size */
        position: relative;
        color: #ffffff; /* White text for contrast */
      }

      .popup-content h2 {
        margin: 10px 0;
        font-size: 1.8em;
        font-weight: bold;
        color: #68e0b5; /* Teal for title */
      }

      .popup-content p {
        margin: 10px 0;
        font-size: 1em;
        line-height: 1.6;
        color: white; /* Light cyan for readability */
      }

      .popup-content ul {
        list-style: disc inside;
        padding: 0;
        margin: 20px 0;
        color: #d9f8ff;
      }

      .popup-content button {
        margin-top: 20px;
        background: #3f54d1; /* Teal button */
        color: white;
        border: none;
        border-radius: 15px;
        cursor: pointer;
        font-size: 1em;
        height: 40px;
        width: 120px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease; /* Smooth hover effect */
      }

      .popup-content button:hover {
        background: #5280e2; /* Dark blue on hover */
        color: white; /* Teal text */
      }

      .popup-content .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #1f3c88; /* Dark blue */
        color: #2ed9e9; /* Teal text */
        border: none;
        border-radius: 50%; /* Circular close button */
        width: 30px;
        height: 30px;
        font-size: 1.2em;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
      }

      .popup-content .close-button:hover {
        background: #2ed9e9; /* Teal hover */
        color: #1f3c88; /* Dark blue text */
      }
    </style>
  `);

  // Add the popup to the DOM
  document.body.appendChild(popup);

  // Close the popup
  document.getElementById('close-popup').addEventListener('click', () => {
    popup.remove();
  });
}

// Spin-the-wheel logic
function wheelOfFortune(selector) {
  const node = document.querySelector(selector);
  if (!node) return;

  const spin = node.querySelector('button');
  const wheel = node.querySelector('ul');
  let animation;
  let previousEndDegree = 0;

  spin.addEventListener('click', () => {
    if (animation) animation.cancel(); // Reset the animation if it already exists

    const randomAdditionalDegrees = Math.random() * 360 + 1800;
    const newEndDegree = previousEndDegree + randomAdditionalDegrees;

    animation = wheel.animate([
      { transform: `rotate(${previousEndDegree}deg)` },
      { transform: `rotate(${newEndDegree}deg)` }
    ], {
      duration: 4000,
      direction: 'normal',
      easing: 'ease-out',
      fill: 'forwards',
      iterations: 1
    });

    previousEndDegree = newEndDegree;

    animation.onfinish = () => {
      const finalAngle = newEndDegree % 360;
      const normalizedAngle = (360 - finalAngle + 90) % 360;
      const items = wheel.children.length;
      const segment = 360 / items;
      const offset = 15;
      const winner = Math.floor(((normalizedAngle + offset) % 360) / segment);
      const eventName = wheel.children[winner].textContent.trim();
      showEventPopup(eventName);
    };
  });
}

// Initialize
wheelOfFortune('.ui-wheel-of-fortune');