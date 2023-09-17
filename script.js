let username = '';
let hasUsername = false;
let language = 'es';
let clicks = parseFloat(localStorage.getItem('clicks')) || 0.0;
let clickMultiplier = parseFloat(localStorage.getItem('clickMultiplier')) || 1.0;
let boughtItems = JSON.parse(localStorage.getItem('boughtItems')) || [];

const storedClicks = parseFloat(localStorage.getItem('clicks'));
if (!isNaN(storedClicks)) {
  clicks = storedClicks;
}

const storedClickMultiplier = parseFloat(localStorage.getItem('clickMultiplier'));
if (!isNaN(storedClickMultiplier)) {
  clickMultiplier = storedClickMultiplier;
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

function setLanguage(lang) {
  language = lang;
  updateTexts();
}

function updateTexts() {
  const texts = textos[language];
  document.getElementById('gameTitle').innerText = texts['gameTitle'];
  document.getElementById('startButton').innerText = texts['startButton'];
  document.getElementById('clicksLabel').innerText = texts['clicksLabel'];
  document.getElementById('clickButton').innerText = texts['clickButton'];
  document.getElementById('welcomeMessage').innerText = texts['welcomeMessage'];
  document.getElementById('totalClicksMessage').innerText = texts['totalClicksMessage'];
  document.getElementById('returnButton').innerText = texts['returnToInterface'];
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
}

function incrementClicks() {
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

  saveProgress();
}

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

function loadProgress() {
  updateClickCounter();
}

function saveProgress() {
  // Guardar el progreso en localStorage
  localStorage.setItem('clicks', clicks.toString());
  localStorage.setItem('clickMultiplier', clickMultiplier.toString());
  localStorage.setItem('boughtItems', JSON.stringify(boughtItems));
}

function updateClickCounter() {
  document.getElementById('clickCounter').innerText = textos[language]['clicksLabel'] + ': ' + parseFloat(clicks).toFixed(1);
}

window.onload = () => {
  updateTexts();
  const storedProgress = localStorage.getItem('clicks');
  if (storedProgress) {
    clicks = parseFloat(storedProgress);
    updateClickCounter();
    updateStoreButtons();
  }

  const storedMultiplier = localStorage.getItem('clickMultiplier');
  if (storedMultiplier) {
    clickMultiplier = parseFloat(storedMultiplier);
  }

  const storedBoughtItems = JSON.parse(localStorage.getItem('boughtItems'));
  if (storedBoughtItems) {
    boughtItems = storedBoughtItems;
  }
};
