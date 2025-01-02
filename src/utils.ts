import { DEFAULT_CONFIG } from './config';

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function getRandomValue(): number {
    return Math.floor(Math.random() * 100) + 1;
}

export function calculateBarWidth(totalBars: number): number {
    return window.innerWidth / totalBars;
}

export function calculateBarHeight(value: number, isMobile: boolean): number {
    const scale = isMobile ? DEFAULT_CONFIG.HEIGHT_SCALE_MOBILE : DEFAULT_CONFIG.HEIGHT_SCALE_DESKTOP;
    return (value / 100) * (window.innerHeight * scale);
}