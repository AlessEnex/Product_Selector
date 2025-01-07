let activeFilters = new Set();
let featureDescriptions = {}; // Dati caricati dal JSON

// Carica le descrizioni delle feature da JSON
fetch('features.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        featureDescriptions = data;
    })
    .catch(error => console.error('Errore nel caricamento delle feature:', error));

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
    updateSummary();
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

function updateSummary() {
    const selectedFeaturesList = document.getElementById('selectedFeatures');
    selectedFeaturesList.innerHTML = '';
    activeFilters.forEach(feature => {
        const featureName = document.querySelector(`[onclick="toggleFilter('${feature}')"]`).innerText;
        const listItem = document.createElement('li');
        listItem.innerText = featureName;
        selectedFeaturesList.appendChild(listItem);
    });
}

// Funzione per mostrare la finestra di dialogo
function showDialog(element) {
    const featureId = element.getAttribute('data-feature-id');
    const { title, description } = featureDescriptions[featureId] || {};

    if (!title || !description) {
        console.error(`No data found for feature ID: ${featureId}`);
        return;
    }

    const dialogOverlay = document.createElement('div');
    dialogOverlay.className = 'dialog-overlay';
    dialogOverlay.innerHTML = `
        <div class="dialog-box">
            <h3>${title}</h3>
            <p>${description}</p>
            <button class="dialog-close" onclick="closeDialog(this)">Close</button>
        </div>
    `;
    document.body.appendChild(dialogOverlay);
    dialogOverlay.style.display = 'flex';
}

// Funzione per chiudere la finestra di dialogo
function closeDialog(button) {
    const dialogOverlay = button.closest('.dialog-overlay');
    document.body.removeChild(dialogOverlay);
}
