const validateGallery = (galleryData = []) => {

    const imageDataFormat = `
    {
        width: <number: pixels>,
        height: <number: pixels>,
        hero: {
            src: <string: url>
            sources: (optional) [
                <object: source: { media: <string: media_query>, srcset: <string: srcset> }>
            ]
        },
        thumbnail: {
            src: <string: url>
            sources: (optional) [
                <object: source: { media: <string: media_query>, srcset: <string: srcset> }>
            ]
        }
    }`;

    galleryData = galleryData.filter( imageData => {
        let isValid = false;
        try {
            isValid = imageData.width
                && imageData.height
                // && imageData.hero.sources (recommended but optional)
                // && imageData.thumbnail.sources (recommended but optional)
                && imageData.hero.src
                && imageData.thumbnail.src;
        } catch (e) {
            console.error(e);
            console.warn(`registerGallery() expects an array of IMAGE_DATA objects in the following format: ${imageDataFormat}`);
        }
        return isValid;
    });

    return galleryData;
};

export default validateGallery;
