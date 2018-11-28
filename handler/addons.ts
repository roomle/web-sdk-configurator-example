import {UiPossibleChildTag} from 'roomle-web-sdk/lib/definitions/typings/kernel';
import {OnPreviewDockings} from './events';

export const handleAddonTag = (tag: UiPossibleChildTag, onPreviewDockings: OnPreviewDockings): HTMLElement => {
    const container = document.createElement('div');
    const label = document.createElement('h3');
    const elements = document.createElement('div');
    label.innerText = tag.label;
    container.appendChild(label);
    tag.possibleChildren.forEach((child) => {
        const element = document.createElement('div');
        element.classList.add('addon-element');
        element.draggable = true;
        const img = document.createElement('img');
        img.src = child.perspectiveImage;
        const label = document.createElement('div');
        label.innerText = child.label;
        element.appendChild(img);
        element.appendChild(label);
        element.addEventListener('click', () => onPreviewDockings(child));
        element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setDragImage(new Image(), 0, 0);
            onPreviewDockings(child, event);
        });
        elements.appendChild(element);
    });
    container.appendChild(elements);
    return container;
}