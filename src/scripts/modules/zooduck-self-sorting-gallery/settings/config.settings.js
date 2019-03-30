import validate from '../services/validate.service';
import viewport from '../services/viewport.service';

const config = (function() {

    // =====================
    // config::Private Vars
    // =====================

    let marginBufferPixels;
    let paddingBufferPixels;
    const scrollbarBufferPixels = 20; // Scrollbar 17px (Google Chrome) + 3px MOE

    let mobileBreakpoint;
    let mobilePortraitBreakpoint;
    let desktopLandscapeBreakpoint;
    let placeholderUrl;
    let loadAll;
    let upscaleImagesToFit;
    let upscaleRatioMax;
    let disableAnimationsForMobile;
    let enablePlaceholderInLightbox;
    let useTinyThumbnailPlaceholderInLightbox;
    let useLoadingSpinnerForLightbox;
    let thumbnailBorderWidth;
    let galleryBackgroundColor;
    let placeholderAnimationDuration;
    let lightboxBackgroundColor;
    let keepImageOrder;
    let squareSpacePerRow;
    let mobilePortraitSquareSpacePerRow;

    let currentOptions;

    const options = {
        mobileBreakpoint,
        mobilePortraitBreakpoint,
        desktopLandscapeBreakpoint,
        placeholderUrl,
        loadAll,
        upscaleImagesToFit,
        upscaleRatioMax,
        disableAnimationsForMobile,
        enablePlaceholderInLightbox,
        useTinyThumbnailPlaceholderInLightbox,
        useLoadingSpinnerForLightbox,
        thumbnailBorderWidth,
        galleryBackgroundColor,
        placeholderAnimationDuration,
        lightboxBackgroundColor,
        keepImageOrder,
        squareSpacePerRow,
        mobilePortraitSquareSpacePerRow,
        __defaults__: {
            mobileBreakpoint: 768, // Tablet Portrait (used by disableAnimationsForMobile)
            mobilePortraitBreakpoint: 425, // Mobile L (use by mobilePortraitSquareSpacePerRow)
            desktopLandscapeBreakpoint: 1024, // Desktop
            placeholderUrl: '',
            loadAll: false,
            upscaleImagesToFit: false,
            upscaleRatioMax: 1.5,
            disableAnimationsForMobile: false,
            enablePlaceholderInLightbox: true,
            useTinyThumbnailPlaceholderInLightbox: true,
            useLoadingSpinnerForLightbox: true,
            thumbnailBorderWidth: 5,
            galleryBackgroundColor: '#ffffff',
            placeholderAnimationDuration: 1, // 1 second default animation-duration for placeholders
            lightboxBackgroundColor: '#111111',
            keepImageOrder: true,
            squareSpacePerRow: 4, // The number of squares (1:1 ratio images) per row
            mobilePortraitSquareSpacePerRow: 3,  // The number of squares (1:1 ratio images) per row for mobile (portrait orientation)
        }
    };

    // ========================
    // config::Private Methods
    // ========================

    const getDocBodyStyle = () => {
        return getComputedStyle(document.body);
    };

    const isMobilePortrait = () => {
        const mobilePortraitBreakpoint = validate.isNumber(options.mobilePortraitBreakpoint) ? options.mobilePortraitBreakpoint : options.__defaults__.mobilePortraitBreakpoint;
        return viewport.width <= mobilePortraitBreakpoint;
    };

    // =======================
    // config::Public Methods
    // =======================

    return {
        get marginBufferPixels() {
            let docBodyMargin = marginBufferPixels;
            if (!validate.isNumber(docBodyMargin)) {
                try {
                    const docBodyStyle = getDocBodyStyle();
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
            let docBodyPadding = paddingBufferPixels;
            if (!validate.isNumber(docBodyPadding)) {
                try {
                    const docBodyStyle = getDocBodyStyle();
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
            return (this.marginBufferPixels + this.paddingBufferPixels + this.scrollbarBufferPixels);
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
        get loadAll()  {
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
            currentOptions = {...options}
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
    }
})();

export default config;
