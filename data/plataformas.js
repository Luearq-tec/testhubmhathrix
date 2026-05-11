function renderPlataformas() {
    return `
        <div class="card">
            <h1 class="brand">MATRIX <span>V77</span></h1>
            <p class="subtitle">Escolha o servidor para hackear:</p>
            <div class="grid">
                <div class="casa-item" onclick="app.irParaSinais('mobet')">
                    <i class="fas fa-server"></i> MOBET
                </div>
                <div class="casa-item" onclick="app.irParaSinais('elephantbet')">
                    <i class="fas fa-server"></i> ELEPHANTBET
                </div>
                <div class="casa-item" onclick="app.irParaSinais('premierbet')">
                    <i class="fas fa-server"></i> PREMIERBET
                </div>
            </div>
        </div>
    `;
}