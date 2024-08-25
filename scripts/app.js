const randomButton = document.querySelector('.random');
console.log(randomButton);

const words = ['react', 'angular', 'javascript', 'bootstrap', 'tailwind'];

// Initialize display word
let displayWord = '';

function shuffle(str) {
  console.log('str', str);
  if (str === undefined) {
    return '';
  }
  let strArray = Array.from(str);

  const inputContainer = document.querySelector('.input-container');
  inputContainer.innerHTML = '';
  for (let index = 0; index < strArray.length; index++) {
    const listItem = document.createElement('input');

    listItem.classList.add('item');
    listItem.setAttribute('maxLength', 1);
    listItem.autofocus = true;
    inputContainer.appendChild(listItem);
    let j = Math.floor(Math.random() * strArray.length);
    let temp = strArray[index];
    strArray[index] = strArray[j];
    strArray[j] = temp;
  }

  nextMove();

  return strArray.join(' ');
}

function nextMove() {
  const inputs = document.querySelectorAll('.input-container .item');
  const letterMistake = document.querySelector('.mistakes span');
  const circleActives = document.querySelectorAll('.steps .circle');

  const counter = document.querySelector('.counter');
  let count = 0;
  counter.innerText = `Tries (${count}/5):`;
  const result = [];
  const arrayWord = Array.from(displayWord);
  let index = 0;

  inputs.forEach((elt) => {
    elt.addEventListener('keyup', function (event) {
      for (let i = index; i < arrayWord.length; i++) {
        const element = arrayWord[i];

        if (elt.value.length == 1 && elt.value === element) {
          elt.style.borderColor = 'green';
          elt.nextElementSibling?.focus();
          result.push(elt.value);
          if (result.length === inputs.length) {
            check(result);
          }
          index += 1;
          break;
        } else {
          let currentMistakes = letterMistake.innerText;
          if (currentMistakes) {
            letterMistake.innerText = currentMistakes + ', ' + elt.value;
          } else {
            letterMistake.innerText = elt.value;
          }
          elt.style.borderColor = 'red';
          elt.value = '';
          elt.focus();
          counter.innerText = `Tries (${(count += 1)}/5):`;
          for (let circle of circleActives) {
            if (circle.classList.contains('active')) {
              continue;
            } else {
              circle.classList.add('active');
            }
            break;
          }

          if (count == 5) {
            setTimeout(() => {
              alert('You lose');
              return;
            }, 1000);
          }
          break;
        }
      }
    });
  });
}

function check(params) {
  if (params.join('') === displayWord) {
    setTimeout(() => {
      alert('You Win');
      return;
    }, 800);
  }
}

function refresh(number) {
  if (0 >= number && number >= 5) {
    displayWord = '';
  } else {
    let index = Math.floor(Math.random() * number);
    displayWord = words[index];
  }

  const ScrambleWord = document.querySelector('.random-word .text');
  ScrambleWord.textContent = shuffle(displayWord).toUpperCase();
}

randomButton.addEventListener('click', () => {
  console.log('Random button clicked'); // Xác minh nút bấm có hoạt động
  refresh(5);
});

document.querySelector('.reset').addEventListener('click', () => {
  displayWord = '';
  refresh(-1);
});

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  refresh(5);
});
