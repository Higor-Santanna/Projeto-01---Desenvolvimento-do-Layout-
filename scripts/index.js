document.addEventListener('DOMContentLoaded', function() {
    const searchButtons = document.querySelectorAll('#searchButton, #searchButtonMobile');
    const searchInputs = document.querySelectorAll('#searchInput, #searchInputMobile');
    const searchResults = document.querySelectorAll('#searchResult, #searchResultMobile');
    const buttonCategories = document.getElementById('buttonCategories');
    const buttonDepatments = document.getElementById('buttonDepatments');
    const tooltip = document.getElementById('tooltip');
    const infoDepatments = document.getElementById('infoDepatments');

    function resultSearch(input, result) {
        const searchTerm = input.value.trim();
        result.textContent = searchTerm ? `Você buscou por: ${searchTerm}` : 'O campo está vazio, por favor digite algo!';
    }

    searchButtons.forEach((button, index) => {
        button.addEventListener('click', () => resultSearch(searchInputs[index], searchResults[index]));
    });

    searchInputs.forEach((input, index) => {
        input.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                resultSearch(input, searchResults[index]);
            }
        });
    });

    function toggleTooltip() {
        const isActive = tooltip.style.display === "block";
        tooltip.style.display = isActive ? "none" : "block";
        infoDepatments.style.display = "none"; // Esconde a outra div

        // Alterna entre active e inactive
        buttonCategories.classList.toggle('active', !isActive);
        buttonCategories.classList.toggle('inactive', isActive);
        buttonDepatments.classList.remove('active');
        buttonDepatments.classList.add('inactive');
    }

    function toggleInfoDepatments() {
        const isActive = infoDepatments.style.display === "block";
        infoDepatments.style.display = isActive ? "none" : "block";
        tooltip.style.display = "none"; // Esconde a outra div

        // Alterna entre active e inactive
        buttonDepatments.classList.toggle('active', !isActive);
        buttonDepatments.classList.toggle('inactive', isActive);
        buttonCategories.classList.remove('active');
        buttonCategories.classList.add('inactive');
    }

    // Estado inicial: ambos começam inativos
    buttonCategories.classList.add('inactive');
    buttonDepatments.classList.add('inactive');

    // Eventos de clique
    buttonCategories.addEventListener("click", toggleTooltip);
    buttonDepatments.addEventListener("click", toggleInfoDepatments);
});

const track = document.querySelector('.carousel-track');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dots = document.querySelectorAll('.dot');

let index = 0;
const itemWidth = document.querySelector('.carousel-item').offsetWidth + 20;

function updateCarousel() {
    track.style.transform = `translateX(-${index * itemWidth}px)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[Math.floor(index / 2)]?.classList.add('active'); // Atualiza o indicador
}

// Função para verificar o tamanho da tela
function isMobile() {
    return window.innerWidth <= 768;
}

nextBtn.addEventListener('click', () => {
    if (index < dots.length * 2 - 2) { // Considera avanço de 2 em 2
        index += 2;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index -= 2;
        updateCarousel();
    }
});

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        if (isMobile()) { // Só permite interação nos pontos se a tela for <= 600px
            index = parseInt(e.target.dataset.index) * 2; // Pula de dois em dois
            updateCarousel();
        }
    });
});

window.addEventListener('resize', updateCarousel); // Garante atualização ao redimensionar

updateCarousel();
