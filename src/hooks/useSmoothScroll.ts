import { useEffect } from 'react';
import Lenis from 'lenis';

export const useSmoothScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 2.0, // Slow down scroll for "cinematic" feel (default is ~1.2)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing for smoothness
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8, // Slightly reduce scroll speed multiplier
            touchMultiplier: 1.5,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);
};
