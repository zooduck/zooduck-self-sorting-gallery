import lightbox from '../services/lightbox.service';
import galleries from '../services/galleries.service';

const Thumbnail = function(imageData = {}) {

    const _getPlaceholderImageAnimationClassVariant = () => {
        const placeImageAnimationClassModifiers = [
            '--from-south',
            '--from-west',
            '--from-east'
        ];
        const index = Math.round(Math.random() * 2);

        return 'place-image-animation' + (placeImageAnimationClassModifiers[index] || '--from-south');
    };

    const _getImgMarkup = function() {
        
        const imageEl = document.createElement('img');

        imageEl.classList.add('zooduck-gallery-row__image');
        imageEl.classList.add(imageData.id);

        imageEl.classList.add(_getPlaceholderImageAnimationClassVariant());

        Object.keys(imageData).forEach( (key) => {
            let attr = key;
            if (key.search(/(sources|thumbnail|hero)/i) !== -1) return
            imageEl.setAttribute(attr, imageData[key]);
        });

        imageEl.setAttribute('draggable', 'false');

        imageEl.dataset.src = imageData.thumbnail.src;

        imageEl.onclick = function (e) {
            const imageData = galleries.getImageData(e.target.id);
            lightbox.open(imageData);
        }

        return imageEl;
    };

    const _getSourcesMarkup = function() {

        const sources = [];
    
        if (imageData.thumbnail.sources) {
            imageData.thumbnail.sources.forEach((sourceData) => {
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

export default Thumbnail;
