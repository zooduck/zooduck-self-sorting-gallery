const viewport = (function() {
    const _getViewportWidth = () => {
        return window.innerWidth;
    }
    return {
        get width() {
            return _getViewportWidth();
        }
    }
})();

export default viewport;