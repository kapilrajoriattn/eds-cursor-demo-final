/**
 * Byline block — author card with photo, name, occupation, and social links.
 * Expected content model (one row, two columns):
 *   Col 1: Author photo (picture/img)
 *   Col 2: Author name (strong), occupation (p), social links (ul > li > a)
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  if (!rows.length) return;

  const row = rows[0];
  const cols = [...row.querySelectorAll(':scope > div')];

  const imageCol = cols[0];
  const infoCol = cols[1];

  if (!imageCol || !infoCol) return;

  // Wrap image in a figure
  const img = imageCol.querySelector('img');
  if (img) {
    img.classList.add('byline-photo');
    img.removeAttribute('loading');
  }

  // Extract social links and add icon class hints
  const socialList = infoCol.querySelector('ul');
  if (socialList) {
    socialList.classList.add('byline-social');
    [...socialList.querySelectorAll('a')].forEach((a) => {
      const network = a.textContent.trim().toLowerCase();
      a.setAttribute('aria-label', a.textContent.trim());
      a.dataset.network = network;
      a.title = a.textContent.trim();
    });
  }

  // Add semantic classes
  imageCol.classList.add('byline-image');
  infoCol.classList.add('byline-info');

  const name = infoCol.querySelector('strong');
  if (name) {
    const nameWrapper = name.closest('p') || name;
    nameWrapper.classList.add('byline-name');
  }

  const occupation = infoCol.querySelector('p:not(.byline-name)');
  if (occupation) occupation.classList.add('byline-occupation');
}
