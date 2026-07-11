// DB.js -

const usuariosDB = [
    { id: "1", user: "admin", pass: "123", role: "admin", online: false, acesso: true, inicioConexao: null },
    { id: "2", user: "matrix@gratis.com", pass: "15H30", role: "user", online: false, acesso: true, inicioConexao: null }
];

// Inicialização automática no navegador
if (!localStorage.getItem('matrix_data')) {
    localStorage.setItem('matrix_data', JSON.stringify(usuariosDB));
}