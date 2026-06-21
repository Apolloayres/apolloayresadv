const SUPABASE_URL = 'https://wujvdelbiyqilvmjvnav.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Lhkiw93qWBXbZqq2JGLzzQ_ygPlbqC1';

async function supabaseQuery(url, options) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Erro ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error('Erro na requisição Supabase:', error);
    throw error;
  }
}

// ================= COLABORADORES =================
async function colaboradores_listar() {
  const url = `${SUPABASE_URL}/rest/v1/colaboradores?select=*&order=nome.asc`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

async function colaboradores_buscar(id) {
  const url = `${SUPABASE_URL}/rest/v1/colaboradores?id=eq.${id}&select=*`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  const data = await supabaseQuery(url, options);
  return data && data.length ? data[0] : null;
}

async function colaboradores_salvar(obj) {
  if (obj.id) {
    const url = `${SUPABASE_URL}/rest/v1/colaboradores?id=eq.${obj.id}`;
    const options = {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  } else {
    const url = `${SUPABASE_URL}/rest/v1/colaboradores`;
    const options = {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  }
}

async function colaboradores_excluir(id) {
  const url = `${SUPABASE_URL}/rest/v1/colaboradores?id=eq.${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

// ================= RECEITAS =================
async function receitas_listar() {
  const url = `${SUPABASE_URL}/rest/v1/receitas?select=*&order=data.desc`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

async function receitas_buscar(id) {
  const url = `${SUPABASE_URL}/rest/v1/receitas?id=eq.${id}&select=*`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  const data = await supabaseQuery(url, options);
  return data && data.length ? data[0] : null;
}

async function receitas_salvar(obj) {
  if (obj.id) {
    const url = `${SUPABASE_URL}/rest/v1/receitas?id=eq.${obj.id}`;
    const options = {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  } else {
    const url = `${SUPABASE_URL}/rest/v1/receitas`;
    const options = {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  }
}

async function receitas_excluir(id) {
  const url = `${SUPABASE_URL}/rest/v1/receitas?id=eq.${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

// ================= DESPESAS =================
async function despesas_listar() {
  const url = `${SUPABASE_URL}/rest/v1/despesas?select=*&order=data.desc`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

async function despesas_buscar(id) {
  const url = `${SUPABASE_URL}/rest/v1/despesas?id=eq.${id}&select=*`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  const data = await supabaseQuery(url, options);
  return data && data.length ? data[0] : null;
}

async function despesas_salvar(obj) {
  if (obj.id) {
    const url = `${SUPABASE_URL}/rest/v1/despesas?id=eq.${obj.id}`;
    const options = {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  } else {
    const url = `${SUPABASE_URL}/rest/v1/despesas`;
    const options = {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  }
}

async function despesas_excluir(id) {
  const url = `${SUPABASE_URL}/rest/v1/despesas?id=eq.${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

// ================= PROVENTOS =================
async function proventos_listar() {
  const url = `${SUPABASE_URL}/rest/v1/proventos?select=*&order=data.desc`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

async function proventos_listar_por_mes(mes) {
  const url = `${SUPABASE_URL}/rest/v1/proventos?mes=eq.${mes}&select=*&order=colaborador_id.asc`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

async function proventos_buscar(id) {
  const url = `${SUPABASE_URL}/rest/v1/proventos?id=eq.${id}&select=*`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  const data = await supabaseQuery(url, options);
  return data && data.length ? data[0] : null;
}

async function proventos_salvar(obj) {
  if (obj.id) {
    const url = `${SUPABASE_URL}/rest/v1/proventos?id=eq.${obj.id}`;
    const options = {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  } else {
    const url = `${SUPABASE_URL}/rest/v1/proventos`;
    const options = {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  }
}

async function proventos_excluir(id) {
  const url = `${SUPABASE_URL}/rest/v1/proventos?id=eq.${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

async function proventos_excluir_por_colaborador(colaborador_id) {
  const url = `${SUPABASE_URL}/rest/v1/proventos?colaborador_id=eq.${colaborador_id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

// ================= CONTAS =================
async function contas_listar() {
  const url = `${SUPABASE_URL}/rest/v1/contas?select=*&order=nome.asc`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

async function contas_buscar(id) {
  const url = `${SUPABASE_URL}/rest/v1/contas?id=eq.${id}&select=*`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  const data = await supabaseQuery(url, options);
  return data && data.length ? data[0] : null;
}

async function contas_salvar(obj) {
  if (obj.id) {
    const url = `${SUPABASE_URL}/rest/v1/contas?id=eq.${obj.id}`;
    const options = {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  } else {
    const url = `${SUPABASE_URL}/rest/v1/contas`;
    const options = {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  }
}

async function contas_excluir(id) {
  const url = `${SUPABASE_URL}/rest/v1/contas?id=eq.${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

// ================= IMOVEIS =================
async function imoveis_listar() {
  const url = `${SUPABASE_URL}/rest/v1/imoveis?select=*&order=nome.asc`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

async function imoveis_buscar(id) {
  const url = `${SUPABASE_URL}/rest/v1/imoveis?id=eq.${id}&select=*`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  const data = await supabaseQuery(url, options);
  return data && data.length ? data[0] : null;
}

async function imoveis_salvar(obj) {
  if (obj.id) {
    const url = `${SUPABASE_URL}/rest/v1/imoveis?id=eq.${obj.id}`;
    const options = {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  } else {
    const url = `${SUPABASE_URL}/rest/v1/imoveis`;
    const options = {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  }
}

async function imoveis_excluir(id) {
  const url = `${SUPABASE_URL}/rest/v1/imoveis?id=eq.${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

// ================= APLICACOES =================
async function aplicacoes_listar() {
  const url = `${SUPABASE_URL}/rest/v1/aplicacoes?select=*&order=data.desc`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

async function aplicacoes_buscar(id) {
  const url = `${SUPABASE_URL}/rest/v1/aplicacoes?id=eq.${id}&select=*`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  const data = await supabaseQuery(url, options);
  return data && data.length ? data[0] : null;
}

async function aplicacoes_salvar(obj) {
  if (obj.id) {
    const url = `${SUPABASE_URL}/rest/v1/aplicacoes?id=eq.${obj.id}`;
    const options = {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  } else {
    const url = `${SUPABASE_URL}/rest/v1/aplicacoes`;
    const options = {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  }
}

async function aplicacoes_excluir(id) {
  const url = `${SUPABASE_URL}/rest/v1/aplicacoes?id=eq.${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

// ================= USUARIOS =================
async function usuarios_listar() {
  const url = `${SUPABASE_URL}/rest/v1/usuarios?select=*&order=email.asc`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

async function usuarios_buscar(id) {
  const url = `${SUPABASE_URL}/rest/v1/usuarios?id=eq.${id}&select=*`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  const data = await supabaseQuery(url, options);
  return data && data.length ? data[0] : null;
}

async function usuarios_salvar(obj) {
  if (obj.id) {
    const url = `${SUPABASE_URL}/rest/v1/usuarios?id=eq.${obj.id}`;
    const options = {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  } else {
    const url = `${SUPABASE_URL}/rest/v1/usuarios`;
    const options = {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  }
}

async function usuarios_excluir(id) {
  const url = `${SUPABASE_URL}/rest/v1/usuarios?id=eq.${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

async function usuario_login(email, senha) {
  const url = `${SUPABASE_URL}/auth/v1/token?grant_type=password`;
  const options = {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password: senha })
  };
  return await supabaseQuery(url, options);
}

// ================= CLIENTES =================
async function clientes_listar() {
  const url = `${SUPABASE_URL}/rest/v1/clientes?select=*&order=nome.asc`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

async function clientes_buscar(id) {
  const url = `${SUPABASE_URL}/rest/v1/clientes?id=eq.${id}&select=*`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  const data = await supabaseQuery(url, options);
  return data && data.length ? data[0] : null;
}

async function clientes_salvar(obj) {
  if (obj.id) {
    const url = `${SUPABASE_URL}/rest/v1/clientes?id=eq.${obj.id}`;
    const options = {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  } else {
    const url = `${SUPABASE_URL}/rest/v1/clientes`;
    const options = {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(obj)
    };
    return await supabaseQuery(url, options);
  }
}

async function clientes_excluir(id) {
  const url = `${SUPABASE_URL}/rest/v1/clientes?id=eq.${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

// ================= EMPRESAS =================
async function empresas_listar() {
  const url = `${SUPABASE_URL}/rest/v1/empresas?select=*&order=nome.asc`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

async function empresas_salvar(obj) {
  const url = `${SUPABASE_URL}/rest/v1/empresas`;
  const options = {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(obj)
  };
  return await supabaseQuery(url, options);
}

// ================= TRIBUNAIS =================
async function tribunais_listar() {
  const url = `${SUPABASE_URL}/rest/v1/tribunais?select=*&order=nome.asc`;
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  return await supabaseQuery(url, options);
}

async function tribunais_salvar(obj) {
  const url = `${SUPABASE_URL}/rest/v1/tribunais`;
  const options = {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(obj)
  };
  return await supabaseQuery(url, options);
}

window.db = {
  // colaboradores
  colaboradores_listar,
  colaboradores_buscar,
  colaboradores_salvar,
  colaboradores_excluir,
  // receitas
  receitas_listar,
  receitas_buscar,
  receitas_salvar,
  receitas_excluir,
  // despesas
  despesas_listar,
  despesas_buscar,
  despesas_salvar,
  despesas_excluir,
  // proventos
  proventos_listar,
  proventos_listar_por_mes,
  proventos_buscar,
  proventos_salvar,
  proventos_excluir,
  proventos_excluir_por_colaborador,
  // contas
  contas_listar,
  contas_buscar,
  contas_salvar,
  contas_excluir,
  // imoveis
  imoveis_listar,
  imoveis_buscar,
  imoveis_salvar,
  imoveis_excluir,
  // aplicacoes
  aplicacoes_listar,
  aplicacoes_buscar,
  aplicacoes_salvar,
  aplicacoes_excluir,
  // usuarios
  usuarios_listar,
  usuarios_buscar,
  usuarios_salvar,
  usuarios_excluir,
  usuario_login,
  // clientes
  clientes_listar,
  clientes_buscar,
  clientes_salvar,
  clientes_excluir,
  // empresas
  empresas_listar,
  empresas_salvar,
  // tribunais
  tribunais_listar,
  tribunais_salvar
};