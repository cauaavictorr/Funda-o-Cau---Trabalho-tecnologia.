import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar style={{ backgroundColor: "#6E56CF" }} expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <span style={{ fontSize: "1.6rem", fontWeight: 600 }}>Fundação Cauã Victor</span>
          <br />
          <small style={{ fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.75)" }}>
            Plataforma de Cursos Online
          </small>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Início</Nav.Link>
            <Nav.Link as={NavLink} to="/cursos">Cursos</Nav.Link>
            <Nav.Link as={NavLink} to="/matriculas">Matrículas</Nav.Link>
            <Nav.Link as={NavLink} to="/pagamentos">Planos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
