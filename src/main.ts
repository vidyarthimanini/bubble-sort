import { SortingVisualizer } from './visualizer';
import { SortingControls } from './types';

document.addEventListener('DOMContentLoaded', () => {
    const controls: SortingControls = {
        generate: document.querySelector('#generate') as HTMLButtonElement,
        sizeBtn: document.querySelector('#size') as HTMLButtonElement,
        speedBtn: document.querySelector('#speed') as HTMLButtonElement,
        stopBtn: document.querySelector('#stop') as HTMLButtonElement,
        sizeSlider: document.querySelector('#size-slider') as HTMLInputElement,
        speedSlider: document.querySelector('#speed-slider') as HTMLInputElement,
        sort: document.querySelector('#sort') as HTMLButtonElement,
        container: document.querySelector('.container') as HTMLDivElement,
    };

    new SortingVisualizer(controls);
});