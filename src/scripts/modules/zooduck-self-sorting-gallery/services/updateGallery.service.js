import Gallery from "../models/Gallery.model";

const updateGallery = (galleryData = {}) => {
    
    const gallery = new Gallery(galleryData.images);

    galleryData = Object.assign(galleryData, {
        ...gallery
    });

    console.log('galleryData', galleryData);

};

export default updateGallery;
