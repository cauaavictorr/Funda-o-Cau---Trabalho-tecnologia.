const cores = {
  roxo:  { bg: "#EFEAFB", color: "#6E56CF" },
  coral: { bg: "#FAECE7", color: "#D85A30" },
  teal:  { bg: "#E1F5EE", color: "#0F6E56" },
  azul:  { bg: "#E6F1FB", color: "#185FA5" },
  rosa:  { bg: "#FBEAF0", color: "#993556" },
  ambar: { bg: "#FAEEDA", color: "#854F0B" },
};

export default function SectionHeader({ cor, icon, titulo, subtitulo }) {
  const c = cores[cor] || cores.roxo;
  return (
    <div className="d-flex align-items-center gap-3 mb-4">
      <div
        style={{
          width: 52, height: 52, borderRadius: 16,
          background: c.bg, color: c.color,
          display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "1.4rem", flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0 }}>{titulo}</h2>
        <p style={{ fontSize: "0.875rem", color: "#8B8694", margin: 0 }}>{subtitulo}</p>
      </div>
    </div>
  );
}
