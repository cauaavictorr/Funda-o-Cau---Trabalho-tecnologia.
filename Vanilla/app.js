// =========================================================
// FUNDAÇÃO CAUÃ VICTOR - LÓGICA DA PLATAFORMA
// Compartilhado entre todas as páginas
// Os dados são salvos no localStorage para persistir
// entre as diferentes páginas do site
// =========================================================

// =========================
// CLASSES
// =========================

class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
}

class Categoria {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }
}

class Curso {
    constructor(titulo, descricao, categoria) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.categoria = categoria;
    }
}

class Modulo {
    constructor(titulo, ordem, curso) {
        this.titulo = titulo;
        this.ordem = ordem;
        this.curso = curso;
    }
}

class Aula {
    constructor(titulo, tipo, duracao, ordem, modulo) {
        this.titulo = titulo;
        this.tipo = tipo;
        this.duracao = duracao;
        this.ordem = ordem;
        this.modulo = modulo;
    }
}

class Matricula {
    constructor(usuario, curso) {
        this.usuario = usuario;
        this.curso = curso;
    }
}

class Progresso {
    constructor(usuario, aula, concluida) {
        this.usuario = usuario;
        this.aula = aula;
        this.concluida = concluida;
    }
}

class Certificado {
    constructor(usuario, curso, codigo) {
        this.usuario = usuario;
        this.curso = curso;
        this.codigo = codigo;
    }
}

class Pagamento {
    constructor(plano, metodo, idTransacao) {
        this.plano = plano;
        this.metodo = metodo;
        this.idTransacao = idTransacao;
    }
}

// =========================
// PERSISTÊNCIA (localStorage)
// =========================

function carregar(chave) {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : [];
}

function salvar(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

let usuarios = carregar("fcv_usuarios");
let categorias = carregar("fcv_categorias");
let cursos = carregar("fcv_cursos");
let modulos = carregar("fcv_modulos");
let aulas = carregar("fcv_aulas");
let matriculas = carregar("fcv_matriculas");
let progressos = carregar("fcv_progressos");
let certificados = carregar("fcv_certificados");
let pagamentos = carregar("fcv_pagamentos");

// =========================
// FUNÇÕES AUXILIARES
// =========================

function gerarCodigo() {
    return Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();
}

function gerarIdTransacao() {
    return "TRX-" +
        Math.random()
            .toString(36)
            .substring(2, 10)
            .toUpperCase();
}

// Liga um evento de clique a um botão somente se ele existir
// na página atual (cada página tem só algumas seções)
function ligarEvento(idBotao, funcao) {
    const botao = document.getElementById(idBotao);
    if (botao) {
        botao.addEventListener("click", funcao);
    }
}

// =========================
// USUÁRIOS
// =========================

function cadastrarUsuario() {

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (!nome || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    const usuario = new Usuario(nome, email);

    usuarios.push(usuario);
    salvar("fcv_usuarios", usuarios);

    atualizarTabelaUsuarios();
    atualizarSelectUsuarios();
    atualizarSelectUsuariosProgresso();
    atualizarSelectUsuariosCertificado();

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";

}

function atualizarTabelaUsuarios() {

    const tabela = document.getElementById("tabelaUsuarios");

    if (!tabela) return;

    if (usuarios.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="2" class="text-center text-secondary">
                    Nenhum usuário cadastrado.
                </td>
            </tr>
        `;
        return;
    }

    tabela.innerHTML = "";

    usuarios.forEach(usuario => {

        tabela.innerHTML += `
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
            </tr>
        `;

    });

}

function atualizarSelectUsuarios() {

    const select = document.getElementById("usuarioMatricula");

    if (!select) return;

    select.innerHTML =
        '<option value="">Selecione um usuário</option>';

    usuarios.forEach(usuario => {

        select.innerHTML += `
            <option value="${usuario.nome}">
                ${usuario.nome}
            </option>
        `;

    });

}

function atualizarSelectUsuariosProgresso() {

    const select = document.getElementById("usuarioProgresso");

    if (!select) return;

    select.innerHTML =
        '<option value="">Selecione um usuário</option>';

    usuarios.forEach(usuario => {

        select.innerHTML += `
            <option value="${usuario.nome}">
                ${usuario.nome}
            </option>
        `;

    });

}

function atualizarSelectUsuariosCertificado() {

    const select = document.getElementById("usuarioCertificado");

    if (!select) return;

    select.innerHTML =
        '<option value="">Selecione um usuário</option>';

    usuarios.forEach(usuario => {

        select.innerHTML += `
            <option value="${usuario.nome}">
                ${usuario.nome}
            </option>
        `;

    });

}

// =========================
// CATEGORIAS
// =========================

function cadastrarCategoria() {

    const nome = document.getElementById("nomeCategoria").value;
    const descricao = document.getElementById("descricaoCategoria").value;

    if (!nome || !descricao) {
        alert("Preencha todos os campos!");
        return;
    }

    const categoria = new Categoria(nome, descricao);

    categorias.push(categoria);
    salvar("fcv_categorias", categorias);

    atualizarTabelaCategorias();
    atualizarSelectCategorias();

    document.getElementById("nomeCategoria").value = "";
    document.getElementById("descricaoCategoria").value = "";

}

function atualizarTabelaCategorias() {

    const tabela = document.getElementById("tabelaCategorias");

    if (!tabela) return;

    if (categorias.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="2" class="text-center text-secondary">
                    Nenhuma categoria cadastrada.
                </td>
            </tr>
        `;
        return;
    }

    tabela.innerHTML = "";

    categorias.forEach(categoria => {

        tabela.innerHTML += `
            <tr>
                <td>${categoria.nome}</td>
                <td>${categoria.descricao}</td>
            </tr>
        `;

    });

}

function atualizarSelectCategorias() {

    const select = document.getElementById("categoriaCurso");

    if (!select) return;

    select.innerHTML =
        '<option value="">Selecione uma categoria</option>';

    categorias.forEach(categoria => {

        select.innerHTML += `
            <option value="${categoria.nome}">
                ${categoria.nome}
            </option>
        `;

    });

}

// =========================
// CURSOS
// =========================

function cadastrarCurso() {

    const titulo = document.getElementById("tituloCurso").value;
    const descricao = document.getElementById("descricaoCurso").value;
    const categoria = document.getElementById("categoriaCurso").value;

    if (!titulo || !descricao || !categoria) {
        alert("Preencha todos os campos!");
        return;
    }

    const curso = new Curso(titulo, descricao, categoria);

    cursos.push(curso);
    salvar("fcv_cursos", cursos);

    atualizarTabelaCursos();
    atualizarSelectCursos();
    atualizarSelectCursosMatricula();
    atualizarSelectCursosCertificado();

    document.getElementById("tituloCurso").value = "";
    document.getElementById("descricaoCurso").value = "";
    document.getElementById("categoriaCurso").value = "";

}

function atualizarTabelaCursos() {

    const tabela = document.getElementById("tabelaCursos");

    if (!tabela) return;

    if (cursos.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-secondary">
                    Nenhum curso cadastrado.
                </td>
            </tr>
        `;
        return;
    }

    tabela.innerHTML = "";

    cursos.forEach(curso => {

        tabela.innerHTML += `
            <tr>
                <td>${curso.titulo}</td>
                <td>${curso.descricao}</td>
                <td>${curso.categoria}</td>
            </tr>
        `;

    });

}

function atualizarSelectCursos() {

    const select = document.getElementById("cursoModulo");

    if (!select) return;

    select.innerHTML =
        '<option value="">Selecione um curso</option>';

    cursos.forEach(curso => {

        select.innerHTML += `
            <option value="${curso.titulo}">
                ${curso.titulo}
            </option>
        `;

    });

}

function atualizarSelectCursosMatricula() {

    const select = document.getElementById("cursoMatricula");

    if (!select) return;

    select.innerHTML =
        '<option value="">Selecione um curso</option>';

    cursos.forEach(curso => {

        select.innerHTML += `
            <option value="${curso.titulo}">
                ${curso.titulo}
            </option>
        `;

    });

}

function atualizarSelectCursosCertificado() {

    const select = document.getElementById("cursoCertificado");

    if (!select) return;

    select.innerHTML =
        '<option value="">Selecione um curso</option>';

    cursos.forEach(curso => {

        select.innerHTML += `
            <option value="${curso.titulo}">
                ${curso.titulo}
            </option>
        `;

    });

}

// =========================
// MÓDULOS
// =========================

function cadastrarModulo() {

    const titulo = document.getElementById("tituloModulo").value;
    const ordem = document.getElementById("ordemModulo").value;
    const curso = document.getElementById("cursoModulo").value;

    if (!titulo || !ordem || !curso) {
        alert("Preencha todos os campos!");
        return;
    }

    const modulo = new Modulo(titulo, ordem, curso);

    modulos.push(modulo);
    salvar("fcv_modulos", modulos);

    atualizarTabelaModulos();
    atualizarSelectModulos();

    document.getElementById("tituloModulo").value = "";
    document.getElementById("ordemModulo").value = "";
    document.getElementById("cursoModulo").value = "";

}

function atualizarTabelaModulos() {

    const tabela = document.getElementById("tabelaModulos");

    if (!tabela) return;

    if (modulos.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-secondary">
                    Nenhum módulo cadastrado.
                </td>
            </tr>
        `;
        return;
    }

    tabela.innerHTML = "";

    modulos.forEach(modulo => {

        tabela.innerHTML += `
            <tr>
                <td>${modulo.titulo}</td>
                <td>${modulo.ordem}</td>
                <td>${modulo.curso}</td>
            </tr>
        `;

    });

}

function atualizarSelectModulos() {

    const select = document.getElementById("moduloAula");

    if (!select) return;

    select.innerHTML =
        '<option value="">Selecione um módulo</option>';

    modulos.forEach(modulo => {

        select.innerHTML += `
            <option value="${modulo.titulo}">
                ${modulo.titulo}
            </option>
        `;

    });

}

// =========================
// AULAS
// =========================

function cadastrarAula() {

    const titulo = document.getElementById("tituloAula").value;
    const tipo = document.getElementById("tipoAula").value;
    const duracao = document.getElementById("duracaoAula").value;
    const ordem = document.getElementById("ordemAula").value;
    const modulo = document.getElementById("moduloAula").value;

    if (!titulo || !tipo || !duracao || !ordem || !modulo) {
        alert("Preencha todos os campos!");
        return;
    }

    const aula = new Aula(titulo, tipo, duracao, ordem, modulo);

    aulas.push(aula);
    salvar("fcv_aulas", aulas);

    atualizarTabelaAulas();
    atualizarSelectAulas();

    document.getElementById("tituloAula").value = "";
    document.getElementById("tipoAula").value = "";
    document.getElementById("duracaoAula").value = "";
    document.getElementById("ordemAula").value = "";
    document.getElementById("moduloAula").value = "";

}

function atualizarTabelaAulas() {

    const tabela = document.getElementById("tabelaAulas");

    if (!tabela) return;

    if (aulas.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-secondary">
                    Nenhuma aula cadastrada.
                </td>
            </tr>
        `;
        return;
    }

    tabela.innerHTML = "";

    aulas.forEach(aula => {

        tabela.innerHTML += `
            <tr>
                <td>${aula.titulo}</td>
                <td>${aula.tipo}</td>
                <td>${aula.duracao}</td>
                <td>${aula.ordem}</td>
                <td>${aula.modulo}</td>
            </tr>
        `;

    });

}

function atualizarSelectAulas() {

    const select = document.getElementById("aulaProgresso");

    if (!select) return;

    select.innerHTML =
        '<option value="">Selecione uma aula</option>';

    aulas.forEach(aula => {

        select.innerHTML += `
            <option value="${aula.titulo}">
                ${aula.titulo}
            </option>
        `;

    });

}

// =========================
// MATRÍCULAS
// =========================

function matricularUsuario() {

    const usuario = document.getElementById("usuarioMatricula").value;
    const curso = document.getElementById("cursoMatricula").value;

    if (!usuario || !curso) {
        alert("Selecione um usuário e um curso!");
        return;
    }

    const matricula = new Matricula(usuario, curso);

    matriculas.push(matricula);
    salvar("fcv_matriculas", matriculas);

    atualizarTabelaMatriculas();

    document.getElementById("usuarioMatricula").value = "";
    document.getElementById("cursoMatricula").value = "";

}

function atualizarTabelaMatriculas() {

    const tabela = document.getElementById("tabelaMatriculas");

    if (!tabela) return;

    if (matriculas.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="2" class="text-center text-secondary">
                    Nenhuma matrícula cadastrada.
                </td>
            </tr>
        `;
        return;
    }

    tabela.innerHTML = "";

    matriculas.forEach(matricula => {

        tabela.innerHTML += `
            <tr>
                <td>${matricula.usuario}</td>
                <td>${matricula.curso}</td>
            </tr>
        `;

    });

}

// =========================
// CONTROLE DE PROGRESSO
// =========================

function registrarProgresso() {

    const usuario = document.getElementById("usuarioProgresso").value;
    const aula = document.getElementById("aulaProgresso").value;
    const concluida = document.getElementById("concluida").checked;

    if (!usuario || !aula) {
        alert("Selecione um usuário e uma aula!");
        return;
    }

    const progresso = new Progresso(usuario, aula, concluida);

    progressos.push(progresso);
    salvar("fcv_progressos", progressos);

    atualizarTabelaProgresso();

    document.getElementById("usuarioProgresso").value = "";
    document.getElementById("aulaProgresso").value = "";
    document.getElementById("concluida").checked = false;

}

function atualizarTabelaProgresso() {

    const tabela = document.getElementById("tabelaProgresso");

    if (!tabela) return;

    if (progressos.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-secondary">
                    Nenhum progresso registrado.
                </td>
            </tr>
        `;
        return;
    }

    tabela.innerHTML = "";

    progressos.forEach(progresso => {

        tabela.innerHTML += `
            <tr>
                <td>${progresso.usuario}</td>
                <td>${progresso.aula}</td>
                <td>${progresso.concluida ? "Concluída" : "Pendente"}</td>
            </tr>
        `;

    });

}

// =========================
// CERTIFICADOS
// =========================

function gerarCertificado() {

    const usuario = document.getElementById("usuarioCertificado").value;
    const curso = document.getElementById("cursoCertificado").value;

    if (!usuario || !curso) {
        alert("Selecione um usuário e um curso!");
        return;
    }

    const codigo = gerarCodigo();

    const certificado = new Certificado(usuario, curso, codigo);

    certificados.push(certificado);
    salvar("fcv_certificados", certificados);

    atualizarTabelaCertificados();

    document.getElementById("usuarioCertificado").value = "";
    document.getElementById("cursoCertificado").value = "";

}

function atualizarTabelaCertificados() {

    const tabela = document.getElementById("tabelaCertificados");

    if (!tabela) return;

    if (certificados.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-secondary">
                    Nenhum certificado gerado.
                </td>
            </tr>
        `;
        return;
    }

    tabela.innerHTML = "";

    certificados.forEach(certificado => {

        tabela.innerHTML += `
            <tr>
                <td>${certificado.usuario}</td>
                <td>${certificado.curso}</td>
                <td>${certificado.codigo}</td>
            </tr>
        `;

    });

}

// =========================
// PAGAMENTOS
// =========================

function realizarPagamento() {

    const plano = document.getElementById("planoPagamento").value;
    const metodo = document.getElementById("metodoPagamento").value;

    if (!plano || !metodo) {
        alert("Selecione um plano e um método de pagamento!");
        return;
    }

    const idTransacao = gerarIdTransacao();

    const pagamento = new Pagamento(plano, metodo, idTransacao);

    pagamentos.push(pagamento);
    salvar("fcv_pagamentos", pagamentos);

    atualizarTabelaPagamentos();

    document.getElementById("planoPagamento").value = "";
    document.getElementById("metodoPagamento").value = "";

}

function atualizarTabelaPagamentos() {

    const tabela = document.getElementById("tabelaPagamentos");

    if (!tabela) return;

    if (pagamentos.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-secondary">
                    Nenhum pagamento registrado.
                </td>
            </tr>
        `;
        return;
    }

    tabela.innerHTML = "";

    pagamentos.forEach(pagamento => {

        tabela.innerHTML += `
            <tr>
                <td>${pagamento.plano}</td>
                <td>${pagamento.metodo}</td>
                <td>${pagamento.idTransacao}</td>
            </tr>
        `;

    });

}

// =========================================================
// INICIALIZAÇÃO
// Roda em todas as páginas. Cada função acima já verifica
// se o elemento existe na página antes de usá-lo, então é
// seguro chamar todas elas sempre.
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // Liga os botões que existirem na página atual
    ligarEvento("btnCadastrar", cadastrarUsuario);
    ligarEvento("btnCadastrarCategoria", cadastrarCategoria);
    ligarEvento("btnCadastrarCurso", cadastrarCurso);
    ligarEvento("btnCadastrarModulo", cadastrarModulo);
    ligarEvento("btnCadastrarAula", cadastrarAula);
    ligarEvento("btnMatricular", matricularUsuario);
    ligarEvento("btnRegistrarProgresso", registrarProgresso);
    ligarEvento("btnGerarCertificado", gerarCertificado);
    ligarEvento("btnPagamento", realizarPagamento);

    // Preenche tabelas e selects com os dados salvos
    atualizarTabelaUsuarios();
    atualizarSelectUsuarios();
    atualizarSelectUsuariosProgresso();
    atualizarSelectUsuariosCertificado();

    atualizarTabelaCategorias();
    atualizarSelectCategorias();

    atualizarTabelaCursos();
    atualizarSelectCursos();
    atualizarSelectCursosMatricula();
    atualizarSelectCursosCertificado();

    atualizarTabelaModulos();
    atualizarSelectModulos();

    atualizarTabelaAulas();
    atualizarSelectAulas();

    atualizarTabelaMatriculas();
    atualizarTabelaProgresso();
    atualizarTabelaCertificados();
    atualizarTabelaPagamentos();

});
