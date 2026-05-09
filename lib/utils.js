import { gsap } from 'gsap';

/**
 * Initializes a GSAP-powered wiggle animation on an element's mouseenter/mouseleave.
 * Returns a cleanup function to remove the event listeners.
 *
 * @param {HTMLElement} element - The element to attach listeners to.
 * @param {number} intensity - The rotation angle in degrees for the wiggle.
 * @returns {() => void} A cleanup function.
 */
export function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;

    const onEnter = () => {
        tween = gsap.to(target, {
            rotation: intensity,
            duration: 0.17,
            repeat: -1,
            yoyo: true,
            ease: 'steps(1)',
        });
    };

    const onLeave = () => {
        if (tween) {
            tween.kill();
            gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' });
        }
    };

    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);

    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}
