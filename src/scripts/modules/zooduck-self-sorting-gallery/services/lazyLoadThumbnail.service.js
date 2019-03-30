import config from '../settings/config.settings';
import intersectionObserver from './intersectionObserver.service';
import placeholderAnimationStatus from './placeholderAnimationStatus.service';

const lazyLoadThumbnail = () => {

    const _delayLoad = (imageEl, animate = true) => {

        const delay = (placeholderAnimationStatus.completed || animate === false) ? 0 : config.placeholderAnimationDuration * 1000;

        setTimeout(() => {

            if (intersectionObserver) {
                return;
            }
            
            imageEl.src = imageEl.dataset.src;

            const pictureEl = imageEl.parentNode;

            if (pictureEl.constructor.name === 'HTMLPictureElement') {
                const sourceEls = pictureEl.querySelectorAll('source');
                Array.from(sourceEls).forEach((sourceEl) => {
                    sourceEl.srcset = sourceEl.dataset.srcset;
                });
            }

        }, delay); // TODO: Make placeholder animation duration part of config
    };

    const _preLoadImage = (imageData, animate = true) => {

        const imageEl = imageData.pictureThumbnail.querySelector('img');

         imageEl.src = imageData.placeholderUrl;

        if (!imageEl.dataset.src) {
            return;
        }

        // Use IntersectionObserver API if supported!
        if (intersectionObserver) {
            return intersectionObserver.observe(imageEl);
        }

        const tempPictureEl = document.createElement('picture');

        if (imageData.thumbnail.sources) {
            imageData.thumbnail.sources.forEach((sourceData) => {
                // console.log(sourceData);
                const tempSourceEl = document.createElement('source');
                tempSourceEl.setAttribute('media', sourceData.media);
                tempSourceEl.setAttribute('srcset', sourceData.srcset);
                tempPictureEl.appendChild(tempSourceEl);
            });
        }

        const tempImageEl = new Image();

        tempImageEl.onload = function() {
            _delayLoad(imageEl, animate);
        }

        tempImageEl.src = imageEl.dataset.src;
        tempPictureEl.appendChild(tempImageEl);
   
    };

    return {
        loadImage(imageData, animate = true) {
            return _preLoadImage(imageData, animate);
        },
        set placeholderAnimationStatus(status) {
            _placeholderAnimationStatus = status;
        }
    }

};

export default lazyLoadThumbnail;
