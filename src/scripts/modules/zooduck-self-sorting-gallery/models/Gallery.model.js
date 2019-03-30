import config from '../settings/config.settings';
import stylesheet from '../services/stylesheet.service';
import Picture from './Picture.model';
import galleryImageStyles from '../services/galleryImageStyles.service';
import placeholderUrl from '../services/placeholderUrl.service';

const _getDynamicWidthAndHeightStylesForImage = (imageData) => {

    return galleryImageStyles(imageData);
    
};

const _setStylesForImage = (imageData) => {

    const stylesheetRules = _getDynamicWidthAndHeightStylesForImage(imageData);
    stylesheetRules.forEach( (rule) => stylesheet.sheet.insertRule(rule, stylesheet.sheet.cssRules.length));

};

const _setImageMarkup = (imageData) => {

    const thumbnailPictureEl = new Picture(imageData, 'thumbnail');
    imageData.pictureThumbnail = thumbnailPictureEl;

    const heroPictureEl = new Picture(imageData, 'hero');
    imageData.pictureHero = heroPictureEl;

};

const _getDownscaleRatio = (imageSquareSpace) => {

    return (config.squareSpacePerRow / imageSquareSpace);

};

const _getUpscaleRatio = (imageSquareSpace, squareSpaceOccupied, emptySquareSpace) => {

    if (imageSquareSpace > config.squareSpacePerRow) {
        return _getDownscaleRatio(imageSquareSpace, config.squareSpacePerRow);
    }

    const emptySquareSpaceProportionateToImage = (imageSquareSpace / squareSpaceOccupied) * emptySquareSpace;
    const upscaleRatio = (emptySquareSpaceProportionateToImage / imageSquareSpace) + 1;

    return upscaleRatio;
};

const _calcEmptySquareSpace = (group) => {

    const squareSpaceOccupied = group.reduce((total, imageData) => total + imageData.squareSpace, 0);
    const emptySquareSpace = config.squareSpacePerRow - squareSpaceOccupied;

    return emptySquareSpace;
};

const _upscaleImagesToFit = (group) => {

    // =============================================
    // NOTE: This method can also downscale images
    // =============================================

    const squareSpaceOccupied = group.reduce((total, imageData) => total + imageData.squareSpace, 0);
    const emptySquareSpace = config.squareSpacePerRow - squareSpaceOccupied;
    const upscaleRatioMax = config.upscaleRatioMax || 1;

    group.forEach((imageData, index, arr) => {

        if (arr.length === 1 && imageData.squareSpace < config.squareSpacePerRow) {
            // NEVER upscale single images
            return
        }

        if (!config.upscaleImagesToFit && imageData.squareSpace <= config.squareSpacePerRow) {
            // ONLY proceed if image width is greater than the row width (downscale required)
           return
        }

        const upscaleRatio = _getUpscaleRatio(imageData.squareSpace, squareSpaceOccupied, emptySquareSpace);

        imageData.upscaleRatio = upscaleRatio < upscaleRatioMax ? upscaleRatio : upscaleRatioMax;
        imageData.upscaleSquareSpace = imageData.squareSpace * imageData.upscaleRatio;
        imageData.upscaleWidth = imageData.width * imageData.upscaleRatio;
        imageData.upscaleHeight = imageData.height * imageData.upscaleRatio;

    });

    return group;
};

const _downscaleImagesToFit = (group) => {

    // Get combined squareSpace of images in group
    const squareSpaceOccupied = group.reduce((acc, imageData) => acc + imageData.squareSpace, 0);

    group.forEach( (imageData) => {

        const upscaleRatio = _getDownscaleRatio(squareSpaceOccupied, config.squareSpacePerRow);

        if (imageData.upscaleRatio) return

        imageData.upscaleRatio = upscaleRatio < config.upscaleRatioMax ? upscaleRatio : config.upscaleRatioMax;
        imageData.upscaleSquareSpace = imageData.squareSpace * imageData.upscaleRatio;
        imageData.upscaleWidth = imageData.width * imageData.upscaleRatio;
        imageData.upscaleHeight = imageData.height * imageData.upscaleRatio;
    });

    return group;
};

const _groupContainsUpscaledImages = (group) => {

    return group.find(imageDataItem => imageDataItem.upscaleHeight);

};

const _fixGroupsWithVastAmountsOfWhitespace = (groups) => {

    const groupsWithVastAmountsOfWhitespace = groups.filter( (group) => {

        const emptySquareSpace = _calcEmptySquareSpace(group);

        return emptySquareSpace > .5 && !_groupContainsUpscaledImages(group);

    });

    const groupsWithVastAmountsOfWhitespaceIndexes = groupsWithVastAmountsOfWhitespace.map( group => {
        return groups.indexOf(group);
    });

    const groupsWithLittleWhitespace = groups.filter( (group) => {
        
        const emptySquareSpace = _calcEmptySquareSpace(group);

        return emptySquareSpace <= .5 || _groupContainsUpscaledImages(group);
    });


    if (groupsWithVastAmountsOfWhitespace.length > 0) {

        const imageDataObjects = groupsWithVastAmountsOfWhitespace.reduce( (acc, currentVal) => acc.concat(currentVal) );

        const groupsOfTwo = [];

        imageDataObjects.forEach( (imageDataItem, index, arr) => {
            if (index % 2 === 0) {
                const pairOfImagesForDownscaling = [];
                pairOfImagesForDownscaling.push(imageDataItem);
                const secondImage = arr[index + 1];
                if (secondImage) {
                    pairOfImagesForDownscaling.push(secondImage);
                }
                groupsOfTwo.push(pairOfImagesForDownscaling);
            }
        });
    
        const downscaledGroups = groupsOfTwo.map( group => _downscaleImagesToFit(group) );
    
        // ----------------------------------------------------------
        // Add back the newly formed downscaled group pairs
        // (This is better than using concat, which would just
        // place all the downscaled rows at the end of the gallery)
        // -----------------------------------------------------------

        downscaledGroups.forEach( (group) => {
            groupsWithLittleWhitespace.splice(groupsWithVastAmountsOfWhitespaceIndexes.shift(), 0, group);
        });

    }

    const groupsFinally = groupsWithLittleWhitespace;

    return groupsFinally;
};

// const _sortGroupsByEmptyWhitespace = (groups, squareSpacePerRow = 4) => {

//     const groupsWithVastAmountsOfWhitespace = groups.filter( (group) => {

//         const emptySquareSpace = _calcEmptySquareSpace(group, squareSpacePerRow);

//         return emptySquareSpace > 1;

//     });

//     const groupsWithLittleWhitespace = groups.filter( (group) => {

//         const emptySquareSpace = _calcEmptySquareSpace(group, squareSpacePerRow);
        
//         return emptySquareSpace <= 1;

//     });

//     const sortedGroupsWithVastAmountsOfWhitespace = groupsWithVastAmountsOfWhitespace.sort( (a, b) => {

//         return _calcEmptySquareSpace(a) - _calcEmptySquareSpace(b);

//     });

//     const groupsFinally = groupsWithLittleWhitespace.concat(sortedGroupsWithVastAmountsOfWhitespace);

//     return groupsFinally;
// };

const _downscaleGroup = (group) => {

    const squareSpaceOccupied = group.reduce((acc, currentVal) => acc + currentVal.squareSpace, 0);
    const downscaleRatio = config.squareSpacePerRow / squareSpaceOccupied;

    const downscaledGroup = group.map( imageDataObj => {

        imageDataObj.upscaleRatio = downscaleRatio;

        return imageDataObj;

    });

    return downscaledGroup;
};

const _groupSizesWithoutUpscale = (imageDataObjects = []) => {

    const rows = [];
    let currentRow = [];

    imageDataObjects.forEach( imageDataObject => {

        const totalWhitespaceOccupied = currentRow.reduce( (acc, currentVal) => acc + currentVal.squareSpace, 0);

        if (totalWhitespaceOccupied < config.squareSpacePerRow) {

            imageDataObject.upscaleRatio = 1; // reset

            currentRow.push(imageDataObject);

        } else {

            const downscaledGroup = _downscaleGroup(currentRow);

            rows.push(downscaledGroup);

            currentRow = [];

            imageDataObject.upscaleRatio = 1; // reset

            currentRow.push(imageDataObject);

        }
    });

    if (currentRow.length > 0) {

        rows.push(currentRow);

    }

    return rows;
};

const _groupSizes = (imageDataObjects = [], groups = []) => {

    let squareSpace = 0;
    let indexCompensator = 0;

    const group = [];

    for (let c = 0, l = imageDataObjects.length; c < l; c++) {

        const currentImageDataObj = imageDataObjects[c - indexCompensator];

        if (c === 0 && imageDataObjects[0].squareSpace >= config.squareSpacePerRow) {

            const fullWidthImageDataObj = imageDataObjects.splice(0, 1)[0];

            group.push(fullWidthImageDataObj);

            if (config.upscaleImagesToFit) {
                _upscaleImagesToFit(group);
            }

            groups.push(group);

            return _groupSizes(imageDataObjects, groups);

        } else if ((currentImageDataObj.squareSpace + squareSpace) <= config.squareSpacePerRow) {

            const imageDataObj = imageDataObjects.splice(c - indexCompensator, 1)[0];

            group.push(imageDataObj);

            squareSpace += imageDataObj.squareSpace;

            indexCompensator += 1;
        }
    }

    if (group.length > 0) {

        if (config.upscaleImagesToFit) {
            _upscaleImagesToFit(group);
        }
       
        groups.push(group);
    }

    if (imageDataObjects.length > 0) {
        return _groupSizes(imageDataObjects, groups);
    }


    if (config.upscaleImagesToFit) {
        groups = _fixGroupsWithVastAmountsOfWhitespace(groups);
    }

    // groups = _sortGroupsByEmptyWhitespace(groups, squareSpacePerRow);

    return groups;
};

const Gallery = (function() {

    return function (imageDataObjects = []) {

        const imageDataObjectsCopy = Array.from(imageDataObjects);

        imageDataObjectsCopy.forEach( item => {
            delete item.upscaleRatio;
            delete item.placeholderUrl;
            item.placeholderUrl = placeholderUrl(item);
        });

        let fourSquareGroups;

        if (config.keepImageOrder === true) {
            // ======================================================================================================================================
            // This algorithm (default!) only downscales images, maintains image order, does not use recursion, and is much simpler than _groupSizes
            // ======================================================================================================================================
            fourSquareGroups = _groupSizesWithoutUpscale(imageDataObjectsCopy);      
        } else {
            fourSquareGroups = _groupSizes(imageDataObjectsCopy, []);
        }
    
        fourSquareGroups.forEach( group => {
    
            group.forEach( (imageData) => {
    
                _setImageMarkup(imageData);
    
                _setStylesForImage(imageData);
    
            });
    
        });

        // ============================================================================
        // NOTE: Array.prototype.flatMap() and Array.prototype.flat() are experimental
        // For now, use reduce() with concat() instead
        // ============================================================================
        
        // const imagesSortedToFit = fourSquareGroups.flatMap( (group) => group);
        const imagesSortedToFit = fourSquareGroups.reduce( (acc, currentVal) => acc.concat(currentVal) );
    
        return {
            images: imagesSortedToFit,
            rows: fourSquareGroups,
            rowsToLoad: Array.from(fourSquareGroups)
        }
    }

})();

export default Gallery;
