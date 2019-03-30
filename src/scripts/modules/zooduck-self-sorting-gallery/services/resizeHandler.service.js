import calcRowsRequired from './calcRowsRequired.service';
import loadGallery from './loadGallery.service';
import orientationChange from './orientationChange.service';

let _galleryData;

const _resizeFn = function() {

    // ======================================================================
    // NOTE: This method was originally added to reload the gallery
    // when the orientation of device changed from landscape to portrait
    // (since more rows than were previously loaded would be required)
    // However, this behaviour is now being dealt with by the
    // orientationchange event, which results in 2 calls to loadGallery,
    // hence the early return check on orientationChange.lastFiredDate below
    // =======================================================================

    const nowTime = new Date().getTime();
    if (orientationChange.lastFiredDate && (nowTime - orientationChange.lastFiredDate) < 1000) {
        return
    }

    if (_galleryData.rowsToLoad.length < 1) {
        window.removeEventListener('resize', _resizeFn, false);
    }

    const minRowsRequiredToCoverViewportHeight = calcRowsRequired(_galleryData);
    const rowsLoaded = (_galleryData.rows.length - _galleryData.rowsToLoad.length);
    const rowsToLoad = minRowsRequiredToCoverViewportHeight - rowsLoaded;

    if (rowsToLoad > 0) {
        loadGallery(_galleryData, rowsToLoad, false);
    }
};

const resizeHandler = (galleryData) => {
    _galleryData = galleryData;      
    window.addEventListener('resize', _resizeFn, false);
};

export default resizeHandler;
