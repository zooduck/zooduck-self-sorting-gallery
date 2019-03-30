import loadGallery from './loadGallery.service';
import lightbox from './lightbox.service';

const scrollHandler = (function() {

    const buffer = 20;

    let galleryToWatch;
    let listenCalled = false;

    const _listen = () => {
        listenCalled = true;
        window.addEventListener('scroll', function ()  {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const viewportHeight = window.innerHeight;
            const scrollHeight = document.documentElement.scrollHeight || document.documentElement.offsetHeight;
            if ((viewportHeight + scrollTop + buffer) >= scrollHeight) {
                if (lightbox.active || !scrollTop) {
                    return;
                }
                loadGallery(galleryToWatch);
            }
        });
    };

    const _watchGallery = (galleryData) => {
        galleryToWatch = galleryData;
        if (!listenCalled) _listen();
    };

    return {
        watchGallery(galleryData) {
            _watchGallery(galleryData);
        },
        get galleryToWatch() {
            return galleryToWatch;
        }
    }
    
})();

export default scrollHandler;
