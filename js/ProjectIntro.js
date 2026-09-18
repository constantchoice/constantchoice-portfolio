class ProjectIntro {
    constructor() {
        this.cfg = CONFIG.INTRO || {};
        this.overlayEl = document.getElementById('projectIntro');
        this.titleEl = document.getElementById('projectTitle');

        this.applyConfig();
        
        void this.titleEl.offsetWidth;

        if (this.cfg.TITLE?.ENABLED !== false) this.animateTitle();
        if (this.cfg.OVERLAY?.ENABLED !== false) this.animateOverlay();
    }

    // ================== CONFIG → CSS ==================
    applyConfig() {
        const t = this.cfg.TITLE || {};
        const o = this.cfg.OVERLAY || {};

        // ---- TITLE ----
        if (t.ENABLED !== false && this.titleEl) {
            this.titleEl.style.setProperty('--title-offset-x', (t.START_X_PX ?? -200) + 'px');
            this.titleEl.style.setProperty('--title-skew', (t.START_SKEW_DEG ?? 0) + 'deg');
            this.titleEl.style.setProperty('--title-opacity', t.START_OPACITY ?? 0);
        }

        // ---- OVERLAY ----
        if (o.ENABLED !== false && this.overlayEl) {
            const [r, g, b] = o.COLOR_RGB || [26, 26, 26];

            // Стартовая заливка
            this.overlayEl.style.setProperty(
                '--intro-bg-alpha',
                (o.START_BG_ALPHA ?? 0.9).toString()
            );

            // Стартовый blur
            this.overlayEl.style.setProperty(
                '--intro-blur',
                (o.START_BLUR_PX ?? 500) + 'px'
            );

            this.overlayEl.classList.add('active');
        }
    }

    // ================== TITLE ==================
    animateTitle() {
        const t = this.cfg.TITLE || {};
        const el = this.titleEl;
        if (!el) return;

        const delay = t.DELAY_MS ?? 100;
        const duration = t.DURATION_MS ?? 1200;
        const easing = t.EASING ?? 'cubic-bezier(0.1, 0.4, 0.25, 1)';

        el.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`;

        setTimeout(() => {
            el.style.setProperty('--title-offset-x', '0px');
            el.style.setProperty('--title-skew', (t.END_SKEW_DEG ?? -10) + 'deg');
            el.style.setProperty('--title-opacity', t.END_OPACITY ?? 1);

            setTimeout(() => {
                el.style.transition = 'color 0.2s';
            }, duration + 50);
        }, delay);
    }

    // ================== OVERLAY ==================
    animateOverlay() {
        const o = this.cfg.OVERLAY || {};
        const el = this.overlayEl;
        if (!el) return;

        const delay = o.DELAY_MS ?? 400;
        const duration = o.DURATION_MS ?? 3000;
        const easing = o.EASING ?? 'cubic-bezier(0.1, 0.4, 0.25, 1)';

        setTimeout(() => {
            // Плавно меняем обе CSS-переменные — браузер интерполирует
            el.style.transition = `
                --intro-bg-alpha ${duration}ms ${easing},
                --intro-blur ${duration}ms ${easing}
            `.trim();

            el.style.setProperty('--intro-bg-alpha', (o.END_BG_ALPHA ?? 0).toString());
            el.style.setProperty('--intro-blur', (o.END_BLUR_PX ?? 0) + 'px');

            setTimeout(() => {
                el.classList.remove('active');
                el.style.display = 'none';
            }, duration + 50);
        }, delay);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.projectIntro = new ProjectIntro();
});