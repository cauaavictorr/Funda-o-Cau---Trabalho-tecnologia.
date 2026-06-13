import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import Banner from "../components/Banner";
import SectionHeader from "../components/SectionHeader";
import { getPagamentos, createPagamento } from "../services/api";
import { Pagamento } from "../models";

const gerarTRX = () => "TRX-" + Math.random().toString(36).substring(2, 10).toUpperCase();

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState([]);
  const [plano, setPlano] = useState("");
  const [metodo, setMetodo] = useState("");

  useEffect(() => {
    getPagamentos().then((r) => setPagamentos(r.data));
  }, []);

  const addPagamento = async () => {
    if (!plano || !metodo) { alert("Selecione um plano e um método de pagamento!"); return; }
    const r = await createPagamento(new Pagamento(plano, metodo, gerarTRX()));
    setPagamentos([...pagamentos, r.data]);
    setPlano(""); setMetodo("");
  };

  return (
    <Container>
      <Banner titulo="Planos e pagamentos" subtitulo="Simule a assinatura de um plano e o pagamento de um aluno." />
      <div className="mb-5">
        <SectionHeader cor="coral" icon="💳" titulo="Simulação de Pagamento" subtitulo="Escolha um plano e um método de pagamento" />
        <Row className="g-4">
          <Col lg={5}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderTop: "6px solid #D85A30", borderRadius: 20 }}>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Plano</Form.Label>
                  <Form.Select value={plano} onChange={(e) => setPlano(e.target.value)} style={{ borderRadius: 10 }}>
                    <option value="">Selecione um plano</option>
                    <option value="Básico">Básico</option>
                    <option value="Premium">Premium</option>
                    <option value="Profissional">Profissional</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Método de pagamento</Form.Label>
                  <Form.Select value={metodo} onChange={(e) => setMetodo(e.target.value)} style={{ borderRadius: 10 }}>
                    <option value="">Selecione</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="PIX">PIX</option>
                    <option value="Boleto">Boleto</option>
                  </Form.Select>
                </Form.Group>
                <Button className="w-100 fw-bold" style={{ background: "#D85A30", border: "none", borderRadius: 10 }} onClick={addPagamento}>
                  + Realizar pagamento
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={7}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 20 }}>
              <Card.Body>
                <h5 className="fw-bold mb-3">Pagamentos realizados</h5>
                <Table striped hover responsive>
                  <thead><tr><th>Plano</th><th>Método</th><th>ID da transação</th></tr></thead>
                  <tbody>
                    {pagamentos.length === 0
                      ? <tr><td colSpan={3} className="text-center text-secondary py-3">Nenhum pagamento registrado.</td></tr>
                      : pagamentos.map((p) => <tr key={p.id}><td>{p.plano}</td><td>{p.metodo}</td><td><code>{p.idTransacao}</code></td></tr>)}
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
