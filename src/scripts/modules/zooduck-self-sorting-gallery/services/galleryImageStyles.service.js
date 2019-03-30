import config from '../settings/config.settings';

const galleryImageStyles = (imageData = {}) => {
    
    const uniqueCSSClass = imageData.id;
    const upscaleRatio = imageData.upscaleRatio ? imageData.upscaleRatio : 1;
    const thumbnailBorderWidth = config.thumbnailBorderWidth  || 0;
    const horizontalGridGap = thumbnailBorderWidth * 2;

    const imageWidthForViewportWidthContainer = `calc( ((${imageData.width} * (((100vw - ${config.bodyBufferPixels}px - ${horizontalGridGap}px) / ${config.squareSpacePerRow}) / ${imageData.height})) * ${upscaleRatio}) + ${thumbnailBorderWidth}px )`;
    const imageHeightForViewportWidthContainer = `calc( (((100vw - ${config.bodyBufferPixels}px) / ${config.squareSpacePerRow}) * ${upscaleRatio}) - ${thumbnailBorderWidth}px )`;

    const imageWidthForFixedWidthContainer = (((((config.desktopLandscapeBreakpoint - config.bodyBufferPixels - horizontalGridGap) / config.squareSpacePerRow) * upscaleRatio) / (imageData.height / imageData.width)) + thumbnailBorderWidth) + 'px';
    const imageHeightForFixedWidthContainer = (((((config.desktopLandscapeBreakpoint - config.bodyBufferPixels)) / config.squareSpacePerRow) * upscaleRatio) - thumbnailBorderWidth) + 'px';

    const stylesheetRules = [
        `.zooduck-gallery-row__image.${uniqueCSSClass} {
            width: ${imageWidthForViewportWidthContainer};
            height: ${imageHeightForViewportWidthContainer};
            border-style: solid;
            border-width: 0;
            border-color: ${config.galleryBackgroundColor};
            border-right-width: ${config.thumbnailBorderWidth}px;
        }`,
        `picture.${uniqueCSSClass} {
            height: ${imageHeightForViewportWidthContainer};
        }`,
        `@media (min-width: ${config.desktopLandscapeBreakpoint}px) {
            .zooduck-gallery-row__image.${uniqueCSSClass} {
                width: ${imageWidthForFixedWidthContainer};
                height: ${imageHeightForFixedWidthContainer};
            }
            picture.${uniqueCSSClass} {
                height: ${imageHeightForFixedWidthContainer};
            }
        }`
    ];

    return stylesheetRules;
}

export default galleryImageStyles;
