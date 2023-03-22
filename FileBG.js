// @ts-nocheck
/* eslint-disable no-undef */
console.log('Loading FileBG...');

let FileBG = {};

FileBG.config = {
    default: 'https://i.imgur.com/Xk9FH4B.jpg',
    plaintext: 'https://i.imgur.com/EmN4YwV.jpg',
    javascript: 'https://i.imgur.com/yYMMGjj.jpg',
    json: 'https://i.imgur.com/yYMMGjj.jpg',
    html: 'https://i.imgur.com/rBM9dep.jpg',
    css: 'https://i.imgur.com/Xk9FH4B.jpg',
    typescript: 'https://i.imgur.com/yYMMGjj.jpg',
    typescriptreact: 'https://i.imgur.com/Sm7vS6E.jpg',
    markdown: 'https://i.imgur.com/Sm7vS6E.jpg'
};

FileBG.opacity = 0.9;

window.addEventListener('load', () => {
    FileBG.main();
});

FileBG.main = function () {
    FileBG.changeBackgroundImage();
};

FileBG.setBackgroundImage = function (path) {
    let body = document.body;
    body.style.cssText = `
    opacity: ${FileBG.opacity};
    background-image: url(${path});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center`;
};

FileBG.changeBackgroundImage = function () {
    console.log('FILEBG');

    // thanks to guy from stackoverflow
    function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
        var startTimeInMs = Date.now();
        (function loopSearch() {
            if (document.querySelector(selector) != null) {
                callback();

                return;
            } else {
                setTimeout(function () {
                    if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) return;
                    loopSearch();
                }, checkFrequencyInMs);
            }
        })();
    }

    waitForElementToDisplay('.editor-instance', () => {
        observeChanges();
    });

    function changeToConfigImage() {
        console.log('FILEBG2');

        // @ts-ignore
        let editorInstance = document.getElementsByClassName('editor-instance')[0];
        let mode = editorInstance.getAttribute('data-mode-id');
        console.log(mode);
        console.log('FileBG:', 'Switched to tab with mode ' + mode);

        //console.log(config);

        let foundConfig = false;
        for (let key of Object.keys(FileBG.config)) {
            if (key === mode) {
                console.log('FileBG:', 'changing background image to', key);
                FileBG.setBackgroundImage(FileBG.config[key]);
                foundConfig = true;
            }
        }
        if (!foundConfig) {
            FileBG.setBackgroundImage(FileBG.config.default);
            console.log('FileBG:', "Couldn't find configuration for", mode, 'using default image.');
        }
    }

    function observeChanges() {
        let editorInstance = document.getElementsByClassName('editor-instance');

        // add an mutationobserver to the editor instance for getting changes
        var target = editorInstance[0];

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                // the important code is Here
                if (mutation.attributeName === 'data-mode-id') {
                    changeToConfigImage();
                }
            });
        });

        var observerConfig = {
            attributes: true,
            childList: false,
            characterData: false
        };

        observer.observe(target, observerConfig);
    }
};
