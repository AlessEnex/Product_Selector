let activeFilters = new Set();

function toggleFilter(feature) {
    const featureCell = document.querySelector(`[onclick="toggleFilter('${feature}')"]`);
    if (activeFilters.has(feature)) {
        activeFilters.delete(feature);
        featureCell.classList.remove('active-feature');
    } else {
        activeFilters.add(feature);
        featureCell.classList.add('active-feature');
    }
    applyFilters();
}

function applyFilters() {
    const products = ['smart-retail', 'senna', 'neva-elba'];
    products.forEach(product => {
        const shouldHide = Array.from(activeFilters).some(feature => {
            const cells = document.querySelectorAll(`.${product}.${feature}`);
            return cells.length === 0;
        });

        const productHeader = document.querySelector(`[data-product="${product}"]`);
        if (shouldHide) {
            productHeader.classList.add('inactive-header');
        } else {
            productHeader.classList.remove('inactive-header');
        }

        const productCells = document.querySelectorAll(`.${product}`);
        productCells.forEach(cell => {
            const dot = cell.querySelector('.dot');
            if (dot) {
                if (shouldHide) {
                    dot.classList.add('inactive-dot');
                } else {
                    dot.classList.remove('inactive-dot');
                }
            }
        });
    });
}
