const searchInput = document.querySelector('[data-search]');
const searchableCards = Array.from(document.querySelectorAll('[data-search-card]'));

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.trim().toLowerCase();

    searchableCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(term) ? '' : 'none';
    });
  });
}

const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((link) => {
  const href = link.getAttribute('href');
  if (!href) return;
  if (href.endsWith(currentPath)) link.classList.add('active');
});
