(function() {
    
    const getRandomRGBA = (alpha = .65) => {
        const randomRGBA = {
            multi: {
                r: Math.round(Math.random() * 255),
                g: Math.round(Math.random() * 255),
                b: Math.round(Math.random() * 255)
            },
            purple: {
                r: 150 + Math.round(Math.random() * (210 - 150)), // 150 to 210
                g: Math.round(Math.random() * 145), // 0 to 145
                b: 255
            },
            green: {
                r: 15,
                g: 100,
                b: 85
            }
        }

        return `rgba(${randomRGBA.green.r}, ${randomRGBA.green.g}, ${randomRGBA.green.b}, ${alpha})`;
    };
    
    const getRandomWidth = () => {
        return `${Math.round(Math.random() * 200) + 100}px`;
    };
    
    const welcomeScreenEl = document.querySelector('.welcome-screen');
    const welcomeScreenSquaresEl = document.querySelector('.welcome-screen-squares');
    const welcomeScreenBottomHalfEl = document.querySelector('.welcome-screen-bottom-half');
    const welcomeScreenTearStripCoverEl = document.querySelector('.welcome-screen__tear-strip-cover');
    
    welcomeScreenSquaresEl.onclick = function() {

        intervals.forEach( interval => clearInterval(interval));

        welcomeScreenTearStripCoverEl.classList.add('welcome-screen__tear-strip-cover--tear');
        welcomeScreenSquaresEl.style.display = 'none';

        setTimeout( () => {
            document.querySelector('.welcome-screen__tear-strip').classList.add('welcome-screen__tear-strip--destroy');
        }, 800);

        setTimeout( () => {
            welcomeScreenEl.classList.add('welcome-screen--exit-the-duck');
            welcomeScreenBottomHalfEl.classList.add('welcome-screen__bottom-half--exit-the-duck');
        }, 1250);

        setTimeout( () => {
            welcomeScreenEl.parentNode.removeChild(welcomeScreenEl);
            welcomeScreenBottomHalfEl.parentNode.removeChild(welcomeScreenBottomHalfEl);
            welcomeScreenSquaresEl.parentNode.removeChild(welcomeScreenSquaresEl);
        }, 2000);

    }
    const rowAnimationData = [];
    const intervals = [];
    
    const getRowAnimationData = (numberOfItemsInRow) => {
        const fadeInAnimationTotalDuration = 1000 + (250 * (numberOfItemsInRow - 1));
        return {
            items: numberOfItemsInRow,
            fadeInAnimationTotalDuration
        }
    };
    
    const buildItemForWelcomeScreenRow = (animationDelay, rowIndex) => {
        let previousDelay = 0;
        if (rowIndex > 0) {
            const previousDelays = rowAnimationData.filter( (item, index) => {
                return index < rowIndex;
            });
            previousDelays.forEach( item => {
                previousDelay += item.fadeInAnimationTotalDuration;
            });
        }
        const fadeInAnimationDelay = (250 * animationDelay) + previousDelay;
        const el = document.createElement('div');
        el.classList.add('welcome-screen__row-item');
        el.classList.add('placeholder-fade-in');
        el.style.animationDelay = `${fadeInAnimationDelay}ms`;
        el.setAttribute('animation-delay', fadeInAnimationDelay);
    
        el.style.backgroundColor = getRandomRGBA();
        el.style.width = getRandomWidth();
        return el;
    };
    
    const buildRowForWelcomeScreen = (rowIndex) => {
        const rowEl = document.createElement('div');
        rowEl.classList.add('welcome-screen__row');
        const numberOfItems = Array.from({length: rowAnimationData[rowIndex].items});
        numberOfItems.forEach( (item, index, arr) => {
            const rowItem = buildItemForWelcomeScreenRow(index, rowIndex);
            rowEl.appendChild(rowItem);
        });
        return rowEl;
    };
    
    const rowsRequired = 6;
    
    for (let c = 0; c < rowsRequired; c++) {
        const randomItemsAmount = Math.floor(Math.random() * 6) + 1; // 1 to 5
    
        const numberOfItems = Array.from({length: randomItemsAmount < 3 ? 3 : randomItemsAmount});
        rowAnimationData.push(getRowAnimationData(numberOfItems.length));
    }
    const totalDelayForFadeInAnimation = rowAnimationData.reduce((acc, currentVal) => {
        return acc += currentVal.fadeInAnimationTotalDuration;
    }, 0);
    
    for (let c = 0; c < rowsRequired; c++) {
        const row = buildRowForWelcomeScreen(c);
        welcomeScreenSquaresEl.appendChild(row);
    }

    const welcomeScreenAnimationLoop = () => {
        Array.from(welcomeScreenSquaresEl.children).forEach( row => {
            Array.from(row.children).forEach( el => {
                if (el.classList.contains('welcome-screen__row-item')) {
                    el.classList.remove('placeholder-fade-in');
                    const explodeAnimationClass = Math.round(Math.random()) % 2 === 0 ? 'placeholder-explode--A' : 'placeholder-explode--B';
                    el.classList.add(explodeAnimationClass);
                    el.style.animationDelay = '0s';
    
                    setTimeout( () => {
                        el.classList.remove('placeholder-explode--A', 'placeholder-explode--B');
                        el.classList.add('placeholder-fade-in');
                        el.style.animationDelay = el.getAttribute('animation-delay') + 'ms';
                    }, 5000);
                }
            });
        });
    };
    
    // ==============================
    // Welcome Screen Animation Loop
    // ==============================
    setTimeout(function() {

        welcomeScreenAnimationLoop();

        const welcomeScreenAnimationInterval = setInterval(function() {
            welcomeScreenAnimationLoop();
        }, totalDelayForFadeInAnimation + 5000); // 5000 = the length of the explode animation

        intervals.push(welcomeScreenAnimationInterval); // so we can clear this Interval (welcome screen) when actual gallery loads

    }, totalDelayForFadeInAnimation);


})();
