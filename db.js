const SUPABASE_URL = 'https://wujvdelbiyqilvmjvnav.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Lhkiw93qWBXbZqq2JGLzzQ_ygPlbqC1';

async function supabaseQuery(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    ...options
  });
  if (!response.ok) throw new Error(`Supabase error: ${response.status}`);
  return response.json();
}

// ================= COLABORADORES =================

async function colaboradores_listar() {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/colaboradores?order=nome.asc`);
    return data || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function colaboradores_buscar(id) {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/colaboradores?id=eq.${id}&select=*`);
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function colaboradores_salvar(obj) {
  try {
    const { id, ...body } = obj;
    if (id) {
      const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/colaboradores?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body)
      });
      return (data && data[0]) || null;
    }
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/colaboradores`, {
      method: 'POST',
      headers: {
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    });
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function colaboradores_excluir(id) {
  try {
    await supabaseQuery(`${SUPABASE_URL}/rest/v1/colaboradores?id=eq.${id}`, {
      method: 'DELETE'
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

// ================= RECEITAS =================

async function receitas_listar() {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/receitas?order=data.desc`);
    return data || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function receitas_buscar(id) {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/receitas?id=eq.${id}`);
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function receitas_salvar(obj) {
  try {
    const { id, ...body } = obj;
    if (id) {
      const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/receitas?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body)
      });
      return (data && data[0]) || null;
    }
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/receitas`, {
      method: 'POST',
      headers: {
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    });
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function receitas_excluir(id) {
  try {
    await supabaseQuery(`${SUPABASE_URL}/rest/v1/receitas?id=eq.${id}`, {
      method: 'DELETE'
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

// ================= DESPESAS =================

async function despesas_listar() {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/despesas?order=data.desc`);
    return data || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function despesas_buscar(id) {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/despesas?id=eq.${id}`);
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function despesas_salvar(obj) {
  try {
    const { id, ...body } = obj;
    if (id) {
      const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/despesas?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body)
      });
      return (data && data[0]) || null;
    }
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/despesas`, {
      method: 'POST',
      headers: {
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    });
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function despesas_excluir(id) {
  try {
    await supabaseQuery(`${SUPABASE_URL}/rest/v1/despesas?id=eq.${id}`, {
      method: 'DELETE'
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

// ================= PROVENTOS =================

async function proventos_listar() {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/proventos?order=mes.asc`);
    return data || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function proventos_listar_por_mes(mes, ano) {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/proventos?mes=eq.${mes}&ano=eq.${ano}&order=nome.asc`);
    return data || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function proventos_buscar(id) {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/proventos?id=eq.${id}`);
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function proventos_salvar(obj) {
  try {
    const { id, ...body } = obj;
    if (id) {
      const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/proventos?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body)
      });
      return (data && data[0]) || null;
    }
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/proventos`, {
      method: 'POST',
      headers: {
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    });
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function proventos_excluir(id) {
  try {
    await supabaseQuery(`${SUPABASE_URL}/rest/v1/proventos?id=eq.${id}`, {
      method: 'DELETE'
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function proventos_excluir_por_colaborador(id) {
  try {
    await supabaseQuery(`${SUPABASE_URL}/rest/v1/proventos?colaborador_id=eq.${id}`, {
      method: 'DELETE'
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

// ================= CONTAS =================

async function contas_listar() {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/contas?order=nome.asc`);
    return data || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function contas_buscar(id) {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/contas?id=eq.${id}`);
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function contas_salvar(obj) {
  try {
    const { id, ...body } = obj;
    if (id) {
      const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/contas?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body)
      });
      return (data && data[0]) || null;
    }
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/contas`, {
      method: 'POST',
      headers: {
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    });
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function contas_excluir(id) {
  try {
    await supabaseQuery(`${SUPABASE_URL}/rest/v1/contas?id=eq.${id}`, {
      method: 'DELETE'
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

// ================= IMÓVEIS =================

async function imoveis_listar() {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/imoveis?order=nome.asc`);
    return data || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function imoveis_buscar(id) {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/imoveis?id=eq.${id}`);
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function imoveis_salvar(obj) {
  try {
    const { id, ...body } = obj;
    if (id) {
      const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/imoveis?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body)
      });
      return (data && data[0]) || null;
    }
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/imoveis`, {
      method: 'POST',
      headers: {
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    });
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function imoveis_excluir(id) {
  try {
    await supabaseQuery(`${SUPABASE_URL}/rest/v1/imoveis?id=eq.${id}`, {
      method: 'DELETE'
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

// ================= APLICAÇÕES =================

async function aplicacoes_listar() {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/aplicacoes?order=nome.asc`);
    return data || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function aplicacoes_buscar(id) {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/aplicacoes?id=eq.${id}`);
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function aplicacoes_salvar(obj) {
  try {
    const { id, ...body } = obj;
    if (id) {
      const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/aplicacoes?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body)
      });
      return (data && data[0]) || null;
    }
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/aplicacoes`, {
      method: 'POST',
      headers: {
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    });
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function aplicacoes_excluir(id) {
  try {
    await supabaseQuery(`${SUPABASE_URL}/rest/v1/aplicacoes?id=eq.${id}`, {
      method: 'DELETE'
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

// ================= USUÁRIOS =================

async function usuarios_listar() {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/usuarios?order=nome.asc`);
    return data || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function usuarios_buscar(email) {
  try {
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/usuarios?email=eq.${encodeURIComponent(email)}&select=*`);
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function usuarios_salvar(obj) {
  try {
    const { id, ...body } = obj;
    if (id) {
      const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/usuarios?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body)
      });
      return (data && data[0]) || null;
    }
    const data = await supabaseQuery(`${SUPABASE_URL}/rest/v1/usuarios`, {
      method: 'POST',
      headers: {
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    });
    return (data && data[0]) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function usuarios_excluir(id) {
  try {
    await supabaseQuery(`${SUPABASE_URL}/rest/v1/usuarios?id=eq.${id}`, {
      method: 'DELETE'
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function usuario_login(email, senha) {
  try {
    const usuario = await usuarios_buscar(email);
    if (usuario && usuario.senha === senha) {
      const { senha, ...usuarioSemSenha } = usuario;
      return usuarioSemSenha;
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// ================= EXPORTAÇÃO =================

window.db = {
  colaboradores_listar,
  colaboradores_buscar,
  colaboradores_salvar,
  colaboradores_excluir,
  receitas_listar,
  receitas_buscar,
  receitas_salvar,
  receitas_excluir,
  despesas_listar,
  despesas_buscar,
  despesas_salvar,
  despesas_excluir,
  proventos_listar,
  proventos_listar_por_mes,
  proventos_buscar,
  proventos_salvar,
  proventos_excluir,
  proventos_excluir_por_colaborador,
  contas_listar,
  contas_buscar,
  contas_salvar,
  contas_excluir,
  imoveis_listar,
  imoveis_buscar,
  imoveis_salvar,
  imoveis_excluir,
  aplicacoes_listar,
  aplicacoes_buscar,
  aplicacoes_salvar,
  aplicacoes_excluir,
  usuarios_listar,
  usuarios_buscar,
  usuarios_salvar,
  usuarios_excluir,
  usuario_login
};