document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.about-gallery');
    if (!gallery) return;

    const photos = Array.from(gallery.querySelectorAll('.about-gallery__photo'));
    const thumbnails = Array.from(gallery.querySelectorAll('[data-photo]'));
    const count = gallery.querySelector('.about-gallery__count');
    const pauseButton = gallery.querySelector('[data-gallery-pause]');
    const stage = gallery.querySelector('.about-gallery__stage');
    let index = 0;
    let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer;

    function updatePlayback() {
        clearInterval(timer);
        pauseButton.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
        pauseButton.textContent = paused ? '\u25b6' : '\u275a\u275a';
        // Automatic changes stay quiet; manually selected photos are announced.
        stage.setAttribute('aria-live', paused ? 'polite' : 'off');
        if (!paused && !document.hidden) {
            timer = setInterval(() => show(index + 1), 12500);
        }
    }

    function show(nextIndex) {
        index = (nextIndex + photos.length) % photos.length;
        photos.forEach((photo, i) => { photo.hidden = i !== index; });
        thumbnails.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
        count.replaceChildren(document.createTextNode(`${String(index + 1).padStart(2, '0')} `));
        const total = document.createElement('span');
        total.textContent = `/ ${String(photos.length).padStart(2, '0')}`;
        count.appendChild(total);
    }

    function select(nextIndex) {
        // Leave a manually selected photo visible until playback is resumed.
        paused = true;
        updatePlayback();
        show(nextIndex);
    }

    thumbnails.forEach((button, i) => button.addEventListener('click', () => select(i)));
    gallery.querySelector('[data-gallery-prev]').addEventListener('click', () => select(index - 1));
    gallery.querySelector('[data-gallery-next]').addEventListener('click', () => select(index + 1));
    pauseButton.addEventListener('click', () => {
        paused = !paused;
        updatePlayback();
    });
    document.addEventListener('visibilitychange', updatePlayback);
    updatePlayback();
});
