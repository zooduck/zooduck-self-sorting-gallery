(function () {
  'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var validate = function () {
    var validateNumber = function validateNumber(q) {
      return typeof q === 'number' && !isNaN(q);
    };

    var validateBoolean = function validateBoolean(q) {
      return typeof q === 'boolean';
    };

    return {
      isNumber: function isNumber(q) {
        return validateNumber(q);
      },
      isBoolean: function isBoolean(q) {
        return validateBoolean(q);
      }
    };
  }();

  var viewport = function () {
    var _getViewportWidth = function _getViewportWidth() {
      return window.innerWidth;
    };

    return {
      get width() {
        return _getViewportWidth();
      }

    };
  }();

  var config = function () {
    // =====================
    // config::Private Vars
    // =====================
    var marginBufferPixels;
    var paddingBufferPixels;
    var scrollbarBufferPixels = 20; // Scrollbar 17px (Google Chrome) + 3px MOE

    var mobileBreakpoint;
    var mobilePortraitBreakpoint;
    var desktopLandscapeBreakpoint;
    var placeholderUrl;
    var loadAll;
    var upscaleImagesToFit;
    var upscaleRatioMax;
    var disableAnimationsForMobile;
    var enablePlaceholderInLightbox;
    var useTinyThumbnailPlaceholderInLightbox;
    var useLoadingSpinnerForLightbox;
    var thumbnailBorderWidth;
    var galleryBackgroundColor;
    var placeholderAnimationDuration;
    var lightboxBackgroundColor;
    var keepImageOrder;
    var squareSpacePerRow;
    var mobilePortraitSquareSpacePerRow;
    var currentOptions;
    var options = {
      mobileBreakpoint: mobileBreakpoint,
      mobilePortraitBreakpoint: mobilePortraitBreakpoint,
      desktopLandscapeBreakpoint: desktopLandscapeBreakpoint,
      placeholderUrl: placeholderUrl,
      loadAll: loadAll,
      upscaleImagesToFit: upscaleImagesToFit,
      upscaleRatioMax: upscaleRatioMax,
      disableAnimationsForMobile: disableAnimationsForMobile,
      enablePlaceholderInLightbox: enablePlaceholderInLightbox,
      useTinyThumbnailPlaceholderInLightbox: useTinyThumbnailPlaceholderInLightbox,
      useLoadingSpinnerForLightbox: useLoadingSpinnerForLightbox,
      thumbnailBorderWidth: thumbnailBorderWidth,
      galleryBackgroundColor: galleryBackgroundColor,
      placeholderAnimationDuration: placeholderAnimationDuration,
      lightboxBackgroundColor: lightboxBackgroundColor,
      keepImageOrder: keepImageOrder,
      squareSpacePerRow: squareSpacePerRow,
      mobilePortraitSquareSpacePerRow: mobilePortraitSquareSpacePerRow,
      __defaults__: {
        mobileBreakpoint: 768,
        // Tablet Portrait (used by disableAnimationsForMobile)
        mobilePortraitBreakpoint: 425,
        // Mobile L (use by mobilePortraitSquareSpacePerRow)
        desktopLandscapeBreakpoint: 1024,
        // Desktop
        placeholderUrl: '',
        loadAll: false,
        upscaleImagesToFit: false,
        upscaleRatioMax: 1.5,
        disableAnimationsForMobile: false,
        enablePlaceholderInLightbox: true,
        useTinyThumbnailPlaceholderInLightbox: true,
        useLoadingSpinnerForLightbox: true,
        thumbnailBorderWidth: 0,
        galleryBackgroundColor: '#ffffff',
        placeholderAnimationDuration: 1,
        // 1 second default animation-duration for placeholders
        lightboxBackgroundColor: '#111111',
        keepImageOrder: true,
        squareSpacePerRow: 4,
        // The number of squares (1:1 ratio images) per row
        mobilePortraitSquareSpacePerRow: 3 // The number of squares (1:1 ratio images) per row for mobile (portrait orientation)

      }
    }; // ========================
    // config::Private Methods
    // ========================

    var getDocBodyStyle = function getDocBodyStyle() {
      return getComputedStyle(document.body);
    };

    var isMobilePortrait = function isMobilePortrait() {
      var mobilePortraitBreakpoint = validate.isNumber(options.mobilePortraitBreakpoint) ? options.mobilePortraitBreakpoint : options.__defaults__.mobilePortraitBreakpoint;
      return viewport.width <= mobilePortraitBreakpoint;
    }; // =======================
    // config::Public Methods
    // =======================


    return {
      get marginBufferPixels() {
        var docBodyMargin = marginBufferPixels;

        if (!validate.isNumber(docBodyMargin)) {
          try {
            var docBodyStyle = getDocBodyStyle();
            docBodyMargin = parseInt(docBodyStyle.marginLeft) + parseInt(docBodyStyle.marginRight);
          } catch (e) {
            docBodyMargin = 0;
          }
        }

        return docBodyMargin;
      },

      set marginBufferPixels(horizontalMarginPixels) {
        horizontalMarginPixels = parseInt(horizontalMarginPixels);

        if (validate.isNumber(horizontalMarginPixels)) {
          marginBufferPixels = horizontalMarginPixels;
        }
      },

      get paddingBufferPixels() {
        var docBodyPadding = paddingBufferPixels;

        if (!validate.isNumber(docBodyPadding)) {
          try {
            var docBodyStyle = getDocBodyStyle();
            docBodyPadding = parseInt(docBodyStyle.paddingLeft) + parseInt(docBodyStyle.paddingRight);
          } catch (e) {
            docBodyPadding = 0;
          }
        }

        return docBodyPadding;
      },

      set paddingBufferPixels(horizontalPaddingPixels) {
        horizontalPaddingPixels = parseInt(horizontalPaddingPixels);

        if (validate.isNumber(horizontalPaddingPixels)) {
          paddingBufferPixels = horizontalPaddingPixels;
        }
      },

      get scrollbarBufferPixels() {
        return scrollbarBufferPixels;
      },

      get bodyBufferPixels() {
        return this.marginBufferPixels + this.paddingBufferPixels + this.scrollbarBufferPixels;
      },

      get mobileBreakpoint() {
        if (!validate.isNumber(options.mobileBreakpoint)) {
          options.mobileBreakpoint = options.__defaults__.mobileBreakpoint;
        }

        return options.mobileBreakpoint;
      },

      set mobileBreakpoint(pixels) {
        pixels = parseInt(pixels);

        if (validate.isNumber(pixels)) {
          options.mobileBreakpoint = pixels;
        }
      },

      get mobilePortraitBreakpoint() {
        if (!validate.isNumber(options.mobilePortraitBreakpoint)) {
          options.mobilePortraitBreakpoint = options.__defaults__.mobilePortraitBreakpoint;
        }

        return options.mobilePortraitBreakpoint;
      },

      set mobilePortraitBreakpoint(pixels) {
        pixels = parseInt(pixels);

        if (validate.isNumber(pixels)) {
          options.mobilePortraitBreakpoint = pixels;
        }
      },

      get desktopLandscapeBreakpoint() {
        if (!validate.isNumber(options.desktopLandscapeBreakpoint)) {
          options.desktopLandscapeBreakpoint = options.__defaults__.desktopLandscapeBreakpoint;
        }

        return options.desktopLandscapeBreakpoint;
      },

      set desktopLandscapeBreakpoint(pixels) {
        pixels = parseInt(pixels);

        if (validate.isNumber(pixels)) {
          options.desktopLandscapeBreakpoint = pixels;
        }
      },

      get placeholderUrl() {
        return options.placeholderUrl || options.__defaults__.placeholderUrl;
      },

      set placeholderUrl(url) {
        options.placeholderUrl = url;
      },

      get loadAll() {
        return validate.isBoolean(options.loadAll) ? options.loadAll : options.__defaults__.loadAll;
      },

      set loadAll(bool) {
        options.loadAll = bool;
      },

      get upscaleImagesToFit() {
        if (options.keepImageOrder === true) return false;
        return validate.isBoolean(options.upscaleImagesToFit) ? options.upscaleImagesToFit : options.__defaults__.upscaleImagesToFit;
      },

      set upscaleImagesToFit(bool) {
        options.upscaleImagesToFit = bool;
        currentOptions = _objectSpread({}, options);
      },

      get upscaleRatioMax() {
        return options.upscaleRatioMax || options.__defaults__.upscaleRatioMax;
      },

      set upscaleRatioMax(float) {
        options.upscaleRatioMax = float;
      },

      get disableAnimationsForMobile() {
        return validate.isBoolean(options.disableAnimationsForMobile) ? options.disableAnimationsForMobile : options.__defaults__.disableAnimationsForMobile;
      },

      set disableAnimationsForMobile(bool) {
        options.disableAnimationsForMobile = bool;
      },

      get enablePlaceholderInLightbox() {
        return validate.isBoolean(options.enablePlaceholderInLightbox) ? options.enablePlaceholderInLightbox : options.__defaults__.enablePlaceholderInLightbox;
      },

      set enablePlaceholderInLightbox(bool) {
        options.enablePlaceholderInLightbox = bool;
      },

      get useTinyThumbnailPlaceholderInLightbox() {
        if (options.enablePlaceholderInLightbox === false) return false;
        return validate.isBoolean(options.useTinyThumbnailPlaceholderInLightbox) ? options.useTinyThumbnailPlaceholderInLightbox : options.__defaults__.useTinyThumbnailPlaceholderInLightbox;
      },

      set useTinyThumbnailPlaceholderInLightbox(bool) {
        options.useTinyThumbnailPlaceholderInLightbox = bool;
      },

      get thumbnailBorderWidth() {
        return validate.isNumber(options.thumbnailBorderWidth) ? options.thumbnailBorderWidth : options.__defaults__.thumbnailBorderWidth;
      },

      set thumbnailBorderWidth(pixels) {
        pixels = parseInt(pixels);

        if (validate.isNumber(pixels)) {
          options.thumbnailBorderWidth = pixels;
        }
      },

      get galleryBackgroundColor() {
        return options.galleryBackgroundColor || options.__defaults__.galleryBackgroundColor;
      },

      set galleryBackgroundColor(htmlColor) {
        options.galleryBackgroundColor = htmlColor;
      },

      get useLoadingSpinnerForLightbox() {
        return validate.isBoolean(options.useLoadingSpinnerForLightbox) ? options.useLoadingSpinnerForLightbox : options.__defaults__.useLoadingSpinnerForLightbox;
      },

      set useLoadingSpinnerForLightbox(bool) {
        options.useLoadingSpinnerForLightbox = bool;
      },

      get placeholderAnimationDuration() {
        return validate.isNumber(options.placeholderAnimationDuration) ? options.placeholderAnimationDuration : options.__defaults__.placeholderAnimationDuration;
      },

      set placeholderAnimationDuration(seconds) {
        seconds = parseFloat(seconds);

        if (validate.isNumber(seconds)) {
          options.placeholderAnimationDuration = seconds;
        }
      },

      get lightboxBackgroundColor() {
        return options.lightboxBackgroundColor || options.__defaults__.lightboxBackgroundColor;
      },

      set lightboxBackgroundColor(htmlColor) {
        options.lightboxBackgroundColor = htmlColor;
      },

      get keepImageOrder() {
        return validate.isBoolean(options.keepImageOrder) ? options.keepImageOrder : options.__defaults__.keepImageOrder;
      },

      set keepImageOrder(bool) {
        options.keepImageOrder = bool;
      },

      get columns() {
        return options.squareSpacePerRow || options.__defaults__.squareSpacePerRow;
      },

      set columns(squares) {
        squares = parseFloat(squares);

        if (validate.isNumber(squares)) {
          options.squareSpacePerRow = squares;
        }
      },

      get columnsForMobile() {
        return options.mobilePortraitSquareSpacePerRow || options.__defaults__.mobilePortraitSquareSpacePerRow;
      },

      set columnsForMobile(squares) {
        squares = parseFloat(squares);

        if (validate.isNumber(squares)) {
          options.mobilePortraitSquareSpacePerRow = squares;
        }
      },

      get squareSpacePerRow() {
        if (isMobilePortrait()) {
          return options.mobilePortraitSquareSpacePerRow || options.__defaults__.mobilePortraitSquareSpacePerRow;
        } else {
          return options.squareSpacePerRow || options.__defaults__.squareSpacePerRow;
        }
      },

      get options() {
        return options;
      },

      get currentOptions() {
        return currentOptions;
      }

    };
  }();

  var getRandomRGBA = function getRandomRGBA() {
    var alpha = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : .65;
    return "rgba(".concat(Math.round(Math.random() * 255), ",").concat(Math.round(Math.random() * 255), ",").concat(Math.round(Math.random() * 255), ", ").concat(alpha, ")");
  };

  var placeholderSVG = function placeholderSVG() {
    var imageData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var aspectRatio = 1;

    try {
      aspectRatio = imageData.width / imageData.height;
    } catch (e) {}

    var height = 20;
    var width = height * aspectRatio;
    var svg = document.createElement('svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', "".concat(width));
    svg.setAttribute('height', "".concat(height));
    var rect = document.createElement('rect');
    rect.setAttribute('x', '0');
    rect.setAttribute('y', '0');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', getRandomRGBA());
    svg.appendChild(rect);
    var base64SVG = window.btoa(svg.outerHTML);
    return "data:image/svg+xml;base64,".concat(base64SVG);
  };

  var placeholderUrl = function placeholderUrl() {
    var imageData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return config.placeholderUrl || imageData.placeholderUrl || imageData.placeholderSVG || placeholderSVG(imageData);
  };

  var ImageData = function ImageData() {
    var imageData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (imageData.thumbnail.src && imageData.width && imageData.height) {
      var uniqueIdentifier = '_' + Math.random().toString().substr(2);
      imageData.id = uniqueIdentifier;
      imageData.squareSpace = imageData.width / imageData.height; // Assign a default alt if not supplied

      if (!imageData.alt) {
        var fileNameInPathPattern = /(\/)([^\/]+\.[^\?]+)/;
        var fileName = '';

        try {
          fileName = imageData.thumbnail.src.match(fileNameInPathPattern)[2];
        } catch (e) {}

        imageData.alt = fileName;
      } // Set placeholderUrl


      imageData.placeholderSVG = placeholderSVG(imageData);
      imageData.placeholderUrl = placeholderUrl(imageData);
    }

    return imageData;
  };

  var GalleryContainer = function GalleryContainer() {
    var galleryId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var galleryContainerEl = document.createElement('div');
    galleryContainerEl.id = galleryId;
    galleryContainerEl.classList.add('zooduck-gallery-container');
    return galleryContainerEl;
  };

  var stylesheet = function () {
    var styleEl = document.createElement('style');
    return {
      create: function create() {
        document.head.appendChild(styleEl);
        styleEl.appendChild(document.createTextNode(''));
      },

      get sheet() {
        return styleEl.sheet;
      }

    };
  }();

  var icons = function () {
    var _materialIcons__baselineCamera24px = function _materialIcons__baselineCamera24px() {
      var svg = document.createElement('svg');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttribute('width', '24');
      svg.setAttribute('height', '24');
      svg.setAttribute('viewBox', '0 0 24 24');
      var path = "<path fill=\"#ffffff\" d=\"M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 2c-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zM21.54 9c-.92-2.92-3.15-5.26-6-6.34L11.88 9h9.66zm.26 1h-7.49l.29.5 4.76 8.25C21 16.97 22 14.61 22 12c0-.69-.07-1.35-.2-2zM8.54 12l-3.9-6.75C3.01 7.03 2 9.39 2 12c0 .69.07 1.35.2 2h7.49l-1.15-2zm-6.08 3c.92 2.92 3.15 5.26 6 6.34L12.12 15H2.46zm11.27 0l-3.9 6.76c.7.15 1.42.24 2.17.24 2.4 0 4.6-.85 6.32-2.25l-3.66-6.35-.93 1.6z\"/>";
      svg.innerHTML = path;
      var base64SVG = window.btoa(svg.outerHTML);
      return "data:image/svg+xml;base64,".concat(base64SVG);
    };

    var _materialIcons__baselineClose24px = function _materialIcons__baselineClose24px() {
      var svg = document.createElement('svg');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttribute('width', '24');
      svg.setAttribute('height', '24');
      svg.setAttribute('viewBox', '0 0 24 24');
      var path = "<path fill=\"#ffffff\" d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>";
      svg.innerHTML = path;
      var base64SVG = window.btoa(svg.outerHTML);
      return "data:image/svg+xml;base64,".concat(base64SVG);
    };

    return {
      get camera() {
        return _materialIcons__baselineCamera24px();
      },

      get close() {
        return _materialIcons__baselineClose24px();
      }

    };
  }();

  var Lightbox = function () {
    var lightboxEl = document.createElement('div');
    lightboxEl.classList.add('zooduck-lightbox');
    var lightboxHeroPlaceholderContainerEl = document.createElement('div');
    lightboxHeroPlaceholderContainerEl.classList.add('zooduck-lightbox__hero-placeholder-container');
    lightboxEl.appendChild(lightboxHeroPlaceholderContainerEl);
    var lightboxImageContainerEl = document.createElement('div');
    lightboxImageContainerEl.classList.add('zooduck-lightbox__image-container');
    lightboxEl.appendChild(lightboxImageContainerEl);
    var lightboxLoadingSpinnerEl = document.createElement('div');
    lightboxLoadingSpinnerEl.classList.add('zooduck-lightbox__loading-spinner');
    var lightboxLoadingSpinnerIconEl = new Image();
    lightboxLoadingSpinnerIconEl.src = icons.camera;
    lightboxLoadingSpinnerIconEl.classList.add('zooduck-lightbox__loading-spinner__icon');
    lightboxLoadingSpinnerEl.appendChild(lightboxLoadingSpinnerIconEl);
    lightboxEl.appendChild(lightboxLoadingSpinnerEl);
    var lightboxGlassEl = document.createElement('div');
    lightboxGlassEl.classList.add('zooduck-lightbox__glass');
    lightboxEl.appendChild(lightboxGlassEl);
    var lightboxCloseCtrlEl = document.createElement('div');
    lightboxCloseCtrlEl.classList.add('zooduck-lightbox__close-ctrl');
    var lightboxCloseCtrlIconEl = new Image();
    lightboxCloseCtrlIconEl.src = icons.close;
    lightboxCloseCtrlIconEl.classList.add('zooduck-lightbox__close-ctrl__icon');
    lightboxCloseCtrlEl.appendChild(lightboxCloseCtrlIconEl);
    lightboxEl.appendChild(lightboxCloseCtrlEl);
    return {
      lightbox: lightboxEl,
      lightboxHeroPlaceholderContainer: lightboxHeroPlaceholderContainerEl,
      lightboxImageContainer: lightboxImageContainerEl,
      lightboxLoadingSpinner: lightboxLoadingSpinnerEl,
      lightboxGlass: lightboxGlassEl,
      lightboxCloseCtrl: lightboxCloseCtrlEl
    };
  }();

  var galleries = function () {
    var _currentGallery;

    var _galleries = [];
    return {
      get galleries() {
        return _galleries;
      },

      addGallery: function addGallery() {
        var galleryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (galleryData.name) {
          _galleries.push(galleryData);
        }
      },
      getImageData: function getImageData(imageId) {
        return _currentGallery.images.find(function (item) {
          return item.id === imageId;
        });
      },
      getImageDataByIndex: function getImageDataByIndex(imageIndex) {
        return _currentGallery.images[imageIndex];
      },
      getImageIndex: function getImageIndex(imageId) {
        var index = _currentGallery.images.findIndex(function (item) {
          return item.id === imageId;
        });

        return index;
      },
      getGalleryByName: function getGalleryByName(galleryName) {
        return _galleries.find(function (galleryItem) {
          return galleryItem.name === galleryName;
        });
      },

      get currentGallery() {
        return _currentGallery;
      },

      set currentGallery(galleryData) {
        if (galleryData === void 0) {
          galleryData = {};
        }

        if (galleryData.name) {
          _currentGallery = galleryData;
        }
      }

    };
  }();

  var lightboxEvents = function () {
    var _touchStart = 0;
    var _touchEnd = 0;
    var _touchActive = false;

    var _swipeRegistered = function _swipeRegistered() {
      var minSwipePixels = window.innerWidth / 10;
      return _touchStart - _touchEnd > minSwipePixels || _touchEnd - _touchStart > minSwipePixels;
    };

    var _swipeDirection = function _swipeDirection() {
      return _touchEnd > _touchStart ? 'right' : 'left';
    };

    var _swipeDistance = function _swipeDistance() {
      return _touchEnd - _touchStart;
    };

    return {
      get touchStart() {
        return _touchStart;
      },

      set touchStart(clientX) {
        _touchActive = true;
        return _touchStart = clientX;
      },

      set touchEnd(clientX) {
        _touchEnd = clientX;
        _touchActive = false;
      },

      get touchActive() {
        return _touchActive;
      },

      get swipeRegistered() {
        return _swipeRegistered();
      },

      get swipeDirection() {
        return _swipeDirection();
      },

      get swipeDistance() {
        return _swipeDistance();
      }

    };
  }();

  var docBody = function () {
    return {
      disableScroll: function disableScroll() {
        document.body.style.overflow = 'hidden';
      },
      allowScroll: function allowScroll() {
        document.body.style.overflow = 'auto';
      }
    };
  }();

  var lightbox = function () {
    var config;
    var activeHeroLoaded = false;
    var activeHero;
    var lightboxActive = false;
    var lightboxInitialOrientation = screen.orientation.angle;
    var activeImageIndex = 0;
    var lightboxTimeouts = [];
    var lastSwipeDirection = 'left';

    var _loadHero = function _loadHero() {
      // Add the loaded hero image to the lightbox
      if (activeHeroLoaded) {
        return;
      }

      var pictureEl = activeHero.pictureHero;

      if (pictureEl.constructor.name === 'HTMLPictureElement') {
        var sourceEls = pictureEl.querySelectorAll('source');
        Array.from(sourceEls).forEach(function (sourceEl) {
          sourceEl.srcset = sourceEl.dataset.srcset;
        });
      }

      if (pictureEl === activeHero.pictureHero) {
        activeHeroLoaded = true;
        pictureEl.querySelector('img').classList.remove('zooduck-lightbox__image--hidden');

        _removePlaceholderBackgroundImage();

        _removeLoadingSpinner();
      }
    };

    var _loadTinyThumbnail = function _loadTinyThumbnail(imageData) {
      // Load the currently in use thumbnail for this image
      // -------------------------------------------------------------
      // (So if a thumbnail for this image is already loaded in the
      // gallery, then this promise should resolve immediately)
      // -------------------------------------------------------------
      return new Promise(function (resolve, reject) {
        var tempImageEl = new Image();

        tempImageEl.onload = function () {
          if (imageData.id === activeHero.id) {
            resolve(tinyThumbnail);
          } else {
            reject('TINY_THUMBNAIL_IS_NOT_ACTIVE_HERO_THUMBNAIL');
          }
        };

        var tinyThumbnailSource = imageData.thumbnail.sources.find(function (source) {
          return window.matchMedia(source.media).matches;
        });
        var tinyThumbnail = tinyThumbnailSource ? tinyThumbnailSource.srcset : imageData.thumbnail.src;
        tempImageEl.src = tinyThumbnail;
      }, function (err) {
        reject(err);
      });
    };

    var _addPlaceholderBackgroundImage = function _addPlaceholderBackgroundImage(url) {
      lightboxElements.lightboxHeroPlaceholderContainer.style.backgroundImage = "url(".concat(url, ")");
    };

    var _removePlaceholderBackgroundImage = function _removePlaceholderBackgroundImage() {
      lightboxElements.lightboxHeroPlaceholderContainer.style.backgroundImage = 'none';
    };

    var _loadTempImage = function _loadTempImage(imageEl, tempPictureEl) {
      return new Promise(function (resolve, reject) {
        var tempImageEl = new Image();

        tempImageEl.onload = function () {
          if (imageEl.id === activeHero.id) {
            resolve();
          } else {
            reject('IMAGE_IS_NOT_ACTIVE_HERO');
          }
        };

        tempPictureEl.appendChild(tempImageEl);
        tempImageEl.src = imageEl.dataset.src;
      });
    };

    var _lazyLoadImage = function _lazyLoadImage() {
      for (var _len = arguments.length, imageDataObjects = new Array(_len), _key = 0; _key < _len; _key++) {
        imageDataObjects[_key] = arguments[_key];
      }

      imageDataObjects.forEach(function (imageData, index) {
        var imageEl = imageData.pictureHero.querySelector('img');

        if (!imageEl.dataset.src) {
          return;
        }

        var tempPictureEl = document.createElement('picture');

        if (imageData.hero.sources) {
          imageData.hero.sources.forEach(function (sourceData) {
            var tempSourceEl = document.createElement('source');
            tempSourceEl.setAttribute('media', sourceData.media);
            tempSourceEl.setAttribute('srcset', sourceData.srcset);
            tempPictureEl.appendChild(tempSourceEl);
          });
        }

        _loadTempImage(imageEl, tempPictureEl).then(function () {
          _loadHero();
        }, function (err) {// console.error(err);
        });
      });
    };

    var lightboxElements = Lightbox;

    lightboxElements.lightboxCloseCtrl.onclick = function () {
      _closeLightbox();
    };

    var _loadPost = function _loadPost() {
      var postIndex = activeImageIndex + 1 >= galleries.currentGallery.images.length ? 0 : activeImageIndex + 1;
      var imageData = galleries.getImageDataByIndex(postIndex);

      _open(imageData);
    };

    var _loadPre = function _loadPre() {
      var preIndex = activeImageIndex - 1 < 0 ? galleries.currentGallery.images.length - 1 : activeImageIndex - 1;
      var imageData = galleries.getImageDataByIndex(preIndex);

      _open(imageData);
    };

    var _removeImagesFromLightbox = function _removeImagesFromLightbox() {
      if (lightboxElements.lightboxImageContainer.children) {
        Array.from(lightboxElements.lightboxImageContainer.children).forEach(function (el) {
          return el.parentNode.removeChild(el);
        });
      }
    };

    var _addImageToLightbox = function _addImageToLightbox(imageData) {
      lightboxElements.lightboxImageContainer.appendChild(imageData.pictureHero);
      imageData.pictureHero.querySelector('img').classList.add('zooduck-lightbox__image--hidden');
    };

    var _closeLightbox = function _closeLightbox() {
      lightboxActive = false;
      lightboxElements.lightbox.classList.add("zooduck-lightbox--exit-the-duck-".concat(lastSwipeDirection));
      lastSwipeDirection = 'left'; // reset

      docBody.allowScroll();
      setTimeout(function () {
        return _removeLightboxFromDOM();
      }, 250);
    };

    var _removeLightboxFromDOM = function _removeLightboxFromDOM() {
      lightboxElements.lightbox.classList.remove('zooduck-lightbox--exit-the-duck-left', 'zooduck-lightbox--exit-the-duck-right');
      if (lightboxElements.lightbox.parentNode) lightboxElements.lightbox.parentNode.removeChild(lightboxElements.lightbox);
    };

    var _addLightboxImageContainerEnterClass = function _addLightboxImageContainerEnterClass() {
      lightboxElements.lightboxImageContainer.classList.add('zooduck-lightbox__image-container--enter-the-duck');
      lightboxElements.lightboxHeroPlaceholderContainer.classList.add('zooduck-lightbox__hero-placeholder-container--enter-the-duck');
      setTimeout(function () {
        lightboxElements.lightboxImageContainer.classList.remove('zooduck-lightbox__image-container--enter-the-duck');
        lightboxElements.lightboxHeroPlaceholderContainer.classList.remove('zooduck-lightbox__hero-placeholder-container--enter-the-duck');
      }, 250);
    };

    var _addLightboxToDOM = function _addLightboxToDOM(imageData) {
      lightboxActive = true;
      lightboxInitialOrientation = screen.orientation.angle;

      _removePlaceholderBackgroundImage();

      _addLightboxImageContainerEnterClass();

      if (config.useLoadingSpinnerForLightbox) {
        // ======================================================================================
        // NOTE: This timeout can take longer if another block of code is using execution thread
        // ======================================================================================
        var t = setTimeout(function () {
          if (!activeHeroLoaded && activeHero.id === imageData.id) {
            lightboxElements.lightboxLoadingSpinner.classList.add('zooduck-lightbox__loading-spinner--active');
          }
        }, 250);
        lightboxTimeouts.push(t);
      } // ======================================================================================
      // NOTE: This timeout can take longer if another block of code is using execution thread
      // ======================================================================================


      if (config.enablePlaceholderInLightbox) {
        _addPlaceholderBackgroundImage(activeHero.placeholderSVG); // always use placeholderSVG for lightbox!


        var t2 = setTimeout(function () {
          if (!activeHeroLoaded) {
            if (config.useTinyThumbnailPlaceholderInLightbox === true) {
              _loadTinyThumbnail(activeHero).then(function (tinyThumbnail) {
                if (!activeHeroLoaded) {
                  _addPlaceholderBackgroundImage(tinyThumbnail);
                }
              }, function (err) {
                console.error(err);
              });
            }
          }
        }, 250);
        lightboxTimeouts.push(t2);
      }

      _addImageToLightbox(activeHero);

      document.body.appendChild(lightboxElements.lightbox);
    };

    var _clearLightboxTimeouts = function _clearLightboxTimeouts() {
      for (var c = 0, l = lightboxTimeouts.length; c < l; c++) {
        var t = lightboxTimeouts.pop();
        clearTimeout(t);
      }
    };

    var _removeLoadingSpinner = function _removeLoadingSpinner() {
      if (lightboxElements.lightboxLoadingSpinner) {
        lightboxElements.lightboxLoadingSpinner.classList.remove('zooduck-lightbox__loading-spinner--active');
      }
    };

    var _exitActiveHero = function _exitActiveHero() {
      var swipeDirection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'left';
      var imageContainerExitClass = "zooduck-lightbox__image-container--exit-stage-".concat(swipeDirection);
      var heroPlaceholderContainerExitClass = "zooduck-lightbox__hero-placeholder-container--exit-stage-".concat(swipeDirection);
      lightboxElements.lightboxImageContainer.classList.add(imageContainerExitClass);
      lightboxElements.lightboxHeroPlaceholderContainer.classList.add(heroPlaceholderContainerExitClass);
      setTimeout(function () {
        lightboxElements.lightboxImageContainer.classList.remove(imageContainerExitClass);
        lightboxElements.lightboxImageContainer.style.left = '0';
        lightboxElements.lightboxHeroPlaceholderContainer.classList.remove(heroPlaceholderContainerExitClass);
        lightboxElements.lightboxHeroPlaceholderContainer.style.left = '0';
        swipeDirection === 'left' ? _loadPost() : _loadPre();
      }, 100);
    };

    var _resetActiveHero = function _resetActiveHero() {
      lightboxElements.lightboxImageContainer.classList.add('zooduck-lightbox__image-container--reset');
      lightboxElements.lightboxImageContainer.style.left = '0';
      lightboxElements.lightboxHeroPlaceholderContainer.classList.add('zooduck-lightbox__hero-placeholder-container--reset');
      lightboxElements.lightboxHeroPlaceholderContainer.style.left = '0';
      setTimeout(function () {
        lightboxElements.lightboxImageContainer.classList.remove('zooduck-lightbox__image-container--reset');
        lightboxElements.lightboxHeroPlaceholderContainer.classList.remove('zooduck-lightbox__hero-placeholder-container--reset');
      }, 250);
    };

    var _resetLightbox = function _resetLightbox() {
      _clearLightboxTimeouts();

      _removeLightboxFromDOM();

      _removeImagesFromLightbox();

      _removePlaceholderBackgroundImage();
    };

    var _open = function _open() {
      var imageData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!imageData) {
        return;
      }

      docBody.disableScroll();
      activeHeroLoaded = false;
      activeHero = imageData;

      _resetLightbox();

      var imageIndex = galleries.getImageIndex(imageData.id);
      activeImageIndex = imageIndex;
      var imageIndexPre = imageIndex === 0 ? galleries.currentGallery.images.length - 1 : imageIndex - 1;
      var imageIndexPost = imageIndex + 1 >= galleries.currentGallery.images.length ? 0 : imageIndex + 1;
      var imageDataPre = galleries.getImageDataByIndex(imageIndexPre);
      var imageDataPost = galleries.getImageDataByIndex(imageIndexPost);

      _lazyLoadImage(imageData, imageDataPre, imageDataPost);

      _addLightboxToDOM(imageData);
    };

    var _touchEndHandler = function _touchEndHandler() {
      if (lightboxEvents.swipeRegistered) {
        lastSwipeDirection = lightboxEvents.swipeDirection;

        _exitActiveHero(lightboxEvents.swipeDirection);
      } else {
        _resetActiveHero();
      }
    };

    var _touchMoveHandler = function _touchMoveHandler(clientX) {
      if (lightboxEvents.touchActive) {
        lightboxElements.lightboxImageContainer.style.left = "".concat(clientX - lightboxEvents.touchStart, "px");
        lightboxElements.lightboxHeroPlaceholderContainer.style.left = "".concat(clientX - lightboxEvents.touchStart, "px");
      }
    };

    (function ADD_EVENT_LISTENERS_FOR_SWIPE_AND_TAP() {
      lightboxElements.lightboxGlass.onmousedown = function (e) {
        var mouseButton = e.which;

        if (mouseButton <= 1) {
          lightboxEvents.touchStart = e.clientX;
        }
      };

      lightboxElements.lightboxGlass.onmousemove = function (e) {
        _touchMoveHandler(e.clientX);
      };

      lightboxElements.lightboxGlass.onmouseup = function (e) {
        var mouseButton = e.which;

        if (mouseButton <= 1) {
          lightboxEvents.touchEnd = e.clientX;

          _touchEndHandler();
        }
      };

      lightboxElements.lightboxGlass.ontouchstart = function (e) {
        lightboxEvents.touchStart = e.changedTouches[0].clientX;
      };

      lightboxElements.lightboxGlass.ontouchmove = function (e) {
        var clientX = e.changedTouches[0].clientX;

        _touchMoveHandler(clientX);
      };

      lightboxElements.lightboxGlass.ontouchend = function (e) {
        lightboxEvents.touchEnd = e.changedTouches[0].clientX;

        _touchEndHandler();
      };

      lightboxElements.lightboxGlass.addEventListener('click', function () {
        if (lightboxEvents.swipeDistance === 0) {
          // Have to check "swipeDistance" because Microsoft Edge registers a click with mousedown + mousemove + mouseup
          _closeLightbox();
        }
      });
    })();

    return {
      open: function open() {
        var imageData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _open(imageData);
      },
      reset: function reset() {
        return _resetLightbox();
      },
      removeLoadingSpinner: function removeLoadingSpinner() {
        return _removeLoadingSpinner();
      },

      get active() {
        return lightboxActive;
      },

      get initialOrientation() {
        return lightboxInitialOrientation;
      },

      set options(options) {
        if (options === void 0) {
          options = {};
        }

        config = options;
      }

    };
  }();

  var Thumbnail = function Thumbnail() {
    var imageData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _getPlaceholderImageAnimationClassVariant = function _getPlaceholderImageAnimationClassVariant() {
      var placeImageAnimationClassModifiers = ['--from-south', '--from-west', '--from-east'];
      var index = Math.round(Math.random() * 2);
      return 'place-image-animation' + (placeImageAnimationClassModifiers[index] || '--from-south');
    };

    var _getImgMarkup = function _getImgMarkup() {
      var imageEl = document.createElement('img');
      imageEl.classList.add('zooduck-gallery-row__image');
      imageEl.classList.add(imageData.id);
      imageEl.classList.add(_getPlaceholderImageAnimationClassVariant());
      Object.keys(imageData).forEach(function (key) {
        var attr = key;
        if (key.search(/(sources|thumbnail|hero)/i) !== -1) return;
        imageEl.setAttribute(attr, imageData[key]);
      });
      imageEl.setAttribute('draggable', 'false');
      imageEl.dataset.src = imageData.thumbnail.src;

      imageEl.onclick = function (e) {
        var imageData = galleries.getImageData(e.target.id);
        lightbox.open(imageData);
      };

      return imageEl;
    };

    var _getSourcesMarkup = function _getSourcesMarkup() {
      var sources = [];

      if (imageData.thumbnail.sources) {
        imageData.thumbnail.sources.forEach(function (sourceData) {
          var sourceEl = document.createElement('source');
          Object.keys(sourceData).forEach(function (key) {
            var attr = key;
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

    };
  };

  var Hero = function Hero() {
    var imageData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _getImgMarkup = function _getImgMarkup() {
      var imageEl = new Image();
      imageEl.classList.add('zooduck-lightbox__image');
      Object.keys(imageData).forEach(function (key) {
        var attr = key;
        if (key.search(/(sources|thumbnail|hero)/i) !== -1) return;
        imageEl.setAttribute(attr, imageData[key]);
      });
      imageEl.dataset.src = imageData.hero.src;
      return imageEl;
    };

    var _getSourcesMarkup = function _getSourcesMarkup() {
      var sources = [];

      if (imageData.hero.sources) {
        imageData.hero.sources.forEach(function (sourceData) {
          var sourceEl = document.createElement('source');
          Object.keys(sourceData).forEach(function (key) {
            var attr = key;
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

    };
  };

  var Picture = function Picture() {
    var imageData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'thumbnail';
    var pictureEl = document.createElement('picture');
    pictureEl.classList.add(imageData.id);
    var markup = type === 'thumbnail' ? new Thumbnail(imageData) : new Hero(imageData);
    var sourceEls = markup.sources;
    sourceEls.forEach(function (sourceEl) {
      pictureEl.appendChild(sourceEl);
    });
    var imageEl = markup.img;
    pictureEl.appendChild(imageEl);
    return pictureEl;
  };

  var galleryImageStyles = function galleryImageStyles() {
    var imageData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var uniqueCSSClass = imageData.id;
    var upscaleRatio = imageData.upscaleRatio ? imageData.upscaleRatio : 1;
    var thumbnailBorderWidth = config.thumbnailBorderWidth || 0;
    var horizontalGridGap = thumbnailBorderWidth * 2;
    var imageWidthForViewportWidthContainer = "calc( ((".concat(imageData.width, " * (((100vw - ").concat(config.bodyBufferPixels, "px - ").concat(horizontalGridGap, "px) / ").concat(config.squareSpacePerRow, ") / ").concat(imageData.height, ")) * ").concat(upscaleRatio, ") + ").concat(thumbnailBorderWidth, "px )");
    var imageHeightForViewportWidthContainer = "calc( (((100vw - ".concat(config.bodyBufferPixels, "px) / ").concat(config.squareSpacePerRow, ") * ").concat(upscaleRatio, ") - ").concat(thumbnailBorderWidth, "px )");
    var imageWidthForFixedWidthContainer = (config.desktopLandscapeBreakpoint - config.bodyBufferPixels - horizontalGridGap) / config.squareSpacePerRow * upscaleRatio / (imageData.height / imageData.width) + thumbnailBorderWidth + 'px';
    var imageHeightForFixedWidthContainer = (config.desktopLandscapeBreakpoint - config.bodyBufferPixels) / config.squareSpacePerRow * upscaleRatio - thumbnailBorderWidth + 'px';
    var stylesheetRules = [".zooduck-gallery-row__image.".concat(uniqueCSSClass, " {\n            width: ").concat(imageWidthForViewportWidthContainer, ";\n            height: ").concat(imageHeightForViewportWidthContainer, ";\n            border-style: solid;\n            border-width: 0;\n            border-color: ").concat(config.galleryBackgroundColor, ";\n            border-right-width: ").concat(config.thumbnailBorderWidth, "px;\n        }"), "picture.".concat(uniqueCSSClass, " {\n            height: ").concat(imageHeightForViewportWidthContainer, ";\n        }"), "@media (min-width: ".concat(config.desktopLandscapeBreakpoint, "px) {\n            .zooduck-gallery-row__image.").concat(uniqueCSSClass, " {\n                width: ").concat(imageWidthForFixedWidthContainer, ";\n                height: ").concat(imageHeightForFixedWidthContainer, ";\n            }\n            picture.").concat(uniqueCSSClass, " {\n                height: ").concat(imageHeightForFixedWidthContainer, ";\n            }\n        }")];
    return stylesheetRules;
  };

  var _getDynamicWidthAndHeightStylesForImage = function _getDynamicWidthAndHeightStylesForImage(imageData) {
    return galleryImageStyles(imageData);
  };

  var _setStylesForImage = function _setStylesForImage(imageData) {
    var stylesheetRules = _getDynamicWidthAndHeightStylesForImage(imageData);

    stylesheetRules.forEach(function (rule) {
      return stylesheet.sheet.insertRule(rule, stylesheet.sheet.cssRules.length);
    });
  };

  var _setImageMarkup = function _setImageMarkup(imageData) {
    var thumbnailPictureEl = new Picture(imageData, 'thumbnail');
    imageData.pictureThumbnail = thumbnailPictureEl;
    var heroPictureEl = new Picture(imageData, 'hero');
    imageData.pictureHero = heroPictureEl;
  };

  var _getDownscaleRatio = function _getDownscaleRatio(imageSquareSpace) {
    return config.squareSpacePerRow / imageSquareSpace;
  };

  var _getUpscaleRatio = function _getUpscaleRatio(imageSquareSpace, squareSpaceOccupied, emptySquareSpace) {
    if (imageSquareSpace > config.squareSpacePerRow) {
      return _getDownscaleRatio(imageSquareSpace, config.squareSpacePerRow);
    }

    var emptySquareSpaceProportionateToImage = imageSquareSpace / squareSpaceOccupied * emptySquareSpace;
    var upscaleRatio = emptySquareSpaceProportionateToImage / imageSquareSpace + 1;
    return upscaleRatio;
  };

  var _calcEmptySquareSpace = function _calcEmptySquareSpace(group) {
    var squareSpaceOccupied = group.reduce(function (total, imageData) {
      return total + imageData.squareSpace;
    }, 0);
    var emptySquareSpace = config.squareSpacePerRow - squareSpaceOccupied;
    return emptySquareSpace;
  };

  var _upscaleImagesToFit = function _upscaleImagesToFit(group) {
    // =============================================
    // NOTE: This method can also downscale images
    // =============================================
    var squareSpaceOccupied = group.reduce(function (total, imageData) {
      return total + imageData.squareSpace;
    }, 0);
    var emptySquareSpace = config.squareSpacePerRow - squareSpaceOccupied;
    var upscaleRatioMax = config.upscaleRatioMax || 1;
    group.forEach(function (imageData, index, arr) {
      if (arr.length === 1 && imageData.squareSpace < config.squareSpacePerRow) {
        // NEVER upscale single images
        return;
      }

      if (!config.upscaleImagesToFit && imageData.squareSpace <= config.squareSpacePerRow) {
        // ONLY proceed if image width is greater than the row width (downscale required)
        return;
      }

      var upscaleRatio = _getUpscaleRatio(imageData.squareSpace, squareSpaceOccupied, emptySquareSpace);

      imageData.upscaleRatio = upscaleRatio < upscaleRatioMax ? upscaleRatio : upscaleRatioMax;
      imageData.upscaleSquareSpace = imageData.squareSpace * imageData.upscaleRatio;
      imageData.upscaleWidth = imageData.width * imageData.upscaleRatio;
      imageData.upscaleHeight = imageData.height * imageData.upscaleRatio;
    });
    return group;
  };

  var _downscaleImagesToFit = function _downscaleImagesToFit(group) {
    // Get combined squareSpace of images in group
    var squareSpaceOccupied = group.reduce(function (acc, imageData) {
      return acc + imageData.squareSpace;
    }, 0);
    group.forEach(function (imageData) {
      var upscaleRatio = _getDownscaleRatio(squareSpaceOccupied, config.squareSpacePerRow);

      if (imageData.upscaleRatio) return;
      imageData.upscaleRatio = upscaleRatio < config.upscaleRatioMax ? upscaleRatio : config.upscaleRatioMax;
      imageData.upscaleSquareSpace = imageData.squareSpace * imageData.upscaleRatio;
      imageData.upscaleWidth = imageData.width * imageData.upscaleRatio;
      imageData.upscaleHeight = imageData.height * imageData.upscaleRatio;
    });
    return group;
  };

  var _groupContainsUpscaledImages = function _groupContainsUpscaledImages(group) {
    return group.find(function (imageDataItem) {
      return imageDataItem.upscaleHeight;
    });
  };

  var _fixGroupsWithVastAmountsOfWhitespace = function _fixGroupsWithVastAmountsOfWhitespace(groups) {
    var groupsWithVastAmountsOfWhitespace = groups.filter(function (group) {
      var emptySquareSpace = _calcEmptySquareSpace(group);

      return emptySquareSpace > .5 && !_groupContainsUpscaledImages(group);
    });
    var groupsWithVastAmountsOfWhitespaceIndexes = groupsWithVastAmountsOfWhitespace.map(function (group) {
      return groups.indexOf(group);
    });
    var groupsWithLittleWhitespace = groups.filter(function (group) {
      var emptySquareSpace = _calcEmptySquareSpace(group);

      return emptySquareSpace <= .5 || _groupContainsUpscaledImages(group);
    });

    if (groupsWithVastAmountsOfWhitespace.length > 0) {
      var imageDataObjects = groupsWithVastAmountsOfWhitespace.reduce(function (acc, currentVal) {
        return acc.concat(currentVal);
      });
      var groupsOfTwo = [];
      imageDataObjects.forEach(function (imageDataItem, index, arr) {
        if (index % 2 === 0) {
          var pairOfImagesForDownscaling = [];
          pairOfImagesForDownscaling.push(imageDataItem);
          var secondImage = arr[index + 1];

          if (secondImage) {
            pairOfImagesForDownscaling.push(secondImage);
          }

          groupsOfTwo.push(pairOfImagesForDownscaling);
        }
      });
      var downscaledGroups = groupsOfTwo.map(function (group) {
        return _downscaleImagesToFit(group);
      }); // ----------------------------------------------------------
      // Add back the newly formed downscaled group pairs
      // (This is better than using concat, which would just
      // place all the downscaled rows at the end of the gallery)
      // -----------------------------------------------------------

      downscaledGroups.forEach(function (group) {
        groupsWithLittleWhitespace.splice(groupsWithVastAmountsOfWhitespaceIndexes.shift(), 0, group);
      });
    }

    var groupsFinally = groupsWithLittleWhitespace;
    return groupsFinally;
  }; // const _sortGroupsByEmptyWhitespace = (groups, squareSpacePerRow = 4) => {
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


  var _downscaleGroup = function _downscaleGroup(group) {
    var squareSpaceOccupied = group.reduce(function (acc, currentVal) {
      return acc + currentVal.squareSpace;
    }, 0);
    var downscaleRatio = config.squareSpacePerRow / squareSpaceOccupied;
    var downscaledGroup = group.map(function (imageDataObj) {
      imageDataObj.upscaleRatio = downscaleRatio;
      return imageDataObj;
    });
    return downscaledGroup;
  };

  var _groupSizesWithoutUpscale = function _groupSizesWithoutUpscale() {
    var imageDataObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var rows = [];
    var currentRow = [];
    imageDataObjects.forEach(function (imageDataObject) {
      var totalWhitespaceOccupied = currentRow.reduce(function (acc, currentVal) {
        return acc + currentVal.squareSpace;
      }, 0);

      if (totalWhitespaceOccupied < config.squareSpacePerRow) {
        imageDataObject.upscaleRatio = 1; // reset

        currentRow.push(imageDataObject);
      } else {
        var downscaledGroup = _downscaleGroup(currentRow);

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

  var _groupSizes = function _groupSizes() {
    var imageDataObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var groups = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var squareSpace = 0;
    var indexCompensator = 0;
    var group = [];

    for (var c = 0, l = imageDataObjects.length; c < l; c++) {
      var currentImageDataObj = imageDataObjects[c - indexCompensator];

      if (c === 0 && imageDataObjects[0].squareSpace >= config.squareSpacePerRow) {
        var fullWidthImageDataObj = imageDataObjects.splice(0, 1)[0];
        group.push(fullWidthImageDataObj);

        if (config.upscaleImagesToFit) {
          _upscaleImagesToFit(group);
        }

        groups.push(group);
        return _groupSizes(imageDataObjects, groups);
      } else if (currentImageDataObj.squareSpace + squareSpace <= config.squareSpacePerRow) {
        var imageDataObj = imageDataObjects.splice(c - indexCompensator, 1)[0];
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
    } // groups = _sortGroupsByEmptyWhitespace(groups, squareSpacePerRow);


    return groups;
  };

  var Gallery = function () {
    return function () {
      var imageDataObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var imageDataObjectsCopy = Array.from(imageDataObjects);
      imageDataObjectsCopy.forEach(function (item) {
        delete item.upscaleRatio;
        delete item.placeholderUrl;
        item.placeholderUrl = placeholderUrl(item);
      });
      var fourSquareGroups;

      if (config.keepImageOrder === true) {
        // ======================================================================================================================================
        // This algorithm (default!) only downscales images, maintains image order, does not use recursion, and is much simpler than _groupSizes
        // ======================================================================================================================================
        fourSquareGroups = _groupSizesWithoutUpscale(imageDataObjectsCopy);
      } else {
        fourSquareGroups = _groupSizes(imageDataObjectsCopy, []);
      }

      fourSquareGroups.forEach(function (group) {
        group.forEach(function (imageData) {
          _setImageMarkup(imageData);

          _setStylesForImage(imageData);
        });
      }); // ============================================================================
      // NOTE: Array.prototype.flatMap() and Array.prototype.flat() are experimental
      // For now, use reduce() with concat() instead
      // ============================================================================
      // const imagesSortedToFit = fourSquareGroups.flatMap( (group) => group);

      var imagesSortedToFit = fourSquareGroups.reduce(function (acc, currentVal) {
        return acc.concat(currentVal);
      });
      return {
        images: imagesSortedToFit,
        rows: fourSquareGroups,
        rowsToLoad: Array.from(fourSquareGroups)
      };
    };
  }();

  var galleryStyles = function galleryStyles() {
    return ["@keyframes place-image--from-south {\n            0% {\n                transform: translate(0, 50vw);\n            }\n            100% {\n                transform: translate(0, 0);\n            }\n        }", " @keyframes place-image--from-east {\n            0% {\n                transform: translate(50vw, 0);\n            }\n            20% {\n                transform: translateY(20px);\n            }\n            60% {\n                transform: translateY(-20px);\n            }\n            100% {\n                transform: translate(0, 0);\n            }\n        }", "@keyframes place-image--from-west {\n            0% {\n                transform: translate(-50vw, 0);\n            }\n            100% {\n                transform: translate(0, 0);\n            }\n        }", "@media (min-width: ".concat(config.disableAnimationsForMobile ? config.mobileBreakpoint : 0, "px) {\n            .place-image-animation,\n            .place-image-animation--from-south,\n            .place-image-animation--from-east,\n            .place-image-animation--from-west {\n                animation-duration: ").concat(config.placeholderAnimationDuration, "s;\n            }\n        }"), " .place-image-animation--from-south:not(.--no-animate) {\n            animation-name: place-image--from-south;\n        }", " .place-image-animation--from-east:not(.--no-animate) {\n            animation-name: place-image--from-east;\n        }", ".place-image-animation--from-west:not(.--no-animate) {\n            animation-name: place-image--from-west;\n        }", ".zooduck-gallery-container {\n            /* =============== */\n            /* --- Problem --- */\n            /* =============== */\n\n            /* The image width calculation includes 20px for scrollbar\n            /* so when vertical scrollbar is not present, the widths\n            /* of images are over-compensating and therefore will not\n            /* fit flush in the container (there will be some whitespace between images)\n\n            /* ================ */\n            /* --- Solution --- */\n            /* ================ */\n\n            /* Wrapping the rows in a container with display: grid solves this problem */\n            \n            position: relative;\n            display: grid;\n            width: calc(100vw - ".concat(config.bodyBufferPixels + (config.thumbnailBorderWidth ? 0 : 1), "px);\n            gap: ").concat(config.thumbnailBorderWidth ? config.thumbnailBorderWidth + 'px' : 'unset', ";\n            background-color: ").concat(config.galleryBackgroundColor, ";\n            justify-content: center;\n            user-select: none;\n            margin-bottom: 50px;\n            margin-left: auto;\n            margin-right: auto;\n        }"), ".zooduck-gallery-row, .zooduck-gallery-row:first-of-type {\n            display: flex;\n            width: calc(100vw - ".concat(config.bodyBufferPixels, "px);\n            height: auto;\n            overflow: hidden; /* == IMPORTANT! Prevents scroll from \"jumping\" after new rows have loaded (not sure why it happens) == */\n            border-style: solid;\n            border-width: 0;\n            border-color: ").concat(config.galleryBackgroundColor, ";\n            border-left-width: ").concat(config.thumbnailBorderWidth, "px;\n        }"), ".zooduck-gallery-row:first-of-type {\n            border-top-width: ".concat(config.thumbnailBorderWidth, "px;\n        }"), ".zooduck-gallery-row--single-image {\n            justify-content: flex-start;\n        }", ".zooduck-gallery-row__image {\n            height: calc((100vw - ".concat(config.bodyBufferPixels, "px) / ").concat(config.squareSpacePerRow, ");\n            width: auto;\n            max-width: 100%;\n        }"), "@media (min-width: ".concat(config.desktopLandscapeBreakpoint + 1, "px) {\n            .zooduck-gallery-container {\n                width: ").concat(config.desktopLandscapeBreakpoint - config.bodyBufferPixels - (config.thumbnailBorderWidth ? 0 : 1), "px !important;\n            }\n            .zooduck-gallery-row {\n                width: ").concat(config.desktopLandscapeBreakpoint - config.bodyBufferPixels, "px !important;\n                height: auto;\n            }\n            .zooduck-gallery-row__image {\n                height: calc(").concat(config.desktopLandscapeBreakpoint - config.bodyBufferPixels, "px / ").concat(config.squareSpacePerRow, ");\n            }\n        }")];
  };

  var lightboxStyles = function lightboxStyles() {
    return ["@keyframes enterTheDuck {\n            0% {\n                transform: scale(.85);\n                opacity: 0;\n            }\n            100% {\n                transform: scale(1);\n                opacity: 1;\n            }\n        }", "@keyframes exitTheDuck {\n            0% {\n                transform: scale(1) translateX(0);\n            }\n            50% {\n                transform: scale(.85) translateX(0);\n            }\n            100% {\n                transform: scale(.85) translateX(-125%);\n            }\n        }", "@keyframes exitTheDuckRight {\n            0% {\n                transform: scale(1) translateX(0);\n            }\n            50% {\n                transform: scale(.85) translateX(0);\n            }\n            100% {\n                transform: scale(.85) translateX(125%);\n            }\n        }", ".zooduck-lightbox {\n            display: flex;\n            z-index: 85;\n            justify-content: center;\n            align-items: center;\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            text-align: center;\n            overflow: hidden;\n            background-color: #111;\n            user-select: none;\n            background-position: center center;\n            background-size: contain;\n            background-repeat: no-repeat;\n        }", ".zooduck-lightbox--exit-the-duck-left {\n            animation: exitTheDuck .25s linear;\n        }", ".zooduck-lightbox--exit-the-duck-right {\n            animation: exitTheDuckRight .25s linear;\n        }", ".zooduck-lightbox__hero-placeholder-container {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background-position: center center;\n            background-size: contain;\n            background-repeat: no-repeat;\n            background-color: ".concat(config.lightboxBackgroundColor, ";\n        }"), ".zooduck-lightbox__hero-placeholder-container--enter-the-duck {\n            animation: enterTheDuck .25s;\n        }", " .zooduck-lightbox__hero-placeholder-container--reset {\n            transition: left .25s;\n        }", ".zooduck-lightbox__hero-placeholder-container--exit-stage-left, .zooduck-lightbox__hero-placeholder-container--exit-stage-right {\n            transition: all .25s;\n            transform: scale(.85);\n        }", ".zooduck-lightbox__hero-placeholder-container--exit-stage-left {\n            left: -100% !important;     \n        }", ".zooduck-lightbox__hero-placeholder-container--exit-stage-right {\n            left: 100% !important;\n        }", ".zooduck-lightbox__image-container,\n        .zooduck-lightbox__image-container--enter-the-duck,\n        .zooduck-lightbox__image-container--hidden,\n        .zooduck-lightbox__image-container--exit-stage-left,\n        .zooduck-lightbox__image-container--exit-stage-right,\n        .zooduck-lightbox__image-container--reset {\n            position: relative;\n            visibility: visible;\n        }", ".zooduck-lightbox__image-container--enter-the-duck {\n            animation: enterTheDuck .25s;\n        }", ".zooduck-lightbox__image-container--reset {\n            transition: left .25s;\n        }", ".zooduck-lightbox__image-container--exit-stage-left, .zooduck-lightbox__image-container--exit-stage-right {\n            transition: all .25s;\n            transform: scale(.85);\n        }", ".zooduck-lightbox__image-container--exit-stage-left {\n            left: -100% !important;     \n        }", ".zooduck-lightbox__image-container--exit-stage-right {\n            left: 100% !important;\n        }", ".zooduck-lightbox__image, .zooduck-lightbox__image--fit-to-height, .zooduck-lightbox__image--fit-to-width {\n            background-color: #333;\n        }", "@media (orientation: landscape) {\n            .zooduck-lightbox__image {\n                height: auto;\n                max-width: 100%;\n                width: auto;\n                max-height: calc(100vh + 3px);\n            }\n        }\n        ", "@media (orientation: portrait) {\n            .zooduck-lightbox__image {\n                width: auto;\n                max-height: 100vh;\n                height: auto;\n                max-width: 100%;                \n            }\n        }", ".zooduck-lightbox__image--hidden {\n            visibility: hidden;\n        }", "@keyframes loadingSpinner {\n            0% {\n                transform: rotate(0deg) scale(2);\n            }\n            100% {\n                transform: rotate(360deg) scale(2);\n            }\n        }", ".zooduck-lightbox__loading-spinner,\n         .zooduck-lightbox__loading-spinner--active {\n            display: none; \n        }", ".zooduck-lightbox__loading-spinner--active {\n            display: flex;\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            justify-content: center;\n            align-items: center;\n        }", ".zooduck-lightbox__loading-spinner__icon {\n            animation: loadingSpinner 1s linear infinite;\n            color: #fff;\n        }", ".zooduck-lightbox__glass {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            cursor: pointer;\n        }", ".zooduck-lightbox__close-ctrl {\n            position: absolute;\n            top: 10px;\n            right: 10px;\n            padding: 10px;\n            background-color: rgba(0, 0, 0, .52);\n            cursor: pointer;\n        }", ".zooduck-lightbox__close-ctrl__icon {\n            color: #ffffff;\n        }"];
  };

  var _createStylesheet = function _createStylesheet() {
    stylesheet.create();
    galleryStyles().forEach(function (rule) {
      return stylesheet.sheet.insertRule(rule, stylesheet.sheet.cssRules.length);
    });
    lightboxStyles().forEach(function (rule) {
      return stylesheet.sheet.insertRule(rule, stylesheet.sheet.cssRules.length);
    });
  };

  var placeholderAnimationStatus = function () {
    var _placeholderAnimationsCompleted = false;
    return {
      get completed() {
        return _placeholderAnimationsCompleted;
      },

      set completed(bool) {
        _placeholderAnimationsCompleted = bool;
      }

    };
  }();

  var intersectionObserver = function () {
    var _intersectionObserver;

    var preLoadImage = function preLoadImage(imageEl) {
      var tempPictureEl = document.createElement('picture');
      var pictureSources = imageEl.parentNode.querySelectorAll('source');

      if (pictureSources) {
        Array.from(pictureSources).forEach(function (sourceEl) {
          var tempSourceEl = document.createElement('source');
          tempSourceEl.setAttribute('media', sourceEl.getAttribute('media'));
          tempSourceEl.setAttribute('srcset', sourceEl.dataset.srcset);
          tempPictureEl.appendChild(tempSourceEl);
        });
      }

      var tempImageEl = new Image();

      tempImageEl.onload = function () {
        loadImageOnIntersect(imageEl);
      };

      tempImageEl.src = imageEl.dataset.src;
      tempPictureEl.appendChild(tempImageEl);
    };

    var loadImageOnIntersect = function loadImageOnIntersect(imageEl) {
      var delay = placeholderAnimationStatus.completed ? 0 : config.placeholderAnimationDuration * 1000;
      setTimeout(function () {
        imageEl.src = imageEl.dataset.src;
        var pictureEl = imageEl.parentNode;

        if (pictureEl.constructor.name === 'HTMLPictureElement') {
          var sourceEls = pictureEl.querySelectorAll('source');
          Array.from(sourceEls).forEach(function (sourceEl) {
            sourceEl.srcset = sourceEl.dataset.srcset;
          });
        }
      }, delay);

      _intersectionObserver.unobserve(imageEl);
    };

    var intersectHandler = function intersectHandler(entries) {
      entries.forEach(function (item) {
        if (item.isIntersecting && item.intersectionRatio >= .5) {
          preLoadImage(item.target);
        }
      });
    };

    if ('IntersectionObserver' in window && 'isIntersecting' in window.IntersectionObserverEntry.prototype) {
      console.warn('IntersectionObserver API support detected! Intersection Ratio: 0.5');
      _intersectionObserver = new IntersectionObserver(intersectHandler, {
        root: null,
        threshold: [.5]
      });
      return _intersectionObserver;
    } else {
      return false;
    }
  }();

  var lazyLoadThumbnail = function lazyLoadThumbnail() {
    var _delayLoad = function _delayLoad(imageEl) {
      var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var delay = placeholderAnimationStatus.completed || animate === false ? 0 : config.placeholderAnimationDuration * 1000;
      setTimeout(function () {
        if (intersectionObserver) {
          return;
        }

        imageEl.src = imageEl.dataset.src;
        var pictureEl = imageEl.parentNode;

        if (pictureEl.constructor.name === 'HTMLPictureElement') {
          var sourceEls = pictureEl.querySelectorAll('source');
          Array.from(sourceEls).forEach(function (sourceEl) {
            sourceEl.srcset = sourceEl.dataset.srcset;
          });
        }
      }, delay); // TODO: Make placeholder animation duration part of config
    };

    var _preLoadImage = function _preLoadImage(imageData) {
      var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var imageEl = imageData.pictureThumbnail.querySelector('img');
      imageEl.src = imageData.placeholderUrl;

      if (!imageEl.dataset.src) {
        return;
      } // Use IntersectionObserver API if supported!


      if (intersectionObserver) {
        return intersectionObserver.observe(imageEl);
      }

      var tempPictureEl = document.createElement('picture');

      if (imageData.thumbnail.sources) {
        imageData.thumbnail.sources.forEach(function (sourceData) {
          // console.log(sourceData);
          var tempSourceEl = document.createElement('source');
          tempSourceEl.setAttribute('media', sourceData.media);
          tempSourceEl.setAttribute('srcset', sourceData.srcset);
          tempPictureEl.appendChild(tempSourceEl);
        });
      }

      var tempImageEl = new Image();

      tempImageEl.onload = function () {
        _delayLoad(imageEl, animate);
      };

      tempImageEl.src = imageEl.dataset.src;
      tempPictureEl.appendChild(tempImageEl);
    };

    return {
      loadImage: function loadImage(imageData) {
        var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        return _preLoadImage(imageData, animate);
      },

      set placeholderAnimationStatus(status) {
        _placeholderAnimationStatus = status;
      }

    };
  };

  var _calcRowHeight = function _calcRowHeight(rowData) {
    var maxViewportWidth = config.desktopLandscapeBreakpoint;
    var viewportWidth = window.innerWidth < maxViewportWidth ? window.innerWidth : maxViewportWidth;
    var heightPerRow = (viewportWidth - config.bodyBufferPixels) / config.squareSpacePerRow;
    return heightPerRow * (rowData[0].upscaleRatio || 1);
  };

  var calcRowsRequired = function calcRowsRequired(galleryData) {
    if (config.loadAll) {
      return galleryData.rowsToLoad.length;
    }

    var viewportHeight = window.innerHeight;
    var rowHeights = galleryData.rows.map(function (rowData) {
      return _calcRowHeight(rowData);
    });
    var rowsRequired = 0;
    var viewportSpaceUsed = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = rowHeights[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var rowHeight = _step.value;
        viewportSpaceUsed += rowHeight;

        if (viewportSpaceUsed < viewportHeight) {
          rowsRequired += 1;
        } else {
          rowsRequired += 1;
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return rowsRequired;
  };

  var _lazyLoadThumbnail = lazyLoadThumbnail();

  var _resetPlaceholderOnThumbnail = function _resetPlaceholderOnThumbnail(imageData) {
    var usePlaceholderSVG = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    // ================================================================================
    // NOTE: usePlaceholderSVG is for when imageData.placeholderUrl errors (bad url)
    // ================================================================================
    Array.from(imageData.pictureThumbnail.querySelectorAll('source')).forEach(function (sourceEl) {
      sourceEl.srcset = usePlaceholderSVG ? imageData.placeholderSVG : imageData.placeholderUrl;
    });
    imageData.pictureThumbnail.querySelector('img').src = usePlaceholderSVG ? imageData.placeholderSVG : imageData.placeholderUrl;
  };

  var _addNoAnimateModifier = function _addNoAnimateModifier(pictureThumbnail) {
    if (pictureThumbnail && pictureThumbnail.lastChild) {
      pictureThumbnail.lastChild.classList.add('--no-animate');
    }
  };

  var _removeNoAnimateModifier = function _removeNoAnimateModifier(pictureThumbnail) {
    if (pictureThumbnail && pictureThumbnail.lastChild) {
      pictureThumbnail.lastChild.classList.remove('--no-animate');
    }
  };

  var loadGallery = function loadGallery() {
    var galleryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var rowsRequired = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var resetLightbox = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var animate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    if (resetLightbox && lightbox.active) {
      lightbox.reset();
    }

    var placeholderAnimationsAllowed = (window.innerWidth > config.mobileBreakpoint || config.disableAnimationsForMobile === false) && animate === true;
    placeholderAnimationStatus.completed = true;

    if (placeholderAnimationsAllowed) {
      placeholderAnimationStatus.completed = false;
      setTimeout(function () {
        placeholderAnimationStatus.completed = true;
      }, config.placeholderAnimationDuration * 1000);
    }

    var _loadPlaceholders = function _loadPlaceholders() {
      var imagesToLoad = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var placeholdersLoaded = [];
      return new Promise(function (resolve, reject) {
        console.log('WAITING_FOR_PLACEHOLDERS_TO_LOAD...');
        imagesToLoad.forEach(function (imageData) {
          var tempPlaceholderImage = new Image();

          tempPlaceholderImage.onload = function () {
            _resetPlaceholderOnThumbnail(imageData);

            placeholdersLoaded.push(1);

            if (placeholdersLoaded.length === imagesToLoad.length) {
              resolve('ALL_PLACEHOLDERS_LOADED');
            }
          };

          tempPlaceholderImage.onerror = function (e) {
            _resetPlaceholderOnThumbnail(imageData, true);

            placeholdersLoaded.push(1);

            if (placeholdersLoaded.length === imagesToLoad.length) {
              resolve('ALL_PLACEHOLDERS_LOADED');
            }
          };

          tempPlaceholderImage.src = imageData.placeholderUrl;
        });
      }, function (err) {
        reject(err);
      });
    };

    var _getRowMarkup = function _getRowMarkup() {
      var imageGalleryRowNode = document.createElement('div');
      imageGalleryRowNode.classList.add('zooduck-gallery-row');
      return imageGalleryRowNode;
    };

    var _loadRows = function _loadRows() {
      var rowsToLoad = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var imageGalleryRows = [];
      rowsToLoad.forEach(function (rowData) {
        var imageGalleryRowNode = _getRowMarkup(rowData);

        rowData.forEach(function (imageData) {
          if (animate === false) {
            _addNoAnimateModifier(imageData.pictureThumbnail);
          } else {
            _removeNoAnimateModifier(imageData.pictureThumbnail); // remove modifier class for manual calls to loadGallery()

          }

          _lazyLoadThumbnail.loadImage(imageData, animate);

          imageGalleryRowNode.appendChild(imageData.pictureThumbnail);
        });
        imageGalleryRows.push(imageGalleryRowNode);
      });
      return imageGalleryRows;
    };

    var _addRowsToDOM = function _addRowsToDOM(imageGalleryRows, galleryData) {
      var imageGalleryContainerNode = galleryData.containerNode;
      imageGalleryRows.forEach(function (imageGalleryRowNode, index, arr) {
        imageGalleryContainerNode.appendChild(imageGalleryRowNode);

        if (index === arr.length - 1) {
          if (document.querySelector("#".concat(galleryData.id))) {
            return;
          }

          document.body.appendChild(imageGalleryContainerNode);
        }
      });
    };

    var _loadGallery = function _loadGallery(galleryData) {
      var _rowsRequired = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var rowsRequired = _rowsRequired || calcRowsRequired(galleryData);

      var rowsToLoad = galleryData.rowsToLoad.splice(0, rowsRequired);
      var imagesToLoad = [];
      rowsToLoad.forEach(function (rowData) {
        rowData.forEach(function (imageData) {
          imagesToLoad.push(imageData);
        });
      });

      if (imagesToLoad.length > 0) {
        _loadPlaceholders(imagesToLoad).then(function () {
          console.log('ALL_PLACEHOLDERS_LOADED');

          var imageGalleryRows = _loadRows(rowsToLoad);

          _addRowsToDOM(imageGalleryRows, galleryData);
        }, function (err) {
          console.error(err);
        });
      }
    };

    _loadGallery(galleryData, rowsRequired);
  };

  var removeGallery = function removeGallery() {
    var galleryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (galleryData.containerNode) {
      Array.from(galleryData.containerNode.children).forEach(function (childNode) {
        return childNode.parentNode.removeChild(childNode);
      });
      galleryData.rowsToLoad = Array.from(galleryData.rows);

      if (galleryData.containerNode.parentNode) {
        galleryData.containerNode.parentNode.removeChild(galleryData.containerNode);
      }
    }
  };

  var validateGallery = function validateGallery() {
    var galleryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var imageDataFormat = "\n    {\n        width: <number: pixels>,\n        height: <number: pixels>,\n        hero: {\n            src: <string: url>\n            sources: (optional) [\n                <object: source: { media: <string: media_query>, srcset: <string: srcset> }>\n            ]\n        },\n        thumbnail: {\n            src: <string: url>\n            sources: (optional) [\n                <object: source: { media: <string: media_query>, srcset: <string: srcset> }>\n            ]\n        }\n    }";
    galleryData = galleryData.filter(function (imageData) {
      var isValid = false;

      try {
        isValid = imageData.width && imageData.height // && imageData.hero.sources (recommended but optional)
        // && imageData.thumbnail.sources (recommended but optional)
        && imageData.hero.src && imageData.thumbnail.src;
      } catch (e) {
        console.error(e);
        console.warn("registerGallery() expects an array of IMAGE_DATA objects in the following format: ".concat(imageDataFormat));
      }

      return isValid;
    });
    return galleryData;
  };

  var scrollHandler = function () {
    var buffer = 20;
    var galleryToWatch;
    var listenCalled = false;

    var _listen = function _listen() {
      listenCalled = true;
      window.addEventListener('scroll', function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var viewportHeight = window.innerHeight;
        var scrollHeight = document.documentElement.scrollHeight || document.documentElement.offsetHeight;

        if (viewportHeight + scrollTop + buffer >= scrollHeight) {
          if (lightbox.active || !scrollTop) {
            return;
          }

          loadGallery(galleryToWatch);
        }
      });
    };

    var _watchGallery = function _watchGallery(galleryData) {
      galleryToWatch = galleryData;
      if (!listenCalled) _listen();
    };

    return {
      watchGallery: function watchGallery(galleryData) {
        _watchGallery(galleryData);
      },

      get galleryToWatch() {
        return galleryToWatch;
      }

    };
  }();

  var orientationChange = function orientationChange() {
    var _lastFiredDate;

    return {
      get lastFiredDate() {
        return _lastFiredDate;
      },

      set lastFiredDate(date) {
        _lastFiredDate = date;
      }

    };
  };

  var _galleryData;

  var _resizeFn = function _resizeFn() {
    // ======================================================================
    // NOTE: This method was originally added to reload the gallery
    // when the orientation of device changed from landscape to portrait
    // (since more rows than were previously loaded would be required)
    // However, this behaviour is now being dealt with by the
    // orientationchange event, which results in 2 calls to loadGallery,
    // hence the early return check on orientationChange.lastFiredDate below
    // =======================================================================
    var nowTime = new Date().getTime();

    if (orientationChange.lastFiredDate && nowTime - orientationChange.lastFiredDate < 1000) {
      return;
    }

    if (_galleryData.rowsToLoad.length < 1) {
      window.removeEventListener('resize', _resizeFn, false);
    }

    var minRowsRequiredToCoverViewportHeight = calcRowsRequired(_galleryData);
    var rowsLoaded = _galleryData.rows.length - _galleryData.rowsToLoad.length;
    var rowsToLoad = minRowsRequiredToCoverViewportHeight - rowsLoaded;

    if (rowsToLoad > 0) {
      loadGallery(_galleryData, rowsToLoad, false);
    }
  };

  var resizeHandler = function resizeHandler(galleryData) {
    _galleryData = galleryData;
    window.addEventListener('resize', _resizeFn, false);
  };

  var updateGallery = function updateGallery() {
    var galleryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var gallery = new Gallery(galleryData.images);
    galleryData = Object.assign(galleryData, _objectSpread({}, gallery));
    console.log('galleryData', galleryData);
  };

  var rebuildGallery = function rebuildGallery() {
    var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (galleries.currentGallery) {
      removeGallery(galleries.currentGallery);
      _createStylesheet();
      updateGallery(galleries.currentGallery);
      loadGallery(galleries.currentGallery, 0, false, animate);
    }
  };

  var orientationHandler = function () {
    window.addEventListener('orientationchange', function () {
      orientationChange.lastFiredDate = new Date();

      if (!lightbox.active && config.columns !== config.columnsForMobile) {
        setTimeout(function () {
          placeholderAnimationStatus.completed = true;
          rebuildGallery(false);
        }, 25);
      }
    });
  }();

  var lightboxGlassEvents = function () {
    var lightboxElements = Lightbox;
    lightboxElements.lightboxGlass.addEventListener('click', function () {
      // =======================================================================================================================================
      // NOTE: As at 25-01-2019 the click event is now firing for mousedown + mousemove + mouseup in Chrome (it only used to do this in IE)...
      // =======================================================================================================================================
      setTimeout(function () {
        var currentOrientation = screen.orientation.angle;

        if (lightbox.initialOrientation !== currentOrientation && config.columns !== config.columnsForMobile) {
          rebuildGallery(false);
        }
      }, 25);
    });
  }();

  var __ZOOGAL__ = function () {
    window.zoogal = function () {
      // ======================
      // zoogal::Private Vars
      // ======================
      var currentConfig = _objectSpread({}, config); // ...
      // ========================
      // zoogal::Private Methods
      // ========================


      var configChanged = function configChanged() {
        var configChanged = false;
        Object.keys(config).forEach(function (key) {
          if (config[key] != currentConfig[key]) {
            currentConfig = _objectSpread({}, config);
            configChanged = true;
          }
        });
        return configChanged;
      };

      var logConfigChangesToConsole = function logConfigChangesToConsole() {
        var customConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        Object.keys(customConfig).forEach(function (key) {
          config[key] = customConfig[key];
          console.warn("zoogal config[\"".concat(key, "\"] set to ").concat(customConfig[key]));
        });
      }; // ========================
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

        loadGallery: function loadGallery$$1() {
          var galleryName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          if (!galleryName) return;
          var requestedGallery = galleries.getGalleryByName(galleryName);

          if (requestedGallery) {
            removeGallery(galleries.currentGallery);
            galleries.currentGallery = requestedGallery;
            scrollHandler.watchGallery(requestedGallery);

            if (configChanged()) {
              _createStylesheet();
              updateGallery(requestedGallery);
            }

            resizeHandler(requestedGallery);

            loadGallery(requestedGallery);
          }
        },
        registerGallery: function registerGallery(string__galleryName) {
          var galleryData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          var gallery = validateGallery(galleryData);

          if (gallery) {
            if (!stylesheet.sheet) {
              _createStylesheet();
            }

            gallery.forEach(function (imageData) {
              imageData = new ImageData(imageData);
            });
            var galleryId = "".concat(string__galleryName, "_").concat(Math.random().toString().substr(2));
            galleries.addGallery(Object.assign({
              name: string__galleryName,
              id: galleryId,
              containerNode: new GalleryContainer(galleryId)
            }, new Gallery(gallery)));
          }
        },
        setOptions: function setOptions() {
          var customConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          logConfigChangesToConsole(customConfig);
          lightbox.options = config;
        }
      };
    }();
  }();

}());
