const docBody = (function() {
    return {
        disableScroll() {
            document.body.style.overflow = 'hidden';
        },
        allowScroll() {
            document.body.style.overflow = 'auto';
        }
    }
})();

export default docBody;
