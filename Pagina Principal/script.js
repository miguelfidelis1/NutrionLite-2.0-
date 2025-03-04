// Primeira parte: funcionalidades do site principal

// Função de busca
function search() {
    const query = document.getElementById('search').value.toLowerCase();
    if (query) {
        alert(`Você buscou por: "${query}". Funcionalidade em desenvolvimento.`);
    }
}

// Função de abertura do chat
function openChat() {
    alert('Chat iniciado! Em breve, você será atendido por um especialista.');
}

// Código do carrossel
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slides img');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

// Função para avançar o slide automaticamente
function autoSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

// Iniciar o slide automático a cada 3 segundos
setInterval(autoSlide, 3000);

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
});

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
});

showSlide(currentIndex);

// MESSAGE INPUT
const textarea = document.querySelector('.chatbox-message-input');
const chatboxForm = document.querySelector('.chatbox-message-form');

textarea.addEventListener('input', function () {
    let line = textarea.value.split('\n').length;

    if (textarea.rows < 6 || line < 6) {
        textarea.rows = line;
    }

    if (textarea.rows > 1) {
        chatboxForm.style.alignItems = 'flex-end';
    } else {
        chatboxForm.style.alignItems = 'center';
    }
});

// TOGGLE CHATBOX
const chatboxToggle = document.querySelector('.chatbox-toggle');
const chatboxMessage = document.querySelector('.chatbox-message-wrapper');

chatboxToggle.addEventListener('click', function () {
    chatboxMessage.classList.toggle('show');
});

// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle');
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu');

dropdownToggle.addEventListener('click', function () {
    dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', function (e) {
    if (!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
        dropdownMenu.classList.remove('show');
    }
});

// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector('.chatbox-message-content');
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message');

chatboxForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (isValid(textarea.value)) {
        writeMessage();
        setTimeout(autoReply, 1000);
    }
});

function addZero(num) {
    return num < 10 ? '0' + num : num;
}

function writeMessage() {
    const today = new Date();
    let message = `
        <div class="chatbox-message-item sent">
            <span class="chatbox-message-item-text">
                ${textarea.value.trim().replace(/\n/g, '<br>\n')}
            </span>
            <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
        </div>
    `;
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
    chatboxForm.style.alignItems = 'center';
    textarea.rows = 1;
    textarea.focus();
    textarea.value = '';
    chatboxNoMessage.style.display = 'none';
    scrollBottom();
}

function autoReply() {
    const today = new Date();
    let message = `
        <div class="chatbox-message-item received">
            <span class="chatbox-message-item-text">
                Thank you for your awesome support!
            </span>
            <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
        </div>
    `;
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
    scrollBottom();
}

function scrollBottom() {
    chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight);
}

function isValid(value) {
    let text = value.replace(/\n/g, '');
    text = text.replace(/\s/g, '');

    return text.length > 0;
}

// Segunda parte removida (verificação de login e redirecionamento)
