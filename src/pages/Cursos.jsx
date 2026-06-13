import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import Banner from "../components/Banner";
import SectionHeader from "../components/SectionHeader";
import { getCursos, createCurso, getModulos, createModulo, getAulas, createAula, getCategorias } from "../services/api";
import { Curso, Modulo, Aula } from "../models";

export default function Cursos() {
  const [categorias, setCategorias] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [aulas, setAulas] = useState([]);

  const [tC, setTC] = useState(""); const [dC, setDC] = useState(""); const [catC, setCatC] = useState("");
  const [tM, setTM] = useState(""); const [oM, setOM] = useState(""); const [curM, setCurM] = useState("");
  const [tA, setTA] = useState(""); const [tipA, setTipA] = useState(""); const [durA, setDurA] = useState("");
  const [oA, setOA] = useState(""); const [modA, setModA] = useState("");

  useEffect(() => {
    getCategorias().then((r) => setCategorias(r.data));
    getCursos().then((r) => setCursos(r.data));
    getModulos().then((r) => setModulos(r.data));
    getAulas().then((r) => setAulas(r.data));
  }, []);

  const addCurso = async () => {
    if (!tC || !dC || !catC) { alert("Preencha todos os campos!"); return; }
    const r = await createCurso(new Curso(tC, dC, catC));
    setCursos([...cursos, r.data]);
    setTC(""); setDC(""); setCatC("");
  };

  const addModulo = async () => {
    if (!tM || !oM || !curM) { alert("Preencha todos os campos!"); return; }
    const r = await createModulo(new Modulo(tM, oM, curM));
    setModulos([...modulos, r.data]);
    setTM(""); setOM(""); setCurM("");
  };

  const addAula = async () => {
    if (!tA || !tipA || !durA || !oA || !modA) { alert("Preencha todos os campos!"); return; }
    const r = await createAula(new Aula(tA, tipA, durA, oA, modA));
    setAulas([...aulas, r.data]);
    setTA(""); setTipA(""); setDurA(""); setOA(""); setModA("");
  };

  const inp = { borderRadius: 10 };

  return (
    <Container>
      <Banner titulo="Cursos da plataforma" subtitulo="Cadastre cursos, organize seus módulos e adicione as aulas de cada um." />

      {/* CURSOS */}
      <div className="mb-5">
        <SectionHeader cor="coral" icon="🎓" titulo="Cadastro de Cursos" subtitulo="Crie novos cursos e associe a uma categoria" />
        <Row className="g-4">
          <Col lg={5}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderTop: "6px solid #D85A30", borderRadius: 20 }}>
              <Card.Body>
                <Form.Group className="mb-3"><Form.Label className="fw-semibold">Título</Form.Label><Form.Control value={tC} onChange={(e) => setTC(e.target.value)} placeholder="Digite o título" style={inp} /></Form.Group>
                <Form.Group className="mb-3"><Form.Label className="fw-semibold">Descrição</Form.Label><Form.Control value={dC} onChange={(e) => setDC(e.target.value)} placeholder="Digite a descrição" style={inp} /></Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Categoria</Form.Label>
                  <Form.Select value={catC} onChange={(e) => setCatC(e.target.value)} style={inp}>
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((c) => <option key={c.id} value={c.nome}>{c.nome}</option>)}
                  </Form.Select>
                </Form.Group>
                <Button className="w-100 fw-bold" style={{ background: "#D85A30", border: "none", borderRadius: 10 }} onClick={addCurso}>+ Cadastrar curso</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={7}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 20 }}>
              <Card.Body>
                <h5 className="fw-bold mb-3">Cursos cadastrados</h5>
                <Table striped hover responsive>
                  <thead><tr><th>Título</th><th>Descrição</th><th>Categoria</th></tr></thead>
                  <tbody>
                    {cursos.length === 0
                      ? <tr><td colSpan={3} className="text-center text-secondary py-3">Nenhum curso cadastrado.</td></tr>
                      : cursos.map((c) => <tr key={c.id}><td>{c.titulo}</td><td>{c.descricao}</td><td>{c.categoria}</td></tr>)}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* MÓDULOS */}
      <div className="mb-5">
        <SectionHeader cor="azul" icon="📂" titulo="Cadastro de Módulos" subtitulo="Divida cada curso em módulos organizados por ordem" />
        <Row className="g-4">
          <Col lg={5}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderTop: "6px solid #185FA5", borderRadius: 20 }}>
              <Card.Body>
                <Form.Group className="mb-3"><Form.Label className="fw-semibold">Título do módulo</Form.Label><Form.Control value={tM} onChange={(e) => setTM(e.target.value)} placeholder="Digite o título" style={inp} /></Form.Group>
                <Form.Group className="mb-3"><Form.Label className="fw-semibold">Ordem</Form.Label><Form.Control type="number" value={oM} onChange={(e) => setOM(e.target.value)} placeholder="Digite a ordem" style={inp} /></Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Curso</Form.Label>
                  <Form.Select value={curM} onChange={(e) => setCurM(e.target.value)} style={inp}>
                    <option value="">Selecione um curso</option>
                    {cursos.map((c) => <option key={c.id} value={c.titulo}>{c.titulo}</option>)}
                  </Form.Select>
                </Form.Group>
                <Button className="w-100 fw-bold" style={{ background: "#185FA5", border: "none", borderRadius: 10 }} onClick={addModulo}>+ Cadastrar módulo</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={7}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 20 }}>
              <Card.Body>
                <h5 className="fw-bold mb-3">Módulos cadastrados</h5>
                <Table striped hover responsive>
                  <thead><tr><th>Título</th><th>Ordem</th><th>Curso</th></tr></thead>
                  <tbody>
                    {modulos.length === 0
                      ? <tr><td colSpan={3} className="text-center text-secondary py-3">Nenhum módulo cadastrado.</td></tr>
                      : modulos.map((m) => <tr key={m.id}><td>{m.titulo}</td><td>{m.ordem}</td><td>{m.curso}</td></tr>)}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* AULAS */}
      <div className="mb-5">
        <SectionHeader cor="teal" icon="▶️" titulo="Cadastro de Aulas" subtitulo="Adicione as aulas de cada módulo, com tipo, duração e ordem" />
        <Row className="g-4">
          <Col lg={5}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderTop: "6px solid #0F6E56", borderRadius: 20 }}>
              <Card.Body>
                <Form.Group className="mb-3"><Form.Label className="fw-semibold">Título</Form.Label><Form.Control value={tA} onChange={(e) => setTA(e.target.value)} placeholder="Digite o título" style={inp} /></Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Tipo</Form.Label>
                  <Form.Select value={tipA} onChange={(e) => setTipA(e.target.value)} style={inp}>
                    <option value="">Selecione</option>
                    <option value="Vídeo">Vídeo</option>
                    <option value="Texto">Texto</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3"><Form.Label className="fw-semibold">Duração</Form.Label><Form.Control value={durA} onChange={(e) => setDurA(e.target.value)} placeholder="Ex: 12 min" style={inp} /></Form.Group>
                <Form.Group className="mb-3"><Form.Label className="fw-semibold">Ordem</Form.Label><Form.Control type="number" value={oA} onChange={(e) => setOA(e.target.value)} placeholder="Digite a ordem" style={inp} /></Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Módulo</Form.Label>
                  <Form.Select value={modA} onChange={(e) => setModA(e.target.value)} style={inp}>
                    <option value="">Selecione um módulo</option>
                    {modulos.map((m) => <option key={m.id} value={m.titulo}>{m.titulo}</option>)}
                  </Form.Select>
                </Form.Group>
                <Button className="w-100 fw-bold" style={{ background: "#0F6E56", border: "none", borderRadius: 10 }} onClick={addAula}>+ Cadastrar aula</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={7}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 20 }}>
              <Card.Body>
                <h5 className="fw-bold mb-3">Aulas cadastradas</h5>
                <Table striped hover responsive>
                  <thead><tr><th>Título</th><th>Tipo</th><th>Duração</th><th>Ordem</th><th>Módulo</th></tr></thead>
                  <tbody>
                    {aulas.length === 0
                      ? <tr><td colSpan={5} className="text-center text-secondary py-3">Nenhuma aula cadastrada.</td></tr>
                      : aulas.map((a) => <tr key={a.id}><td>{a.titulo}</td><td>{a.tipo}</td><td>{a.duracao}</td><td>{a.ordem}</td><td>{a.modulo}</td></tr>)}
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
