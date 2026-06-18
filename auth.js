/**
 * auth.js
 * Sistema: Controle do Escritório
 * Módulo de Autenticação com suporte a Multiusuários e Auditoria
 *
 * Funções de autenticação:
 *  - verificarAutenticacao()
 *  - fazerLogin(email, senha)
 *  - logout()
 *  - trocarSenha(emailAtual, senhaAtual, novaSenha)
 *  - getUsuarioLogado()
 *
 * Funções de auditoria:
 *  - registrarAuditoria(acao, descricao)
 *  - getAuditorias(filtros)
 *  - extrairModulo(acao)
 *  - exportarAuditoriaCSV()
 */

(function () {
    'use strict';

    const CHAVE_LOGADO = 'logado';
    const CHAVE_USUARIOS = 'usuarios';
    const CHAVE_AUDITORIA = 'auditoria';
    const LIMITE_AUDITORIA = 1000;

    const ADMIN_EMAIL = 'admin@escritorio.com';
    const ADMIN_SENHA = '#Felipe01*';

    const loginAdmin = {
        nome: 'Administrador',
        email: ADMIN_EMAIL,
        senha: ADMIN_SENHA,
        perfil: 'Administrador',
        perfilId: 'admin',
        status: 'Ativo'
    };

    /**
     * Verifica se existe sessão ativa. Caso contrário, redireciona para index.html.
     */
    function verificarAutenticacao() {
        if (localStorage.getItem(CHAVE_LOGADO) !== 'true') {
            window.location.href = 'index.html';
        }
    }

    /**
     * Realiza login de administrador ou usuário cadastrado.
     * @param {string} email
     * @param {string} senha
     * @returns {boolean} true se login foi bem-sucedido, false caso contrário.
     */
    function fazerLogin(email, senha) {
        if (!email || !senha) {
            return false;
        }

        const emailLower = email.toLowerCase();

        if (emailLower === ADMIN_EMAIL && senha === ADMIN_SENHA) {
            localStorage.setItem(CHAVE_LOGADO, 'true');
            localStorage.setItem('usuarioNome', loginAdmin.nome);
            localStorage.setItem('usuarioEmail', loginAdmin.email);
            localStorage.setItem('usuarioPerfil', loginAdmin.perfilId || loginAdmin.perfil);
            registrarAuditoria('Login', 'Login realizado com sucesso (administrador principal)');
            window.location.href = 'home.html';
            return true;
        }

        const usuarios = JSON.parse(localStorage.getItem(CHAVE_USUARIOS) || '[]');
        const usuario = usuarios.find(function (u) {
            return u.email && u.email.toLowerCase() === emailLower && u.senha === senha;
        });

        if (usuario && usuario.status === 'Ativo') {
            usuario.ultimoAcesso = new Date().toISOString();
            localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));

            localStorage.setItem(CHAVE_LOGADO, 'true');
            localStorage.setItem('usuarioNome', usuario.nome);
            localStorage.setItem('usuarioEmail', usuario.email);
            localStorage.setItem('usuarioPerfil', usuario.perfilId || usuario.perfil);

            registrarAuditoria('Login', 'Login realizado com sucesso');
            window.location.href = 'home.html';
            return true;
        }

        return false;
    }

    /**
     * Encerra a sessão do usuário e registra auditoria.
     */
    function logout() {
        registrarAuditoria('Logout', 'Usuário encerrou a sessão');
        localStorage.removeItem(CHAVE_LOGADO);
        localStorage.removeItem('usuarioNome');
        localStorage.removeItem('usuarioEmail');
        localStorage.removeItem('usuarioPerfil');
        window.location.href = 'index.html';
    }

    /**
     * Troca a senha de um usuário cadastrado.
     * @param {string} emailAtual
     * @param {string} senhaAtual
     * @param {string} novaSenha
     * @returns {{success: boolean, message: string}}
     */
    function trocarSenha(emailAtual, senhaAtual, novaSenha) {
        if (!emailAtual || !senhaAtual || !novaSenha) {
            return { success: false, message: 'Preencha todos os campos obrigatórios.' };
        }

        if (emailAtual.toLowerCase() === ADMIN_EMAIL) {
            return {
                success: false,
                message: 'O administrador principal não pode alterar a senha pelo sistema'
            };
        }

        const usuarios = JSON.parse(localStorage.getItem(CHAVE_USUARIOS) || '[]');
        const usuario = usuarios.find(function (u) {
            return u.email && u.email.toLowerCase() === emailAtual.toLowerCase() && u.senha === senhaAtual;
        });

        if (!usuario) {
            return { success: false, message: 'Senha atual incorreta' };
        }

        usuario.senha = novaSenha;
        localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
        registrarAuditoria('Troca de Senha', 'Senha alterada com sucesso');
        return { success: true, message: 'Senha alterada com sucesso' };
    }

    /**
     * Retorna os dados básicos do usuário logado.
     * @returns {{nome: string|null, email: string|null, perfil: string|null}}
     */
    function getUsuarioLogado() {
        return {
            nome: localStorage.getItem('usuarioNome'),
            email: localStorage.getItem('usuarioEmail'),
            perfil: localStorage.getItem('usuarioPerfil')
        };
    }

    /**
     * Registra um evento de auditoria no localStorage.
     * @param {string} acao
     * @param {string} descricao
     */
    function registrarAuditoria(acao, descricao) {
        const logs = JSON.parse(localStorage.getItem(CHAVE_AUDITORIA) || '[]');
        const usuarioNome = localStorage.getItem('usuarioNome') || 'Sistema';
        const usuarioEmail = localStorage.getItem('usuarioEmail') || 'sistema';

        const novoLog = {
            id: Date.now().toString(),
            data: new Date().toISOString(),
            usuario: usuarioNome,
            email: usuarioEmail,
            acao: acao,
            descricao: descricao,
            modulo: extrairModulo(acao)
        };

        logs.unshift(novoLog);

        if (logs.length > LIMITE_AUDITORIA) {
            logs.length = LIMITE_AUDITORIA;
        }

        localStorage.setItem(CHAVE_AUDITORIA, JSON.stringify(logs));
    }

    /**
     * Retorna os registros de auditoria, com filtros opcionais.
     * @param {Object} [filtros={}]
     * @returns {Array}
     */
    function getAuditorias(filtros) {
        filtros = filtros || {};
        let logs = JSON.parse(localStorage.getItem(CHAVE_AUDITORIA) || '[]');

        if (filtros.dataInicio) {
            const inicio = new Date(filtros.dataInicio).toISOString();
            logs = logs.filter(function (log) {
                return log.data >= inicio;
            });
        }

        if (filtros.dataFim) {
            const fim = new Date(filtros.dataFim);
            fim.setHours(23, 59, 59, 999);
            const fimIso = fim.toISOString();
            logs = logs.filter(function (log) {
                return log.data <= fimIso;
            });
        }

        if (filtros.usuario) {
            const termo = filtros.usuario.toLowerCase();
            logs = logs.filter(function (log) {
                return log.usuario && log.usuario.toLowerCase().includes(termo);
            });
        }

        if (filtros.acao) {
            const termo = filtros.acao.toLowerCase();
            logs = logs.filter(function (log) {
                return log.acao && log.acao.toLowerCase().includes(termo);
            });
        }

        if (filtros.modulo) {
            const termo = filtros.modulo.toLowerCase();
            logs = logs.filter(function (log) {
                return log.modulo && log.modulo.toLowerCase().includes(termo);
            });
        }

        if (filtros.termo) {
            const termo = filtros.termo.toLowerCase();
            logs = logs.filter(function (log) {
                return (
                    (log.usuario && log.usuario.toLowerCase().includes(termo)) ||
                    (log.email && log.email.toLowerCase().includes(termo)) ||
                    (log.acao && log.acao.toLowerCase().includes(termo)) ||
                    (log.modulo && log.modulo.toLowerCase().includes(termo)) ||
                    (log.descricao && log.descricao.toLowerCase().includes(termo))
                );
            });
        }

        return logs;
    }

    /**
     * Determina o módulo correspondente a uma ação.
     * @param {string} acao
     * @returns {string}
     */
    function extrairModulo(acao) {
        if (!acao) {
            return 'Outros';
        }

        const acaoLower = acao.toLowerCase();

        const acoesSistema = ['login', 'logout', 'troca de senha', 'configurações', 'backup'];
        if (acoesSistema.some(function (a) { return acaoLower.includes(a); })) {
            return 'Sistema';
        }

        const acoesUsuarios = ['cadastro', 'edição', 'exclusão', 'consulta'];
        if (acaoLower.includes('usuário') || acaoLower.includes('usuario') || acaoLower.includes('perfil')) {
            return 'Usuários';
        }

        if (acoesUsuarios.some(function (a) { return acaoLower.includes(a); })) {
            return 'Usuários';
        }

        if (acaoLower.includes('cliente') || acaoLower.includes('clientes')) {
            return 'Clientes';
        }

        if (acaoLower.includes('processo') || acaoLower.includes('processos') || acaoLower.includes('tarefa') || acaoLower.includes('tarefas')) {
            return 'Processos';
        }

        if (acaoLower.includes('financeiro') || acaoLower.includes('pagamento') || acaoLower.includes('recebimento') || acaoLower.includes('fatura')) {
            return 'Financeiro';
        }

        if (acaoLower.includes('relatório') || acaoLower.includes('relatorio')) {
            return 'Relatórios';
        }

        return 'Outros';
    }

    /**
     * Exporta os registros de auditoria para um arquivo CSV.
     */
    function exportarAuditoriaCSV() {
        const logs = JSON.parse(localStorage.getItem(CHAVE_AUDITORIA) || '[]');
        const headers = ['ID', 'Data', 'Usuário', 'Email', 'Ação', 'Módulo', 'Descrição'];

        const linhas = logs.map(function (log) {
            return [
                escapeCsv(log.id || ''),
                escapeCsv(log.data || ''),
                escapeCsv(log.usuario || ''),
                escapeCsv(log.email || ''),
                escapeCsv(log.acao || ''),
                escapeCsv(log.modulo || ''),
                escapeCsv(log.descricao || '')
            ].join(';');
        });

        const csv = [headers.join(';')].concat(linhas).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'auditoria_' + formatarDataArquivo(new Date()) + '.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    /**
     * Escapa valores para CSV, evitando quebra de colunas.
     * @param {string} valor
     * @returns {string}
     */
    function escapeCsv(valor) {
        if (valor === null || valor === undefined) {
            return '';
        }
        const str = String(valor).replace(/"/g, '""');
        if (str.includes(';') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
            return '"' + str + '"';
        }
        return str;
    }

    /**
     * Formata uma data para uso no nome do arquivo exportado.
     * @param {Date} data
     * @returns {string}
     */
    function formatarDataArquivo(data) {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const dia = String(data.getDate()).padStart(2, '0');
        const hora = String(data.getHours()).padStart(2, '0');
        const minuto = String(data.getMinutes()).padStart(2, '0');
        return ano + '' + mes + '' + dia + '_' + hora + '' + minuto;
    }

    // Exposição das funções para uso global
    window.verificarAutenticacao = verificarAutenticacao;
    window.fazerLogin = fazerLogin;
    window.logout = logout;
    window.trocarSenha = trocarSenha;
    window.getUsuarioLogado = getUsuarioLogado;
    window.registrarAuditoria = registrarAuditoria;
    window.getAuditorias = getAuditorias;
    window.extrairModulo = extrairModulo;
    window.exportarAuditoriaCSV = exportarAuditoriaCSV;
})();