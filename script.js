// script/script.js
document.addEventListener('DOMContentLoaded', () => {
  // Le bouton de changement de langue (déjà présent dans tes pages)
  const toggleBtn = document.querySelector('#bloc_bouton_header .cta');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Chemin actuel (ex: /la_rotonde/la_rotonde.html)
    const path = window.location.pathname;

    // Sépare dossier et fichier
    const lastSlash = path.lastIndexOf('/');
    const dir = path.substring(0, lastSlash);       // ex: /la_rotonde
    let file = path.substring(lastSlash + 1);        // ex: la_rotonde.html

    // Cas de figure rare: URL terminant par un / (ex: /index/)
    if (!file) file = 'index.html';

    // Conserve query string et hash si présents
    const q = window.location.search || '';
    const h = window.location.hash || '';

    // Sépare nom de fichier et extension
    const dot = file.lastIndexOf('.');
    const ext = dot !== -1 ? file.substring(dot) : '.html';
    const name = dot !== -1 ? file.substring(0, dot) : file;

    // Si la page finit par _en => on retire le suffixe, sinon on l'ajoute
    const isEnglish = name.endsWith('_en');
    const base = isEnglish ? name.slice(0, -3) : (name + '_en');
    const targetFile = base + ext;

    // Reconstruit l'URL cible en conservant query + hash
    const newUrl = `${dir}/${targetFile}${q}${h}`;
    window.location.href = newUrl;
  });
});