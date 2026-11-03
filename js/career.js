(() => {
    const journey = document.querySelector('.career__journey');
    if (!journey) return;

    const stops = [...journey.querySelectorAll('.career-stop')];
    const pins = [...journey.querySelectorAll('.career-map__stop')];
    const paths = [...journey.querySelectorAll('.career-map__progress')];
    const glows = [...journey.querySelectorAll('.career-map__glow')];
    const drawing = journey.querySelector('.career-map__drawing');
    const traveler = journey.querySelector('.career-map__traveler');
    const caption = journey.querySelector('.career-map__title');
    const date = journey.querySelector('.career-map__date');
    const count = journey.querySelector('.career-map__count');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia('(max-width: 700px)');
    let lengths = [];
    let positions = [];
    let frame = 0;
    let active = -1;

    function render() {
        frame = 0;
        // On mobile, keep the reading point below the sticky mini-map.
        const readingPoint = window.scrollY + window.innerHeight * (window.innerWidth <= 700 ? .7 : .55);
        let index = 0;
        while (index < positions.length - 1 && readingPoint >= positions[index + 1]) index++;
        const next = Math.min(index + 1, positions.length - 1);
        const fraction = next === index ? 1 : Math.max(0, Math.min(1,
            (readingPoint - positions[index]) / (positions[next] - positions[index])));

        paths.forEach((path, i) => {
            const progress = reducedMotion.matches ? (i < index ? 1 : 0) :
                (i < index ? 1 : i === index ? fraction : 0);
            [path, glows[i]].forEach(line => {
                line.style.strokeDasharray = `${lengths[i]} ${lengths[i]}`;
                line.style.strokeDashoffset = lengths[i] * (1 - progress);
            });
        });

        const segment = Math.min(index, paths.length - 1);
        const point = paths[segment].getPointAtLength(lengths[segment] * (index === paths.length ? 1 : fraction));
        traveler.setAttribute('transform', `translate(${point.x} ${point.y})`);
        // Let the waypoint ring mark arrivals without covering its number.
        traveler.setAttribute('opacity', index === paths.length || fraction < .04 || fraction > .96 ? '0' : '1');

        if (active !== index) {
            active = index;
            stops.forEach((stop, i) => stop.classList.toggle('is-active', i === index));
            pins.forEach((pin, i) => {
                pin.classList.toggle('is-visited', i <= index);
                if (i === index) pin.setAttribute('aria-current', 'step');
                else pin.removeAttribute('aria-current');
            });
            caption.textContent = stops[index].querySelector('h2').textContent;
            date.textContent = stops[index].querySelector('time').textContent;
            count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(stops.length).padStart(2, '0')}`;
        }
    }

    function schedule() {
        if (!frame) frame = requestAnimationFrame(render);
    }

    function measure() {
        // A horizontal route keeps all five waypoints usable on small screens.
        drawing.setAttribute('viewBox', compact.matches ? '0 0 520 200' : '0 0 520 620');
        journey.querySelectorAll('[data-desktop-path]').forEach(path => {
            path.setAttribute('d', compact.matches ? path.dataset.mobilePath : path.dataset.desktopPath);
        });
        pins.forEach(pin => {
            pin.setAttribute('transform', `translate(${compact.matches ? pin.dataset.mobilePosition : pin.dataset.desktopPosition})`);
        });
        lengths = paths.map(path => path.getTotalLength());
        positions = stops.map(stop => {
            const card = stop.querySelector('.career-stop__card').getBoundingClientRect();
            return window.scrollY + card.top;
        });
        schedule();
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure, { once: true });
    reducedMotion.addEventListener('change', schedule);
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(journey);
    if (document.fonts) document.fonts.ready.then(measure);
    measure();
})();
