import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// USUÁRIOS
export const getUsuarios = () => api.get("/usuarios");
export const createUsuario = (data) => api.post("/usuarios", data);

// CATEGORIAS
export const getCategorias = () => api.get("/categorias");
export const createCategoria = (data) => api.post("/categorias", data);

// CURSOS
export const getCursos = () => api.get("/cursos");
export const createCurso = (data) => api.post("/cursos", data);

// MÓDULOS
export const getModulos = () => api.get("/modulos");
export const createModulo = (data) => api.post("/modulos", data);

// AULAS
export const getAulas = () => api.get("/aulas");
export const createAula = (data) => api.post("/aulas", data);

// MATRÍCULAS
export const getMatriculas = () => api.get("/matriculas");
export const createMatricula = (data) => api.post("/matriculas", data);

// PROGRESSOS
export const getProgressos = () => api.get("/progressos");
export const createProgresso = (data) => api.post("/progressos", data);

// CERTIFICADOS
export const getCertificados = () => api.get("/certificados");
export const createCertificado = (data) => api.post("/certificados", data);

// PAGAMENTOS
export const getPagamentos = () => api.get("/pagamentos");
export const createPagamento = (data) => api.post("/pagamentos", data);
