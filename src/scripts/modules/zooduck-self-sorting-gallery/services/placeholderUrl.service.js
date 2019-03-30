import config from '../settings/config.settings';
import placeholderSVG from '../services/placeholder.service';

const placeholderUrl = (imageData = {}) => {
    return (config.placeholderUrl || imageData.placeholderUrl || imageData.placeholderSVG || placeholderSVG(imageData));
}

export default placeholderUrl;
