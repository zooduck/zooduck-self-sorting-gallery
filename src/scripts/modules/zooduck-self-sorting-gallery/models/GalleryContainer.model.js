const GalleryContainer = function(galleryId = '') {

    const galleryContainerEl = document.createElement('div');

    galleryContainerEl.id = galleryId;
    galleryContainerEl.classList.add('zooduck-gallery-container');
    
    return galleryContainerEl;
}

export default GalleryContainer;
