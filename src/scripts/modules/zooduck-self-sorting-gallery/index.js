import config from './settings/config.settings';

import ImageData from './models/ImageData.model';
import GalleryContainer from './models/GalleryContainer.model';
import Gallery from './models/Gallery.model';

import stylesheet from './services/stylesheet.service';
import createStylesheet from './services/createStylesheet.service';
import galleries from './services/galleries.service';
import loadGallery from './services/loadGallery.service';
import removeGallery from './services/removeGallery.service';
import validateGallery from './services/validateGallery.service';
import scrollHandler from './services/scrollHandler.service';
import resizeHandler from './services/resizeHandler.service';
import lightbox from './services/lightbox.service';
import updateGallery from './services/updateGallery.service';
import orientationHandler from './services/orientationHandler.service';
import lightboxGlassEvents from './services/lightboxGlassEvents.service';

const __ZOOGAL__ = (function() {

    window.zoogal = (function() {

        // ======================
        // zoogal::Private Vars
        // ======================

        let currentConfig = {...config}

        // ...

        // ========================
        // zoogal::Private Methods
        // ========================

        const configChanged = () => {

            let configChanged = false;

            Object.keys(config).forEach( (key) => {
                if (config[key] != currentConfig[key]) {
                    currentConfig = {...config}
                    configChanged = true;
                }
            });

            return configChanged;
        };

        const logConfigChangesToConsole = (customConfig = {}) => {
            Object.keys(customConfig).forEach((key) => {
                config[key] = customConfig[key];
                console.warn(`zoogal config["${key}"] set to ${customConfig[key]}`);
            });
        };

        // ========================
        // zoogal::Public Methods
        // ========================

        return {
            get galleries() {
                return galleries.galleries;
            },
            get options() {
                return config.options;
            },
            get config() {
                return config;
            },
            loadGallery(galleryName = '') {

                if (!galleryName) return

                const requestedGallery = galleries.getGalleryByName(galleryName);
                
                if (requestedGallery) {

                    removeGallery(galleries.currentGallery);

                    galleries.currentGallery = requestedGallery;

                    scrollHandler.watchGallery(requestedGallery);

                    if (configChanged()) {

                        createStylesheet();
                        
                        updateGallery(requestedGallery);
                    }

                    resizeHandler(requestedGallery); 

                    loadGallery(requestedGallery);
                }
            },
            registerGallery(string__galleryName, galleryData = []) {

                const gallery = validateGallery(galleryData);

                if (gallery) {

                    if (!stylesheet.sheet) {
                        createStylesheet();
                    }

                    gallery.forEach((imageData) => {
                        imageData = new ImageData(imageData);
                    });

                    const galleryId = `${string__galleryName}_${Math.random().toString().substr(2)}`;

                    galleries.addGallery(Object.assign({
                        name: string__galleryName,
                        id: galleryId,
                        containerNode: new GalleryContainer(galleryId)
                    }, new Gallery(gallery)));
                }
            },
            setOptions(customConfig = {}) {
                logConfigChangesToConsole(customConfig);
                lightbox.options = config;
            }
        }
    })();
})();
