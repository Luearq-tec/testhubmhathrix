(function() {
    // 1. Limpa instâncias anteriores para não acumular
    const antigo = document.getElementById('relogio-arrastavel');
    if (antigo) antigo.remove();

    // 2. Cria o CSS injetado (estilo padrão no canto inferior direito)
    const estiloTag = document.createElement('style');
    estiloTag.innerHTML = `
        #relogio-arrastavel {
            position: fixed !important;
            bottom: 20px;
            right: 20px;
            background-color: rgba(20, 20, 20, 0.95) !important;
            color: #00ffcc !important;
            font-family: 'Courier New', monospace !important;
            font-size: 26px !important;
            font-weight: bold !important;
            padding: 12px 20px !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5) !important;
            z-index: 999999 !important;
            cursor: move !important; /* Mostra a mãozinha de arrastar */
            user-select: none !important; /* Impede de selecionar o texto ao arrastar */
        }
    `;
    document.head.appendChild(estiloTag);

    // 3. Cria o elemento
    const relogio = document.createElement('div');
    relogio.id = 'relogio-arrastavel';
    document.body.appendChild(relogio);

    // 4. Lógica para Atualizar as Horas
    function atualizar() {
        const agora = new Date();
        const horas = String(agora.getHours()).padStart(2, '0');
        const minutos = String(agora.getMinutes()).padStart(2, '0');
        const segundos = String(agora.getSeconds()).padStart(2, '0');
        relogio.textContent = `${horas}:${minutos}:${segundos}`;
    }
    atualizar();
    setInterval(atualizar, 1000);

    // 5. Lógica para Arrastar (Drag and Drop)
    let arrastando = false;
    let offsetOffsetX = 0;
    let offsetOffsetY = 0;

    relogio.addEventListener('mousedown', function(e) {
        arrastando = true;
        
        // Remove as posições fixas iniciais do CSS (bottom/right) para usar top/left dinâmicos
        const retangulo = relogio.getBoundingClientRect();
        relogio.style.bottom = 'auto';
        relogio.style.right = 'auto';
        relogio.style.left = retangulo.left + 'px';
        relogio.style.top = retangulo.top + 'px';

        // Calcula a distância exata de onde o mouse clicou dentro do relógio
        offsetOffsetX = e.clientX - retangulo.left;
        offsetOffsetY = e.clientY - retangulo.top;
    });

    document.addEventListener('mousemove', function(e) {
        if (!arrastando) return;

        // Atualiza a posição do relógio baseada no movimento do mouse
        relogio.style.left = (e.clientX - offsetOffsetX) + 'px';
        relogio.style.top = (e.clientY - offsetOffsetY) + 'px';
    });

    document.addEventListener('mouseup', function() {
        arrastando = false;
    });
})();