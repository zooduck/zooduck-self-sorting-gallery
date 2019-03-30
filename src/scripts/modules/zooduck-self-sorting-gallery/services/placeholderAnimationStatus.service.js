const placeholderAnimationStatus = (function() {
    let _placeholderAnimationsCompleted = false;
    return {
        get completed() {
            return _placeholderAnimationsCompleted;
        },
        set completed(bool) {
            _placeholderAnimationsCompleted = bool;
        }
    }
})();

export default placeholderAnimationStatus;
