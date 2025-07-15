// quiz.js
// 'questions' is injected by the HTML template
let current = 0;
let answers = {};
let timer = 30;
let timerInterval = null;

const confirmationScreen = document.getElementById('confirmation-screen');
const quizForm = document.getElementById('quiz-form');
const questionArea = document.getElementById('question-area');
const timerDisplay = document.getElementById('timer');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const startQuizBtn = document.getElementById('start-quiz-btn');

function showQuestion(idx) {
    let q = questions[idx];
    let html = `<div class="question-block">
        <h3>Q${idx+1}: ${q.question}</h3>
        <label><input type="radio" name="option" value="A" ${answers[q.id]==='A'?'checked':''}> ${q.option_a}</label><br>
        <label><input type="radio" name="option" value="B" ${answers[q.id]==='B'?'checked':''}> ${q.option_b}</label><br>
        <label><input type="radio" name="option" value="C" ${answers[q.id]==='C'?'checked':''}> ${q.option_c}</label><br>
        <label><input type="radio" name="option" value="D" ${answers[q.id]==='D'?'checked':''}> ${q.option_d}</label>
    </div>`;
    questionArea.innerHTML = html;
    prevBtn.disabled = idx === 0;
    if (idx === questions.length - 1) {
        nextBtn.disabled = true;
        nextBtn.classList.add('btn-disabled');
    } else {
        nextBtn.disabled = false;
        nextBtn.classList.remove('btn-disabled');
    }
}

function startTimer() {
    clearInterval(timerInterval);
    timer = 30;
    timerDisplay.textContent = timer;
    timerInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;
        if (timer === 0) {
            clearInterval(timerInterval);
            saveAnswer();
            if (current < questions.length - 1) {
                current++;
                showQuestion(current);
                startTimer();
            } else {
                quizForm.requestSubmit();
            }
        }
    }, 1000);
}

function saveAnswer() {
    let selected = document.querySelector('input[name="option"]:checked');
    if (selected) {
        answers[questions[current].id] = selected.value;
    }
}

prevBtn.onclick = () => {
    saveAnswer();
    if (current > 0) {
        current--;
        showQuestion(current);
        startTimer();
    }
};
nextBtn.onclick = () => {
    if (nextBtn.disabled) return; // Prevent action if already disabled
    if (current < questions.length - 1) {
        saveAnswer();
        current++;
        showQuestion(current);
        startTimer();
        // If now at last question, disable nextBtn
        if (current === questions.length - 1) {
            nextBtn.disabled = true;
            nextBtn.classList.add('btn-disabled');
        }
    }
};
quizForm.onsubmit = (e) => {
    e.preventDefault();
    saveAnswer();
    fetch('/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({answers})
    })
    .then(res => res.json())
    .then(data => {
        window.location.href = '/results';
    });
};
if (startQuizBtn) {
    startQuizBtn.onclick = () => {
        confirmationScreen.style.display = 'none';
        quizForm.style.display = 'block';
        showQuestion(current);
        startTimer();
    };
}
