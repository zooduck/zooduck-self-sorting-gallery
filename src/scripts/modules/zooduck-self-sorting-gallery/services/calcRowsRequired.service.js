import config from '../settings/config.settings';

const _calcRowHeight = (rowData) => {
     
    const maxViewportWidth = config.desktopLandscapeBreakpoint;
    const viewportWidth = window.innerWidth < maxViewportWidth ? window.innerWidth : maxViewportWidth;

    const heightPerRow = ((viewportWidth - config.bodyBufferPixels) / config.squareSpacePerRow);

    return heightPerRow * (rowData[0].upscaleRatio || 1);
   
};

const calcRowsRequired = (galleryData) => {

    if (config.loadAll) {
        return galleryData.rowsToLoad.length;
    }

    const viewportHeight = window.innerHeight;

    const rowHeights = galleryData.rows.map( rowData => {
        return _calcRowHeight(rowData);
    });

    let rowsRequired = 0;
    let viewportSpaceUsed = 0;
    for (let rowHeight of rowHeights) {

        viewportSpaceUsed += rowHeight;
        
        if (viewportSpaceUsed < viewportHeight) {
            rowsRequired += 1;
        } else {
            rowsRequired += 1;
            break;
        }
    }

    return rowsRequired;

};

export default calcRowsRequired;
