import Lightbox from '../models/Lightbox.model';
import galleries from '../services/galleries.service';
import lightboxEvents from '../services/lightboxEvents.service';
import docBody from './docBody.service.';

const lightbox = (function() {

    let config;
    let activeHeroLoaded = false;
    let activeHero;
    let lightboxActive = false;
    let lightboxInitialOrientation = screen.orientation.angle;
    let activeImageIndex = 0;
    let lightboxTimeouts = [];
    let lastSwipeDirection = 'left';

    const _loadHero = () => {

        // Add the loaded hero image to the lightbox

        if (activeHeroLoaded) {
            return;
        }

        const pictureEl = activeHero.pictureHero;

        if (pictureEl.constructor.name === 'HTMLPictureElement') {
            const sourceEls = pictureEl.querySelectorAll('source');
            Array.from(sourceEls).forEach((sourceEl) => {
                sourceEl.srcset = sourceEl.dataset.srcset;
            });
        }

        if (pictureEl === activeHero.pictureHero) {
            activeHeroLoaded = true;
            pictureEl.querySelector('img').classList.remove('zooduck-lightbox__image--hidden');
            _removePlaceholderBackgroundImage();
            _removeLoadingSpinner();            
        }

    };

    const _loadTinyThumbnail = (imageData) => {

        // Load the currently in use thumbnail for this image
        // -------------------------------------------------------------
        // (So if a thumbnail for this image is already loaded in the
        // gallery, then this promise should resolve immediately)
        // -------------------------------------------------------------

        return new Promise((resolve, reject) => {

            const tempImageEl = new Image();

            tempImageEl.onload = function() {

                if (imageData.id === activeHero.id) {
                    resolve(tinyThumbnail);
                } else {
                    reject('TINY_THUMBNAIL_IS_NOT_ACTIVE_HERO_THUMBNAIL');
                }

            }

            const tinyThumbnailSource = imageData.thumbnail.sources.find( source => window.matchMedia(source.media).matches);
            const tinyThumbnail = tinyThumbnailSource ? tinyThumbnailSource.srcset : imageData.thumbnail.src;

            tempImageEl.src = tinyThumbnail;

        }, err => {
            reject(err);
        });

    };

    const _addPlaceholderBackgroundImage = (url) => {
        lightboxElements.lightboxHeroPlaceholderContainer.style.backgroundImage = `url(${url})`;
    };

    const _removePlaceholderBackgroundImage = () => {
        lightboxElements.lightboxHeroPlaceholderContainer.style.backgroundImage = 'none';
    }

    const _loadTempImage = (imageEl, tempPictureEl) => {

        return new Promise( (resolve, reject) => {
            
            const tempImageEl = new Image();

            tempImageEl.onload = function() {
                if (imageEl.id === activeHero.id) {
                    resolve();
                } else {
                    reject('IMAGE_IS_NOT_ACTIVE_HERO');
                }
            }

            tempPictureEl.appendChild(tempImageEl);

            tempImageEl.src = imageEl.dataset.src;
           
        });

    }

    const _lazyLoadImage = (...imageDataObjects) => {

        imageDataObjects.forEach((imageData, index) => {

            const imageEl = imageData.pictureHero.querySelector('img');    

            if (!imageEl.dataset.src) {
                return;
            }

            const tempPictureEl = document.createElement('picture');

            if (imageData.hero.sources) {
                imageData.hero.sources.forEach((sourceData) => {
                    const tempSourceEl = document.createElement('source');
                    tempSourceEl.setAttribute('media', sourceData.media);
                    tempSourceEl.setAttribute('srcset', sourceData.srcset);
                    tempPictureEl.appendChild(tempSourceEl);
                });
            }

            _loadTempImage(imageEl, tempPictureEl).then( () => {       
                _loadHero();
            }, err => {
                // console.error(err);
            });

        });

    };
   
    const lightboxElements = Lightbox;

    lightboxElements.lightboxCloseCtrl.onclick = () => {
        _closeLightbox();
    };

    const _loadPost = () => {
        const postIndex = (activeImageIndex + 1) >= galleries.currentGallery.images.length ? 0 : (activeImageIndex + 1);
        const imageData = galleries.getImageDataByIndex(postIndex);
        _open(imageData);
    };

    const _loadPre = () => {
        const preIndex = (activeImageIndex - 1) < 0 ? (galleries.currentGallery.images.length - 1) : (activeImageIndex - 1);
        const imageData = galleries.getImageDataByIndex(preIndex);
        _open(imageData);
    }

    const _removeImagesFromLightbox = () => {

        if (lightboxElements.lightboxImageContainer.children) {

            Array.from(lightboxElements.lightboxImageContainer.children).forEach(el => el.parentNode.removeChild(el));
        }

    };

    const _addImageToLightbox = (imageData) => {

        lightboxElements.lightboxImageContainer.appendChild(imageData.pictureHero);
        imageData.pictureHero.querySelector('img').classList.add('zooduck-lightbox__image--hidden');

    };

    const _closeLightbox = () => {

        lightboxActive = false;

        lightboxElements.lightbox.classList.add(`zooduck-lightbox--exit-the-duck-${lastSwipeDirection}`);

        lastSwipeDirection = 'left';  // reset

        docBody.allowScroll();

        setTimeout( () => _removeLightboxFromDOM(), 250);

    };

    const _removeLightboxFromDOM = () => {

        lightboxElements.lightbox.classList.remove(
            'zooduck-lightbox--exit-the-duck-left',
            'zooduck-lightbox--exit-the-duck-right');

        if (lightboxElements.lightbox.parentNode) lightboxElements.lightbox.parentNode.removeChild(lightboxElements.lightbox);

    };

    const _addLightboxImageContainerEnterClass = () => {

        lightboxElements.lightboxImageContainer.classList.add('zooduck-lightbox__image-container--enter-the-duck');
        lightboxElements.lightboxHeroPlaceholderContainer.classList.add('zooduck-lightbox__hero-placeholder-container--enter-the-duck');
        
        setTimeout(function() {
            lightboxElements.lightboxImageContainer.classList.remove('zooduck-lightbox__image-container--enter-the-duck');
            lightboxElements.lightboxHeroPlaceholderContainer.classList.remove('zooduck-lightbox__hero-placeholder-container--enter-the-duck');
        }, 250);
    };

    const _addLightboxToDOM = (imageData) => {

        lightboxActive = true;
        lightboxInitialOrientation = screen.orientation.angle;

        _removePlaceholderBackgroundImage();

        _addLightboxImageContainerEnterClass();   

        if (config.useLoadingSpinnerForLightbox) {

            // ======================================================================================
            // NOTE: This timeout can take longer if another block of code is using execution thread
            // ======================================================================================
            const t = setTimeout(() => {
                if (!activeHeroLoaded && activeHero.id === imageData.id) {
                    lightboxElements.lightboxLoadingSpinner.classList.add('zooduck-lightbox__loading-spinner--active');
                }
            }, 250);

            lightboxTimeouts.push(t);
        }

        // ======================================================================================
        // NOTE: This timeout can take longer if another block of code is using execution thread
        // ======================================================================================

        if (config.enablePlaceholderInLightbox) {

            _addPlaceholderBackgroundImage(activeHero.placeholderSVG); // always use placeholderSVG for lightbox!

            const t2 = setTimeout(()=> {
                if (!activeHeroLoaded) {
                    if (config.useTinyThumbnailPlaceholderInLightbox === true) {
                        _loadTinyThumbnail(activeHero).then((tinyThumbnail) => {
                            if (!activeHeroLoaded) {
                                _addPlaceholderBackgroundImage(tinyThumbnail);     
                            }   
                        }, err => {
                            console.error(err);
                        });
                    }
                }
            }, 250);
    
            lightboxTimeouts.push(t2);
        }

        _addImageToLightbox(activeHero);

        document.body.appendChild(lightboxElements.lightbox);
    };

    const _clearLightboxTimeouts = () => {
        for (let c = 0, l = lightboxTimeouts.length; c < l; c++) {
            let t = lightboxTimeouts.pop();
            clearTimeout(t);
        }
    };

    const _removeLoadingSpinner = () => {
        if (lightboxElements.lightboxLoadingSpinner) {
            lightboxElements.lightboxLoadingSpinner.classList.remove('zooduck-lightbox__loading-spinner--active');
        }
    };

    const _exitActiveHero = (swipeDirection = 'left') => {

        const imageContainerExitClass = `zooduck-lightbox__image-container--exit-stage-${swipeDirection}`;
        const heroPlaceholderContainerExitClass = `zooduck-lightbox__hero-placeholder-container--exit-stage-${swipeDirection}`;

        lightboxElements.lightboxImageContainer.classList.add(imageContainerExitClass);
        lightboxElements.lightboxHeroPlaceholderContainer.classList.add(heroPlaceholderContainerExitClass);

        setTimeout(() => {

            lightboxElements.lightboxImageContainer.classList.remove(imageContainerExitClass);
            lightboxElements.lightboxImageContainer.style.left = '0';

            lightboxElements.lightboxHeroPlaceholderContainer.classList.remove(heroPlaceholderContainerExitClass);
            lightboxElements.lightboxHeroPlaceholderContainer.style.left = '0';

            swipeDirection === 'left' ? _loadPost() : _loadPre();

        }, 100);

    };

    const _resetActiveHero = () => {

       lightboxElements.lightboxImageContainer.classList.add('zooduck-lightbox__image-container--reset');
        lightboxElements.lightboxImageContainer.style.left = '0';

        lightboxElements.lightboxHeroPlaceholderContainer.classList.add('zooduck-lightbox__hero-placeholder-container--reset');
        lightboxElements.lightboxHeroPlaceholderContainer.style.left = '0';

        setTimeout(() => {
            lightboxElements.lightboxImageContainer.classList.remove('zooduck-lightbox__image-container--reset');
            lightboxElements.lightboxHeroPlaceholderContainer.classList.remove('zooduck-lightbox__hero-placeholder-container--reset');
        }, 250);

    };

    const _resetLightbox = () => {
        _clearLightboxTimeouts();
        _removeLightboxFromDOM();
        _removeImagesFromLightbox();
        _removePlaceholderBackgroundImage();
    };

    const _open = (imageData = {}) => {

        if (!imageData) {
            return
        }
        
        docBody.disableScroll();

        activeHeroLoaded = false;

        activeHero = imageData;

        _resetLightbox();

        const imageIndex = galleries.getImageIndex(imageData.id);

        activeImageIndex = imageIndex;

        const imageIndexPre = imageIndex === 0 ? (galleries.currentGallery.images.length - 1) : (imageIndex - 1);
        const imageIndexPost = (imageIndex + 1) >= galleries.currentGallery.images.length ? 0 : (imageIndex + 1);

        const imageDataPre = galleries.getImageDataByIndex(imageIndexPre);
        const imageDataPost = galleries.getImageDataByIndex(imageIndexPost);

        _lazyLoadImage(imageData, imageDataPre, imageDataPost);

        _addLightboxToDOM(imageData);
        
    };

    const _touchEndHandler = () => {
        if (lightboxEvents.swipeRegistered) {
            lastSwipeDirection = lightboxEvents.swipeDirection;
            _exitActiveHero(lightboxEvents.swipeDirection);
        } else {
            _resetActiveHero();
        }
    };

    const _touchMoveHandler = (clientX) => {
        if (lightboxEvents.touchActive) {
            lightboxElements.lightboxImageContainer.style.left = `${clientX - lightboxEvents.touchStart}px`;
            lightboxElements.lightboxHeroPlaceholderContainer.style.left = `${clientX - lightboxEvents.touchStart}px`;
        }
    };

    (function ADD_EVENT_LISTENERS_FOR_SWIPE_AND_TAP() {

        lightboxElements.lightboxGlass.onmousedown = function(e) {
            const mouseButton = e.which;
            if (mouseButton <= 1) {
                lightboxEvents.touchStart = e.clientX;
            }
        };

        lightboxElements.lightboxGlass.onmousemove = function(e) {
            _touchMoveHandler(e.clientX);
        };

        lightboxElements.lightboxGlass.onmouseup = function(e) {
            const mouseButton = e.which;
            if (mouseButton <= 1) {
                lightboxEvents.touchEnd = e.clientX;
                _touchEndHandler();
            }
        };

        lightboxElements.lightboxGlass.ontouchstart = function(e) {
            lightboxEvents.touchStart = e.changedTouches[0].clientX;
        };

        lightboxElements.lightboxGlass.ontouchmove = function(e) {
            const clientX = e.changedTouches[0].clientX;
            _touchMoveHandler(clientX);
        };

        lightboxElements.lightboxGlass.ontouchend = function(e) {
            lightboxEvents.touchEnd = e.changedTouches[0].clientX;
            _touchEndHandler();
        };

        lightboxElements.lightboxGlass.addEventListener('click', function () {

            if (lightboxEvents.swipeDistance === 0) { // Have to check "swipeDistance" because Microsoft Edge registers a click with mousedown + mousemove + mouseup
                _closeLightbox();
            }
           
        });

    })();

    (function ADD_EVENT_LISTENERS_FOR_KEYS() {

        window.addEventListener('keyup', (e) => {
            if (lightboxActive) {
                const keyCode = e.which || e.keyCode || e.charCode;
                if (keyCode === 27) { // ESC
                    _closeLightbox();
                }
                if (keyCode === 37) { // LEFT ARROW
                    _exitActiveHero('right');
                }
                if (keyCode === 39) { // RIGHT ARROW
                    _exitActiveHero('left');
                }
            }
        });

    })();

    return {
        open(imageData = {}) {
            return _open(imageData)
        },
        reset() {
            return _resetLightbox();
        },
        removeLoadingSpinner() {
            return _removeLoadingSpinner();
        },
        get active() {
            return lightboxActive;
        },
        get initialOrientation() {
            return lightboxInitialOrientation;
        },
        set options(options = {}) {
            config = options;
        }
    }

})();

export default lightbox;
