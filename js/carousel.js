document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const carouselImages = document.getElementById('carouselImages');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const pausePlayBtn = document.getElementById('pausePlayBtn'); // Pause/Play Button

    let currentIndex = 1;
    const intervalTime = 12500; // Time in ms (12.5 Seconds)
    let autoSwitch;
    let isPaused = false;

    // Clone images for infinite loop
    const images = Array.from(carouselImages.children);
    const firstClone = images[0].cloneNode(true);
    const lastClone = images[images.length - 1].cloneNode(true);
    carouselImages.appendChild(firstClone);
    carouselImages.insertBefore(lastClone, images[0]);

    carouselImages.style.transform = `translateX(-100%)`;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselImages.style.transition = "transform 0.5s ease-in-out";
        carouselImages.style.transform = `translateX(${offset}%)`;
    }

    function resetPosition() {
        if (currentIndex === 0) {
            carouselImages.style.transition = "none";
            currentIndex = images.length;
            carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
        } else if (currentIndex === images.length + 1) {
            carouselImages.style.transition = "none";
            currentIndex = 1;
            carouselImages.style.transform = `translateX(-100%)`;
        }
    }

    function nextImage() {
        currentIndex++;
        updateCarousel();
        setTimeout(resetPosition, 500);
    }

    function prevImage() {
        currentIndex--;
        updateCarousel();
        setTimeout(resetPosition, 500);
    }

    // Start the progress bar animation
    function startProgressBar() {
        progressBar.style.transition = `width ${intervalTime}ms linear`;
        progressBar.style.width = "100%";
    }

    // Reset and restart the progress bar
    function resetProgressBar() {
        progressBar.style.transition = "none";
        progressBar.style.width = "0%";
        
        // Force reflow to apply the width reset
        void progressBar.offsetWidth;
        
        // Start the progress bar animation
        startProgressBar();
    }

    // Stop the progress bar
    function stopProgressBar() {
        progressBar.style.transition = "none";
        progressBar.style.width = "0%";
    }

    // Start auto-switching images and manage the progress bar
    function startAutoSwitch() {
        clearInterval(autoSwitch);
        autoSwitch = setInterval(() => {
            nextImage();
            resetProgressBar();
        }, intervalTime);
        startProgressBar(); // Ensure the progress bar starts
    }

    // Stop auto-switching images without resetting the progress bar
    function stopAutoSwitch() {
        clearInterval(autoSwitch);
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', () => {
        stopAutoSwitch();
        prevImage();
        if (!isPaused) { // Only reset and start if not paused
            resetProgressBar();
            startAutoSwitch();
        }
    });

    nextBtn.addEventListener('click', () => {
        stopAutoSwitch();
        nextImage();
        if (!isPaused) { // Only reset and start if not paused
            resetProgressBar();
            startAutoSwitch();
        }
    });

    // Pause/Play Button Functionality
    pausePlayBtn.addEventListener('click', () => {
        if (!isPaused) {
            // Pause the carousel
            isPaused = true;
            stopAutoSwitch();
            stopProgressBar();
            pausePlayBtn.innerHTML = '&#9654;'; // Play Icon
        } else {
            // Play the carousel
            isPaused = false;
            resetProgressBar();
            startAutoSwitch();
            pausePlayBtn.innerHTML = '&#10074;&#10074;'; // Pause Icon
        }
    });

    // Initialize
    resetProgressBar();
    startAutoSwitch();

    // Handle transition end
    carouselImages.addEventListener('transitionend', resetPosition);
});
