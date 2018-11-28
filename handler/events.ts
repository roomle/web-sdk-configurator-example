import {UiKernelParameter, UiPossibleChildTag, UiPossibleChild} from 'roomle-web-sdk/lib/definitions/typings/kernel';
import {handleParameter} from './parameters';
import {handleAddonTag} from './addons';

export type SetValueOfParameterCallback = (parameter: UiKernelParameter, value: string) => void;
export type OnPreviewDockings = (possibleChild: UiPossibleChild, dragEvent?: DragEvent) => void;

export const handleParameterUpdate = (paramters: UiKernelParameter[], onSetValueOfParameter: SetValueOfParameterCallback) => {
    const parametersContainter = document.querySelector('.parameters');
    parametersContainter.innerHTML = null;
    paramters.forEach((parameter) => parametersContainter.appendChild(handleParameter(parameter, onSetValueOfParameter)));
};

export const handlePossibleChildrenUpdate = (tags: UiPossibleChildTag[], onPreviewDockings: OnPreviewDockings) => {
    const addonsContainer = document.querySelector('.addons');
    addonsContainer.innerHTML = null;
    tags.forEach((tag) => addonsContainer.appendChild(handleAddonTag(tag, onPreviewDockings)));
    //paramters.forEach((parameter) => addonsContainer.appendChild(handleParameter(parameter, onSetValueOfParameter)));
};