import galleries from './galleries.service';
import removeGallery from './removeGallery.service';
import createStylesheet from './createStylesheet.service';
import updateGallery from './updateGallery.service';
import loadGallery from './loadGallery.service';

const rebuildGallery = (animate = true) => {

    if (galleries.currentGallery) {
        removeGallery(galleries.currentGallery);
        createStylesheet();
        updateGallery(galleries.currentGallery);
        loadGallery(galleries.currentGallery, 0, false, animate);
    }
    
};

export default rebuildGallery;
