$(document).ready(function () {
    $('img[data-enlargeable]').addClass('img-enlargeable img-background').click(function () {
        var src = $(this).attr('src');
        var modal, background;

        function removeModal() {
            if (modal) {
                modal.remove();
                $('body').off('keyup.modal-close');
                $('body').css('overflow', 'auto'); // Re-enable scrolling
            }
        }

        function removeBackground() {
            if (background) {
                background.remove();
                $('body').off('keyup.background-close');
                $('body').css('overflow', 'auto'); // Re-enable scrolling
            }
        }

        // Before creating modal and background
        $('body').css('overflow', 'hidden'); // Disable scrolling

        // Create modal
        modal = $('<div>').css({
            background: `rgba(0,0,0,0) url(${src}) no-repeat center`,
            backgroundSize: 'contain',
            width: '100%',
            height: '80%',
            position: 'fixed',
            zIndex: '10000',
            top: '10%',
            left: '0',
            cursor: 'zoom-out'
        }).click(function () {
            removeModal();
            removeBackground();
        }).appendTo('body');

        // Handle ESC key for modal
        $('body').on('keyup.modal-close', function (e) {
            if (e.key === 'Escape') {
                removeModal();
                removeBackground();
            }
        });

        // Create background overlay
        background = $('<div>').css({
            background: 'rgba(0,0,0,0.5)',
            width: '100%',
            height: '100%',
            position: 'fixed',
            zIndex: '9000',
            top: '0',
            left: '0',
            cursor: 'zoom-out'
        }).click(function () {
            // Optional: You can remove modal and background here if desired
        }).appendTo('body');

        // Handle ESC key for background
        $('body').on('keyup.background-close', function (e) {
            if (e.key === 'Escape') {
                removeModal();
                removeBackground();
            }
        });
    });
});