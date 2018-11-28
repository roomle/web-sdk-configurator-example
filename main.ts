// 1. import the SDK
import RoomleSdk from 'roomle-web-sdk';
// 1a. import type definitions to use them to override default settings
import {InitData} from 'roomle-web-sdk/lib/definitions/common-core/src/utils/shims';

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
    // 6. initialize the canvas
    await roomleConfigurator.getApi().init(element);
    // 7. load something (to know how to load see XXX section about conf vs item vs conf string)
    await roomleConfigurator.getApi().loadConfigurableItemById('bespoke_creative:shelfSystem');
}()));
