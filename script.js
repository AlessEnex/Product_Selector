// Variabili globali
let activeFilters = new Set(); // Per tenere traccia delle feature attive
let featureDescriptions = {}; // Per caricare i dati dal JSON

// Caricamento delle descrizioni delle feature da JSON
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

// Funzione per attivare/disattivare una feature
function toggleFilter(featureId) {
    // Seleziona la riga associata alla feature
    const row = document.querySelector(`[data-feature="${featureId}"]`);

    // Verifica se la riga è già attiva
    if (activeFilters.has(featureId)) {
        activeFilters.delete(featureId);
        row.classList.remove('active-feature');
    } else {
        activeFilters.add(featureId);
        row.classList.add('active-feature');
    }

    // Aggiorna la lista delle opzioni selezionate
    updateSummary();
}

// Aggiorna la lista delle feature selezionate
function updateSummary() {
    const selectedFeaturesList = document.getElementById('selectedFeatures');
    selectedFeaturesList.innerHTML = ''; // Resetta la lista

    activeFilters.forEach(featureId => {
        const featureTitle = featureDescriptions[featureId]?.title || "Unknown Feature";

        const listItem = document.createElement('li');
        listItem.innerText = featureTitle;
        listItem.setAttribute('data-feature-id', featureId);
        listItem.onclick = () => {
            toggleFilter(featureId); // Rimuove la feature cliccata
        };

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
