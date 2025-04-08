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

document.querySelectorAll('.carousel').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const dots = carousel.parentElement.querySelectorAll('.carousel-indicators .dot');

    let index = 0;
    const itemWidth = carousel.querySelector('.carousel-item').offsetWidth + 20;

    function updateCarousel() {
        track.style.transform = `translateX(-${index * itemWidth}px)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[Math.floor(index / 2)]?.classList.add('active');
    }

    function isMobile() {
        return window.innerWidth <= 768;
    }

    nextBtn.addEventListener('click', () => {
        if (index < dots.length * 2 - 2) {
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
            if (isMobile()) {
                index = parseInt(e.target.dataset.index) * 2;
                updateCarousel();
            }
        });
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
});

const buttons = document.querySelectorAll('.buttonAcordion');
const openItems = [];

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.icon');

    if (content.classList.contains('open')) {
      content.classList.remove('open');
      icon.classList.remove('fa-angle-up');
      icon.classList.add('fa-angle-down');
      icon.classList.remove('rotate');
      openItems.splice(openItems.indexOf(content), 1);
    } else {
      if (openItems.length >= 1) {
        const oldest = openItems.shift();
        oldest.classList.remove('open');
        const oldIcon = oldest.previousElementSibling.querySelector('.icon');
        oldIcon.classList.remove('fa-angle-up');
        oldIcon.classList.add('fa-angle-down');
        oldIcon.classList.remove('rotate');
      }

      content.classList.add('open');
      icon.classList.remove('fa-angle-down');
      icon.classList.add('fa-angle-up');
      icon.classList.add('rotate');
      openItems.push(content);
    }
  });
});
