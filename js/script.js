// FLOKY WORLD — interacciones de frontend con JavaScript vanilla

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

// Menú móvil
const menuToggle = $("#menuToggle");
const nav = $("#nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
$$(".nav a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

// Tarjetas de personalidad
const personalityMessages = {
  guardian: "«¿Alguien se acercó a la puerta? Gracias por avisarme. A partir de aquí, yo me encargo de la seguridad nacional».",
  walk: "«Yo venía tranquilamente a oler los árboles… pero ese perro grande acaba de recibir una declaración oficial de mi presencia».",
  negotiator: "«¿La patita a cambio de pollo? Me parece una propuesta inicial. Hablemos de cantidades y condiciones»."
};
$$(".personality-card").forEach(card => {
  card.addEventListener("click", () => {
    $$(".personality-card").forEach(item => item.classList.remove("selected"));
    card.classList.add("selected");
    const result = $("#personalityResult");
    result.innerHTML = `<span>💬</span><p>${personalityMessages[card.dataset.personality]}</p>`;
    result.classList.remove("fade-in");
    void result.offsetWidth;
    result.classList.add("fade-in");
  });
});

// Traductor perruno
const thoughts = {
  patita: "¿Otra vez con la patita? ¿Y mi pago por adelantado? Acepto pollo como método oficial de negociación.",
  perro: "Yo no quiero problemas… pero ese perro necesita conocer mi opinión. En voz alta. Desde aquí.",
  comida: "He detectado actividad en la cocina. No quiero alarmar a nadie, pero creo que es una emergencia deliciosa.",
  casa: "Hace rato me habría independizado, pero aquí me dan comida. Renovaré mi contrato por tiempo indefinido."
};
$("#translateBtn").addEventListener("click", () => {
  const text = $("#thoughtText");
  text.textContent = thoughts[$("#situationSelect").value];
  text.classList.remove("fade-in");
  void text.offsetWidth;
  text.classList.add("fade-in");
});

// Filtros de galería y lightbox
$$(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    $$(".filter-button").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    $$(".gallery-item").forEach(item => {
      item.hidden = filter !== "all" && item.dataset.category !== filter;
    });
  });
});
const lightbox = $("#lightbox");
$$(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    $("#lightboxCaption").textContent = item.dataset.caption || "Un momento especial de Floky";
    $("#lightboxEmoji").textContent = $(".photo-emoji", item)?.textContent || "🐾";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}
$("#closeLightbox").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeLightbox(); });

// Diario: desplegar anécdotas
$$(".timeline-entry").forEach(entry => {
  entry.addEventListener("click", () => {
    const expanded = entry.getAttribute("aria-expanded") === "true";
    entry.setAttribute("aria-expanded", String(!expanded));
  });
});

// Test interactivo
const questions = [
  { question: "¿Qué raza es Floky?", options: ["Golden retriever", "Perro salchicha", "Caniche"], answer: 1, correct: "¡Exacto! Floky es un perro salchicha.", wrong: "¡Casi! Floky es un perro salchicha." },
  { question: "¿Qué suele hacer Floky cuando se acerca alguien desconocido a casa?", options: ["Se pone a ladrar", "Le prepara café", "Se pone a cantar"], answer: 0, correct: "¡Correcto! El guardián de la casa está de servicio.", wrong: "Pista: Floky se toma muy en serio la seguridad de la casa." },
  { question: "¿Qué recompensa aparece en sus negociaciones por la patita?", options: ["Una zanahoria", "Un juguete de oficina", "Un pedacito de pollito"], answer: 2, correct: "¡Bien! El pollo es una moneda de negociación muy importante.", wrong: "¡No! La recompensa estrella es un pedacito de pollito." }
];
let questionIndex = 0;
let score = 0;
let answered = false;
function renderQuestion() {
  const q = questions[questionIndex];
  $("#questionCount").textContent = `PREGUNTA ${questionIndex + 1} DE ${questions.length}`;
  $("#quizScore").textContent = `🐾 ${score} ${score === 1 ? "punto" : "puntos"}`;
  $("#progressBar").style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
  $("#questionText").textContent = q.question;
  $("#quizFeedback").textContent = "";
  $("#nextQuestion").disabled = true;
  $("#nextQuestion").textContent = questionIndex === questions.length - 1 ? "Ver resultado →" : "Siguiente pregunta →";
  answered = false;
  const options = $("#quizOptions");
  options.innerHTML = "";
  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.textContent = option;
    button.addEventListener("click", () => chooseAnswer(index));
    options.appendChild(button);
  });
}
function chooseAnswer(index) {
  if (answered) return;
  answered = true;
  const q = questions[questionIndex];
  const buttons = $$(".quiz-option", $("#quizOptions"));
  buttons.forEach((button, i) => {
    button.disabled = true;
    if (i === q.answer) button.classList.add("correct");
    if (i === index && index !== q.answer) button.classList.add("incorrect");
  });
  if (index === q.answer) score++;
  $("#quizScore").textContent = `🐾 ${score} ${score === 1 ? "punto" : "puntos"}`;
  $("#quizFeedback").textContent = index === q.answer ? q.correct : q.wrong;
  $("#nextQuestion").disabled = false;
}
$("#nextQuestion").addEventListener("click", () => {
  if (!answered) return;
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    $("#questionCount").textContent = "RESULTADO FINAL";
    $("#questionText").textContent = score === 3 ? "¡Eres parte del círculo íntimo de Floky! 🏆" : score >= 2 ? "¡Conoces bastante bien a Floky! 🐾" : "¡Te toca pasar más tiempo con Floky! 🖤";
    $("#quizOptions").innerHTML = "";
    $("#quizFeedback").textContent = `Tu puntuación: ${score} de ${questions.length}. ¡Gracias por jugar!`;
    $("#nextQuestion").textContent = "Volver a jugar ↻";
    $("#nextQuestion").disabled = false;
    $("#nextQuestion").onclick = () => { questionIndex = 0; score = 0; $("#nextQuestion").onclick = null; renderQuestion(); };
  }
});
renderQuestion();
$("#year").textContent = new Date().getFullYear();
