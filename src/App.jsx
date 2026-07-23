// 1. IMPORTS
import "./App.css";
import { useState, useEffect, useRef } from "react";

// 2. CONFIGURAÇÃO
const WHATSAPP_NUMBER = "5544998380203";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Vim pelo site da Azusa Rec e gostaria de solicitar um orçamento."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
const INSTAGRAM_URL = `https://www.instagram.com/azusa.rec`;

// 3. IMAGENS
const IMG_HERO = "assets/images/Hero_pide.png";
const IMG_SOBRE = "assets/images/sobre.png";
const LOGO = "assets/images/azusa_Rec-logo.png";

// 4. PROJETOS
const PROJETOS = [
  { cat: "Exposição Agro", titulo: "Destaques Dia 09 - Expoínga", src: "assets/videos-expoinga/expoinga-dia-09.mp4" },
  { cat: "Exposição Agro", titulo: "Destaques Dia 08 - Expoínga", src: "assets/videos-expoinga/expoinga-dia-08.mp4" },
  { cat: "Exposição Agro", titulo: "Destaques Dia 05 - Expoínga", src: "assets/videos-expoinga/expoinga-dia-05.mp4" },
  { cat: "Exposição Agro", titulo: "Destaques Dia 03 - Expoínga", src: "assets/videos-expoinga/expoinga-dia-03.mp4" },
  { cat: "Exposição Agro", titulo: "Destaques Rodeio 02 - Expoínga", src: "assets/videos-expoinga/expoinga-rodeio-02.mp4" },
  { cat: "Exposição Agro", titulo: "Destaques Rodeio 01 - Expoínga", src: "assets/videos-expoinga/expoinga-rodeio-01.mp4" },
  { cat: "Exposição Agro", titulo: "Destaques Show 01 - Expoínga", src: "assets/videos-expoinga/expoinga-show-01.mp4" },
  { cat: "Exposição Agro", titulo: "Dia 02 - Expoínga", src: "assets/videos-expoinga/expoinga-dia-02.mp4" },
];

// 5. COMPONENTE — vídeo com lazy load via IntersectionObserver
function LazyVideo({ src, titulo }) {
  const cardRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "100px" } // começa a carregar um pouco antes de entrar na tela
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pf-card-vid" ref={cardRef}>
      <div className="pf-vid-wrapper">
        {erro ? (
          <div className="pf-vid-placeholder pf-vid-erro">
            <span className="pf-vid-icon">⚠</span>
            <span className="pf-vid-erro-txt">Vídeo indisponível</span>
          </div>
        ) : !loaded ? (
          <div className="pf-vid-placeholder">
            <span className="pf-vid-icon">▶</span>
          </div>
        ) : (
          <video
            src={src}
            controls
            muted
            preload="metadata"
            className="pf-vid-el"
            onError={() => setErro(true)}
          />
        )}
      </div>
      <p className="pf-ig-caption">{titulo}</p>
    </div>
  );
}

// 6. COMPONENTE PRINCIPAL
export default function AzusaRec() {
  const categorias = [...new Set(PROJETOS.map((p) => p.cat))];
  const [catAtiva, setCatAtiva] = useState(categorias[0]);
  const [menuAberto, setMenuAberto] = useState(false);

  const projetosFiltrados = PROJETOS.filter((p) => p.cat === catAtiva);
  const fecharMenu = () => setMenuAberto(false);
  const anoAtual = new Date().getFullYear(); // não fica desatualizado

  return (
    <div className="az-wrap">
      {/* NAV */}
      <nav className="az-nav">
        <div className="az-nav-inner">
          <a href="#inicio" className="az-logo" onClick={fecharMenu}>
            <img src={LOGO} alt="Azusa Rec" className="az-logo-img" />
          </a>

          <button
            className="az-nav-toggle"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <ul className={`az-nav-links ${menuAberto ? "open" : ""}`}>
            <li><a href="#inicio" onClick={fecharMenu}>INÍCIO</a></li>
            <li><a href="#sobre" onClick={fecharMenu}>SOBRE</a></li>
            <li><a href="#portfolio" onClick={fecharMenu}>PORTIFÓLIO</a></li>
            <li><a href="#contato" onClick={fecharMenu}>CONTATO</a></li>
          </ul>

          <div className="az-nav-icons">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram da Azusa Rec">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Enviar mensagem no WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="az-hero" id="inicio">
        <div className="az-hero-text">
          <h1 className="az-hero-title">Contando histórias com visão e propósito</h1>
          <p className="az-hero-sub">
            Produção audiovisual para marcas, eventos e projetos que desejam gerar impacto.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="az-btn">
            Entrar em contato
          </a>
        </div>
        <div className="az-hero-img">
          <div className="az-img-frame">
            <img src={IMG_HERO} alt="Produção audiovisual Azusa Rec" />
          </div>
        </div>
      </section>

      <div className="az-divider" />

      {/* SOBRE */}
      <section className="az-about" id="sobre">
        <div className="az-about-img">
          <img src={IMG_SOBRE} alt="Equipe Azusa Rec em ação" />
          <div className="az-star">✦</div>
        </div>
        <div className="az-about-text">
          <p className="az-about-eyebrow">SOBRE NÓS →</p>
          <h2 className="az-about-body">
            A Azusa Rec nasceu com o propósito de transformar ideias,
            momentos e mensagens em produções audiovisuais de qualidade.
          </h2>
          <p className="az-about-body2">
            Acreditamos que cada projeto possui uma história única,
            e nosso compromisso é capturá-la com excelência,{" "}
            <strong>criatividade e atenção aos detalhes.</strong>
          </p>
        </div>
      </section>

      <div className="az-divider" />

      {/* PORTFÓLIO */}
      <section className="az-port" id="portfolio">
        <div className="az-port-vids">
          <p className="pf-label">PORTFÓLIO</p>
          <div className="pf-cats">
            {categorias.map((cat) => (
              <button
                key={cat}
                className={`pf-cat ${cat === catAtiva ? "active" : ""}`}
                aria-pressed={cat === catAtiva}
                onClick={() => setCatAtiva(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="pf-grid pf-grid-vid">
            {projetosFiltrados.map((projeto) => (
              <LazyVideo key={projeto.src} src={projeto.src} titulo={projeto.titulo} />
            ))}
          </div>
        </div>
      </section>

      <div className="az-divider" />

      {/* CONTATO */}
      <section className="ct" id="contato">
        <div className="ct-top">
          <div>
            <p className="ct-label">CONTATO</p>
            <h2 className="ct-title">Vamos criar algo incrível juntos?</h2>
          </div>
          <p className="ct-sub">
            Entre em contato e transforme sua ideia em uma produção audiovisual de impacto.
          </p>
        </div>
        <div className="ct-body">
          <div className="ct-btns">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="ct-btn">
              <div className="ct-btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <div className="ct-btn-text">
                <p className="ct-btn-name">Chamar no WhatsApp</p>
                <p className="ct-btn-handle">+55 44 99838-0203</p>
              </div>
              <span className="ct-btn-arrow">→</span>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="ct-btn">
              <div className="ct-btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <div className="ct-btn-text">
                <p className="ct-btn-name">Ver no Instagram</p>
                <p className="ct-btn-handle">@azusa.rec</p>
              </div>
              <span className="ct-btn-arrow">→</span>
            </a>
          </div>
          <div className="ct-infos">
            <div className="ct-info">
              <p className="ct-info-label">Localização</p>
              <p className="ct-info-val">Paraná, Brasil</p>
            </div>
            <div className="ct-info">
              <p className="ct-info-label">Atendimento</p>
              <p className="ct-info-val">Marcas · Eventos · Projetos</p>
            </div>
            <div className="ct-info">
              <p className="ct-info-label">Resposta</p>
              <p className="ct-info-val">Em até 24 horas</p>
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="ft">
        <p className="ft-copy">© {anoAtual} Azusa Rec · Todos os direitos reservados</p>
        <p className="ft-stars">✦ ✦ ✦</p>
      </footer>
    </div>
  );
}