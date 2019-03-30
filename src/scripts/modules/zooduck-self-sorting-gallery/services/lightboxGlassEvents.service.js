import Lightbox from '../models/Lightbox.model';
import rebuildGallery from './rebuildGallery.service';
import lightbox from './lightbox.service';
import config from '../settings/config.settings';

const lightboxGlassEvents = (function() {

    const lightboxElements = Lightbox;

    lightboxElements.lightboxGlass.addEventListener('click', function() {
        // =======================================================================================================================================
        // NOTE: As at 25-01-2019 the click event is now firing for mousedown + mousemove + mouseup in Chrome (it only used to do this in IE)...
        // =======================================================================================================================================
        setTimeout(function() {
            const currentOrientation = screen.orientation.angle;
            if (lightbox.initialOrientation !== currentOrientation && config.columns !== config.columnsForMobile) {
                rebuildGallery(false);
            }
        }, 25);
    });

})();

export default lightboxGlassEvents;
