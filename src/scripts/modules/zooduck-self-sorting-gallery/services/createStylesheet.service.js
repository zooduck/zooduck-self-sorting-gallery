import stylesheet from './stylesheet.service';
import galleryStyles from './galleryStyles.service';
import lightboxStyles from './lightboxStyles.service';

const _createStylesheet = () => {

    stylesheet.create();

    galleryStyles().forEach( rule => stylesheet.sheet.insertRule(rule, stylesheet.sheet.cssRules.length));
    lightboxStyles().forEach( rule => stylesheet.sheet.insertRule(rule, stylesheet.sheet.cssRules.length));

};

export default _createStylesheet;
