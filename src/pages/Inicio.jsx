import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import Banner from "../components/Banner";
import SectionHeader from "../components/SectionHeader";
import { getUsuarios, createUsuario, getCategorias, createCategoria } from "../services/api";
import { Usuario, Categoria } from "../models";

export default function Inicio() {
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [nomeC, setNomeC] = useState("");
  const [descC, setDescC] = useState("");

  useEffect(() => {
    getUsuarios().then((r) => setUsuarios(r.data));
    getCategorias().then((r) => setCategorias(r.data));
  }, []);

  const addUsuario = async () => {
    if (!nome || !email) { alert("Preencha todos os campos!"); return; }
    const novo = new Usuario(nome, email);
    const r = await createUsuario(novo);
    setUsuarios([...usuarios, r.data]);
    setNome(""); setEmail("");
  };

  const addCategoria = async () => {
    if (!nomeC || !descC) { alert("Preencha todos os campos!"); return; }
    const nova = new Categoria(nomeC, descC);
    const r = await createCategoria(nova);
    setCategorias([...categorias, r.data]);
    setNomeC(""); setDescC("");
  };

  return (
    <Container>
      <Banner titulo="Bem-vindo à Fundação Cauã Victor" subtitulo="Gerencie usuários, categorias, cursos, matrículas e pagamentos da plataforma em um só lugar." />

      {/* USUÁRIOS */}
      <div className="mb-5">
        <SectionHeader cor="roxo" icon="👥" titulo="Cadastro de Usuários" subtitulo="Adicione novos usuários e veja quem já está cadastrado" />
        <Row className="g-4">
          <Col lg={5}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderTop: "6px solid #6E56CF", borderRadius: 20 }}>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Nome</Form.Label>
                  <Form.Control value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite o nome" style={{ borderRadius: 10 }} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite o e-mail" style={{ borderRadius: 10 }} />
                </Form.Group>
                <Button className="w-100 fw-bold" style={{ background: "#6E56CF", border: "none", borderRadius: 10 }} onClick={addUsuario}>
                  + Cadastrar usuário
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={7}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 20 }}>
              <Card.Body>
                <h5 className="fw-bold mb-3">Usuários cadastrados</h5>
                <Table striped hover responsive>
                  <thead style={{ background: "#EFEAFB" }}>
                    <tr><th>Nome</th><th>Email</th></tr>
                  </thead>
                  <tbody>
                    {usuarios.length === 0
                      ? <tr><td colSpan={2} className="text-center text-secondary py-3">Nenhum usuário cadastrado.</td></tr>
                      : usuarios.map((u) => <tr key={u.id}><td>{u.nome}</td><td>{u.email}</td></tr>)}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* CATEGORIAS */}
      <div className="mb-5">
        <SectionHeader cor="coral" icon="🏷️" titulo="Cadastro de Categorias" subtitulo="Organize os cursos da plataforma por categoria" />
        <Row className="g-4">
          <Col lg={5}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderTop: "6px solid #D85A30", borderRadius: 20 }}>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Nome da categoria</Form.Label>
                  <Form.Control value={nomeC} onChange={(e) => setNomeC(e.target.value)} placeholder="Digite o nome" style={{ borderRadius: 10 }} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Descrição</Form.Label>
                  <Form.Control value={descC} onChange={(e) => setDescC(e.target.value)} placeholder="Digite a descrição" style={{ borderRadius: 10 }} />
                </Form.Group>
                <Button className="w-100 fw-bold" style={{ background: "#D85A30", border: "none", borderRadius: 10 }} onClick={addCategoria}>
                  + Cadastrar categoria
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={7}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 20 }}>
              <Card.Body>
                <h5 className="fw-bold mb-3">Categorias cadastradas</h5>
                <Table striped hover responsive>
                  <thead><tr><th>Nome</th><th>Descrição</th></tr></thead>
                  <tbody>
                    {categorias.length === 0
                      ? <tr><td colSpan={2} className="text-center text-secondary py-3">Nenhuma categoria cadastrada.</td></tr>
                      : categorias.map((c) => <tr key={c.id}><td>{c.nome}</td><td>{c.descricao}</td></tr>)}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
