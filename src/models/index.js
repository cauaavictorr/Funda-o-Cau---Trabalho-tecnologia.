export class Usuario {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }
}

export class Categoria {
  constructor(nome, descricao) {
    this.nome = nome;
    this.descricao = descricao;
  }
}

export class Curso {
  constructor(titulo, descricao, categoria) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.categoria = categoria;
  }
}

export class Modulo {
  constructor(titulo, ordem, curso) {
    this.titulo = titulo;
    this.ordem = ordem;
    this.curso = curso;
  }
}

export class Aula {
  constructor(titulo, tipo, duracao, ordem, modulo) {
    this.titulo = titulo;
    this.tipo = tipo;
    this.duracao = duracao;
    this.ordem = ordem;
    this.modulo = modulo;
  }
}

export class Matricula {
  constructor(usuario, curso) {
    this.usuario = usuario;
    this.curso = curso;
  }
}

export class Progresso {
  constructor(usuario, aula, concluida) {
    this.usuario = usuario;
    this.aula = aula;
    this.concluida = concluida;
  }
}

export class Certificado {
  constructor(usuario, curso, codigo) {
    this.usuario = usuario;
    this.curso = curso;
    this.codigo = codigo;
  }
}

export class Pagamento {
  constructor(plano, metodo, idTransacao) {
    this.plano = plano;
    this.metodo = metodo;
    this.idTransacao = idTransacao;
  }
}
