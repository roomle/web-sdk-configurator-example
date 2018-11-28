import {UiKernelParameter} from 'roomle-web-sdk/lib/definitions/typings/kernel';
import {SetValueOfParameterCallback} from './events';
import {RapiMaterial, RapiMaterialGroup} from 'roomle-web-sdk/lib/definitions/typings/rapi-types';

const createDefaultStuff = (parameter: UiKernelParameter): HTMLElement => {
    const container = document.createElement('div');
    container.classList.add('parameter-container');
    const label = document.createElement('div');
    label.innerText = 'Label: ' + parameter.label;
    const value = document.createElement('div');
    value.innerText = 'Value: ' + parameter.valueLabel;
    const uiType = document.createElement('div');
    uiType.innerText = 'Ui-Type: ' + parameter.uiType;
    container.appendChild(label);
    container.appendChild(value);
    container.appendChild(uiType);
    return container;
}

const handleMaterial = (parameter: UiKernelParameter, onSetValueOfParameter: SetValueOfParameterCallback): HTMLElement => {
    const element = createDefaultStuff(parameter);
    const loading = document.createElement('div');
    loading.innerText = '... loading ...';
    element.appendChild(loading);
    parameter.groups.then((groups) => {
        element.removeChild(loading);
        const groupsContainer = document.createElement('div');
        groups.forEach((group: RapiMaterialGroup) => {
            const groupContainer = document.createElement('div');
            const groupLabel = document.createElement('div');
            groupLabel.innerText = group.label;
            const materialsContainer = document.createElement('div');
            group.materials.forEach((material: RapiMaterial) => {
                const materialElement = document.createElement('div');
                materialElement.classList.add('parameter__material');
                materialElement.addEventListener('click', () => onSetValueOfParameter(parameter, material.id));
                if (material.thumbnail) {
                    materialElement.style.backgroundImage = 'url(' + material.thumbnail + ')';
                } else if (material.color) {
                    materialElement.style.backgroundColor = 'rgb(' + material.color + ')';
                }

                materialsContainer.appendChild(materialElement);
            })
            groupContainer.appendChild(materialsContainer);
            groupsContainer.appendChild(groupContainer);
        });

        element.appendChild(groupsContainer)
    });

    return element;
}

const handleOptions = (parameter: UiKernelParameter, onSetValueOfParameter: SetValueOfParameterCallback): HTMLElement => {
    const element = createDefaultStuff(parameter);
    parameter.validValues.forEach((validValue) => {
        const option = document.createElement('div')
        option.classList.add('parameter__option');
        option.innerText = validValue.label;
        option.addEventListener('click', () => onSetValueOfParameter(parameter, validValue.value));
        element.appendChild(option);
    });
    return element;
}

const handleRange = (parameter: UiKernelParameter, onUpdateEvent: SetValueOfParameterCallback): HTMLElement => {
    const element = createDefaultStuff(parameter);
    return element;
}

const handleUnknown = (parameter: UiKernelParameter, onUpdateEvent: SetValueOfParameterCallback): HTMLElement => {
    return createDefaultStuff(parameter);
}

export const handleParameter = (parameter: UiKernelParameter, onUpdateEvent: SetValueOfParameterCallback): HTMLElement => {
    const uiType = parameter.uiType;
    switch (uiType) {
        case 'Material':
            return handleMaterial(parameter, onUpdateEvent);
        case 'Options':
        case 'Thumbnails':
            return handleOptions(parameter, onUpdateEvent);
        case 'Range':
            return handleRange(parameter, onUpdateEvent);
        default:
            return handleUnknown(parameter, onUpdateEvent);
    }
}
