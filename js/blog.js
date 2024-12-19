// Copy to clipboard function for code sections
function copyToClipboard(event) {
    // Get the parent .code-container of the button clicked
    const container = event.target.closest('.code-container');

    // Find the <code> element within this container
    const codeBlock = container.querySelector('pre code');

    // Get the innerText of the code block (preserves new lines and formatting)
    const codeText = codeBlock.innerText.trim();

    // Create a temporary textarea to hold the code text
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = codeText;
    document.body.appendChild(tempTextArea);

    // Copy to clipboard
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    // Notify the user
    const copyButton = container.querySelector('.copy-btn');
    copyButton.textContent = "Copied!";
    setTimeout(() => (copyButton.textContent = "Copy"), 2000);
}


// Smooth scrolling for quick links
document.querySelectorAll('.tableOfContents a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default jump

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Dynamically get the header height
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const offset = headerHeight + 20; // Add some extra space for padding
            const targetPosition = targetElement.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth' // Enables smooth scrolling
            });
        }
    });
});
