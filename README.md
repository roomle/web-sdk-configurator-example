# Example for Roomle Web SDK

This is a very simplistic example how to use the Roomle Web SDK. The intention of this repo is to give you an idea how things work together and not to provide you a best practice or boilerplate. 

Please make sure to include the shown parts in your build pipeline as you need it. Since every project is different we can not advice a specific project setup. 

The most interesting part is of course the copying of the Roomle Assets (for details see: https://github.com/Roomle/web-sdk#asset-copy) and the setting of the asset path (for details see: https://github.com/Roomle/web-sdk#asset-path)

## Usage

Run the following commands:

* checkout this repo
* npm install
* npm run serve
* open http://127.0.0.1:8080/ (or the URL which is displayed in your command line, it could be different if 8080 is occupied)
* hit one of the buttons to start either the configurator or the planner

If you start the configurator a USM shelf is loaded and the color is switched to red after some timeout. The planner starts and loads a sample plan. Just give it a try.

## Further stuff

For more details about the SDK project visit our SDK repo: https://github.com/Roomle/web-sdk