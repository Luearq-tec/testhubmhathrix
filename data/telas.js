/* 
   MATRIX V77 - Sistema de Análise Operacional
   Arquivo: telas.js (Estruturas de Interface)
*/

const Telas = {
    // 1. TELA DE ACESSO (LOGIN)
    login: () => `     
 
        <div class="login-container">
            <h1 class="brand">MATRIX <span>V77</span></h1>
            <p class="subtitle">Acesse o sistema de análise</p>
            <div class="input-group">
                <i class="fas fa-user"></i>
                <input type="text" id="userLogin" placeholder="Usuário">
            </div>
            <div class="input-group">
                <i class="fas fa-lock"></i>
                <input type="password" id="passLogin" placeholder="Senha">
            </div>
            <button class="btn-login" onclick="App.tentarLogin()">INICIAR CONEXÃO</button>
            <p id="mensagemErro" style="font-size: 12px; margin-top: 10px; height: 15px; color: #00ff41; text-align: center; font-weight: bold;"></p>
        </div>
    `,

    // 2. TELA DE SELEÇÃO DE CASAS (INTERFACE PRINCIPAL)
    selecao: (isAdmin) => `
        <div class="login-container">
            <h1 class="brand">MATRIX <span>V77</span></h1>
            <p class="subtitle">Selecione a plataforma alvo</p>
            <div class="grid-casas">
                ${isAdmin ? `
                    <button class="btn-login" onclick="App.irParaAdmin()" 
                        style="margin-bottom:15px; border-color: #ffd700; color: #ffd700; box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);">
                        <i class="fas fa-user-shield"></i> ACESSAR O PAINEL
                    </button>
                ` : ''}
                <div class="card-casa" onclick="App.verSinais('mobet')">
                    <img src="assets/ima03.png" class="casa-logo" alt="MoBet">
                </div>
                <div class="card-casa" onclick="App.verSinais('elephantbet')">
                    <img src="assets/ima02.png" class="casa-logo" alt="ElephantBet">
                </div>
                <div class="card-casa" onclick="App.verSinais('premierbet')">
                    <img src="assets/ima01.png" class="casa-logo" alt="888bet">
                </div>
                <div class="card-casa" onclick="App.verSinais('bantubet')">
                    <img src="assets/ima04.png" class="casa-logo" alt="bantubet">
                </div>
                <div class="card-casa" onclick="App.verSinais('kwanza')">
                    <img src="assets/ima06.png" class="casa-logo" alt="kwanzaBET">
                </div>
                <div class="card-casa" onclick="App.verSinais('win')">
                    <img src="assets/ima05.png" class="casa-logo" alt="win">
                </div>
            </div>
        </div>
    `,

    // 3. DASHBOARD DE SINAIS (TELA DE OPERAÇÃO)
    dashboardSinal: (casa) => `
        <div class="circulo-flutuante">
            <img src="assets/mv77.jpg" alt="Widget Flutuante">
            <span class="live-tag">LIVE</span>
        </div>
        <div class="login-container dashboard-v77">
            <div class="header-sinal">                
                <h1 class="brand">MATRIX <span>${casa.toUpperCase()}</span></h1>
            </div>
            
            <div class="stats-grid-v77">
                <div class="stat-box-v77">
                    <i class="fas fa-bolt"></i>
                    <span>CONFIANÇA</span>
                    <p>92%</p>
                </div>

                <div class="stat-box-v77 featured">
                    <i class="fas fa-chart-line"></i>
                    <span>CASHOUT</span>
                    <p class="text-green" id="multiplier-value">---</p>
                </div>

                <div class="stat-box-v77">
                    <i class="fas fa-clock"></i>
                    <span>ENTRAR EM</span>
                    <p id="countdown">--:--</p>
                    <small>RESTANTE</small>
                </div>
            </div>

            <button class="btn-login btn-fechar" onclick="App.voltarSelecao()">FECHAR TERMINAL</button>
        </div>
    `,

    // 4. PAINEL ADMINISTRATIVO (GESTÃO DE USUÁRIOS)
    painelAdmin: (usuarios) => `
        <div class="login-container" style="width: 95%; max-width: 800px; padding: 20px;">
            <h1 class="brand">ADMIN <span>PANEL</span></h1>
            <p class="subtitle">Monitoramento em Tempo Real: <b>${usuarios.filter(u => u.online).length} Online</b></p>
            
            <div style="overflow-x: auto; margin-top: 20px; border: 1px solid rgba(0, 255, 65, 0.3); border-radius: 8px; background: rgba(0,0,0,0.5);">
                <table style="width: 100%; border-collapse: collapse; color: #fff; font-size: 0.85rem;">
                    <thead>
                        <tr style="border-bottom: 2px solid #00ff41; background: rgba(0, 255, 65, 0.1);">
                            <th style="padding: 12px; text-align: left;">USUÁRIO</th>
                            <th style="padding: 12px; text-align: center;">ESTADO</th>
                            <th style="padding: 12px; text-align: center;">CONEXÃO</th>
                            <th style="padding: 12px; text-align: center;">ACESSO</th>
                        </tr>
                    </thead>
                    <tbody id="lista-usuarios-admin">
                        ${usuarios.map(user => `
                            <tr style="border-bottom: 1px solid rgba(0, 255, 65, 0.1);">
                                <td style="padding: 12px; font-weight: bold;">${user.nome.toUpperCase()}</td>
                                <td style="padding: 12px; text-align: center;">
                                    <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${user.online ? '#00ff41' : '#ff3131'}; margin-right: 5px; box-shadow: ${user.online ? '0 0 8px #00ff41' : 'none'};"></span>
                                    ${user.online ? 'Online' : 'Offline'}
                                </td>
                                <td style="padding: 12px; text-align: center; font-family: monospace; color: #aaa;">
                                    ${user.online ? user.tempoLogado : '--:--:--'}
                                </td>
                                <td style="padding: 12px; text-align: center;">
                                    <button 
                                        onclick="App.toggleAcesso('${user.id}')"
                                        style="background: transparent; border: 1px solid ${user.acesso ? '#00ff41' : '#ff3131'}; color: ${user.acesso ? '#00ff41' : '#ff3131'}; padding: 5px 10px; cursor: pointer; border-radius: 4px; font-size: 0.7rem; transition: 0.3s; width: 80px;"
                                        onmouseover="this.style.background='${user.acesso ? 'rgba(0, 255, 65, 0.1)' : 'rgba(255, 49, 49, 0.1)'}'"
                                        onmouseout="this.style.background='transparent'"
                                    >
                                        ${user.acesso ? 'ATIVO' : 'BLOQUEADO'}
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn-login" onclick="App.irParaAdmin()" style="flex: 1; padding: 10px; font-size: 0.8rem; background: rgba(0, 255, 65, 0.1);">
                    <i class="fas fa-sync-alt"></i> ATUALIZAR
                </button>
                <button class="btn-login" onclick="App.voltarSelecao()" style="flex: 1; padding: 10px; font-size: 0.8rem;">
                    <i class="fas fa-undo"></i> VOLTAR
                </button>
            </div>
        </div>
    `
};
