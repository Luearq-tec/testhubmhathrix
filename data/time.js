(function() {
    // --- 1. CRIAR O ELEMENTO HTML VIA JS ---
    const relogio = document.createElement('div');
    relogio.id = 'relogio-flutuante-js';
    relogio.textContent = '00:00:00';
    document.body.appendChild(relogio);

    // --- 2. APLICAR OS ESTILOS CSS VIA JS ---
    const estilos = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        webkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '15px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        color: '#ffffff',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: '2rem',
        fontWeight: 'bold',
        letterSpacing: '2px',
        cursor: 'move',
        userSelect: 'none',
        zIndex: '99999',
        transition: 'box-shadow 0.3s ease'
    };

    // Copia todos os estilos acima para o elemento
    Object.assign(relogio.style, estilos);

    // --- 3. FUNÇÃO DO TEMPO (Atualização) ---
    function atualizarRelogio() {
        const agora = new Date();
        const horas = String(agora.getHours()).padStart(2, '0');
        const minutos = String(agora.getMinutes()).padStart(2, '0');
        const segundos = String(agora.getSeconds()).padStart(2, '0');
        
        relogio.textContent = `${horas}:${minutos}:${segundos}`;
    }
    
    setInterval(atualizarRelogio, 1000);
    atualizarRelogio(); // Executa imediatamente

    // --- 4. FUNÇÃO PARA ARRASTAR (Rato e Toque) ---
    let arrastando = false;
    let xInicial, yInicial, xAtual, yAtual;

    // Eventos de clique do rato
    relogio.addEventListener('mousedown', (e) => {
        arrastando = true;
        xInicial = e.clientX - relogio.offsetLeft;
        yInicial = e.clientY - relogio.offsetTop;
        relogio.style.cursor = 'grabbing';
        relogio.style.boxShadow = '0 12px 40px 0 rgba(0, 0, 0, 0.5)';
    });

    document.addEventListener('mousemove', (e) => {
        if (!arrastando) return;
        e.preventDefault();

        xAtual = e.clientX - xInicial;
        yAtual = e.clientY - yInicial;

        // Limitar o relógio dentro da janela do navegador
        const limiteX = window.innerWidth - relogio.offsetWidth;
        const limiteY = window.innerHeight - relogio.offsetHeight;

        xAtual = Math.max(0, Math.min(xAtual, limiteX));
        yAtual = Math.max(0, Math.min(yAtual, limiteY));

        relogio.style.left = xAtual + 'px';
        relogio.style.top = yAtual + 'px';
        relogio.style.right = 'auto'; // Remove a fixação inicial à direita
    });

    document.addEventListener('mouseup', () => {
        if (arrastando) {
            arrastando = false;
            relogio.style.cursor = 'move';
            relogio.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.3)';
        }
    });

    // Eventos para ecrãs táteis (Mobile)
    relogio.addEventListener('touchstart', (e) => {
        arrastando = true;
        const toque = e.touches[0];
        xInicial = toque.clientX - relogio.offsetLeft;
        yInicial = toque.clientY - relogio.offsetTop;
    });

    document.addEventListener('touchmove', (e) => {
        if (!arrastando) return;
        const toque = e.touches[0];
        xAtual = toque.clientX - xInicial;
        yAtual = toque.clientY - yInicial;

        const limiteX = window.innerWidth - relogio.offsetWidth;
        const limiteY = window.innerHeight - relogio.offsetHeight;

        xAtual = Math.max(0, Math.min(xAtual, limiteX));
        yAtual = Math.max(0, Math.min(yAtual, limiteY));

        relogio.style.left = xAtual + 'px';
        relogio.style.top = yAtual + 'px';
        relogio.style.right = 'auto';
    });

    document.addEventListener('touchend', () => {
        arrastando = false;
    });
})();