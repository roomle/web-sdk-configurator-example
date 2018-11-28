import {UiKernelParameter, UiPossibleChildTag, UiPossibleChild, KernelPartList, KernelPart} from 'roomle-web-sdk/lib/definitions/typings/kernel';
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

export const handlePartlist = (fullList: KernelPart[], hash: string) => {
    const container = document.querySelector('.partlist');
    container.innerHTML = null;
    fullList.forEach((part) => {
        const row = document.createElement('tr');
        const labelElement = document.createElement('td');
        const idElement = document.createElement('td');
        const countElement = document.createElement('td');
        const priceElement = document.createElement('td');
        const {componentId, label, count} = part;
        labelElement.innerText = label;
        idElement.innerText = componentId;
        countElement.innerText = count.toFixed(0);
        priceElement.innerText = (count * (Math.floor(Math.random() * (100 + 1)))).toFixed(2) + ' Fantasy Dollars';
        row.appendChild(idElement);
        row.appendChild(labelElement);
        row.appendChild(countElement);
        row.appendChild(priceElement);
        container.appendChild(row);
    });
};