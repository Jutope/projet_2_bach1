document.addEventListener('DOMContentLoaded', () => {
  const q = window.location.search || '';
  const h = window.location.hash || '';

  const splitFile = (file) => {
    const dot = file.lastIndexOf('.');
    return {
      name: dot !== -1 ? file.substring(0, dot) : file,
      ext: dot !== -1 ? file.substring(dot) : '.html',
    };
  };

  const ensureIndexIfDir = (urlObj) => {
    if (urlObj.pathname.endsWith('/')) {
      urlObj.pathname += 'index.html';
    }
  };

  const toggleFile = (file) => {
    const { name, ext } = splitFile(file);
    return (name.endsWith('_en') ? name.slice(0, -3) : name + '_en') + ext;
  };

  const toEnglishPathname = (pathname) => {
    if (pathname.endsWith('/')) {
      return pathname + 'index_en.html';
    }
    const file = pathname.substring(pathname.lastIndexOf('/') + 1) || 'index.html';
    const dir = pathname.slice(0, pathname.lastIndexOf('/') + 1);
    const { name, ext } = splitFile(file);
    const enName = name.endsWith('_en') ? name : name + '_en';
    return dir + enName + ext;
  };

  const isEnglishPage = (() => {
    const path = window.location.pathname;
    const last = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    const { name } = splitFile(last);
    return name.endsWith('_en');
  })();

  const toggleBtn = document.querySelector('#bloc_bouton_header .cta');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const path = window.location.pathname;
      const last = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
      const dir = path.substring(0, path.lastIndexOf('/'));
      const newFile = toggleFile(last);
      window.location.href = `${dir}/${newFile}${q}${h}`;
    });
  }

  if (isEnglishPage) {
    document.body.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a) return;

      const href = a.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        /^https?:\/\//i.test(href)
      ) {
        return;
      }

      e.preventDefault();
      const target = new URL(href, window.location.href);
      const file = target.pathname.substring(target.pathname.lastIndexOf('/') + 1) || 'index.html';
      const { name } = splitFile(file);
      if (name.endsWith('_en')) {
        window.location.href = target.href;
        return;
      }

      const enPath = toEnglishPathname(target.pathname);
      target.pathname = enPath;
      window.location.href = target.href;
    });
  }
});
