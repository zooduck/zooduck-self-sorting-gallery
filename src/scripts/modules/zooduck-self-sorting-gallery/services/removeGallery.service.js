const removeGallery = (galleryData = {}) => {

    if (galleryData.containerNode) {
        
        Array.from(galleryData.containerNode.children).forEach((childNode) => childNode.parentNode.removeChild(childNode));

        galleryData.rowsToLoad = Array.from(galleryData.rows);

        if (galleryData.containerNode.parentNode) {

            galleryData.containerNode.parentNode.removeChild(galleryData.containerNode);
    
        }

    }

};

export default removeGallery;
