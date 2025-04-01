document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const searchResult = document.getElementById('searchResult');

    function resultSearch() {
        const searchTerm = searchInput.value.trim();
        searchResult.textContent = searchTerm ? `Você busco por: ${searchTerm}` : 'O campo está vazio, por favor digite algo!';
    }

    searchButton.addEventListener('click', resultSearch);
    
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            resultSearch();
        }
    });
});