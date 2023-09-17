let username = '';
let hasUsername = false;
let language = 'es';
let clicks = parseFloat(localStorage.getItem('clicks')) || 0.0;
let clickMultiplier = 1.0;
let boughtItems = JSON.parse(localStorage.getItem('boughtItems')) || [];

const storedClicks = parseFloat(localStorage.getItem('clicks'));
if (!isNaN(storedClicks)) {
  clicks = storedClicks;
}

const storedBoughtItems = JSON.parse(localStorage.getItem('boughtItems'));
if (storedBoughtItems) {
  boughtItems = storedBoughtItems;
}

const textos = {
  'es': {
    'gameTitle': 'Juego de Clicks',
    'startButton': 'Comenzar',
    'clicksLabel': 'Clics',
    'clickButton': 'Haz clic',
    'welcomeMessage': 'Bienvenido',
    'totalClicksMessage': 'Total de Clics',
    'returnToInterface': 'Volver al Interfaz'
  },
  'en': {
    'gameTitle': 'Clicker Game',
    'startButton': 'Start',
    'clicksLabel': 'Clicks',
    'clickButton': 'Click me!',
    'welcomeMessage': 'Welcome',
    'totalClicksMessage': 'Total Clicks',
    'returnToInterface': 'Return to Interface'
  }
};
function openStore() {
  document.getElementById('interface').style.display = 'none';
  document.getElementById('store').style.display = 'block';
  updateClicksAvailable();
  updateStoreButtons();
}

function updateClicksAvailable() {
  const clicksAvailableElement = document.getElementById('clicksAvailable');
  const formattedClicks = parseFloat(clicks).toFixed(1); // Show only 1 digit after the decimal point
  clicksAvailableElement.innerText = formattedClicks;
}
function updateStoreButtons() {
  const items = document.querySelectorAll('.store-item button');
  items.forEach((button, index) => {
    if (hasBoughtItem(index + 1)) {
      button.innerText = 'Comprado';
      button.className = 'purchased';
      button.disabled = true;
    }
  });
}

function buyItem(cost, multiplier, itemIndex) {
  if (hasBoughtItem(itemIndex)) {
    alert('Ya has comprado este ítem.');
  } else if (clicks >= cost) {
    clicks -= cost;
    clickMultiplier += multiplier;
    updateClickCounter();
    saveBoughtItem(itemIndex);
    updateStoreButtons();
    alert('¡Has comprado este ítem!');
  } else {
    alert('No tienes suficientes clics para comprar esto.');
  }
}

function hasBoughtItem(itemIndex) {
  return boughtItems.includes(itemIndex);
}

function saveBoughtItem(itemIndex) {
  boughtItems.push(itemIndex);
  saveProgress();
}

function returnToInterfaceFromStore() {
  document.getElementById('store').style.display = 'none';
  document.getElementById('interface').style.display = 'block';
}

function returnToInterface() {
  document.getElementById('game').style.display = 'none';
  document.getElementById('interface').style.display = 'block';

  const userInfoElement = document.getElementById('userInfo');
  const formattedClicks = parseFloat(clicks).toFixed(1); // Show only 1 digit after the decimal point
  userInfoElement.innerText = textos[language]['welcomeMessage'] + ', ' + username + '! ' + textos[language]['totalClicksMessage'] + ': ' + formattedClicks;
}

function startGame() {
  if (!hasUsername) {
    const usernameInput = prompt(textos[language]['welcomeMessage'] + ' - ' + textos[language]['startButton']);
    username = usernameInput ? usernameInput.trim() : '';

    if (username === '') {
      alert(textos[language]['startButton'] + ': ' + 'Por favor, ingresa un nombre de usuario válido.');
      return;
    }

    hasUsername = true;
  }

  document.getElementById('interface').style.display = 'none';
  document.getElementById('game').style.display = 'block';

  loadProgress();

  // Update the text for the "Haz clic" button
  document.querySelectorAll('.circular-button')[1].innerText = textos[language]['clickButton'];
}

function changeLanguage() {
  const languageSelect = document.getElementById('languageSelect');
  language = languageSelect.value;
  updateTexts();
}

function updateTexts() {
  document.getElementById('gameTitle').innerText = textos[language]['gameTitle'];
  document.querySelector('.circular-button').innerText = textos[language]['startButton'];
  const formattedClicks = parseFloat(clicks).toFixed(1); // Show only 1 digit after the decimal point
  document.getElementById('clickCounter').innerText = textos[language]['clicksLabel'] + ': ' + formattedClicks;
  document.querySelectorAll('.circular-button')[1].innerText = textos[language]['clickButton'];
  document.querySelector('.restart-button').innerText = textos[language]['returnToInterface'];
}

function incrementClick() {
  clicks += clickMultiplier;
  updateClickCounter();

  // Check for milestones (1000, 10000, 100000, 1000000, 10000000, 100000000)
  if (clicks === 1000) {
    alert('¡Felicidades! Has alcanzado 1000 clics.');
  } else if (clicks === 10000) {
    alert('¡Increíble! Has alcanzado 10000 clics.');
  } else if (clicks === 100000) {
    alert('¡WOW! Has alcanzado 100000 clics. ¡Eres increíble!');
  } else if (clicks === 1000000) {
    alert('¡Asombroso! Has alcanzado 1000000 clics. Sigue así.');
  } else if (clicks === 10000000) {
    alert('¡Impresionante! Has alcanzado 10000000 clics. Eres una leyenda.');
  } else if (clicks === 100000000) {
    alert('¡Fenomenal! Has alcanzado 100000000 clics. Eres una leyenda viviente.');
  }
}

function updateClickCounter() {
  const clickCounterElement = document.getElementById('clickCounter');
  const formattedClicks = parseFloat(clicks).toFixed(1); // Show only 1 digit after the decimal point
  clickCounterElement.innerText = textos[language]['clicksLabel'] + ': ' + formattedClicks;
  updateClicksAvailable(); // Update clicks available in the store
}

function loadProgress() {
  updateClickCounter();
}

function saveProgress() {
  // Guardar el progreso en localStorage
  localStorage.setItem('clicks', clicks);
  localStorage.setItem('boughtItems', JSON.stringify(boughtItems));
}

window.onload = () => {
  updateTexts();
  loadProgress();
};

