export function querySelectorAllToArray(selector: string): HTMLElement[] {
    return Array.prototype.slice.call(document.querySelector(selector));
}


export function hasIntersectionObserverSupport(): boolean {
    // Exits early if all IntersectionObserver and IntersectionObserverEntry
    // features are natively supported.
    if ('IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in (<any>window).IntersectionObserverEntry.prototype) {
        // Minimal polyfill for Edge 15's lack of `isIntersecting`
        // See: https://github.com/w3c/IntersectionObserver/issues/211
        if (!('isIntersecting' in (<any>window).IntersectionObserverEntry.prototype)) {
            Object.defineProperty( (<any>window).IntersectionObserverEntry.prototype,
                'isIntersecting', {
                    get: function () {
                        return this.intersectionRatio > 0;
                    }
                });
        }
        return false;
    }

    return true;
}