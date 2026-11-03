/* Native dialog supplies focus containment, Escape and focus restoration. */
(() => {
    const dialog = document.querySelector('.case-lightbox');
    if (!dialog) return;
    const image = dialog.querySelector('img');
    document.querySelectorAll('[data-case-image]').forEach(button => {
        button.addEventListener('click', () => {
            const source = button.querySelector('img');
            image.src = source.currentSrc || source.src;
            image.alt = source.alt;
            dialog.showModal();
        });
    });
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
        const rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right ||
            event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
})();
