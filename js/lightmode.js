document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    const lightModeStyle = document.getElementById('light-mode-style');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Apply saved theme on page load
    if (currentTheme === 'light') {
        lightModeStyle.disabled = false;
        document.body.classList.add('light-mode');
    } else {
        lightModeStyle.disabled = true;
        document.body.classList.remove('light-mode');
    }

    // Toggle theme on icon click
    themeToggle.addEventListener('click', () => {
        if (lightModeStyle.disabled) {
            lightModeStyle.disabled = false;
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            lightModeStyle.disabled = true;
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Toggle theme with keyboard (Enter or Space)
    themeToggle.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            themeToggle.click();
        }
    });
});
