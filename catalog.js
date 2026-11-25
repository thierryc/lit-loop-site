const search = document.querySelector('#filter');
const sections = document.querySelectorAll('.catalog-section');
const result = document.querySelector('#result');
function filterCatalog() {
  const terms = search.value.trim().toLowerCase().split(/\s+/);
  let count = 0;
  for (const section of sections) {
    let visible = 0;
    for (const card of section.querySelectorAll('article')) {
      const words = card.textContent.toLowerCase().split(/[^a-z0-9.-]+/);
      card.hidden = !terms.every(term => words.some(word => word.startsWith(term)));
      if (!card.hidden) visible++;
    }
    section.hidden = visible === 0;
    document.querySelector('.catalog-index a[href="#' + section.id + '"]').hidden = section.hidden;
    count += visible;
  }
  result.textContent = count ? count + (count === 1 ? ' model family' : ' model families') : 'No matching models';
}
search.addEventListener('input', filterCatalog);
filterCatalog();
document.querySelector('#catalog-search').hidden = false;
