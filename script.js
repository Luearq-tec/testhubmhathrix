// script.js)// 

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
        const user = usuariosDB.find(x => x.user === u && x.pass === p);
        if (user) {
            this.userLogado = user;
            this.voltarSelecao();
        } else {
            alert("ACESSO NEGADO");
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

    // script.js - Atualizado
    iniciarBuscaSinal() {
        this.limparTimers();
        const agora = new Date();
        let alvo = null;

        // Procura nas próximas 24 horas a partir de agora
        for (let i = 0; i < 24; i++) {
            let dataCheck = new Date(agora.getTime() + (i * 3600000));
            let horaKey = dataCheck.getHours().toString().padStart(2, '0') + ":00";
            
            let minutosDisponiveis = dadosSinais[this.casaAtual][horaKey] || [];

            if (minutosDisponiveis.length > 0) {
                let proximoM;
                
                if (i === 0) {
                    // Se for a hora atual, pega o primeiro minuto que ainda não passou
                    proximoM = minutosDisponiveis.find(m => m > agora.getMinutes());
                } else {
                    // Se for uma hora futura, pega o primeiro minuto da lista
                    proximoM = minutosDisponiveis[0];
                }

                if (proximoM !== undefined) {
                    alvo = new Date(dataCheck.getTime());
                    alvo.setMinutes(proximoM);
                    alvo.setSeconds(0);
                    alvo.setMilliseconds(0);
                    break;
                }
            }
        }

        if (alvo) {
            this.animacaoJaExecutada = false;
            this.rodarCronometro(alvo);
        } else {
            const dRelogio = document.getElementById('countdown');
            if(dRelogio) dRelogio.innerHTML = "--:--";
            console.warn("Nenhum sinal futuro encontrado na base de dados.");
        }
    },

    rodarCronometro(alvo) {
        const dRelogio = document.getElementById('countdown');
        const dMult = document.getElementById('multiplier-value');

        this.timerCountdown = setInterval(() => {
            const agora = new Date().getTime();
            const dist = alvo.getTime() - agora;

            // MOMENTO DO SINAL (00:00)
            if (dist <= 0) {
                if (dist < -60000) { // Após 1 minuto, busca o próximo sinal
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
            dMult.innerHTML = "---"; 
            dMult.classList.remove('text-green');
            dRelogio.classList.remove('text-blink');

            const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((dist % (1000 * 60)) / 1000);
            dRelogio.innerHTML = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }, 1000);
    },

    animarMultiplicador(valorFinal) {
        clearInterval(this.intervalAnimacao);
        const display = document.getElementById('multiplier-value');
        let valorAtual = valorFinal - 5.00;
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