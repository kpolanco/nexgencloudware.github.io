/* =====================================================
   FAQ.JS — Acordeón, Filtros y Buscador
   NexGen Cloudware
   ===================================================== */

(function () {
    'use strict';

    const items    = document.querySelectorAll('.faq-item-v2');
    const groups   = document.querySelectorAll('.faq-group');
    const catBtns  = document.querySelectorAll('.faq-cat-btn');
    const searchIn = document.getElementById('faq-search');
    const clearBtn = document.getElementById('faq-search-clear');
    const noRes    = document.getElementById('faq-no-results');

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
            // Cierra todos los demás
            items.forEach(i => {
                i.classList.remove('is-open');
                const b = i.querySelector('.faq-question');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
            // Abre el pulsado (toggle)
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
        });
    });

    // ── Buscador ──────────────────────────────────────────
    searchIn.addEventListener('input', () => {
        clearBtn.classList.toggle('visible', searchIn.value.length > 0);
        applyFilters();
    });

    clearBtn.addEventListener('click', () => {
        searchIn.value = '';
        clearBtn.classList.remove('visible');
        applyFilters();
        searchIn.focus();
    });

    // ── Aplicar filtros combinados ────────────────────────
    function applyFilters() {
        const query = searchIn.value.trim().toLowerCase();
        let visible = 0;

        items.forEach(item => {
            const cat      = item.dataset.cat;
            const question = item.querySelector('.faq-question span')?.textContent.toLowerCase() || '';
            const answer   = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';

            const matchCat    = activeCat === 'all' || cat === activeCat;
            const matchSearch = query === '' || question.includes(query) || answer.includes(query);

            if (matchCat && matchSearch) {
                item.classList.remove('hidden');
                visible++;
            } else {
                item.classList.add('hidden');
                item.classList.remove('is-open');
            }
        });

        // Ocultar grupos vacíos
        groups.forEach(group => {
            const groupCat     = group.dataset.cat;
            const catMatch     = activeCat === 'all' || groupCat === activeCat;
            const hasVisible   = group.querySelectorAll('.faq-item-v2:not(.hidden)').length > 0;
            group.classList.toggle('hidden', !catMatch || !hasVisible);
        });

        // Mensaje sin resultados
        noRes.classList.toggle('visible', visible === 0 && query !== '');
    }

})();
