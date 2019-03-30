const galleries = (function() {

    let _currentGallery;
    const _galleries = [];

    return {
        get galleries() {
            return _galleries;
        },
        addGallery(galleryData = {}) {
            if (galleryData.name) {
                _galleries.push(galleryData);
            }           
        },
        getImageData(imageId) {
            return _currentGallery.images.find(item => item.id === imageId);
        },
        getImageDataByIndex(imageIndex) {
            return _currentGallery.images[imageIndex];
        },
        getImageIndex(imageId) {
            const index = _currentGallery.images.findIndex(item => item.id === imageId);
            return index;
        },
        getGalleryByName(galleryName) {
            return _galleries.find( (galleryItem) => galleryItem.name === galleryName);
        },
        get currentGallery() {
            return _currentGallery;
        },
        set currentGallery(galleryData = {}) {
            if (galleryData.name) {
                _currentGallery = galleryData;
            }
        }
    }
    
})();

export default galleries;
