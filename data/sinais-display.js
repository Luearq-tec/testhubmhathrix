function renderSinais(casa) {
    return `
        <div class="card">
            <h1 class="brand">${casa.toUpperCase()}</h1>
            <div id="display-algoritmo" class="sinal-ativo">
                Calculando brechas...
            </div>
            <button class="btn-login" onclick="app.voltar()">DESCONECTAR</button>
        </div>
    `;
}

function calcularProximoSinal(casa) {
    const agora = new Date();
    const horaAtual = `${agora.getHours().toString().padStart(2, '0')}:00`;
    const minutos = dadosSinais[casa][horaAtual] || [];
    
    // Encontra o próximo minuto na lista
    const proximo = minutos.find(m => m > agora.getMinutes()) || minutos[0];
    
    const display = document.getElementById('display-algoritmo');
    if (display && proximo !== undefined) {
        display.innerHTML = `
            <p>ENTRADA CONFIRMADA</p>
            <h2 style="font-size: 3rem; color: #00ff41;">${horaAtual.split(':')[0]}:${proximo.toString().padStart(2, '0')}</h2>
            <p>SAIR EM: 2.00X</p>
        `;
    }
}