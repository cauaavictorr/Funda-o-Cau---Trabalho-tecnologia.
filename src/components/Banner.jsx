export default function Banner({ titulo, subtitulo }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #6E56CF 0%, #8E78E0 100%)",
        borderRadius: 20,
        padding: "2rem 1.75rem",
        color: "#fff",
        marginTop: "1.5rem",
        marginBottom: "2.5rem",
      }}
    >
      <h1 style={{ fontSize: "1.8rem", fontWeight: 600, marginBottom: "0.4rem" }}>{titulo}</h1>
      <p style={{ color: "rgba(255,255,255,0.9)", marginBottom: 0 }}>{subtitulo}</p>
    </div>
  );
}
