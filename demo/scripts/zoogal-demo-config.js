const updateOptions = () => {
    Array.from(form.elements).forEach( item => {
        const val =  zoogal.config[item.name];
        if (typeof val === 'boolean') {
            item.checked = val;
        } else {
            item.value = val;
        }
    });
};

const form = document.querySelector('#configDemoForm');
const configDemo = document.querySelector('.config-demo');

const toggleConfig = () => {
    Array.from(document.querySelectorAll('.config-demo__option')).forEach( item => {
        item.classList.toggle('hide');
    });
    updateOptions(); // refresh (in case changes were made but not saved when settings last closed)
    configDemo.classList.toggle('config-demo--options-visible');
};

document.querySelector('#saveConfigOptions').onclick = function(e) {
    e.preventDefault();

    if (!configDemo.classList.contains('config-demo--options-visible')) {
        return;
    }

    document.getElementById('saveNotificationScreen').classList.add('config-demo__save-notification-screen--active');
    document.getElementById('toggleConfig').classList.remove('config-demo__toggle-config-ctrl--active');

    const newOptions = {}
    Array.from(form.elements).forEach( (item) => {
        if (item.name) {
            newOptions[item.name] = item.value === 'on' ? item.checked : item.value;
        }
    });

    zoogal.setOptions(newOptions);

    updateOptions();

    setTimeout(function() {
        toggleConfig();
        document.getElementById('saveNotificationScreen').classList.remove('config-demo__save-notification-screen--active');
    }, 1000);

}

document.querySelector('#loadGallery').onclick = function(e) {
    e.preventDefault();
    zoogal.loadGallery('landscapes');
}

document.querySelector('#toggleConfig').onclick = function(e) {
    e.preventDefault();
    this.classList.toggle('config-demo__toggle-config-ctrl--active');
    toggleConfig();
}

const densitySlide = document.createElement('div');
densitySlide.classList.add('density-slide', 'hide');
document.body.appendChild(densitySlide);

densitySlide.onclick = function() {
    densitySlide.classList.toggle('hide');
}

const setConfigDemoOptions = () => {
    const configGetters = Object.getOwnPropertyDescriptors(zoogal.config);
    const configGettersArray = Object.entries(configGetters).filter( ([key, descriptor]) => {
        if (descriptor.set) {
            // We only want getters that have setters =)
            return descriptor;
        }
    }).map( (arr) => arr[0]);
    configGettersArray.forEach( (option) => {
        console.log(`zoogal config["${option}"] initialised as ${zoogal.config[option]}`);
    });
    configGettersArray.forEach( (option, index, arr) => {
        const staggeredDelay = 25 * index;
        if (!option.match(/(options|currentOptions|squareSpacePerRow)/)) {
            const optionContainer = document.createElement('div');
            optionContainer.classList.add('config-demo__option', 'hide');
            const label = document.createElement('label');
            label.style.animationDelay = staggeredDelay + 'ms';
            label.innerHTML = option;
            if (option == 'columns') {
                label.onclick = function() {
                    densitySlide.classList.toggle('hide');
                }
            }
            optionContainer.appendChild(label);

            // if (zoogal.config[option] === true || zoogal.config[option] === false) {
            if (typeof zoogal.config[option] === 'boolean') {

                const toggleLabel = document.createElement('label');
                toggleLabel.classList.add('config-demo-option__toggle-label');
                toggleLabel.style.animationDelay = staggeredDelay + 'ms';

                const toggleCheckbox = document.createElement('input');
                toggleCheckbox.type = 'checkbox';
                toggleCheckbox.name = option;
                toggleCheckbox.checked = zoogal.config[option];
                toggleLabel.appendChild(toggleCheckbox);

                const toggle = document.createElement('div');
                toggle.classList.add('config-demo-option__toggle');

                const toggleSwitch = document.createElement('div');
                toggleSwitch.classList.add('config-demo-option__toggle-switch');

                toggle.appendChild(toggleSwitch);

                toggleLabel.appendChild(toggle);

                optionContainer.appendChild(toggleLabel);

            } else {

                const input = document.createElement('input');
                input.style.animationDelay = staggeredDelay + 'ms';

                if (option.match(/color/i)) {
                    input.type = 'color';
                }

                input.value = zoogal.config[option];
                input.name = option;

                optionContainer.appendChild(input);
            }

            document.querySelector('.config-demo__options form').appendChild(optionContainer);
        }
    });
};
