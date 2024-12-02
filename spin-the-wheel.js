
const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const modal = document.getElementById('modal');
const eventTitle = document.getElementById('eventTitle');
const eventDescription = document.getElementById('eventDescription');
const eventOutcomes = document.getElementById('eventOutcomes');
const closeModal = document.getElementById('closeModal');

const events = [
    {
        name: "Cosmic Anomaly",
        description: "A small rift in space has opened and threatens to change the environment.",
        outcomes: [
            "Move to a tile adjacent to the current location",
            "Player gains 1 Attack Up for the rest of the floor but loses 5HP",
            "Ignore the anomaly (summons an enemy)"
        ]
    },
    {
        name: "Collapsing Star",
        description: "A container which holds the energy of a harvested star has threatened to leak.",
        outcomes: [
            "Leave current tile",
            "If any scientist class is present: Contain the energy and gain an extra action every first turn for this floor"
        ]
    },
    {
        name: "Awakening",
        description: "An item which seals an ancient entity weakens, making the influence of said entity stronger.",
        outcomes: [
            "Fight and seal the entity (miniboss)",
            "Make a deal with said entity: Lose 5 HP but all enemies deal 1 less damage to the player"
        ]
    },
    {
        name: "Callousness",
        description: "A trap was activated.",
        outcomes: [
            "Run through the trap (Lose 10HP for the person who triggered it and 5 for the rest of the party)",
            "Dismantle the trap (Option available only if SCNTST character is in the party) Party gains five gold"
        ]
    },
    {
        name: "Discovery",
        description: "An experimental weapon was found in the midst of development.",
        outcomes: [
            "Player who discovered can gain 1 max damage but loses 5 HP",
            "Ignore the weapon",
            "Take the weapon but gain 10 gold upon entering the shop"
        ]
    },
    {
        name: "Alert",
        description: "A patrol unit of the AI has discovered the group.",
        outcomes: [
            "Immediately fight a miniboss variant of an enemy and all players gain 5 extra gold after defeating it",
            "Run away but all players lose 3 HP"
        ]
    },
    {
        name: "Anxiety",
        description: "A recording made by a previous prisoner offers a chance to help the party.",
        outcomes: [
            "Listen (Gain 1 random item)",
            "Ignore the recording (does not gain an item)"
        ]
    },
    {
        name: "Rampage",
        description: "A rampaging experiment was discovered amidst all the chaos in the research facility.",
        outcomes: [
            "Stop the experiment (Miniboss variant of a random enemy). Upon defeating the boss, all players gain a random item and the player who discovered the event gains two items",
            "Run away but all players lose 3 HP"
        ]
    },
    {
        name: "Guards",
        description: "The party discovered a group of robots that are patrolling the facility.",
        outcomes: [
            "Hack the robots and immediately discover where the boss room is located",
            "Hack the robots and discover where the shops are located"
        ]
    }
];

spinButton.addEventListener('click', () => {
    spinButton.disabled = true;

    const randomDegree = Math.floor(Math.random() * 360) + 1800; // Spin at least 5 full rotations
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    const finalDegree = randomDegree % 360;
    const index = Math.floor((360 - finalDegree) / (360 / events.length)) % events.length;

    setTimeout(() => {
        const selectedEvent = events[index];
        eventTitle.textContent = selectedEvent.name;
        eventDescription.textContent = selectedEvent.description;

        eventOutcomes.innerHTML = "";
        selectedEvent.outcomes.forEach(outcome => {
            const li = document.createElement("li");
            li.textContent = outcome;
            eventOutcomes.appendChild(li);
        });

        modal.classList.add('active');
        spinButton.disabled = false;
    }, 4000);
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});
