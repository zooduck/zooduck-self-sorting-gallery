const Hero = function(imageData = {}) {

    const _getImgMarkup = () => {

        const imageEl = new Image();

        imageEl.classList.add('zooduck-lightbox__image');

        Object.keys(imageData).forEach( (key) => {
            let attr = key;
            if (key.search(/(sources|thumbnail|hero)/i) !== -1) return
            imageEl.setAttribute(attr, imageData[key]);
        });

        imageEl.dataset.src = imageData.hero.src;

        return imageEl;

    };

    const _getSourcesMarkup = function() {

        const sources = [];
    
        if (imageData.hero.sources) {
            imageData.hero.sources.forEach((sourceData) => {
                const sourceEl = document.createElement('source');
                Object.keys(sourceData).forEach( (key) => {
                    let attr = key;
                    if (key === 'srcset') attr = 'data-srcset';
                    sourceEl.setAttribute(attr, sourceData[key]);
                });
                sources.push(sourceEl);
            });
        }
    
        return sources;
    };

    return {
        get img() {
            return _getImgMarkup();
        },
        get sources() {
            return _getSourcesMarkup();
        }
    }

};

export default Hero;
