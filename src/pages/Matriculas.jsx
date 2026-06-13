import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Table, Badge } from "react-bootstrap";
import Banner from "../components/Banner";
import SectionHeader from "../components/SectionHeader";
import {
  getUsuarios, getCursos, getAulas,
  getMatriculas, createMatricula,
  getProgressos, createProgresso,
  getCertificados, createCertificado,
} from "../services/api";
import { Matricula, Progresso, Certificado } from "../models";

const gerarCodigo = () => Math.random().toString(36).substring(2, 10).toUpperCase();

export default function Matriculas() {
  const [usuarios, setUsuarios] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [progressos, setProgressos] = useState([]);
  const [certificados, setCertificados] = useState([]);

  const [uM, setUM] = useState(""); const [cM, setCM] = useState("");
  const [uP, setUp] = useState(""); const [aP, setAP] = useState(""); const [conc, setConc] = useState(false);
  const [uCert, setUCert] = useState(""); const [cCert, setCCert] = useState("");

  useEffect(() => {
    getUsuarios().then((r) => setUsuarios(r.data));
    getCursos().then((r) => setCursos(r.data));
    getAulas().then((r) => setAulas(r.data));
    getMatriculas().then((r) => setMatriculas(r.data));
    getProgressos().then((r) => setProgressos(r.data));
    getCertificados().then((r) => setCertificados(r.data));
  }, []);

  const addMatricula = async () => {
    if (!uM || !cM) { alert("Selecione um usuário e um curso!"); return; }
    const r = await createMatricula(new Matricula(uM, cM));
    setMatriculas([...matriculas, r.data]);
    setUM(""); setCM("");
  };

  const addProgresso = async () => {
    if (!uP || !aP) { alert("Selecione um usuário e uma aula!"); return; }
    const r = await createProgresso(new Progresso(uP, aP, conc));
    setProgressos([...progressos, r.data]);
    setUp(""); setAP(""); setConc(false);
  };

  const addCert = async () => {
    if (!uCert || !cCert) { alert("Selecione um usuário e um curso!"); return; }
    const r = await createCertificado(new Certificado(uCert, cCert, gerarCodigo()));
    setCertificados([...certificados, r.data]);
    setUCert(""); setCCert("");
  };

  const inp = { borderRadius: 10 };

  return (
    <Container>
      <Banner titulo="Matrículas e progresso" subtitulo="Matricule alunos nos cursos, acompanhe o progresso das aulas e gere certificados." />

      {/* MATRÍCULAS */}
      <div className="mb-5">
        <SectionHeader cor="rosa" icon="📋" titulo="Matrícula de Usuários" subtitulo="Matricule um usuário em um curso disponível" />
        <Row className="g-4">
          <Col lg={5}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderTop: "6px solid #993556", borderRadius: 20 }}>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Usuário</Form.Label>
                  <Form.Select value={uM} onChange={(e) => setUM(e.target.value)} style={inp}>
                    <option value="">Selecione um usuário</option>
                    {usuarios.map((u) => <option key={u.id} value={u.nome}>{u.nome}</option>)}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Curso</Form.Label>
                  <Form.Select value={cM} onChange={(e) => setCM(e.target.value)} style={inp}>
                    <option value="">Selecione um curso</option>
                    {cursos.map((c) => <option key={c.id} value={c.titulo}>{c.titulo}</option>)}
                  </Form.Select>
                </Form.Group>
                <Button className="w-100 fw-bold" style={{ background: "#993556", border: "none", borderRadius: 10 }} onClick={addMatricula}>+ Matricular</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={7}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 20 }}>
              <Card.Body>
                <h5 className="fw-bold mb-3">Matrículas realizadas</h5>
                <Table striped hover responsive>
                  <thead><tr><th>Usuário</th><th>Curso</th></tr></thead>
                  <tbody>
                    {matriculas.length === 0
                      ? <tr><td colSpan={2} className="text-center text-secondary py-3">Nenhuma matrícula cadastrada.</td></tr>
                      : matriculas.map((m) => <tr key={m.id}><td>{m.usuario}</td><td>{m.curso}</td></tr>)}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* PROGRESSO */}
      <div className="mb-5">
        <SectionHeader cor="ambar" icon="📈" titulo="Controle de Progresso" subtitulo="Registre o progresso do aluno em cada aula" />
        <Row className="g-4">
          <Col lg={5}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderTop: "6px solid #854F0B", borderRadius: 20 }}>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Usuário</Form.Label>
                  <Form.Select value={uP} onChange={(e) => setUp(e.target.value)} style={inp}>
                    <option value="">Selecione um usuário</option>
                    {usuarios.map((u) => <option key={u.id} value={u.nome}>{u.nome}</option>)}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Aula</Form.Label>
                  <Form.Select value={aP} onChange={(e) => setAP(e.target.value)} style={inp}>
                    <option value="">Selecione uma aula</option>
                    {aulas.map((a) => <option key={a.id} value={a.titulo}>{a.titulo}</option>)}
                  </Form.Select>
                </Form.Group>
                <Form.Check className="mb-3" type="checkbox" id="concluida" label="Aula concluída" checked={conc} onChange={(e) => setConc(e.target.checked)} />
                <Button className="w-100 fw-bold" style={{ background: "#854F0B", border: "none", borderRadius: 10 }} onClick={addProgresso}>+ Registrar progresso</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={7}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 20 }}>
              <Card.Body>
                <h5 className="fw-bold mb-3">Progresso dos usuários</h5>
                <Table striped hover responsive>
                  <thead><tr><th>Usuário</th><th>Aula</th><th>Status</th></tr></thead>
                  <tbody>
                    {progressos.length === 0
                      ? <tr><td colSpan={3} className="text-center text-secondary py-3">Nenhum progresso registrado.</td></tr>
                      : progressos.map((p) => (
                        <tr key={p.id}>
                          <td>{p.usuario}</td>
                          <td>{p.aula}</td>
                          <td><Badge bg={p.concluida ? "success" : "warning"} text={p.concluida ? "white" : "dark"}>{p.concluida ? "Concluída" : "Pendente"}</Badge></td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* CERTIFICADOS */}
      <div className="mb-5">
        <SectionHeader cor="roxo" icon="🏆" titulo="Geração de Certificado" subtitulo="Gere o certificado de conclusão para um usuário" />
        <Row className="g-4">
          <Col lg={5}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderTop: "6px solid #6E56CF", borderRadius: 20 }}>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Usuário</Form.Label>
                  <Form.Select value={uCert} onChange={(e) => setUCert(e.target.value)} style={inp}>
                    <option value="">Selecione um usuário</option>
                    {usuarios.map((u) => <option key={u.id} value={u.nome}>{u.nome}</option>)}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Curso</Form.Label>
                  <Form.Select value={cCert} onChange={(e) => setCCert(e.target.value)} style={inp}>
                    <option value="">Selecione um curso</option>
                    {cursos.map((c) => <option key={c.id} value={c.titulo}>{c.titulo}</option>)}
                  </Form.Select>
                </Form.Group>
                <Button className="w-100 fw-bold" style={{ background: "#6E56CF", border: "none", borderRadius: 10 }} onClick={addCert}>+ Gerar certificado</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={7}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 20 }}>
              <Card.Body>
                <h5 className="fw-bold mb-3">Certificados gerados</h5>
                <Table striped hover responsive>
                  <thead><tr><th>Usuário</th><th>Curso</th><th>Código</th></tr></thead>
                  <tbody>
                    {certificados.length === 0
                      ? <tr><td colSpan={3} className="text-center text-secondary py-3">Nenhum certificado gerado.</td></tr>
                      : certificados.map((c) => <tr key={c.id}><td>{c.usuario}</td><td>{c.curso}</td><td><code>{c.codigo}</code></td></tr>)}
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
