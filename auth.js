const SENHA_CORRETA = '#Felipe01*';

function verificarAutenticacao() {
  const logado = localStorage.getItem('logado');
  if (!logado) {
    window.location.href = 'login.html';
  }
}

function fazerLogin(senha) {
  if (senha === SENHA_CORRETA) {
    localStorage.setItem('logado', 'true');
    window.location.href = 'home.html';
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem('logado');
  window.location.href = 'login.html';
}

verificarAutenticacao();