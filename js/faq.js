/* =====================================================
   FAQ.JS — Acordeón y Filtros por Categoría
   NexGen Cloudware
   ===================================================== */

(function () {
    'use strict';

    const items   = document.querySelectorAll('.faq-item-v2');
    const groups  = document.querySelectorAll('.faq-group');
    const catBtns = document.querySelectorAll('.faq-cat-btn');

    // ── Contador de ítems por categoría ──────────────────
    function updateCounts() {
        const cats = ['all', 'general', 'servicios', 'productos', 'soporte'];
        cats.forEach(cat => {
            const el = document.getElementById('count-' + cat);
            if (!el) return;
            const n = cat === 'all'
                ? items.length
                : document.querySelectorAll(`.faq-item-v2[data-cat="${cat}"]`).length;
            el.textContent = n;
        });
    }
    updateCounts();

    // ── Acordeón ──────────────────────────────────────────
    items.forEach(item => {
        const btn = item.querySelector('.faq-question');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');
            items.forEach(i => {
                i.classList.remove('is-open');
                const b = i.querySelector('.faq-question');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) {
                item.classList.add('is-open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ── Filtro por categoría ──────────────────────────────
    let activeCat = 'all';

    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCat = btn.dataset.cat;
            applyFilters();

            // Scroll suave al área de preguntas
            const faqContent = document.querySelector('.faq-content');
            if (faqContent) {
                faqContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── Aplicar filtros ───────────────────────────────────
    function applyFilters() {
        items.forEach(item => {
            const cat      = item.dataset.cat;
            const matchCat = activeCat === 'all' || cat === activeCat;

            if (matchCat) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
                item.classList.remove('is-open');
            }
        });

        groups.forEach(group => {
            const groupCat   = group.dataset.cat;
            const catMatch   = activeCat === 'all' || groupCat === activeCat;
            const hasVisible = group.querySelectorAll('.faq-item-v2:not(.hidden)').length > 0;
            group.classList.toggle('hidden', !catMatch || !hasVisible);
        });
    }

})();
