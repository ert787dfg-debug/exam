const questions = [
  {
    question: "ما هي عاصمة العراق؟",
    options: ["بغداد", "البصرة", "الموصل", "أربيل"],
    answer: 0
  },
  {
    question: "عدد الكواكب في المجموعة الشمسية؟",
    options: ["7", "8", "9", "10"],
    answer: 1
  },
  {
    question: "أكبر قارة في العالم؟",
    options: ["أفريقيا", "آسيا", "أوروبا", "أمريكا الجنوبية"],
    answer: 1
  }
];

function loadQuiz() {
  const quizDiv = document.getElementById("quiz");
  questions.forEach((q, i) => {
    let div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `<p>${q.question}</p>` +
      q.options.map((opt, j) =>
        `<label><input type="radio" name="q${i}" value="${j}"> ${opt}</label><br>`
      ).join("");
    quizDiv.appendChild(div);
  });
}

function submitQuiz() {
  let score = 0;
  questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    const questionDiv = document.getElementsByClassName("question")[i];

    if (selected && parseInt(selected.value) === q.answer) {
      score++;
      questionDiv.style.border = "2px solid green"; // صح
    } else {
      questionDiv.style.border = "2px solid red";   // خطأ
      // عرض الجواب الصحيح
      const correctAnswer = document.createElement("p");
      correctAnswer.style.color = "blue";
      correctAnswer.innerText = `✔ الجواب الصحيح هو: ${q.options[q.answer]}`;
      questionDiv.appendChild(correctAnswer);
    }
  });

  let message = "";
  let resultClass = "";

  if (score === questions.length) {
    message = "🎉 ممتاز! أجبت على جميع الأسئلة بشكل صحيح.";
    resultClass = "result-good";
  } else if (score >= questions.length / 2) {
    message = "👍 جيد، لكن حاول تحسين نتيجتك أكثر.";
    resultClass = "result-medium";
  } else {
    message = "⚡ حاول مرة ثانية، تحتاج مراجعة أكثر.";
    resultClass = "result-bad";
  }

  const resultElement = document.getElementById("result");
  resultElement.innerText = `نتيجتك: ${score} من ${questions.length}\n${message}`;
  resultElement.className = resultClass;
}

window.onload = loadQuiz;
