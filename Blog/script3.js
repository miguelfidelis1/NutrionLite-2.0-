// Função para rolar suavemente até a seção de artigos
function scrollToArticles() {
    const articlesSection = document.getElementById('blog-articles');
    if (articlesSection) {
        articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        console.error("A seção 'blog-articles' não foi encontrada.");
    }
}

// Função para exibir um modal de alerta estilizado
function showCustomAlert(message) {
    // Cria o elemento do modal
    const modal = document.createElement('div');
    modal.className = 'custom-alert';
    modal.innerHTML = `
        <div class="alert-content">
            <p>${message}</p>
            <button class="close-alert">Fechar</button>
        </div>
    `;

    // Adiciona o modal ao corpo
    document.body.appendChild(modal);

    // Adiciona evento para fechar o modal
    modal.querySelector('.close-alert').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

// Função para configurar interatividade nos links "Leia mais"
function setupReadMoreLinks() {
    const readMoreLinks = document.querySelectorAll('.read-more');
    if (readMoreLinks.length > 0) {
        readMoreLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                showCustomAlert("Essa funcionalidade está em desenvolvimento. Volte em breve!");
            });
        });
    } else {
        console.warn("Nenhum link 'Leia mais' encontrado.");
    }
}

// Inicializa o script após o carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    setupReadMoreLinks();
});
