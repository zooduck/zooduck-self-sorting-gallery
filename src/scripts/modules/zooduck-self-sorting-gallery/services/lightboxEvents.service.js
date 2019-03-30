const lightboxEvents = (function(){

    let _touchStart = 0;
    let _touchEnd = 0;
    let _touchActive = false;

    const _swipeRegistered = () => {
        const minSwipePixels = window.innerWidth / 10;
        return (_touchStart - _touchEnd) > minSwipePixels || (_touchEnd - _touchStart) > minSwipePixels;
    };

    const _swipeDirection = () => {
        return _touchEnd > _touchStart ? 'right' : 'left';
    };

    const _swipeDistance = () => {
        return _touchEnd - _touchStart;
    };

    return {
        get touchStart() {
            return _touchStart;
        },
        set touchStart(clientX) {
            _touchActive = true;
            return _touchStart = clientX;
        },
        set touchEnd(clientX) {
            _touchEnd = clientX;
            _touchActive = false;           
        },
        get touchActive() {
            return _touchActive;
        },
        get swipeRegistered() {
            return _swipeRegistered();
        },
        get swipeDirection() {
            return _swipeDirection();
        },
        get swipeDistance() {
            return _swipeDistance();
        }
    }
})();

export default lightboxEvents;
