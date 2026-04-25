import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vitrine Jovens Empreendedores Sicredi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #00965E 0%, #005A39 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: 4, opacity: 0.8, marginBottom: 20 }}>
          SUMMIT JOVEM SICREDI 2026
        </div>
        <div style={{ fontSize: 60, fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>
          Vitrine dos Jovens Empreendedores
        </div>
        <div style={{ fontSize: 28, marginTop: 24, opacity: 0.85, textAlign: "center" }}>
          Conheça, conecte-se e faça negócios dentro da rede cooperativa.
        </div>
        <div
          style={{
            marginTop: 40,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 50,
            padding: "10px 32px",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          Explorar agora
        </div>
      </div>
    ),
    { ...size }
  );
}
