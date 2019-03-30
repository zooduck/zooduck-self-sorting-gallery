import lightbox from './lightbox.service';
import rebuildGallery from './rebuildGallery.service';
import config from '../settings/config.settings';
import placeholderAnimationStatus from './placeholderAnimationStatus.service';
import orientationChange from './orientationChange.service';

const orientationHandler = (function() {
  
    window.addEventListener('orientationchange', function() {
        orientationChange.lastFiredDate = new Date();
        if (!lightbox.active && config.columns !== config.columnsForMobile) {
            setTimeout(function() {
                placeholderAnimationStatus.completed = true;
                rebuildGallery(false);
            }, 25);
        }
    });

})();

export default orientationHandler;
