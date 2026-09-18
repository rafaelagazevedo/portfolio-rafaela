import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

import { FaReact, FaFigma, FaGithub, FaLinkedin, FaWhatsapp, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ──────────────────────────────────────────────
   Custom Cursor
   ────────────────────────────────────────────── */
const CustomCursor = () => {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorOutline = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (cursorDot.current) {
        cursorDot.current.style.left = `${clientX}px`;
        cursorDot.current.style.top = `${clientY}px`;
      }
      if (cursorOutline.current) {
        cursorOutline.current.animate(
          { left: `${clientX}px`, top: `${clientY}px` },
          { duration: 500, fill: "forwards" }
        );
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      <div ref={cursorDot} className="cursor-dot custom-cursor" />
      <div ref={cursorOutline} className="cursor-outline custom-cursor" />
    </>
  );
};

/* ──────────────────────────────────────────────
   Header
   ────────────────────────────────────────────── */
const Header = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector('.header');
      if (header) header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="header">
      <div className="container nav-container">
        <a href="#" className="logo" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1', alignItems: 'flex-start' }}>Rafaela<span style={{ fontSize: '1.1rem' }}>Geovana</span></a>
        <nav className="nav-right">
          <a href="#about" className="nav-link">{t('nav.about')}</a>
          <a href="#work" className="nav-link">{t('nav.projects')}</a>
          <a href="#contact" className="nav-link">{t('nav.contact')}</a>
          
          <select 
            className="lang-select" 
            value={i18n.language} 
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            style={{background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '4px', padding: '2px 4px', fontSize: '12px', fontFamily: 'var(--font-code)', outline: 'none', cursor: 'pointer', color: 'var(--ink-base)'}}
          >
            <option value="pt">PT</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>

        </nav>
      </div>
    </header>
  );
};

/* ──────────────────────────────────────────────
   Hero Section
   ────────────────────────────────────────────── */
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".stagger-elem", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2,
      });

      if (nameRef.current) {
        gsap.to(nameRef.current, {
          text: "RAFAELA GEOVANA",
          duration: 1.5,
          delay: 1,
          ease: "none",
        });
      }
      
      gsap.to(".cursor-blink", {
        opacity: 0,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        duration: 0.5,
      });

    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* Ambient Glows */}
      <div className="hero-ambient-top"></div>
      <div className="hero-ambient-side"></div>

      <div className="container hero-grid">
        <div className="hero-content">
          <div className="badge stagger-elem">{t('hero.badge')}</div>
          <h1 className="hero-title stagger-elem">
            <span className="highlight" ref={nameRef}></span><span className="cursor-blink">|</span><br />
            {t('hero.title')}
          </h1>
          <p className="hero-desc stagger-elem">
            {t('hero.desc')}
          </p>
          <div className="hero-actions stagger-elem">
            <a href="#work" className="btn btn-primary">{t('hero.cta')}</a>
            <div className="hero-social">
              <a href="https://github.com/rafaelagazevedo" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={22} /></a>
              <a href="https://www.linkedin.com/in/rafaela-geovana-monteiro-azevedo-53b99b437?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={22} /></a>
            </div>
          </div>
        </div>

        {/* Nova moldura editorial da foto */}
        <div className="hero-photo-col stagger-elem">
          <div className="hero-photo-glow">
            <div className="hero-photo-glow-circle"></div>
          </div>

          <div className="hero-spin-text">
            <svg viewBox="0 0 100 100" style={{fill: 'var(--theme-accent)'}}>
              <path id="textPathHero" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none"></path>
              <text fontSize="8.8" fontFamily="'JetBrains Mono'" letterSpacing="2px">
                <textPath href="#textPathHero">{t('hero.spinText')}</textPath>
              </text>
            </svg>
          </div>

          <div className="hero-photo-frame">
            <div className="hero-photo-border">
              <div className="hero-photo-inner">
                <img src="/rafa-hero.jpg" alt="Rafaela Geovana" />
                <div className="hero-photo-overlay"></div>
              </div>
            </div>



            <div className="hero-badge-location">
              <span style={{width: 6, height: 6, borderRadius: '50%', backgroundColor: 'rgba(139,92,246,1)', display: 'inline-block'}}></span>
              <span style={{fontFamily: 'var(--font-code)', fontSize: '11px', color: 'var(--ink-meta)'}}>São Luís, MA - Brasil</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────
   About Section (Engenharia e Design)
   ────────────────────────────────────────────── */
const About = () => {
  const codeContainerRef = useRef<HTMLElement>(null);
  const [key, setKey] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (!codeContainerRef.current) return;
    
    const codeTokens = [
      { text: "const ", type: "syn-keyword" },
      { text: "rafaela", type: "syn-var" },
      { text: " = {\n  ", type: "syn-punct" },
      { text: "role: ", type: "syn-key" },
      { text: "'Front-End'", type: "syn-string" },
      { text: ",\n  ", type: "syn-punct" },
      { text: "focus: ", type: "syn-key" },
      { text: "'UI/UX & Performance'", type: "syn-string" },
      { text: ",\n  ", type: "syn-punct" },
      { text: "skills: ", type: "syn-key" },
      { text: "[\n    ", type: "syn-punct" },
      { text: "'React'", type: "syn-string" },
      { text: ",\n    ", type: "syn-punct" },
      { text: "'Animations'", type: "syn-string" },
      { text: ",\n    ", type: "syn-punct" },
      { text: "'Design Systems'", type: "syn-string" },
      { text: "\n  ]", type: "syn-punct" },
      { text: "\n};", type: "syn-punct" }
    ];

    const codeContainer = codeContainerRef.current;
    let tokenIdx = 0;
    let charIdx = 0;
    let currentSpan: HTMLSpanElement | null = null;
    let typingTimeout: ReturnType<typeof setTimeout>;

    const typeNextCharacter = () => {
      if (tokenIdx >= codeTokens.length) {
        typingTimeout = setTimeout(() => {
          resetTyping();
          typeNextCharacter();
        }, 5000);
        return;
      }

      const currentToken = codeTokens[tokenIdx];

      if (charIdx === 0) {
        currentSpan = document.createElement("span");
        currentSpan.className = currentToken.type;
        codeContainer.appendChild(currentSpan);
      }

      const char = currentToken.text[charIdx];
      if (currentSpan) {
        currentSpan.textContent += char;
      }
      charIdx++;

      if (charIdx >= currentToken.text.length) {
        tokenIdx++;
        charIdx = 0;
      }

      let typingSpeed = 28 + Math.floor(Math.random() * 26);
      if (char === '\n') typingSpeed = 160;
      if (char === ',') typingSpeed = 90;

      typingTimeout = setTimeout(typeNextCharacter, typingSpeed);
    };

    const resetTyping = () => {
      clearTimeout(typingTimeout);
      codeContainer.innerHTML = "";
      tokenIdx = 0;
      charIdx = 0;
      currentSpan = null;
    };

    const startTyping = () => {
      resetTyping();
      typeNextCharacter();
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      codeTokens.forEach(token => {
        const span = document.createElement("span");
        span.className = token.type;
        span.textContent = token.text;
        codeContainer.appendChild(span);
      });
      const cursor = document.getElementById("typing-cursor");
      if (cursor) cursor.style.display = 'none';
    } else {
      startTyping();
    }

    return () => clearTimeout(typingTimeout);
  }, [key]);

  return (
    <section className="about" id="about">
      <div className="container about-new-grid">
        <div className="about-new-left">
          <h2 className="about-new-title">
            {t('about.title1')} <em>{t('about.title2')}</em>
          </h2>
          
          <p className="about-new-desc">
            {t('about.desc')}
          </p>
          
          <div className="badges-container">
            <div className="pill-badge badge-float-1">
              <FaHtml5 className="stack-icon" color="#E34F26" />
              <span className="text">HTML5</span>
            </div>
            <div className="pill-badge badge-float-2">
              <FaCss3Alt className="stack-icon" color="#1572B6" />
              <span className="text">CSS3</span>
            </div>
            <div className="pill-badge badge-float-3">
              <FaReact className="stack-icon" color="#61DAFB" />
              <span className="text">React</span>
            </div>
            <div className="pill-badge badge-float-4">
              <FaFigma className="stack-icon" color="#F24E1E" />
              <span className="text">Figma</span>
            </div>
          </div>
        </div>
        
        <div className="about-new-right">
          <div className="code-preview-card">
            <div className="mac-header">
              <div className="mac-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="mac-controls">
                <span className="filename">developer.ts</span>
                <button 
                  className="btn-restart-typing" 
                  onClick={() => setKey(k => k + 1)}
                  aria-label="Reiniciar animação"
                  title="Reiniciar animação"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="code-display">
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                <code ref={codeContainerRef}></code>
                <span className="typing-cursor" id="typing-cursor"></span>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────
   Project Modal
   ────────────────────────────────────────────── */
interface ProjectData {
  title: string;
  description: string;
  image: string | null;
  tags: { label: string; icon?: React.ReactNode }[];
  link: string | null;
}

const ProjectModal = ({ project, onClose }: { project: ProjectData | null; onClose: () => void }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <button className="project-modal-close" onClick={onClose} aria-label="Fechar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        {project.image && (
          <div className="project-modal-image">
            <img src={project.image} alt={project.title} />
          </div>
        )}

        <div className="project-modal-body">
          {project.tags.length > 0 && (
            <div className="project-modal-tags">
              {project.tags.map((tag, i) => (
                <div className="pill-tag" key={i}>{tag.icon}{tag.icon && <span>{tag.label}</span>}{!tag.icon && <span>{tag.label}</span>}</div>
              ))}
            </div>
          )}

          <h2 className="project-modal-title">{project.title}</h2>
          <p className="project-modal-desc">{project.description}</p>

          {project.link && (
            <button
              className="project-modal-link"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open(project.link!, '_blank', 'noopener,noreferrer');
              }}
            >
              {t('work.explore')} <span className="arrow">↗</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Work Section (Projetos em Destaque)
   ────────────────────────────────────────────── */
const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const animationID = useRef(0);
  const dragMoved = useRef(false);
  
  const slidesCount = 3;

  const featuredProjects: ProjectData[] = [
    {
      title: 'Jogo do Número Secreto',
      description: 'O Jogo do Número Secreto é uma aplicação web interativa desenvolvida com o objetivo de criar uma experiência simples e divertida para o usuário. No jogo, o sistema escolhe um número secreto e o jogador deve tentar descobrir qual é esse número por meio de seus palpites.\n\nA cada tentativa, o usuário pode inserir um número e clicar no botão "Chutar" para verificar seu palpite. O jogo fornece feedback para ajudar o jogador a entender se deve tentar um número maior ou menor, tornando a experiência mais dinâmica e intuitiva.\n\nA aplicação também possui a opção "Novo jogo", permitindo iniciar uma nova rodada e gerar um novo desafio.\n\nEsse projeto foi desenvolvido como uma forma prática de aplicar conceitos de programação, lógica de programação, interação com o usuário e desenvolvimento web, além de trabalhar com elementos de interface e manipulação dos dados inseridos pelo jogador.',
      image: '/jogo-secreto.png',
      tags: [
        { label: 'HTML/CSS', icon: <FaHtml5 color="#E34F26" size={14}/> },
        { label: 'JavaScript', icon: <FaJs color="#F7DF1E" size={14}/> }
      ],
      link: 'https://jogo-numero-secreto-one.vercel.app/'
    },
    {
      title: 'Portfólio de Desenvolvedora Front-end',
      description: 'Este projeto consiste no desenvolvimento de um portfólio pessoal, criado para apresentar minhas habilidades, conhecimentos e atuação na área de desenvolvimento Front-end.\n\nA página possui uma apresentação inicial, uma seção "Sobre mim" e links para minhas redes profissionais, proporcionando aos visitantes uma visão geral sobre meu perfil e meu trabalho como desenvolvedora.\n\nDurante o desenvolvimento, foram trabalhados conceitos importantes de HTML, CSS e JavaScript, além de aspectos relacionados à criação de interfaces modernas, organização de páginas, estruturação de conteúdo e experiência do usuário.\n\nO objetivo principal do projeto é criar uma presença profissional na internet, demonstrando meus conhecimentos em desenvolvimento web e servindo como espaço para apresentar meus projetos e minha evolução como desenvolvedora.',
      image: '/figma-joana.png',
      tags: [
        { label: 'HTML/CSS', icon: <FaHtml5 color="#E34F26" size={14}/> },
        { label: 'JavaScript', icon: <FaJs color="#F7DF1E" size={14}/> }
      ],
      link: 'https://projeto-figma-ten-lemon.vercel.app/'
    },
    {
      title: 'Sistema PDV Bravos Suplementos',
      description: 'Sistema de Ponto de Venda (PDV) desenvolvido para a Bravos Suplementos, com foco total na experiência do usuário e interface (Front-end). A aplicação apresenta um design system customizado, respeitando rigorosamente a identidade visual da marca com suas cores características (laranja e cinza).\n\nA interface inclui recursos visuais avançados como:\n- Carrinho de compras interativo com ajuste de quantidades.\n- Painel lateral de atalhos rápidos (F1-F6) para os produtos mais vendidos.\n- Indicadores visuais de status e layout responsivo focado em monitores touchscreen e tablets para agilizar o atendimento no caixa.\n\nO Front-end foi construído para garantir performance extrema e fluidez, proporcionando uma experiência premium tanto para o operador do caixa quanto para os clientes da loja.',
      image: '/bravos-pdv-v2.png',
      tags: [
        { label: 'HTML/CSS', icon: <FaHtml5 color="#E34F26" size={14}/> },
        { label: 'React', icon: <FaReact color="#00D8FE" size={14}/> }
      ],
      link: null
    }
  ];

  const updateCarousel = (instant = false) => {
    if (!trackRef.current || !wrapperRef.current) return;
    const slides = Array.from(trackRef.current.children) as HTMLElement[];
    if (!slides[0]) return;
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    const wrapperWidth = wrapperRef.current.offsetWidth;
    const targetOffset = (wrapperWidth / 2) - (slideWidth / 2) - (currentIndex * slideWidth);
    
    currentTranslate.current = targetOffset;
    prevTranslate.current = targetOffset;

    if (instant) {
      trackRef.current.style.transition = 'none';
    } else {
      trackRef.current.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    trackRef.current.style.transform = `translateX(${targetOffset}px)`;
  };

  const goToSlide = (index: number) => {
    if (index < 0) index = 0;
    if (index >= slidesCount) index = slidesCount - 1;
    setCurrentIndex(index);
  };

  useEffect(() => {
    updateCarousel();
  }, [currentIndex]);

  useEffect(() => {
    const handleResize = () => updateCarousel(true);
    window.addEventListener('resize', handleResize);
    setTimeout(() => updateCarousel(true), 100);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPositionX = (event: MouseEvent | TouchEvent) => {
    return event.type.includes('mouse') ? (event as MouseEvent).pageX : (event as TouchEvent).touches[0].clientX;
  };

  const animation = () => {
    if (isDragging.current && trackRef.current) {
      trackRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
      animationID.current = requestAnimationFrame(animation);
    }
  };

  const touchStart = (event: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = getPositionX(event.nativeEvent);
    if (trackRef.current) trackRef.current.style.transition = 'none';
    animationID.current = requestAnimationFrame(animation);
  };

  const touchMove = (event: MouseEvent | TouchEvent) => {
    if (isDragging.current) {
      const currentPosition = getPositionX(event);
      const diff = currentPosition - startX.current;
      if (Math.abs(diff) > 5) dragMoved.current = true;
      currentTranslate.current = prevTranslate.current + diff;
    }
  };

  const touchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    cancelAnimationFrame(animationID.current);
    const movedBy = currentTranslate.current - prevTranslate.current;
    
    if (movedBy < -55 && currentIndex < slidesCount - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (movedBy > 55 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      updateCarousel();
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', touchEnd);
    window.addEventListener('mousemove', touchMove);
    window.addEventListener('touchend', touchEnd);
    window.addEventListener('touchmove', touchMove as any, { passive: true });
    return () => {
      window.removeEventListener('mouseup', touchEnd);
      window.removeEventListener('mousemove', touchMove);
      window.removeEventListener('touchend', touchEnd);
      window.removeEventListener('touchmove', touchMove as any);
    };
  });

  return (
    <>
    <section className="work-new" id="work">
      <div className="ambient-orb orb-1 animate-pulse-slow"></div>
      <div className="ambient-orb orb-2 animate-pulse-slow"></div>
      <div className="ambient-orb orb-3 animate-pulse-slow"></div>
      
      <div className="container" style={{maxWidth: '1024px', marginBottom: '2.5rem'}}>
        <h2 className="about-new-title" style={{marginBottom: '0.875rem'}}>
          {t('work.title1')} <em>{t('work.title2')}</em>
        </h2>
        <p className="about-new-desc">
          {t('work.desc')}
        </p>
      </div>

      <div className="carousel-stage" id="carouselWrapper" ref={wrapperRef}>
        <div style={{ position: 'absolute', inset: 0, margin: '0 auto', maxWidth: '1024px', pointerEvents: 'none', zIndex: 20 }}>
          <button 
            className="nav-btn" 
            onClick={() => goToSlide(currentIndex - 1)} 
            disabled={currentIndex === 0}
            aria-label="Anterior"
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', padding: '0.875rem', borderRadius: '50%', pointerEvents: 'auto', backgroundColor: '#ffffff', boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button 
            className="nav-btn" 
            onClick={() => goToSlide(currentIndex + 1)} 
            disabled={currentIndex === slidesCount - 1}
            aria-label="Próximo"
            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', padding: '0.875rem', borderRadius: '50%', pointerEvents: 'auto', backgroundColor: '#ffffff', boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
        <div 
          className="carousel-track" 
          ref={trackRef}
          onMouseDown={touchStart}
          onTouchStart={touchStart}
        >
          {/* Slide 1 */}
          <article className={`carousel-slide ${currentIndex === 0 ? 'is-active' : 'is-inactive'}`} onClick={() => { if(dragMoved.current) return; if(currentIndex !== 0) { goToSlide(0); } else { setSelectedProject(featuredProjects[0]); } }}>
            <div className="glass-panel">
              <div className="proj-preview">
                <img src="/jogo-secreto.png" alt="Jogo do Número Secreto" loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                <div className="proj-counter">01 / 03</div>
              </div>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px'}}>
                <div className="pill-tag"><FaHtml5 color="#E34F26" size={14}/><span>HTML/CSS</span></div>
                <div className="pill-tag"><FaJs color="#F7DF1E" size={14}/><span>JavaScript</span></div>
              </div>
              <h3 className="proj-title">Jogo do Número Secreto</h3>
              <p className="proj-desc">O Jogo do Número Secreto é uma aplicação web interativa e divertida. O sistema escolhe um número e o jogador deve descobrir qual é por meio de palpites, recebendo feedback dinâmico a cada tentativa.</p>
              <div style={{marginTop: 'auto', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(231,229,228,0.8)'}}>
                <button className="link-explore" onClick={(e) => { e.stopPropagation(); window.open('https://jogo-numero-secreto-one.vercel.app/', '_blank', 'noopener,noreferrer'); }}>{t('work.explore')} <span className="arrow">↗</span></button>
              </div>
            </div>
          </article>

          {/* Slide 2 */}
          <article className={`carousel-slide ${currentIndex === 1 ? 'is-active' : 'is-inactive'}`} onClick={() => { if(dragMoved.current) return; if(currentIndex !== 1) { goToSlide(1); } else { setSelectedProject(featuredProjects[1]); } }}>
            <div className="glass-panel">
              <div className="proj-preview">
                <img src="/figma-joana.png" alt="Projeto Figma Joana Santos" loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                <div className="proj-counter">02 / 03</div>
              </div>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px'}}>
                <div className="pill-tag"><FaHtml5 color="#E34F26" size={14}/><span>HTML/CSS</span></div>
                <div className="pill-tag"><FaJs color="#F7DF1E" size={14}/><span>JavaScript</span></div>
              </div>
              <h3 className="proj-title">Portfólio de Desenvolvedora Front-end</h3>
              <p className="proj-desc">Portfólio pessoal criado para apresentar habilidades e atuação em desenvolvimento Front-end. Desenvolvido com foco em interfaces modernas, estruturação de conteúdo e excelente experiência do usuário.</p>
              <div style={{marginTop: 'auto', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(231,229,228,0.8)'}}>
                <button className="link-explore" onClick={(e) => { e.stopPropagation(); window.open('https://projeto-figma-ten-lemon.vercel.app/', '_blank', 'noopener,noreferrer'); }}>{t('work.explore')} <span className="arrow">↗</span></button>
              </div>
            </div>
          </article>

          {/* Slide 3 */}
          <article className={`carousel-slide ${currentIndex === 2 ? 'is-active' : 'is-inactive'}`} onClick={() => { if(dragMoved.current) return; if(currentIndex !== 2) { goToSlide(2); } else { setSelectedProject(featuredProjects[2]); } }}>
            <div className="glass-panel">
              <div className="proj-preview">
                <img src="/bravos-pdv-v2.png" alt="Sistema PDV Bravos Suplementos" loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                <div className="proj-counter">03 / 03</div>
              </div>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px'}}>
                <div className="pill-tag"><FaHtml5 color="#E34F26" size={14}/><span>HTML/CSS</span></div>
                <div className="pill-tag"><FaReact color="#00D8FE" size={14}/><span>React</span></div>
              </div>
              <h3 className="proj-title">Sistema PDV Bravos Suplementos</h3>
              <p className="proj-desc">Design e desenvolvimento Front-end de um Sistema PDV focado em usabilidade, performance e agilidade no atendimento.</p>
              <div style={{marginTop: 'auto', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(231,229,228,0.8)'}}>
                <span className="link-explore">{t('work.explore')} <span className="arrow">↗</span></span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="container" style={{maxWidth: '1024px'}}>
        <div className="carousel-controls" style={{justifyContent: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <span style={{fontFamily: 'var(--font-code)', fontSize: '12px', color: '#581c87', fontWeight: 600, letterSpacing: '0.05em'}}>0{currentIndex + 1}</span>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '8px 14px', borderRadius: '9999px', border: '1px solid #e7e5e4', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', backdropFilter: 'blur(12px)'}}>
              {Array.from({length: slidesCount}).map((_, idx) => (
                <button 
                  key={idx} 
                  className={`indicator-dot ${currentIndex === idx ? 'active' : ''}`} 
                  onClick={() => goToSlide(idx)}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>
            <span style={{fontFamily: 'var(--font-code)', fontSize: '12px', color: '#a8a29e', fontWeight: 500}}>03</span>
          </div>
        </div>
      </div>
    </section>
    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
};

/* ──────────────────────────────────────────────
   Personal Projects Section
   ────────────────────────────────────────────── */
const PersonalProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const animationID = useRef(0);
  const dragMoved = useRef(false);
  
  const slidesCount = 3;

  const personalProjectsData: ProjectData[] = [
    {
      title: 'São João da Rafa',
      description: 'O São João da Rafa é um projeto idealizado e realizado por Rafaela Geovana, figura atuante e reconhecida no universo da cultura maranhense, especialmente na dança e nas manifestações relacionadas ao Bumba Meu Boi. Rafaela carrega uma trajetória ligada à cultura popular do Maranhão e atua como Índia Guerreira do Boi de Nina Rodrigues, experiência que está diretamente relacionada à criação e à identidade do projeto.\n\nO São João da Rafa nasceu com o propósito de valorizar, preservar e divulgar a cultura maranhense, utilizando principalmente as redes sociais e os vídeos curtos como ferramentas para contar histórias, apresentar manifestações culturais e aproximar o público das tradições que fazem parte do nosso São João.\n\nO projeto teve início em 2025, a princípio com o objetivo de contar a história do Boi de Nina Rodrigues, que naquele ano completava 35 anos de trajetória. Através de uma série de vídeos curtos, o São João da Rafa trouxe, de forma documental e acessível, um pouco da história, da memória e da importância do Boi de Nina Rodrigues para a cultura maranhense. A experiência despertou o desejo de ir além de uma única manifestação cultural.\n\nAssim, o projeto ganhou continuidade e passou a abordar diferentes elementos que compõem a rica diversidade da cultura do Maranhão, dando espaço para outros ritmos, danças e tradições que fazem parte da identidade cultural do nosso estado. Em 2026, o São João da Rafa ampliou essa proposta e apresentou outros ritmos e manifestações da cultura maranhense, entre eles a Dança Portuguesa e o Cacuriá, buscando mostrar ao público a diversidade e a riqueza das expressões culturales presentes no nosso São João.\n\nMais do que apresentar manifestações culturais, o São João da Rafa busca registrar histórias, valorizar personagens, grupos e tradições e contribuir para que esse patrimônio cultural continue sendo conhecido e reconhecido pelas novas gerações. Para os próximos anos, o projeto também tem como objetivo crescer e ultrapassar as fronteiras do meio virtual. A intenção é, futuramente, transformar o São João da Rafa também em uma experiência presencial, por meio da realização de algum formato de evento ou ação física que possa aproximar ainda mais o público da cultura maranhense.\n\nO São João da Rafa pretende, assim, continuar sua caminhada pelos próximos anos, conhecendo e contando histórias de outros sotaques, ritmos, danças e manifestações do São João maranhense, construindo, a cada edição, um registro da nossa cultura e das pessoas que mantêm essas tradições vivas.\n\nSão João da Rafa: contando histórias, valorizando a cultura e mantendo viva a tradição maranhense.',
      image: '/sao-joao.jpg',
      tags: [],
      link: null
    },
    {
      title: 'Modelo',
      description: 'Mídia Kit profissional criado para apresentação de portfólio como modelo e influenciadora digital.\n\nJá realizei trabalhos com diversas marcas e lojas maranhenses, principalmente nos segmentos de beleza, moda e vida fitness. Nas redes sociais, meu trabalho é mostrar o uso de roupas, acessórios e produtos de forma leve, autêntica e conectada com o meu dia a dia. Sempre valorizando minha identidade e a cultura que carrego.',
      image: '/midia-kit.jpg',
      tags: [],
      link: 'https://drive.google.com/file/d/1aKzylFhPvHXv95ZDtPagysY__rH6pLnQ/view?usp=drivesdk'
    },
    {
      title: 'Influencer Digital',
      description: 'Perfil profissional no Instagram como criadora de conteúdo e influenciadora digital, com mais de 23 mil seguidores e 812 mil visualizações nos últimos 30 dias.\n\nO conteúdo abrange moda, lifestyle, dança e cultura popular, com destaque para a participação como bailarina do @boideninaoficial. O perfil conta com engajamento autêntico e crescente, incluindo reels com dezenas de milhares de visualizações e uma comunidade ativa e engajada.\n\nA marca pessoal Rafaela Geovana é construída com foco em autenticidade, representatividade e conexão com o público, gerando oportunidades de parcerias com marcas do setor de beleza, moda e entretenimento.',
      image: '/influencer-digital.png',
      tags: [],
      link: 'https://www.instagram.com/rafaelag_azevedo'
    }
  ];

  const updateCarousel = (instant = false) => {
    if (!trackRef.current || !wrapperRef.current) return;
    const slides = Array.from(trackRef.current.children) as HTMLElement[];
    if (!slides[0]) return;
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    const wrapperWidth = wrapperRef.current.offsetWidth;
    const targetOffset = (wrapperWidth / 2) - (slideWidth / 2) - (currentIndex * slideWidth);
    
    currentTranslate.current = targetOffset;
    prevTranslate.current = targetOffset;

    if (instant) {
      trackRef.current.style.transition = 'none';
    } else {
      trackRef.current.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    trackRef.current.style.transform = `translateX(${targetOffset}px)`;
  };

  const goToSlide = (index: number) => {
    if (index < 0) index = 0;
    if (index >= slidesCount) index = slidesCount - 1;
    setCurrentIndex(index);
  };

  useEffect(() => {
    updateCarousel();
  }, [currentIndex]);

  useEffect(() => {
    const handleResize = () => updateCarousel(true);
    window.addEventListener('resize', handleResize);
    setTimeout(() => updateCarousel(true), 100);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPositionX = (event: MouseEvent | TouchEvent) => {
    return event.type.includes('mouse') ? (event as MouseEvent).pageX : (event as TouchEvent).touches[0].clientX;
  };

  const animation = () => {
    if (isDragging.current && trackRef.current) {
      trackRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
      animationID.current = requestAnimationFrame(animation);
    }
  };

  const touchStart = (event: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = getPositionX(event.nativeEvent);
    if (trackRef.current) trackRef.current.style.transition = 'none';
    animationID.current = requestAnimationFrame(animation);
  };

  const touchMove = (event: MouseEvent | TouchEvent) => {
    if (isDragging.current) {
      const currentPosition = getPositionX(event);
      const diff = currentPosition - startX.current;
      if (Math.abs(diff) > 5) dragMoved.current = true;
      currentTranslate.current = prevTranslate.current + diff;
    }
  };

  const touchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    cancelAnimationFrame(animationID.current);
    const movedBy = currentTranslate.current - prevTranslate.current;
    
    if (movedBy < -55 && currentIndex < slidesCount - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (movedBy > 55 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      updateCarousel();
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', touchEnd);
    window.addEventListener('mousemove', touchMove);
    window.addEventListener('touchend', touchEnd);
    window.addEventListener('touchmove', touchMove as any, { passive: true });
    return () => {
      window.removeEventListener('mouseup', touchEnd);
      window.removeEventListener('mousemove', touchMove);
      window.removeEventListener('touchend', touchEnd);
      window.removeEventListener('touchmove', touchMove as any);
    };
  });

  return (
    <>
    <section className="work-new" id="personal-projects" style={{paddingTop: '2rem'}}>
      <div className="ambient-orb orb-1 animate-pulse-slow"></div>
      <div className="ambient-orb orb-2 animate-pulse-slow"></div>
      <div className="ambient-orb orb-3 animate-pulse-slow"></div>
      <div className="container" style={{maxWidth: '1024px', marginBottom: '2.5rem'}}>
        <h2 className="about-new-title" style={{marginBottom: '0.875rem'}}>
          {t('personalProjects.title1')} <em>{t('personalProjects.title2')}</em>
        </h2>
        <p className="about-new-desc">
          {t('personalProjects.desc')}
        </p>
      </div>

      <div className="carousel-stage" id="carouselWrapper-personal" ref={wrapperRef}>
        <div style={{ position: 'absolute', inset: 0, margin: '0 auto', maxWidth: '1024px', pointerEvents: 'none', zIndex: 20 }}>
          <button 
            className="nav-btn" 
            onClick={() => goToSlide(currentIndex - 1)} 
            disabled={currentIndex === 0}
            aria-label="Anterior"
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', padding: '0.875rem', borderRadius: '50%', pointerEvents: 'auto', backgroundColor: '#ffffff', boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button 
            className="nav-btn" 
            onClick={() => goToSlide(currentIndex + 1)} 
            disabled={currentIndex === slidesCount - 1}
            aria-label="Próximo"
            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', padding: '0.875rem', borderRadius: '50%', pointerEvents: 'auto', backgroundColor: '#ffffff', boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
        <div 
          className="carousel-track" 
          ref={trackRef}
          onMouseDown={touchStart}
          onTouchStart={touchStart}
        >
          {/* Slide 1 */}
          <article className={`carousel-slide ${currentIndex === 0 ? 'is-active' : 'is-inactive'}`} onClick={() => { if(dragMoved.current) return; if(currentIndex !== 0) { goToSlide(0); } else { setSelectedProject(personalProjectsData[0]); } }}>
            <div className="glass-panel">
              <div className="proj-preview">
                <img src="/sao-joao.jpg" alt="São João da Rafa" loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                <div className="proj-counter">01 / 03</div>
              </div>
              <h3 className="proj-title" style={{marginTop: '16px'}}>São João da Rafa</h3>
              <p className="proj-desc">Projeto cultural que valoriza e divulga as tradições do São João maranhense através de vídeos curtos e registro documental do Bumba Meu Boi, Cacuriá e Dança Portuguesa.</p>
              <div style={{marginTop: 'auto', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(231,229,228,0.8)'}}>
                <span className="link-explore">{t('work.explore')} <span className="arrow">↗</span></span>
              </div>
            </div>
          </article>

          {/* Slide 2 */}
          <article className={`carousel-slide ${currentIndex === 1 ? 'is-active' : 'is-inactive'}`} onClick={() => { if(dragMoved.current) return; if(currentIndex !== 1) { goToSlide(1); } else { setSelectedProject(personalProjectsData[1]); } }}>
            <div className="glass-panel">
              <div className="proj-preview">
                <img src="/midia-kit.jpg" alt="Mídia Kit Rafaela Geovana" loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                <div className="proj-counter">02 / 03</div>
              </div>
              <h3 className="proj-title" style={{marginTop: '16px'}}>Modelo</h3>
              <p className="proj-desc">Apresentação de portfólio de moda, lifestyle e métricas de audiência para parcerias comerciais.</p>
              <div style={{marginTop: 'auto', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(231,229,228,0.8)'}}>
                <button className="link-explore" onClick={(e) => { e.stopPropagation(); window.open('https://drive.google.com/file/d/1aKzylFhPvHXv95ZDtPagysY__rH6pLnQ/view?usp=drivesdk', '_blank', 'noopener,noreferrer'); }}>{t('work.explore')} <span className="arrow">↗</span></button>
              </div>
            </div>
          </article>

          {/* Slide 3 */}
          <article className={`carousel-slide ${currentIndex === 2 ? 'is-active' : 'is-inactive'}`} onClick={() => { if(dragMoved.current) return; if(currentIndex !== 2) { goToSlide(2); } else { setSelectedProject(personalProjectsData[2]); } }}>
            <div className="glass-panel">
              <div className="proj-preview">
                <img src="/influencer-digital.png" alt="Influencer Digital - Rafaela Geovana" loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                <div className="proj-counter">03 / 03</div>
              </div>
              <h3 className="proj-title" style={{marginTop: '16px'}}>Influencer Digital</h3>
              <p className="proj-desc">Perfil profissional no Instagram com +23 mil seguidores e 812 mil visualizações mensais em conteúdo de moda, lifestyle e dança.</p>
              <div style={{marginTop: 'auto', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(231,229,228,0.8)'}}>
                <button className="link-explore" onClick={(e) => { e.stopPropagation(); window.open('https://www.instagram.com/rafaelag_azevedo', '_blank', 'noopener,noreferrer'); }}>{t('work.explore')} <span className="arrow">↗</span></button>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="container" style={{maxWidth: '1024px'}}>
        <div className="carousel-controls" style={{justifyContent: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <span style={{fontFamily: 'var(--font-code)', fontSize: '12px', color: '#581c87', fontWeight: 600, letterSpacing: '0.05em'}}>0{currentIndex + 1}</span>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '8px 14px', borderRadius: '9999px', border: '1px solid #e7e5e4', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', backdropFilter: 'blur(12px)'}}>
              {Array.from({length: slidesCount}).map((_, idx) => (
                <button 
                  key={idx} 
                  className={`indicator-dot ${currentIndex === idx ? 'active' : ''}`} 
                  onClick={() => goToSlide(idx)}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>
            <span style={{fontFamily: 'var(--font-code)', fontSize: '12px', color: '#a8a29e', fontWeight: 500}}>03</span>
          </div>
        </div>
      </div>
    </section>
    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
};

/* ──────────────────────────────────────────────
   Contact Section
   ────────────────────────────────────────────── */
const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!contactRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-anim", {
        scrollTrigger: { trigger: contactRef.current!, start: "top 80%" },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
      });
    }, contactRef);
    return () => ctx.revert();
  }, []);

  const contacts = [
    { name: 'Email', icon: <MdEmail size={24} />, link: 'mailto:rafaelageovanam@gmail.com' },
    { name: 'LinkedIn', icon: <FaLinkedin size={24} />, link: 'https://www.linkedin.com/in/rafaela-geovana-monteiro-azevedo-53b99b437?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
    { name: 'WhatsApp', icon: <FaWhatsapp size={24} />, link: 'https://wa.me/5598999811072' },
    { name: 'GitHub', icon: <FaGithub size={24} />, link: 'https://github.com/rafaelagazevedo' }
  ];

  return (
    <section className="contact" id="contact" ref={contactRef}>
      <div className="container">
        <div className="section-header contact-anim">
          <h2 className="section-title">{t('contact.title1')} <span>{t('contact.title2')}</span></h2>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </div>
        <div className="contact-grid">
          {contacts.map((contact, i) => (
             <a key={i} href={contact.link} target="_blank" rel="noreferrer" className="contact-card contact-anim">
                <div className="contact-icon">{contact.icon}</div>
                <span className="contact-name">{contact.name}</span>
             </a>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────
   Footer
   ────────────────────────────────────────────── */
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <span className="logo" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1', fontSize: '1.2rem', alignItems: 'flex-start' }}>Rafaela<span style={{ fontSize: '1rem' }}>Geovana</span></span>
        </div>
        <div className="footer-links">
          <p>{t('footer.copy')}</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <PersonalProjects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
