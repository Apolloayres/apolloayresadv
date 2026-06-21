const ADMIN_EMAIL = 'admin@escritorio.com';
const ADMIN_SENHA = '*';

function verificarAutenticacao() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        window.location.href = 'index.html';
    }
}

function verificarAdmin() {
    const usuario = getUsuarioLogado();
    if (!usuario || usuario.perfil !== 'Administrador') {
        alert('Acesso restrito a administradores.');
        window.location.href = 'home.html';
    }
}

async function fazerLogin(email, senha) {
    // Admin padrão
    if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
        const usuario = {
            nome: 'Administrador',
            email: ADMIN_EMAIL,
            perfil: 'Administrador',
            status: 'Ativo'
        };
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        window.location.href = 'home.html';
        return { sucesso: true, mensagem: 'Login realizado com sucesso.' };
    }

    // 1. TENTAR buscar no Supabase
    try {
        const usuario = await window.db.usuarios_buscar(email);
        if (usuario) {
            if (usuario.senha !== senha) {
                return { sucesso: false, mensagem: 'Senha incorreta.' };
            }
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            window.location.href = 'home.html';
            return { sucesso: true, mensagem: 'Login realizado com sucesso.' };
        }
    } catch (erro) {
        console.log('Supabase falhou, tentando localStorage...');
    }

    // 2. FALLBACK: buscar no localStorage
    try {
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuario = usuarios.find(u => u.email === email);
        
        if (!usuario) {
            return { sucesso: false, mensagem: 'Usuário não encontrado.' };
        }
        
        if (usuario.senha !== senha) {
            return { sucesso: false, mensagem: 'Senha incorreta.' };
        }
        
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        window.location.href = 'home.html';
        return { sucesso: true, mensagem: 'Login realizado com sucesso.' };
    } catch (erro) {
        return { sucesso: false, mensagem: 'Erro ao realizar login: ' + erro.message };
    }
}

function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

function getUsuarioLogado() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        return null;
    }
    try {
        const usuario = JSON.parse(usuarioLogado);
        return {
            nome: usuario.nome || null,
            email: usuario.email || null,
            perfil: usuario.perfil || null
        };
    } catch {
        return null;
    }
}

async function carregarUsuarios() {
    return window.db.usuarios_listar();
}

async function salvarUsuario(usuario) {
    if (!usuario.senha || usuario.senha.trim() === '') {
        throw new Error('A senha é obrigatória.');
    }
    return window.db.usuarios_salvar(usuario);
}

async function excluirUsuario(id) {
    return window.db.usuarios_excluir(id);
}

async function trocarSenha(email, senhaAtual, novaSenha) {
    if (email === ADMIN_EMAIL) {
        return { success: false, message: 'Não é permitido alterar a senha do administrador local por este sistema.' };
    }

    try {
        const usuario = await window.db.usuarios_buscar(email);

        if (!usuario) {
            return { success: false, message: 'Usuário não encontrado.' };
        }

        if (usuario.senha !== senhaAtual) {
            return { success: false, message: 'Senha atual incorreta.' };
        }

        const usuarioAtualizado = { ...usuario, senha: novaSenha };
        await window.db.usuarios_salvar(usuarioAtualizado);

        return { success: true, message: 'Senha alterada com sucesso!' };
    } catch (erro) {
        return { success: false, message: 'Erro ao alterar senha: ' + erro.message };
    }
}

function getBadgePerfil(perfil) {
    if (perfil === 'Administrador') {
        return 'badge-admin';
    }
    return 'badge-usuario';
}

window.verificarAutenticacao = verificarAutenticacao;
window.verificarAdmin = verificarAdmin;
window.fazerLogin = fazerLogin;
window.logout = logout;
window.getUsuarioLogado = getUsuarioLogado;
window.carregarUsuarios = carregarUsuarios;
window.salvarUsuario = salvarUsuario;
window.excluirUsuario = excluirUsuario;
window.trocarSenha = trocarSenha;
window.getBadgePerfil = getBadgePerfil;