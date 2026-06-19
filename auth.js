// auth.js — Sistema Controle do Escritório
// Requer db.js carregado antes (window.db)
// Responsável por autenticação, sessão e gerenciamento de usuários via Supabase

(function () {
  'use strict';

  const CHAVE_LOGADO = 'logado';
  const CHAVE_NOME = 'usuarioNome';
  const CHAVE_EMAIL = 'usuarioEmail';
  const CHAVE_PERFIL = 'usuarioPerfil';

  const ADMIN_LOCAL = {
    email: 'admin@escritorio.com',
    senha: '#Felipe01*',
    nome: 'Administrador',
    perfil: 'Administrador',
  };

  /**
   * Verifica se existe sessão ativa. Se não, redireciona para index.html.
   */
  function verificarAutenticacao() {
    const logado = localStorage.getItem(CHAVE_LOGADO) === 'true';
    if (!logado) {
      window.location.href = 'index.html';
    }
  }

  /**
   * Realiza login assíncrono via Supabase ou fallback de admin local.
   * @param {string} email
   * @param {string} senha
   * @returns {Promise<boolean>}
   */
  async function fazerLogin(email, senha) {
    if (!email || !senha) {
      return false;
    }

    const emailLower = email.toLowerCase().trim();

    // Admin local (fallback caso Supabase esteja offline)
    if (emailLower === ADMIN_LOCAL.email && senha === ADMIN_LOCAL.senha) {
      localStorage.setItem(CHAVE_LOGADO, 'true');
      localStorage.setItem(CHAVE_NOME, ADMIN_LOCAL.nome);
      localStorage.setItem(CHAVE_EMAIL, ADMIN_LOCAL.email);
      localStorage.setItem(CHAVE_PERFIL, ADMIN_LOCAL.perfil);
      window.location.href = 'home.html';
      return true;
    }

    // Login via Supabase
    try {
      if (typeof window.db === 'undefined' || !window.db.usuario_login) {
        console.error('window.db.usuario_login não está disponível. Verifique se db.js foi carregado antes de auth.js.');
        return false;
      }

      const usuario = await window.db.usuario_login(emailLower, senha);

      if (usuario && usuario.status === 'Ativo') {
        localStorage.setItem(CHAVE_LOGADO, 'true');
        localStorage.setItem(CHAVE_NOME, usuario.nome || 'Usuário');
        localStorage.setItem(CHAVE_EMAIL, usuario.email);
        localStorage.setItem(CHAVE_PERFIL, usuario.perfil || 'Usuário');
        window.location.href = 'home.html';
        return true;
      }

      return false;
    } catch (erro) {
      console.error('Erro no login:', erro);
      return false;
    }
  }

  /**
   * Encerra a sessão do usuário e redireciona para index.html.
   */
  function logout() {
    localStorage.removeItem(CHAVE_LOGADO);
    localStorage.removeItem(CHAVE_NOME);
    localStorage.removeItem(CHAVE_EMAIL);
    localStorage.removeItem(CHAVE_PERFIL);
    window.location.href = 'index.html';
  }

  /**
   * Retorna os dados da sessão atual.
   * @returns {Object|null}
   */
  function getUsuarioLogado() {
    const logado = localStorage.getItem(CHAVE_LOGADO) === 'true';
    if (!logado) {
      return null;
    }

    return {
      logado: true,
      nome: localStorage.getItem(CHAVE_NOME),
      email: localStorage.getItem(CHAVE_EMAIL),
      perfil: localStorage.getItem(CHAVE_PERFIL),
    };
  }

  /**
   * Carrega a lista de todos os usuários via Supabase.
   * @returns {Promise<Array>}
   */
  async function carregarUsuarios() {
    try {
      if (typeof window.db === 'undefined' || !window.db.usuarios_listar) {
        console.error('window.db.usuarios_listar não está disponível. Verifique se db.js foi carregado antes de auth.js.');
        return [];
      }

      return await window.db.usuarios_listar();
    } catch (erro) {
      console.error('Erro ao carregar usuários:', erro);
      return [];
    }
  }

  /**
   * Salva (insere ou atualiza) um usuário via Supabase.
   * @param {Object} usuario
   * @returns {Promise<Object|null>}
   */
  async function salvarUsuario(usuario) {
    try {
      if (typeof window.db === 'undefined' || !window.db.usuarios_salvar) {
        console.error('window.db.usuarios_salvar não está disponível. Verifique se db.js foi carregado antes de auth.js.');
        return null;
      }

      if (!usuario) {
        return null;
      }

      return await window.db.usuarios_salvar(usuario);
    } catch (erro) {
      console.error('Erro ao salvar usuário:', erro);
      return null;
    }
  }

  /**
   * Exclui um usuário pelo ID via Supabase.
   * @param {number|string} id
   * @returns {Promise<boolean>}
   */
  async function excluirUsuario(id) {
    try {
      if (typeof window.db === 'undefined' || !window.db.usuarios_excluir) {
        console.error('window.db.usuarios_excluir não está disponível. Verifique se db.js foi carregado antes de auth.js.');
        return false;
      }

      if (!id) {
        return false;
      }

      return await window.db.usuarios_excluir(id);
    } catch (erro) {
      console.error('Erro ao excluir usuário:', erro);
      return false;
    }
  }

  // Expor as funções no escopo global para uso em login.html e demais páginas
  window.verificarAutenticacao = verificarAutenticacao;
  window.fazerLogin = fazerLogin;
  window.logout = logout;
  window.getUsuarioLogado = getUsuarioLogado;
  window.carregarUsuarios = carregarUsuarios;
  window.salvarUsuario = salvarUsuario;
  window.excluirUsuario = excluirUsuario;
})();