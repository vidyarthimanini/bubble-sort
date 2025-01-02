import { SortingControls, SortingState } from './types';
import { DEFAULT_CONFIG, COLORS } from './config';
import { sleep, getRandomValue, calculateBarWidth, calculateBarHeight } from './utils';

export class SortingVisualizer {
    private controls: SortingControls;
    private state: SortingState;

    constructor(controls: SortingControls) {
        this.controls = controls;
        this.state = {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            numberOfElements: DEFAULT_CONFIG.INITIAL_ELEMENTS,
            speed: DEFAULT_CONFIG.INITIAL_SPEED,
            timeouts: [],
        };
        this.initialize();
    }

    private initialize(): void {
        this.createDataset();
        this.setupEventListeners();
        this.updateDataHeight();
    }

    private createDataset(): void {
        this.controls.container.innerHTML = '';
        for (let i = 0; i < this.state.numberOfElements; i++) {
            const data = document.createElement('div');
            const value = getRandomValue();
            const width = calculateBarWidth(this.state.numberOfElements);
            const height = calculateBarHeight(value, this.isMobile());

            data.className = 'data';
            data.setAttribute('value', value.toString());
            data.style.width = `${width}px`;
            data.style.height = `${height}px`;

            this.controls.container.appendChild(data);
        }
    }

    private isMobile(): boolean {
        return window.innerWidth <= DEFAULT_CONFIG.MOBILE_BREAKPOINT;
    }

    private updateDataHeight(): void {
        const dataElements = document.querySelectorAll<HTMLDivElement>('.data');
        dataElements.forEach(element => {
            const value = parseInt(element.getAttribute('value')!);
            const height = calculateBarHeight(value, this.isMobile());
            element.style.height = `${height}px`;
        });
    }

    private setupEventListeners(): void {
        window.addEventListener('resize', () => this.updateDataHeight());

        this.controls.generate.addEventListener('click', () => {
            this.createDataset();
            this.updateDataHeight();
        });

        this.controls.sizeSlider.addEventListener('input', () => {
            this.state.numberOfElements = parseInt(this.controls.sizeSlider.value);
            this.createDataset();
            this.updateDataHeight();
        });

        this.controls.speedSlider.addEventListener('input', () => {
            const maxSpeed = parseInt(this.controls.speedSlider.max);
            const minSpeed = parseInt(this.controls.speedSlider.min);
            const sliderValue = parseInt(this.controls.speedSlider.value);
            this.state.speed = maxSpeed + minSpeed - sliderValue;
        });

        this.setupSortingControls();
    }

    private setupSortingControls(): void {
        this.controls.sort.addEventListener('click', async () => {
            await this.bubbleSort();
        });
    }

    private disableControls(): void {
        this.controls.generate.disabled = true;
        this.controls.sizeSlider.disabled = true;
        this.controls.speedSlider.disabled = true;
        this.controls.sort.disabled = true;

        this.controls.generate.style.backgroundColor = COLORS.DISABLED;
        this.controls.sizeBtn.style.backgroundColor = COLORS.DISABLED;
        this.controls.speedBtn.style.backgroundColor = COLORS.DISABLED;
        this.controls.sort.style.backgroundColor = COLORS.DISABLED;
        this.controls.stopBtn.style.backgroundColor = 'rgb(236, 16, 16)';
    }

    private resetControls(): void {
        this.controls.generate.disabled = false;
        this.controls.sizeSlider.disabled = false;
        this.controls.speedSlider.disabled = false;
        this.controls.sort.disabled = false;

        this.controls.generate.style.backgroundColor = COLORS.PRIMARY;
        this.controls.sizeBtn.style.backgroundColor = COLORS.PRIMARY;
        this.controls.speedBtn.style.backgroundColor = COLORS.PRIMARY;
        this.controls.sort.style.backgroundColor = COLORS.SUCCESS;
        this.controls.stopBtn.style.backgroundColor = COLORS.DISABLED;
    }

    private async bubbleSort(): Promise<void> {
        this.disableControls();
        const dataList = document.querySelectorAll<HTMLDivElement>('.data');
        let stopFlag = false;

        this.controls.stopBtn.addEventListener('click', () => {
            stopFlag = true;
            this.state.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
            this.state.timeouts = [];
            this.resetControls();
        });

        for (let i = 0; i < dataList.length - 1 && !stopFlag; i++) {
            let changed = false;

            for (let j = 0; j < dataList.length - 1 - i && !stopFlag; j++) {
                const value1 = parseInt(dataList[j].getAttribute('value')!);
                const value2 = parseInt(dataList[j + 1].getAttribute('value')!);

                dataList[j].style.backgroundColor = COLORS.ACTIVE;
                dataList[j + 1].style.backgroundColor = COLORS.ACTIVE;

                if (value1 > value2) {
                    const tempHeight = dataList[j].style.height;
                    const tempValue = dataList[j].getAttribute('value');

                    dataList[j].style.height = dataList[j + 1].style.height;
                    dataList[j].setAttribute('value', dataList[j + 1].getAttribute('value')!);

                    dataList[j + 1].style.height = tempHeight;
                    dataList[j + 1].setAttribute('value', tempValue!);
                    changed = true;
                }

                await sleep(this.state.speed);

                dataList[j].style.backgroundColor = COLORS.BAR;
                dataList[j + 1].style.backgroundColor = COLORS.BAR;

                await sleep(this.state.speed / 2);
            }

            if (!changed || stopFlag) {
                this.resetControls();
                break;
            }
        }
    }
}