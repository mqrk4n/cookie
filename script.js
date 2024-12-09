// Game state variables
let cookies = 0;
let cookiesPerClick = 1;
let autoCookiesPerSecond = 0;
let upgrade1Cost = 10;    // Cookie Enhancer
let upgrade2Cost = 50;    // Auto Baker
let upgrade3Cost = 200;   // Cookie Multipliers
let upgrade4Cost = 1000;  // Cookie Factory
let upgrade5Cost = 5000;  // Cookie Farm
let resetThreshold = 1000000;  // Cookies required for reset
let resetPerks = { cookiesPerClick: 0, autoCookiesPerSecond: 0 }; // Perks after reset

// DOM elements
const cookieImage = document.getElementById('cookie');
const cookieCount = document.getElementById('cookie-count');
const upgrade1Button = document.getElementById('upgrade1-button');
const upgrade2Button = document.getElementById('upgrade2-button');
const upgrade3Button = document.getElementById('upgrade3-button');
const upgrade4Button = document.getElementById('upgrade4-button');
const upgrade5Button = document.getElementById('upgrade5-button');
const upgradeStatus = document.getElementById('upgrade-status');
const autoClickStatus = document.getElementById('auto-click-status');
const resetButton = document.getElementById('reset-button');
const resetContainer = document.querySelector('.reset-container');

// Function to handle cookie clicks
cookieImage.addEventListener('click', (event) => {
    // Add cookies
    cookies += cookiesPerClick;
    updateCookieCount();
    checkUpgradeAvailability();
    checkResetAvailability();

    // Create cookie particles
    createCookieParticles(event.clientX, event.clientY);
});

// Function to create cookie particles when the main cookie is clicked
function createCookieParticles(x, y) {
    const particleCount = 10; // Number of particles per click
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('cookie-particle');
        
        // Randomize initial position slightly
        particle.style.left = `${x + (Math.random() - 0.5) * 50}px`;
        particle.style.top = `${y + (Math.random() - 0.5) * 50}px`;
        
        // Append the particle to the body
        document.body.appendChild(particle);
        
        // Remove the particle after the animation
        setTimeout(() => {
            particle.remove();
        }, 2000); // Match the animation duration
    }
}

// Function to handle upgrades
upgrade1Button.addEventListener('click', () => {
    if (cookies >= upgrade1Cost) {
        cookies -= upgrade1Cost;
        cookiesPerClick += 1; // Increases cookies per click by 1
        upgrade1Cost = Math.floor(upgrade1Cost * 1.5);
        updateCookieCount();
        updateUpgradeInfo();
        checkUpgradeAvailability();
    }
});

upgrade2Button.addEventListener('click', () => {
    if (cookies >= upgrade2Cost) {
        cookies -= upgrade2Cost;
        autoCookiesPerSecond += 1; // Auto Baker generates 1 cookie per second
        upgrade2Cost = Math.floor(upgrade2Cost * 1.5);
        updateCookieCount();
        updateUpgradeInfo();
        checkUpgradeAvailability();
    }
});

upgrade3Button.addEventListener('click', () => {
    if (cookies >= upgrade3Cost) {
        cookies -= upgrade3Cost;
        cookiesPerClick *= 2; // Double cookies per click
        upgrade3Cost = Math.floor(upgrade3Cost * 1.5);
        updateCookieCount();
        updateUpgradeInfo();
        checkUpgradeAvailability();
    }
});

upgrade4Button.addEventListener('click', () => {
    if (cookies >= upgrade4Cost) {
        cookies -= upgrade4Cost;
        autoCookiesPerSecond += 5; // Cookie Factory generates 5 cookies per second
        upgrade4Cost = Math.floor(upgrade4Cost * 1.5);
        updateCookieCount();
        updateUpgradeInfo();
        checkUpgradeAvailability();
    }
});

upgrade5Button.addEventListener('click', () => {
    if (cookies >= upgrade5Cost) {
        cookies -= upgrade5Cost;
        autoCookiesPerSecond += 10; // Cookie Farm generates 10 cookies per second
        upgrade5Cost = Math.floor(upgrade5Cost * 1.5);
        updateCookieCount();
        updateUpgradeInfo();
        checkUpgradeAvailability();
    }
});

// Function to update the cookie count on the screen
function updateCookieCount() {
    cookieCount.textContent = `Cookies: ${cookies}`;
}

// Function to update the upgrade information
function updateUpgradeInfo() {
    upgradeStatus.textContent = `Cookies per click: ${cookiesPerClick}`;
    autoClickStatus.textContent = `Auto-cookies per second: ${autoCookiesPerSecond}`;
    upgrade1Button.textContent = `Cookie Enhancer (Cost: ${upgrade1Cost})`;
    upgrade2Button.textContent = `Auto Baker (Cost: ${upgrade2Cost})`;
    upgrade3Button.textContent = `Cookie Multipliers (Cost: ${upgrade3Cost})`;
    upgrade4Button.textContent = `Cookie Factory (Cost: ${upgrade4Cost})`;
    upgrade5Button.textContent = `Cookie Farm (Cost: ${upgrade5Cost})`;
}

// Function to check if upgrades are available
function checkUpgradeAvailability() {
    upgrade1Button.disabled = cookies < upgrade1Cost;
    upgrade2Button.disabled = cookies < upgrade2Cost;
    upgrade3Button.disabled = cookies < upgrade3Cost;
    upgrade4Button.disabled = cookies < upgrade4Cost;
    upgrade5Button.disabled = cookies < upgrade5Cost;
}

// Function to check if reset button should appear
function checkResetAvailability() {
    if (cookies >= resetThreshold) {
        resetContainer.style.display = 'block';
    } else {
        resetContainer.style.display = 'none';
    }
}

// Function to reset the game
resetButton.addEventListener('click', () => {
    // Apply perks
    cookiesPerClick += 5;  // Perk example: 5 more cookies per click
    autoCookiesPerSecond += 2; // Perk example: 2 more cookies per second

    // Save current perks for the next reset
    resetPerks.cookiesPerClick = cookiesPerClick;
    resetPerks.autoCookiesPerSecond = autoCookiesPerSecond;

    // Reset the game
    cookies = 0;
    upgrade1Cost = 10;
    upgrade2Cost = 50;
    upgrade3Cost = 200;
    upgrade4Cost = 1000;
    upgrade5Cost = 5000;

    // Update the UI
    updateCookieCount();
    updateUpgradeInfo();
    checkUpgradeAvailability();
    checkResetAvailability();
    alert('Game Reset! You gained perks for your next playthrough.');
});

// Function to generate auto cookies every second
setInterval(() => {
    cookies += autoCookiesPerSecond;
    updateCookieCount();
    checkUpgradeAvailability();
    checkResetAvailability();
}, 1000);

// Initial setup
updateCookieCount();
updateUpgradeInfo();
checkUpgradeAvailability();