# zooduck-self-sorting-gallery
Library for generating thumbnail galleries without whitespace.

![alt text](https://github.com/zooduck/screenshots/blob/master/zoogal-self-sorting-gallery/zoogal-self-sorting-gallery-1.png)

### To view on GitHub Pages:
- https://zooduck.github.io/zoogal-self-sorting-gallery/demo/

## Usage
Include the following `<script>` tag in the `<head>` of your page:

```html
<script src='https://raw.githubusercontent.com/zooduck/zooduck-self-sorting-gallery/master/dist/zoogal.js'></script>
```

- Create an array of image objects using the following format:
```javascript
{
    width, // The naturalWidth in pixels of the full size (hero) image
    height, // The naturalHeight in pixels of the full size (hero) image
    hero: {
        src: 'http://zoo.com/images/full/begemotik.png',
        sources: []
    },
    thumbnail: {
        src: 'http://zoo.com/images/thumbnail/begemotik.png',
        sources: []
    }
}
```
**NOTE:** zoogal supports *Responsive Images* using the `<picture>` tag. To make use of this feature, simply provide an array of source objects to the `sources` prop. Entirely optional!

### source object example
```javascript
{
  type: 'image/png',
  media: '(max-width: 320px)'
  srcset: 'http://zoo.com/images/full/begemotik_320px.png, http://zoo.com/images/full/begemotik_620px.png 2x'
}
```
# zoogal methods
- Register a gallery
```javascript
zoogal.registerGallery('your_gallery_name', your_array_of_image_objects);
```
- Configure options for all galleries (optional - see below for available options)
```javascript
 zoogal.setOptions(your_config_object);
 ```
- Load a gallery
```javascript
zoogal.loadGallery('your_gallery_name');
```

# Config

| Name | Default | Description |
| :---- | :----- | :---------- |
| mobileBreakpoint | 768 | Used by the disableAnimationsForMobile option. |
| mobilePortraitBreakpoint | 425 | Used by the columnsForMobile option. |
| desktopLandscapeBreakpoint | 1024 | The maximum width (in pixels) for the Thumbnail Gallery. |
| placeholderUrl | '' | If set, this image will be used instead of the auto-generated multi-coloured SVG placeholders. |
| loadAll | false | Disable lazy loading. |
| keepImageOrder | true | Image order is maintained. Set this option to false if you want to maintain a consistent height for your gallery rows. |
| upscaleImagesToFit | false | Set to true if you want to reduce the amount of whitespace. *Requires keepImageOrder: true.* |
| upscaleRatioMax | 1.5 | The maximum amount of upscale. *Requires keepImageOrder: true, upscaleImagesToFit: true.* |
| disableAnimationsForMobile | false | *References mobileBreakpoint.* |
| useLoadingSpinnerForLightbox | true | Use Loading Spinner in Lightbox when image is loading. |
| thumbnailBorderWidth | 5 | The amount of Thumbnail Grid spacing in pixels. |
| galleryBackgroundColor | #ffffff | **Note: Must be a 6-digit hex value.** |
| placeholderAnimationDuration | 1 | The animation duration (in seconds) for the Thumbnail Placeholder animations. |
| lightboxBackgroundColor | #111111  | **Note: Must be a 6-digit hex value.** |
| columnsPerRow | 4 | Affects the number of images per row. Higher values = more images per row. **Note: The more images per row, the smaller they will be.** |
| columsForMobile | 3 | Affects the number of images per row for a mobile device in portrait orientation. Higher values = more images per row. **Note: The more images per row, the smaller they will be.** *References mobilePortraitBreakpoint.* |
| enablePlaceholderInLightbox | true | If set to true, displays a placeholder (SVG / thumbnail) when the image is loading. |
| useTinyThumbnailPlaceholderInLightbox | true | *Requires enablePlaceholderInLightbox: true.* If set to true, the Gallery Thumbnail will be used as the placeholder (upscaled pixelated effect). If set to false, a solid colour SVG will be used instead. |
