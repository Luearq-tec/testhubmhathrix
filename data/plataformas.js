function renderPlataformas() {
    return `
        <div class="card">
            <h1 class="brand">MATRIX <span>V77</span></h1>
            <p class="subtitle">Escolha o servidor para hackear:</p>
            <div class="grid">
                <div class="casa-item" onclick="App.verSinais('mobet')">
                    <i class="fas fa-server"></i> MOBET
                </div>
                <div class="casa-item" onclick="App.verSinais('elephantbet')">
                    <i class="fas fa-server"></i> ELEPHANTBET
                </div>
                <div class="casa-item" onclick="App.verSinais('premierbet')">
                    <i class="fas fa-server"></i> PREMIERBET
                </div>
                <div class="casa-item" onclick="App.verSinais('888bets')">
                    <i class="fas fa-server"></i> 888BET
                </div>
                <div class="casa-item" onclick="App.verSinais('bantubet')">
                    <i class="fas fa-server"></i> BANTUBET
                </div>
                <div class="casa-item" onclick="App.verSinais('kwanza')">
                    <i class="fas fa-server"></i> KWANZABET
                </div>
                <div class="casa-item" onclick="App.verSinais('win')">
                    <i class="fas fa-server"></i> WIN
                </div>
            </div>
        </div>
    `;
}
