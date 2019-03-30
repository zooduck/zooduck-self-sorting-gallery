import placeholderSVG from '../services/placeholder.service';
import placeholderUrl from '../services/placeholderUrl.service';

const ImageData = function(imageData = {}) {

    if (imageData.thumbnail.src && imageData.width && imageData.height) {
        
        const uniqueIdentifier = '_' + Math.random().toString().substr(2);
        
        imageData.id = uniqueIdentifier;
        imageData.squareSpace = (imageData.width / imageData.height);

        // Assign a default alt if not supplied
        if (!imageData.alt) {
            const fileNameInPathPattern = /(\/)([^\/]+\.[^\?]+)/;
            let fileName = '';
            try {
                fileName = imageData.thumbnail.src.match(fileNameInPathPattern)[2];
            } catch (e) {}
            imageData.alt = fileName;
        }

        // Set placeholderUrl
        imageData.placeholderSVG = placeholderSVG(imageData);
        imageData.placeholderUrl = placeholderUrl(imageData);
    }

    return imageData;
};

export default ImageData;
