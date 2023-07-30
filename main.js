const game = document.querySelector('.game');

const userSelect = document.querySelector('.game__user');
const compSelect = document.querySelector('.game__comp');

const rock = document.querySelector('.choice_rock');
const paper = document.querySelector('.choice_paper');
const scissors = document.querySelector('.choice_scissors');
const choices = [rock, paper, scissors];

const restart = document.querySelector('.game__restart');

const time = document.querySelector('.time');
let timeCount = 5;
time.textContent = timeCount;

const timeInterval = setInterval(() => {
  time.textContent = --timeCount;

  if (timeCount === 0) {
    alert('Время вышло, автоподстановка...');
    setCompChoice();
    setCompChoice(true);
    
    resultActions()
  }
}, 1000);


restart.addEventListener('click', () => {
  window.location.reload();
});

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    setUserChoice(choice);
    setCompChoice();

    resultActions();
  });
});

function setUserChoice(choice) {
  const icon = choice.querySelector('.icon');
  userSelect.dataset.value = choice.dataset.value;
  userSelect.innerHTML = icon.outerHTML;
}

function setCompChoice(choiceUser = false) {
  const randomIndex = Math.floor(Math.random() * choices.length);
  const randomChoice = choices[randomIndex];

  compSelect.dataset.value = randomChoice.dataset.value;
  compSelect.innerHTML = randomChoice.querySelector('.icon').outerHTML;

  if (choiceUser) {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const randomChoice = choices[randomIndex];

    userSelect.dataset.value = randomChoice.dataset.value;
    userSelect.innerHTML = randomChoice.querySelector('.icon').outerHTML;
  }
}

function getWinner() {
  const userValue = userSelect.dataset.value
  const compValue = compSelect.dataset.value

  console.log(userValue);
  console.log(compValue);

  // Камень - ножницы / Ножницы - камень
  if (userValue === 'rock' && compValue === 'scissors') {
    alert('Вы победили!');
  } else if (userValue === 'scissors' && compValue === 'rock') {
    alert('Вы проиграли');
  }

  // Бумага - камень / Камень - бумага
  if (userValue === 'paper' && compValue === 'rock') {
    alert('Вы победили!');
  } else if (userValue === 'rock' && compValue === 'paper') {
    alert('Вы проиграли');
  }

  // Ножницы - бумага / Бумага - ножницы
  if (userValue === 'scissors' && compValue === 'paper') {
    alert('Вы победили!');
  } else if (userValue === 'paper' && compValue === 'scissors') {
    alert('Вы проиграли');
  }

  if (userValue === compValue) {
    alert('Ничья');
  }
}

function freezeGame() {
  game.classList.add('freeze');
}

function resultActions() {
  clearInterval(timeInterval);
  setTimeout(getWinner, 100);
  freezeGame();
}
