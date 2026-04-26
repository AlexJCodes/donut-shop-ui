/* ==============================
   SLOWNESS TIMER (15 min inactivity)
   - Starta när checkout/dialog öppnas
   - Stoppa när order placeras eller användaren lämnar checkout
   ============================== */

let timerId = null;

/**
 * startSlownessTimer
 * @param {Function} onTimeout - körs när tiden tar slut
 */
export function startSlownessTimer(onTimeout) {
    // Säkerställ att vi inte ha en gammal timer igång
    stopSlownessTimer();

    // 15 minuter = 15 * 60 * 1000 ms
    timerId = window.setTimeout(() => {
        timerId = null;

        // Kör callback
        if (typeof onTimeout === "function") {
            onTimeout();
        }
    },      
    15 * 60 * 1000);
}

/**
 * stopSlownessTimer()
 * Stoppar timern 
 */
export function stopSlownessTimer() {
    if (timerId !== null) {
        clearTimeout(timerId);
        timerId = null;
    }
}