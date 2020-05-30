const randomPicsumPhoto = () => {
    return (10 + Math.ceil(Math.random() * 50));
};

const shuffleImages = (imageDataArray) => {
    const shuffledImages = [];
    for (let c = 0, l = imageDataArray.length; c < l; c++) {
        let randomIndex = Math.round(Math.random() * l);
        while (!imageDataArray[randomIndex]) {
            randomIndex = Math.round(Math.random() * l);
        }
        const imageData = imageDataArray.splice(randomIndex, 1)[0];
        shuffledImages.push(imageData);
    }
    return shuffledImages;
};

const galleryDataModel = (width, height) => {

    const picsumImageId = Math.round(Math.random() * 85);

    const minSquareSpacePerRow = 3;

    const breakpoints = [
        320,
        375,
        425,
        768,
        1024,
        1280,
        1440
    ];

    const aspectRatio = width / height;

    const thumbnailHeights = breakpoints.map( breakpoint => {
        let width = Math.round((breakpoint / minSquareSpacePerRow) * aspectRatio);
        let height = Math.round(breakpoint / minSquareSpacePerRow)
        if (width > breakpoint) {
            let downscaleAdjust = breakpoint / width;
            height = height * downscaleAdjust;
        }
        return Math.round(height);
    });

    const thumbnailWidths = breakpoints.map ( breakpoint => {
        let width = Math.round((breakpoint / minSquareSpacePerRow) * aspectRatio);
        if (width > breakpoint) {
            let downscaleAdjust = breakpoint / width;
            width = width * downscaleAdjust;
        }
        return Math.round(width);
    });

    const heroWidths = breakpoints.map( breakpoint => {
        //const doubleSizeWidth = breakpoint * 2;
        const doubleSizeWidth = breakpoint * 1; // no doublesize

        if (doubleSizeWidth > width) {
            return width;
        }
        return doubleSizeWidth;
    });
    const heroHeights = breakpoints.map( breakpoint => {
        // const doubleSizeWidth = breakpoint * 2;
        const doubleSizeWidth = breakpoint * 1; // no doublesize
        if (doubleSizeWidth > width) {
            return height;
        }
        const scale = doubleSizeWidth / width;
        const doubleSizeHeight = Math.round(height * scale);
        return doubleSizeHeight;
    });

    const thumbnailSrc = `https://picsum.photos/${thumbnailWidths[thumbnailWidths.length - 1]}/${thumbnailHeights[thumbnailHeights.length - 1]}/?image=${picsumImageId}`;
    const heroSrc = `https://picsum.photos/${width}/${height}/?image=${picsumImageId}`;

    const thumbnailSources = breakpoints.map( (breakpoint, index, arr) => {
        return {
            media: `(max-width: ${breakpoint}px)`,
            srcset: `https://picsum.photos/${thumbnailWidths[index]}/${thumbnailHeights[index]}/?image=${picsumImageId}`
        }
    });

    thumbnailSources.push({
        media: `(min-width: ${breakpoints[breakpoints.length - 1] + 1}px)`,
        srcset: `https://picsum.photos/${thumbnailWidths[thumbnailWidths.length - 1]}/${thumbnailHeights[thumbnailHeights.length - 1]}/?image=${picsumImageId}`
    });

    const heroSources = breakpoints.map( (breakpoint, index, arr) => {
        return {
            media: `(max-width: ${breakpoint}px)`,
            srcset: `https://picsum.photos/${heroWidths[index]}/${heroHeights[index]}/?image=${picsumImageId}`
        }
    });

    // add full size source
    heroSources.push({
        media: `(min-width: ${breakpoints[breakpoints.length - 1] + 1}px)`,
        srcset: `https://picsum.photos/${width}/${height}/?image=${picsumImageId}`
    });

    return {
        width,
        height,
        hero: {
            src: heroSrc,
            sources: heroSources
        },
        thumbnail: {
            src: thumbnailSrc,
            sources: thumbnailSources
        }
    }

};

const fakeGalleryData = (numberOfImages = 25) => {
    return Array.from({length: numberOfImages}).map( item => {
        const width = Math.round(Math.random() * 1440) + 500;
        const height = Math.round(Math.random() * 1440) + 500;
        return galleryDataModel(width, height);
    });
};
