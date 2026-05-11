// telas.js)// 

const Telas = {
          
    login: () => `
         <div class="circulo-flutuante">
            <img src="assets/mv77.jpg" alt="Widget Flutuante">
        </div>   
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
        </div>
        
    `,

    selecao: (isAdmin) => `
        <div class="login-container">
            <h1 class="brand">MATRIX <span>V77</span></h1>
            <p class="subtitle">Selecione a plataforma alvo</p>
            <div class="grid-casas">
                ${isAdmin ? '<button class="btn-login" onclick="App.irParaAdmin()" style="margin-bottom:15px; border-color: gold; color: gold;">ADMIN PANEL</button>' : ''}
                <div class="card-casa" onclick="App.verSinais('mobet')"><img src="assets/ima03.png" class="casa-logo"></div>
                <div class="card-casa" onclick="App.verSinais('elephantbet')"><img src="assets/ima02.png" class="casa-logo"></div>
                <div class="card-casa" onclick="App.verSinais('premierbet')"><img src="assets/ima01.png" class="casa-logo"></div>
            </div>
        </div>
    `,

    dashboardSinal: (casa) => `
        <div class="login-container dashboard-v77">
            <div class="header-sinal">
                <span class="live-tag">LIVE</span>
                <h1 class="brand">MATRIX<span>${casa.toUpperCase()}</span></h1>
            </div>
            
            <div class="stats-grid-v77">
                <div class="stat-box-v77">
                    <i class="fas fa-bolt"></i>
                    <span>CONFIANÇA</span>
                    <p>85%</p> </div>

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
    `
};