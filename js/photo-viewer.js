(() => {
    const trigger = document.querySelector('.essay-post__image');
    const dialog = document.querySelector('.photo-viewer');
    const stage = dialog.querySelector('.photo-viewer__stage');
    const image = stage.querySelector('img');
    let zoom = 1, x = 0, y = 0, fit = 1, drag = null;
    function render() {
        const width = image.naturalWidth * fit * zoom;
        const height = image.naturalHeight * fit * zoom;
        const limitX = Math.max(0, (width - stage.clientWidth) / 2);
        const limitY = Math.max(0, (height - stage.clientHeight) / 2);
        x = Math.max(-limitX, Math.min(limitX, x));
        y = Math.max(-limitY, Math.min(limitY, y));
        image.style.width = `${width}px`;
        image.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    }
    function resize() {
        fit = Math.min(stage.clientWidth / image.naturalWidth, stage.clientHeight / image.naturalHeight, 1);
        render();
    }
    function changeZoom(factor) {
        zoom = Math.max(1, Math.min(Math.max(8, 1 / fit), zoom * factor));
        render();
    }
    trigger.addEventListener('click', async event => {
        event.preventDefault();
        await image.decode();
        zoom = 1; x = 0; y = 0;
        dialog.showModal();
        document.documentElement.classList.add('photo-viewer-open');
        resize();
        dialog.querySelector('[data-close]').focus();
    });
    dialog.querySelector('[data-close]').onclick = () => dialog.close();
    dialog.querySelector('[data-zoom-in]').onclick = () => changeZoom(1.6);
    dialog.querySelector('[data-zoom-out]').onclick = () => changeZoom(1 / 1.6);
    dialog.addEventListener('close', () => {
        document.documentElement.classList.remove('photo-viewer-open');
        drag = null;
        trigger.focus();
    });
    stage.addEventListener('wheel', event => {
        event.preventDefault();
        changeZoom(event.deltaY < 0 ? 1.15 : 1 / 1.15);
    }, { passive: false });
    stage.addEventListener('pointerdown', event => {
        if (event.button !== 0) return;
        drag = { id: event.pointerId, startX: event.clientX, startY: event.clientY, x, y };
        stage.setPointerCapture(event.pointerId);
    });
    stage.addEventListener('pointermove', event => {
        if (!drag || drag.id !== event.pointerId) return;
        x = drag.x + event.clientX - drag.startX;
        y = drag.y + event.clientY - drag.startY;
        render();
    });
    stage.addEventListener('lostpointercapture', () => { drag = null; });
    stage.addEventListener('pointerup', event => {
        if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
        drag = null;
    });
    stage.addEventListener('keydown', event => {
        const moves = { ArrowLeft: [80, 0], ArrowRight: [-80, 0], ArrowUp: [0, 80], ArrowDown: [0, -80] };
        if (moves[event.key]) {
            event.preventDefault();
            x += moves[event.key][0]; y += moves[event.key][1]; render();
        }
    });
    window.addEventListener('resize', () => { if (dialog.open) resize(); });
})();
