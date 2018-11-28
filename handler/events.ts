import {UiKernelParameter} from 'roomle-web-sdk/lib/definitions/typings/kernel';
import {handleParameter} from './parameters';

export type UpdateParameterCallback = (parameter: UiKernelParameter, value: string) => void;

export const handleParameterUpdate = (paramters: UiKernelParameter[], onUpdateEvent: UpdateParameterCallback) => {
    const parametersContainter = document.querySelector('.parameters');
    parametersContainter.innerHTML = null;
    paramters.forEach((parameter) => parametersContainter.appendChild(handleParameter(parameter, onUpdateEvent)));
};
