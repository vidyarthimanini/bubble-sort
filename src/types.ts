export interface SortingControls {
    generate: HTMLButtonElement;
    sizeBtn: HTMLButtonElement;
    speedBtn: HTMLButtonElement;
    stopBtn: HTMLButtonElement;
    sizeSlider: HTMLInputElement;
    speedSlider: HTMLInputElement;
    sort: HTMLButtonElement;
    container: HTMLDivElement;
}

export interface SortingState {
    windowWidth: number;
    windowHeight: number;
    numberOfElements: number;
    speed: number;
    timeouts: number[];
}
