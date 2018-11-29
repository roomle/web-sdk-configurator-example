import {SceneSettings} from 'roomle-web-sdk/lib/definitions/common-core/src/scene-settings-loader';

export const sceneSettings: SceneSettings = {
    environment: {
        type: 'image',
        details: {
            imageUrl: 'https://storage.googleapis.com/roomle-static/test/bg/bg_grey.jpg',
            color: null,
            material: null,
            fog: false
        }
    },
    lights: [{
        type: 'rectarea',
        name: 'main',
        intensity: 100,
        color: '#bb9d8c',
        position: {
            x: -0.5,
            y: 6,
            z: 3
        },
        target: {
            x: 0,
            y: 0,
            z: 0
        },
        castShadow: true,
        width: 0.8,
        height: 0.8
    }, {
        type: 'spot',
        name: 'side',
        intensity: 0.3,
        color: '#ffffff',
        position: {
            x: 2,
            y: 3,
            z: 1.5
        },
        target: {
            x: 0,
            y: 0.1,
            z: 0
        },
        castShadow: false,
        angle: 50,
        penumbra: 0.5
    }, {
        type: 'ambient',
        name: 'ambient',
        intensity: 0.3,
        color: '#ffffff',
        position: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}