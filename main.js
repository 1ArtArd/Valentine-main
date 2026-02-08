const noPhrases = [
  "Ты точно уверена?",
  "Харе баловаться!",
  "Кстати кнопка сломана)",
  "Я жду пока ты нажмёшь «Да»",
  "Ну же ❤️",
  "Ты же моя валентинка",
  "Не сопротивляйся любви",
  "Я люблю тебя, кис(",
  "Как тогда мы влюбились?",
  "Окак.."
];

const btnNo = document.querySelector('.btn_no');
const yesBtn = document.querySelector('.btn_ye');

let scale = 1;

btnNo.addEventListener('click', () => {
  const randomPhrase = Math.random() * noPhrases.length;
  btnNo.textContent = noPhrases[Math.floor(randomPhrase)];
  scale *= 1.2;
  yesBtn.style.transform = `scale(${scale})`;
});

/* ===== ДОБАВЛЕНО: данные для фразы ===== */

const staticText = "Еееееее! Кис, я очень рад что ты есть в моей жизни ❤️❤️❤️";

const loveForms = [
  {
    will: false,
    ending: "лю",
    additions: ["сейчас", "сегодня", "в этот момент", "в эту секунду", "всегда", "даже когда злюсь", "даже когда обижен"]
  },
  {
    will: false,
    ending: "ил",
    additions: ["вчера", "на прошлой неделе", "летом", "позавчера", "месяц назад", "неделю назад", "в конце весны", "в прошлом месяце", "час назад", "сегодня утром", "в прошлый четверг"]
  },
  {
    will: true,
    ending: "ить",
    additions: ["завтра", "послезавтра", "столько, сколько потребуется", "через час", "через секунду", "через минуту", "через мгновение"]
  }
];

let usedCombinations = [];

/* ===== ДОБАВЛЕНО: уникальные рандомные фразы ===== */
function getRandomUnique() {
  if (usedCombinations.length === loveForms.flatMap(f => f.additions.map(a => ({ ...f, addition: a }))).length) {
    // все комбинации исчерпаны — очищаем, чтобы начать заново
    usedCombinations = [];
  }

  let combo;
  do {
    const form = loveForms[Math.floor(Math.random() * loveForms.length)];
    const addition = form.additions[Math.floor(Math.random() * form.additions.length)];
    combo = { will: form.will, ending: form.ending, addition };
  } while (usedCombinations.some(c => c.will === combo.will && c.ending === combo.ending && c.addition === combo.addition));

  usedCombinations.push(combo);
  return combo;
}

/* ===== ИЗМЕНЕНИЕ обработчика кнопки ДА ===== */

yesBtn.addEventListener('click', () => {
  document.body.innerHTML = `
    <main class="main">
      <div class="final">
        <img data-src="./gifs/final.gif" class="newImgGif">
        <p class="finalText finalLoveText">
          ${staticText}<br>
          Я <span id="willWord" class="dynamicPart willWordPart"></span> люб<span id="verbPart" class="dynamicPart"></span> тебя
          <span id="addition" class="dynamicPart additionPart"></span>
        </p>
      </div>
    </main>
  `;

  const newImg = document.querySelector('.newImgGif');
  if (newImg) {
    newImg.src = newImg.dataset.src;
  }

  startLoveText();
});

/* ===== Функция смены фраз с уникальностью ===== */

function startLoveText() {
  const willEl = document.getElementById('willWord');
  const verbEl = document.getElementById('verbPart');
  const additionEl = document.getElementById('addition');

  function update() {
    const combo = getRandomUnique();

    [willEl, verbEl, additionEl].forEach(el => el.classList.remove('show'));

    setTimeout(() => {
      willEl.textContent = combo.will ? "буду " : "";
      verbEl.textContent = combo.ending;
      additionEl.textContent = " " + combo.addition;

      [willEl, verbEl, additionEl].forEach(el => el.classList.add('show'));
    }, 200);
  }

  update();
  setInterval(update, 630);
}

