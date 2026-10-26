(() => {
    const courses = document.querySelector('.education__courses');
    document.querySelectorAll('a[href="#courses"]').forEach(link => {
        link.addEventListener('click', () => { if (courses) courses.open = true; });
    });
    if (location.hash === '#courses' && courses) courses.open = true;
    const viewer = document.querySelector('.certificate-viewer');
    if (!viewer || typeof viewer.showModal !== 'function') return;
    const preview = viewer.querySelector('img');
    let trigger;
    document.querySelectorAll('.credential:not(.credential--external)').forEach(link => {
        link.addEventListener('click', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            trigger = link;
            preview.src = link.href;
            preview.alt = link.querySelector('img').alt;
            viewer.setAttribute('aria-label', preview.alt);
            viewer.showModal();
            document.documentElement.classList.add('certificate-open');
        });
    });
    viewer.querySelector('button').addEventListener('click', () => viewer.close());
    viewer.addEventListener('click', event => {
        if (event.target === viewer || event.target === preview) viewer.close();
    });
    viewer.addEventListener('close', () => {
        document.documentElement.classList.remove('certificate-open');
        trigger?.focus({ preventScroll: true });
    });
})();
