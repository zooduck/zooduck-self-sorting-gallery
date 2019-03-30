import Thumbnail from './Thumbnail.model';
import Hero from './Hero.model';

// Returns <picture> markup
const Picture = function(imageData = {}, type = 'thumbnail') {

    const pictureEl = document.createElement('picture');
    pictureEl.classList.add(imageData.id);

    const markup = type === 'thumbnail' ? new Thumbnail(imageData) : new Hero(imageData);

    const sourceEls = markup.sources;

    sourceEls.forEach((sourceEl)=> {
        pictureEl.appendChild(sourceEl);
    });

    const imageEl = markup.img;
    pictureEl.appendChild(imageEl);

    return pictureEl;
};

export default Picture;
