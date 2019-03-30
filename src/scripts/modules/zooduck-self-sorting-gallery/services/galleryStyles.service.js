import config from '../settings/config.settings';

const galleryStyles = () => {
    return [
        `@keyframes place-image--from-south {
            0% {
                transform: translate(0, 50vw);
            }
            100% {
                transform: translate(0, 0);
            }
        }`,
        ` @keyframes place-image--from-east {
            0% {
                transform: translate(50vw, 0);
            }
            20% {
                transform: translateY(20px);
            }
            60% {
                transform: translateY(-20px);
            }
            100% {
                transform: translate(0, 0);
            }
        }`,
        `@keyframes place-image--from-west {
            0% {
                transform: translate(-50vw, 0);
            }
            100% {
                transform: translate(0, 0);
            }
        }`,
        `@media (min-width: ${config.disableAnimationsForMobile ? config.mobileBreakpoint : 0}px) {
            .place-image-animation,
            .place-image-animation--from-south,
            .place-image-animation--from-east,
            .place-image-animation--from-west {
                animation-duration: ${config.placeholderAnimationDuration}s;
            }
        }`,
        ` .place-image-animation--from-south:not(.--no-animate) {
            animation-name: place-image--from-south;
        }`,
        ` .place-image-animation--from-east:not(.--no-animate) {
            animation-name: place-image--from-east;
        }`,
        `.place-image-animation--from-west:not(.--no-animate) {
            animation-name: place-image--from-west;
        }`,
        `.zooduck-gallery-container {
            /* =============== */
            /* --- Problem --- */
            /* =============== */

            /* The image width calculation includes 20px for scrollbar
            /* so when vertical scrollbar is not present, the widths
            /* of images are over-compensating and therefore will not
            /* fit flush in the container (there will be some whitespace between images)

            /* ================ */
            /* --- Solution --- */
            /* ================ */

            /* Wrapping the rows in a container with display: grid solves this problem */
            
            position: relative;
            display: grid;
            width: calc(100vw - ${config.bodyBufferPixels + (config.thumbnailBorderWidth ? 0 : 1)}px);
            gap: ${config.thumbnailBorderWidth ? config.thumbnailBorderWidth + 'px' : 'unset'};
            background-color: ${config.galleryBackgroundColor};
            justify-content: center;
            user-select: none;
            margin-bottom: 50px;
            margin-left: auto;
            margin-right: auto;
        }`,
        `.zooduck-gallery-row, .zooduck-gallery-row:first-of-type {
            display: flex;
            width: calc(100vw - ${config.bodyBufferPixels}px);
            height: auto;
            overflow: hidden; /* == IMPORTANT! Prevents scroll from "jumping" after new rows have loaded (not sure why it happens) == */
            border-style: solid;
            border-width: 0;
            border-color: ${config.galleryBackgroundColor};
            border-left-width: ${config.thumbnailBorderWidth}px;
        }`,
        `.zooduck-gallery-row:first-of-type {
            border-top-width: ${config.thumbnailBorderWidth}px;
        }`,
        `.zooduck-gallery-row--single-image {
            justify-content: flex-start;
        }`,
        `.zooduck-gallery-row__image {
            height: calc((100vw - ${config.bodyBufferPixels}px) / ${config.squareSpacePerRow});
            width: auto;
            max-width: 100%;
        }`,
        `@media (min-width: ${config.desktopLandscapeBreakpoint + 1}px) {
            .zooduck-gallery-container {
                width: ${(config.desktopLandscapeBreakpoint - config.bodyBufferPixels - (config.thumbnailBorderWidth ? 0 : 1))}px !important;
            }
            .zooduck-gallery-row {
                width: ${(config.desktopLandscapeBreakpoint - config.bodyBufferPixels)}px !important;
                height: auto;
            }
            .zooduck-gallery-row__image {
                height: calc(${(config.desktopLandscapeBreakpoint - config.bodyBufferPixels)}px / ${config.squareSpacePerRow});
            }
        }`
    ];
};

export default galleryStyles;
