import config from '../settings/config.settings';

const lightboxStyles = () => {
    return [
        `@keyframes enterTheDuck {
            0% {
                transform: scale(.85);
                opacity: 0;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }`,
        `@keyframes exitTheDuck {
            0% {
                transform: scale(1) translateX(0);
            }
            50% {
                transform: scale(.85) translateX(0);
            }
            100% {
                transform: scale(.85) translateX(-125%);
            }
        }`,
        `@keyframes exitTheDuckRight {
            0% {
                transform: scale(1) translateX(0);
            }
            50% {
                transform: scale(.85) translateX(0);
            }
            100% {
                transform: scale(.85) translateX(125%);
            }
        }`,
        `.zooduck-lightbox {
            display: flex;
            z-index: 85;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            text-align: center;
            overflow: hidden;
            background-color: #111;
            user-select: none;
            background-position: center center;
            background-size: contain;
            background-repeat: no-repeat;
        }`,
        `.zooduck-lightbox--exit-the-duck-left {
            animation: exitTheDuck .25s linear;
        }`,
        `.zooduck-lightbox--exit-the-duck-right {
            animation: exitTheDuckRight .25s linear;
        }`,
        `.zooduck-lightbox__hero-placeholder-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-position: center center;
            background-size: contain;
            background-repeat: no-repeat;
            background-color: ${config.lightboxBackgroundColor};
        }`,
        `.zooduck-lightbox__hero-placeholder-container--enter-the-duck {
            animation: enterTheDuck .25s;
        }`,
        ` .zooduck-lightbox__hero-placeholder-container--reset {
            transition: left .25s;
        }`,
        `.zooduck-lightbox__hero-placeholder-container--exit-stage-left, .zooduck-lightbox__hero-placeholder-container--exit-stage-right {
            transition: all .25s;
            transform: scale(.85);
        }`,
        `.zooduck-lightbox__hero-placeholder-container--exit-stage-left {
            left: -100% !important;     
        }`,
        `.zooduck-lightbox__hero-placeholder-container--exit-stage-right {
            left: 100% !important;
        }`,
        `.zooduck-lightbox__image-container,
        .zooduck-lightbox__image-container--enter-the-duck,
        .zooduck-lightbox__image-container--hidden,
        .zooduck-lightbox__image-container--exit-stage-left,
        .zooduck-lightbox__image-container--exit-stage-right,
        .zooduck-lightbox__image-container--reset {
            position: relative;
            visibility: visible;
        }`,
        `.zooduck-lightbox__image-container--enter-the-duck {
            animation: enterTheDuck .25s;
        }`,
        `.zooduck-lightbox__image-container--reset {
            transition: left .25s;
        }`,
        `.zooduck-lightbox__image-container--exit-stage-left, .zooduck-lightbox__image-container--exit-stage-right {
            transition: all .25s;
            transform: scale(.85);
        }`,
        `.zooduck-lightbox__image-container--exit-stage-left {
            left: -100% !important;     
        }`,
        `.zooduck-lightbox__image-container--exit-stage-right {
            left: 100% !important;
        }`,
        `.zooduck-lightbox__image, .zooduck-lightbox__image--fit-to-height, .zooduck-lightbox__image--fit-to-width {
            background-color: #333;
        }`,
        `@media (orientation: landscape) {
            .zooduck-lightbox__image {
                height: auto;
                max-width: 100%;
                width: auto;
                max-height: calc(100vh + 3px);
            }
        }
        `,
        `@media (orientation: portrait) {
            .zooduck-lightbox__image {
                width: auto;
                max-height: 100vh;
                height: auto;
                max-width: 100%;                
            }
        }`,
        `.zooduck-lightbox__image--hidden {
            visibility: hidden;
        }`,
        `@keyframes loadingSpinner {
            0% {
                transform: rotate(0deg) scale(2);
            }
            100% {
                transform: rotate(360deg) scale(2);
            }
        }`,
        `.zooduck-lightbox__loading-spinner,
         .zooduck-lightbox__loading-spinner--active {
            display: none; 
        }`,
        `.zooduck-lightbox__loading-spinner--active {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
        }`,
        `.zooduck-lightbox__loading-spinner__icon {
            animation: loadingSpinner 1s linear infinite;
            color: #fff;
        }`,
        `.zooduck-lightbox__glass {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }`,
        `.zooduck-lightbox__close-ctrl {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 10px;
            background-color: rgba(0, 0, 0, .52);
            cursor: pointer;
        }`,
        `.zooduck-lightbox__close-ctrl__icon {
            color: #ffffff;
        }`
    ];
};

export default lightboxStyles;
