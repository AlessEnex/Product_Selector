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


// Oggetto con le descrizioni delle caratteristiche
const featureDescriptions = {
    feature1: {
        title: "Heat Recovery 1",
        description: "This feature provides heat recovery for tap water, allowing energy savings and efficiency improvements."
    },
    feature2: {
        title: "Heat Recovery 2",
        description: "This feature recovers heat for space heating applications, reducing overall energy consumption."
    }
};


// Funzione per mostrare la finestra di dialogo
function showDialog(element) {
    const featureId = element.getAttribute('data-feature-id'); // Leggi l'ID dal pulsante cliccato
    const { title, description } = featureDescriptions[featureId] || {}; // Recupera i dati, fallback a {}

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
    dialogOverlay.style.display = 'flex'; // Mostra l'overlay
}

// Funzione per chiudere la finestra di dialogo
function closeDialog(button) {
    const dialogOverlay = button.closest('.dialog-overlay');
    document.body.removeChild(dialogOverlay); // Rimuove l'overlay
}

