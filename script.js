let username = '';
let hasUsername = false;
let language = 'es'; // Predeterminado: español

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

function incrementClick() {
  let clickCount = parseInt(localStorage.getItem(username));
  clickCount = isNaN(clickCount) ? 0 : clickCount;
  clickCount++;
  localStorage.setItem(username, clickCount);

  const clickCounterElement = document.getElementById('clickCounter');
  clickCounterElement.innerText = textos[language]['clicksLabel'] + ': ' + clickCount;

  // Check for milestones (1000, 10000, 100000)
  if (clickCount === 1000) {
    alert('¡Felicidades! Has alcanzado 1000 clics.');
  } else if (clickCount === 10000) {
    alert('¡Increíble! Has alcanzado 10000 clics.');
  } else if (clickCount === 100000) {
    alert('¡WOW! Has alcanzado 100000 clics. ¡Eres increíble!');
  }
}

function returnToInterface() {
  document.getElementById('game').style.display = 'none';
  document.getElementById('interface').style.display = 'block';

  const userInfoElement = document.getElementById('userInfo');
  const clickCount = parseInt(localStorage.getItem(username)) || 0;
  userInfoElement.innerText = textos[language]['welcomeMessage'] + ', ' + username + '! ' + textos[language]['totalClicksMessage'] + ': ' + clickCount;
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
  document.getElementById('clickCounter').innerText = textos[language]['clicksLabel'] + ': 0';
  document.querySelectorAll('.circular-button')[1].innerText = textos[language]['clickButton'];
  document.querySelector('.restart-button').innerText = textos[language]['returnToInterface'];
}

window.onload = updateTexts;
