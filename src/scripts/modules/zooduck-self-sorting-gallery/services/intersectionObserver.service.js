import config from '../settings/config.settings';
import placeholderAnimationStatus from './placeholderAnimationStatus.service';

const intersectionObserver = (function() {

    let _intersectionObserver;

    const preLoadImage = (imageEl) => {

        const tempPictureEl = document.createElement('picture');

        const pictureSources = imageEl.parentNode.querySelectorAll('source');
        
        if (pictureSources) {
            Array.from(pictureSources).forEach((sourceEl) => {
                const tempSourceEl = document.createElement('source');
                tempSourceEl.setAttribute('media', sourceEl.getAttribute('media'));
                tempSourceEl.setAttribute('srcset', sourceEl.dataset.srcset);
                tempPictureEl.appendChild(tempSourceEl);
            });
        }

        const tempImageEl = new Image();

        tempImageEl.onload = function() {
            loadImageOnIntersect(imageEl);
        }

        tempImageEl.src = imageEl.dataset.src;
        tempPictureEl.appendChild(tempImageEl);
    };

    const loadImageOnIntersect = (imageEl) => {
   
        const delay = placeholderAnimationStatus.completed ? 0 : config.placeholderAnimationDuration * 1000;

        setTimeout(() => {

            imageEl.src = imageEl.dataset.src;

            const pictureEl = imageEl.parentNode;

            if (pictureEl.constructor.name === 'HTMLPictureElement') {
                const sourceEls = pictureEl.querySelectorAll('source');
                Array.from(sourceEls).forEach((sourceEl) => {
                    sourceEl.srcset = sourceEl.dataset.srcset;
                });
            }

        }, delay);

        _intersectionObserver.unobserve(imageEl);
    };

    const intersectHandler = (entries) => {
        entries.forEach(item => {
            if (item.isIntersecting && item.intersectionRatio >= .5) {
                preLoadImage(item.target);
            }
        })
    };

   
    if ('IntersectionObserver' in window && 'isIntersecting' in window.IntersectionObserverEntry.prototype) {
        
        console.warn('IntersectionObserver API support detected! Intersection Ratio: 0.5');
        
        _intersectionObserver = new IntersectionObserver(intersectHandler, {
            root: null,
            threshold: [.5]
        });

        return _intersectionObserver;
        
    } else {
        return false;
    }

})();

export default intersectionObserver;
