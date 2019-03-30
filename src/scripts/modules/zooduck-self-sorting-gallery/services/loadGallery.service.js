import config from '../settings/config.settings';
import lazyLoadThumbnail from './lazyLoadThumbnail.service';
import calcRowsRequired from './calcRowsRequired.service';
import placeholderAnimationStatus from './placeholderAnimationStatus.service';
import lightbox from './lightbox.service';

const _lazyLoadThumbnail = lazyLoadThumbnail();

const _resetPlaceholderOnThumbnail = (imageData, usePlaceholderSVG = false) => {
    // ================================================================================
    // NOTE: usePlaceholderSVG is for when imageData.placeholderUrl errors (bad url)
    // ================================================================================
    Array.from(imageData.pictureThumbnail.querySelectorAll('source')).forEach(sourceEl => {
        sourceEl.srcset = usePlaceholderSVG ? imageData.placeholderSVG : imageData.placeholderUrl;
    });
    imageData.pictureThumbnail.querySelector('img').src = usePlaceholderSVG ? imageData.placeholderSVG : imageData.placeholderUrl;
}

const _addNoAnimateModifier = (pictureThumbnail) => {
    if (pictureThumbnail && pictureThumbnail.lastChild) {
        pictureThumbnail.lastChild.classList.add('--no-animate');
    }
};

const _removeNoAnimateModifier = (pictureThumbnail) => {
    if (pictureThumbnail && pictureThumbnail.lastChild) {
        pictureThumbnail.lastChild.classList.remove('--no-animate');
    }
};

const loadGallery = (galleryData = {}, rowsRequired = 0, resetLightbox = true, animate = true) => {

    if (resetLightbox && lightbox.active) {
        lightbox.reset();
    }

    const placeholderAnimationsAllowed = ((window.innerWidth > config.mobileBreakpoint) || config.disableAnimationsForMobile === false) && animate === true;
 
    placeholderAnimationStatus.completed = true;

    if (placeholderAnimationsAllowed) {

        placeholderAnimationStatus.completed = false;

        setTimeout(()=> {
            placeholderAnimationStatus.completed = true;
        }, config.placeholderAnimationDuration * 1000);
    }

    const _loadPlaceholders = (imagesToLoad = []) => {

        const placeholdersLoaded = [];

        return new Promise((resolve, reject) => {

            console.log('WAITING_FOR_PLACEHOLDERS_TO_LOAD...');

            imagesToLoad.forEach((imageData) => {

                const tempPlaceholderImage = new Image();

                tempPlaceholderImage.onload = function() {

                    _resetPlaceholderOnThumbnail(imageData);

                    placeholdersLoaded.push(1);

                    if (placeholdersLoaded.length === imagesToLoad.length) {
                        resolve('ALL_PLACEHOLDERS_LOADED');
                    }
                }

                tempPlaceholderImage.onerror = function(e) {

                    _resetPlaceholderOnThumbnail(imageData, true);

                    placeholdersLoaded.push(1);

                    if (placeholdersLoaded.length === imagesToLoad.length) {
                        resolve('ALL_PLACEHOLDERS_LOADED');
                    }
                }

                tempPlaceholderImage.src = imageData.placeholderUrl;

            });
        }, err => {
            reject(err);
        });
    };

    const _getRowMarkup = () => {

        let imageGalleryRowNode = document.createElement('div');

        imageGalleryRowNode.classList.add('zooduck-gallery-row');

        return imageGalleryRowNode;
    };

    const _loadRows = (rowsToLoad = []) => {

        const imageGalleryRows = [];

        rowsToLoad.forEach((rowData) => {

            const imageGalleryRowNode = _getRowMarkup(rowData);

            rowData.forEach((imageData) => {

                if (animate === false) {
                    _addNoAnimateModifier(imageData.pictureThumbnail);
                } else {
                    _removeNoAnimateModifier(imageData.pictureThumbnail); // remove modifier class for manual calls to loadGallery()
                }

                _lazyLoadThumbnail.loadImage(imageData, animate);

                imageGalleryRowNode.appendChild(imageData.pictureThumbnail);

            });

            imageGalleryRows.push(imageGalleryRowNode);

        });

        return imageGalleryRows;
    };

    const _addRowsToDOM = (imageGalleryRows, galleryData) => {

        const imageGalleryContainerNode = galleryData.containerNode;

        imageGalleryRows.forEach((imageGalleryRowNode, index, arr) => {

            imageGalleryContainerNode.appendChild(imageGalleryRowNode);
            
            if (index === (arr.length - 1)) {
                if (document.querySelector(`#${galleryData.id}`)) {
                    return;
                }
                document.body.appendChild(imageGalleryContainerNode);
            }
        });
    };

    const _loadGallery = (galleryData, _rowsRequired = 0) => {

        const rowsRequired = _rowsRequired || calcRowsRequired(galleryData);

        const rowsToLoad = galleryData.rowsToLoad.splice(0, rowsRequired);

        const imagesToLoad = [];

        rowsToLoad.forEach((rowData) => {

            rowData.forEach((imageData) => {
                imagesToLoad.push(imageData);
            });

        });

        if (imagesToLoad.length > 0) {
            _loadPlaceholders(imagesToLoad).then(() => {
                console.log('ALL_PLACEHOLDERS_LOADED');
                const imageGalleryRows = _loadRows(rowsToLoad);
                _addRowsToDOM(imageGalleryRows, galleryData);
            }, err => {
                console.error(err);
            });
        }
       
    };

    _loadGallery(galleryData, rowsRequired);

};

export default loadGallery;
