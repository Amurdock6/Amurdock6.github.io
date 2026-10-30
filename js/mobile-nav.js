(() => {
  const toggle = document.getElementById('toggle');
  const panel = document.getElementById('resize');
  if (!toggle || !panel) return;
  const close = panel.querySelector('.close-btn');
  if (!close) return;
  const mobile = matchMedia('(max-width: 1100px)');
  const backdrop = document.createElement('div');
  backdrop.className = 'mobile-nav-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  // Keep the dialog outside the content that becomes inert while it is open.
  document.body.append(backdrop, panel);
  panel.inert = true;
  let previousOverflow = '';
  let inertElements = [];
  let open = false;
  const setOpen = (next, restoreFocus = true) => {
    if (open === next || (next && !mobile.matches)) return;
    open = next;
    panel.classList.toggle('active', open);
    backdrop.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (open) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      panel.inert = false;
      panel.setAttribute('aria-hidden', 'false');
      close.focus({ preventScroll: true });
      inertElements = [...document.body.children].filter(element =>
        element !== panel && element !== backdrop && !element.inert);
      inertElements.forEach(element => { element.inert = true; });
    } else {
      inertElements.forEach(element => { element.inert = false; });
      inertElements = [];
      document.body.style.overflow = previousOverflow;
      if (restoreFocus) toggle.focus({ preventScroll: true });
      else if (panel.contains(document.activeElement)) document.activeElement.blur();
      panel.inert = true;
      panel.setAttribute('aria-hidden', 'true');
    }
  };
  toggle.addEventListener('click', () => setOpen(!open));
  close.addEventListener('click', () => setOpen(false));
  backdrop.addEventListener('click', () => setOpen(false));
  const links = [...panel.querySelectorAll('a[href]')];
  const updateCurrent = () => {
    const path = location.pathname.replace(/\/$/, '/index.html');
    links.forEach(link => {
      const url = new URL(link.href);
      const matches = url.pathname === path && url.hash === location.hash;
      link.removeAttribute('aria-current');
      if (matches) link.setAttribute('aria-current', url.hash ? 'location' : 'page');
    });
  };
  updateCurrent();
  window.addEventListener('hashchange', updateCurrent);
  links.forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => {
    if (!open) return;
    if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
    if (event.key === 'Tab') {
      const items = [...panel.querySelectorAll('button, a[href]')];
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  mobile.addEventListener('change', event => {
    if (!event.matches) setOpen(false, false);
  });
  window.addEventListener('pagehide', () => setOpen(false, false));
})();
