import icons from '../services/icons.service';

const Lightbox = (function() {

    const lightboxEl = document.createElement('div');
    lightboxEl.classList.add('zooduck-lightbox');

    const lightboxHeroPlaceholderContainerEl = document.createElement('div');
    lightboxHeroPlaceholderContainerEl.classList.add('zooduck-lightbox__hero-placeholder-container');

    lightboxEl.appendChild(lightboxHeroPlaceholderContainerEl);

    const lightboxImageContainerEl = document.createElement('div');
    lightboxImageContainerEl.classList.add('zooduck-lightbox__image-container');

    lightboxEl.appendChild(lightboxImageContainerEl);

    const lightboxLoadingSpinnerEl = document.createElement('div');
    lightboxLoadingSpinnerEl.classList.add('zooduck-lightbox__loading-spinner');

    const lightboxLoadingSpinnerIconEl = new Image();
    lightboxLoadingSpinnerIconEl.src = icons.camera;
    lightboxLoadingSpinnerIconEl.classList.add('zooduck-lightbox__loading-spinner__icon');

    lightboxLoadingSpinnerEl.appendChild(lightboxLoadingSpinnerIconEl);

    lightboxEl.appendChild(lightboxLoadingSpinnerEl);

    const lightboxGlassEl = document.createElement('div');
    lightboxGlassEl.classList.add('zooduck-lightbox__glass');

    lightboxEl.appendChild(lightboxGlassEl);

    const lightboxCloseCtrlEl = document.createElement('div');
    lightboxCloseCtrlEl.classList.add('zooduck-lightbox__close-ctrl');

    const lightboxCloseCtrlIconEl = new Image();
    lightboxCloseCtrlIconEl.src = icons.close;
    lightboxCloseCtrlIconEl.classList.add('zooduck-lightbox__close-ctrl__icon');

    lightboxCloseCtrlEl.appendChild(lightboxCloseCtrlIconEl);

    lightboxEl.appendChild(lightboxCloseCtrlEl);

    return {
        lightbox: lightboxEl,
        lightboxHeroPlaceholderContainer: lightboxHeroPlaceholderContainerEl,
        lightboxImageContainer: lightboxImageContainerEl,
        lightboxLoadingSpinner: lightboxLoadingSpinnerEl,
        lightboxGlass: lightboxGlassEl,
        lightboxCloseCtrl: lightboxCloseCtrlEl
    }
})();

export default Lightbox;
