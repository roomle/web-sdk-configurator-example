// 1. import the SDK
import RoomleSdk from 'roomle-web-sdk';
// 1a. import type definitions to use them to override default settings
import {InitData} from 'roomle-web-sdk/lib/definitions/common-core/src/utils/shims';
// 1b. import some function which can handle an update of parameters
//     import some function which can handle an update of possible children
//     import some function which can handle an update of the part list
import {handleParameterUpdate, handlePossibleChildrenUpdate, handlePartlist} from './handler/events';
// 1c. import UiKernelParameter, UiPossibleChild for type assistance
import {UiKernelParameter, UiPossibleChild} from 'roomle-web-sdk/lib/definitions/typings/kernel';

// 2. create an async iife to use async/await
((async function () {
    // 3. get a new instance of a configurator
    const roomleConfigurator = await RoomleSdk.getConfigurator();
    // 4. tell the configurator that it's time to boot, this can happen
    //    at any time in your app. Just call it when it's best for you
    roomleConfigurator.boot();

    const options: InitData = {};
    // 4a. enable hd rendering
    options.enableHD = true;
    // 4b. use different light setting
    options.ls = 'shelf';
    // 4c. override default settings
    roomleConfigurator.getApi().setOverrides(options);

    // 5. get the element where we want to append the canvas
    //    this is done with the browser native DOM function appendChild
    const element = document.getElementById('roomle-canvas-container');

    // 5a. add some callback if the user changes a parameter
    const setParameter = (parameter: UiKernelParameter, value: string) => {
        // 5b. set the value of the parameter on the currently selected component
        roomleConfigurator.getApi().setParameter(parameter, value);
    };
    // 5c. register to events, depending on the events it makes sense to 
    //     add them before you init the canvas, e.g. hook into onUpdateParameters
    //     before init so you can receive the parameters on load
    roomleConfigurator.getApi().callbacks.onUpdateParameters = (parameters) => handleParameterUpdate(parameters, setParameter);

    // 6a. add some callback if the user wants to dock something
    const previewDockings = (possibleChild: UiPossibleChild, dragEvent: DragEvent) => {
        // 6b. set the value of the parameter on the currently selected component
        roomleConfigurator.getApi().previewDockings(possibleChild, dragEvent, (!!dragEvent) ? true : false);
    };
    // 6c. register to events, depending on the events it makes sense to 
    //     add them before you init the canvas, e.g. hook into onUpdatePossibleChildren
    //     before init so you can receive the possible children on load
    roomleConfigurator.getApi().callbacks.onUpdatePossibleChildren = (tags) => handlePossibleChildrenUpdate(tags, previewDockings);

    // 7. add a function which can handle updates to the part list also hook into this
    //    function before you call init to get the inital part list as well
    roomleConfigurator.getApi().callbacks.onPartListUpdate = handlePartlist;

    // 8. initialize the canvas
    await roomleConfigurator.getApi().init(element);
    // 8. load something (to know how to load see section about conf vs item vs conf string)
    await roomleConfigurator.getApi().loadConfigurableItemById('usm:frame');

    // 9. register a click listener on a button which triggers the checkout process
    //    do this after init is finished because otherwise it could happen that you get invalid data
    document.querySelector('.checkout').addEventListener('click', async () => {
        // 9.a fancy dom manipulation, should be done by your framework
        document.querySelector('.modal-container').classList.add('show');
        // 9.b save the current configuration to get the data. This also saves the configuration to
        //     the roomle furniture platform so it is always available if a user
        //     wants to restart from here
        const configuration = await roomleConfigurator.getApi().saveCurrentConfiguration();
        // 9.c fancy dom manipulation, should be done by your framework
        const img = document.createElement('img');
        img.src = configuration.perspectiveImage;
        const imageContainer = document.querySelector('.perspective-image');
        imageContainer.innerHTML = null;
        imageContainer.appendChild(img);
        document.querySelector('.modal').classList.add('show');
    });

    // 9.d fancy dom manipulation, should be done by your framework
    document.querySelector('.modal__close').addEventListener('click', () => document.querySelector('.modal-container').classList.remove('show'));
}()));
