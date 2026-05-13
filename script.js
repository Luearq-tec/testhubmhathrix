const App = {
    elem: document.getElementById('app'),
    userLogado: null,
    casaAtual: '',
    timerCountdown: null,
    intervalAnimacao: null,
    animacaoJaExecutada: false,

    init() {
        this.elem.innerHTML = Telas.login();
    },

    tentarLogin() {
        const u = document.getElementById('userLogin').value;
        const p = document.getElementById('passLogin').value;
        const erroDisplay = document.getElementById('mensagemErro');

        const user = usuariosDB.find(x => x.user === u && x.pass === p);

        if (user) {
            this.userLogado = user;
            if (erroDisplay) erroDisplay.innerText = "";
            this.voltarSelecao();
        } else {
            if (erroDisplay) {
                erroDisplay.innerText = "VOCÊ NÃO É UM MATRIX ACESSO NEGADO!";
            }
        }
    },

    voltarSelecao() {
        this.limparTimers();
        this.elem.innerHTML = Telas.selecao(this.userLogado.role === 'admin');
    },

    limparTimers() {
        clearInterval(this.timerCountdown);
        clearInterval(this.intervalAnimacao);
    },

    verSinais(casa) {
        this.casaAtual = casa;
        this.elem.innerHTML = Telas.dashboardSinal(casa);
        this.iniciarBuscaSinal();
    },

    iniciarBuscaSinal() {
        this.limparTimers();
        const agora = new Date();
        let alvo = null;

        // Procura nas próximas 24 horas
        for (let i = 0; i < 24; i++) {
            let dataCheck = new Date(agora.getTime() + (i * 3600000));
            let horaKey = dataCheck.getHours().toString().padStart(2, '0') + ":00";
            
            let minutosDisponiveis = dadosSinais[this.casaAtual][horaKey] || [];

            if (minutosDisponiveis.length > 0) {
                let proximoM;
                
                if (i === 0) {
                    // Na hora atual, pega o primeiro minuto que ainda não passou
                    proximoM = minutosDisponiveis.find(m => m > agora.getMinutes());
                } else {
                    // Em horas futuras, pega o primeiro minuto disponível
                    proximoM = minutosDisponiveis[0];
                }

                if (proximoM !== undefined) {
                    alvo = new Date(dataCheck.getTime());
                    alvo.setMinutes(proximoM);
                    alvo.setSeconds(0);
                    alvo.setMilliseconds(0);
                    break; // Encontrou o sinal mais próximo, sai do loop
                }
            }
        }

        if (alvo) {
            this.animacaoJaExecutada = false;
            this.rodarCronometro(alvo);
        } else {
            const dRelogio = document.getElementById('countdown');
            if(dRelogio) dRelogio.innerHTML = "--:--:--";
            console.warn("Nenhum sinal futuro encontrado.");
        }
    },

    rodarCronometro(alvo) {
        const dRelogio = document.getElementById('countdown');
        const dMult = document.getElementById('multiplier-value');

        this.timerCountdown = setInterval(() => {
            const agora = new Date().getTime();
            const dist = alvo.getTime() - agora;

            // MOMENTO DO SINAL (00:00:00)
            if (dist <= 0) {
                if (dist < -60000) { // 1 minuto após o sinal, busca o próximo
                    this.iniciarBuscaSinal();
                    return;
                }

                dRelogio.innerHTML = "AGORA";
                dRelogio.classList.add('text-blink');

                if (!this.animacaoJaExecutada) {
                    const valorAlvo = (Math.random() * (20 - 10) + 10).toFixed(2);
                    this.animarMultiplicador(parseFloat(valorAlvo));
                    this.animacaoJaExecutada = true;
                }
                return;
            }

            // DURANTE A CONTAGEM
            if (dMult) dMult.innerHTML = "---"; 
            if (dMult) dMult.classList.remove('text-green');
            dRelogio.classList.remove('text-blink');

            // CÁLCULO COM HORAS, MINUTOS E SEGUNDOS
            const h = Math.floor(dist / (1000 * 60 * 60));
            const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((dist % (1000 * 60)) / 1000);

            // Se houver mais de 0 horas, mostra formato HH:MM:SS, senão MM:SS
            if (h > 0) {
                dRelogio.innerHTML = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            } else {
                dRelogio.innerHTML = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            }
            
        }, 1000);
    },

    animarMultiplicador(valorFinal) {
        clearInterval(this.intervalAnimacao);
        const display = document.getElementById('multiplier-value');
        if (!display) return;

        let valorAtual = Math.max(1.00, valorFinal - 5.00);
        display.classList.add('text-green');

        this.intervalAnimacao = setInterval(() => {
            valorAtual += 0.05;
            display.innerHTML = valorAtual.toFixed(2) + "x";

            if (valorAtual >= valorFinal) {
                display.innerHTML = valorFinal.toFixed(2) + "x";
                clearInterval(this.intervalAnimacao);
            }
        }, 30);
    },

    irParaAdmin() {
        this.elem.innerHTML = Telas.admin();
    }
};

App.init();
