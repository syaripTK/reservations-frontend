import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import './LandingPig.css';
import { useNavigate } from 'react-router-dom';
import { notyfError } from '../../utils/notyf';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const ASSETS = [
  {
    icon: '',
    name: 'Kendaraan Dinas',
    count: 12,
    tag: 'FLEET',
    color: '#f0e040',
  },
  {
    icon: '',
    name: 'Ruang Meeting',
    count: 8,
    tag: 'SPACE',
    color: '#4ade80',
  },
  {
    icon: '',
    name: 'Laptop & Device',
    count: 34,
    tag: 'TECH',
    color: '#60a5fa',
  },
  {
    icon: '',
    name: 'Peralatan Foto',
    count: 6,
    tag: 'MEDIA',
    color: '#e63030',
  },
  {
    icon: '',
    name: 'Alat Teknik',
    count: 20,
    tag: 'TOOLS',
    color: '#f0e040',
  },
  { icon: '', name: 'AV Equipment', count: 9, tag: 'AV', color: '#4ade80' },
];

const STEPS = [
  {
    num: '01',
    title: 'Pilih Aset',
    desc: 'Telusuri katalog aset yang tersedia secara real-time.',
  },
  {
    num: '02',
    title: 'Atur Jadwal',
    desc: 'Kalender interaktif dengan deteksi konflik otomatis.',
  },
  {
    num: '03',
    title: 'Ajukan Request',
    desc: 'Satu klik, request langsung masuk ke approval queue.',
  },
  {
    num: '04',
    title: 'Gunakan & Return',
    desc: 'QR code otomatis. Scan masuk, scan keluar. Done.',
  },
];

const STATS = [
  { value: '2,400+', label: 'Transaksi / Bulan' },
  { value: '98%', label: 'Approval Rate' },
  { value: '< 2min', label: 'Waktu Reservasi' },
  { value: '0', label: 'Konflik Jadwal' },
];

const TICKER_ITEMS = [
  'RESERVASI ASET',
  'REAL-TIME',
  'MANAJEMEN TERPADU',
  'AUDIT TRAIL',
  'NOTIFIKASI INSTAN',
  'ZERO KONFLIK',
  'APPROVAL CEPAT',
  'QR ACCESS',
  'INDUSTRIAL GRADE',
];

function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0 });
    };

    const onEnter = () =>
      gsap.to(ring.current, { scale: 2.2, opacity: 0.5, duration: 0.3 });
    const onLeave = () =>
      gsap.to(ring.current, { scale: 1, opacity: 1, duration: 0.3 });

    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
      gsap.set(ring.current, { x: pos.current.x, y: pos.current.y });
    };

    gsap.ticker.add(tick);
    window.addEventListener('mousemove', onMove);

    document.querySelectorAll('a, button, .lp-asset-card').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <div className="lp-cursor-dot" ref={dot} />
      <div className="lp-cursor-ring" ref={ring} />
    </>
  );
}

function MagButton({ children, className, onClick }) {
  const ref = useRef(null);
  const inner = useRef(null);

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    gsap.to(ref.current, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    gsap.to(inner.current, {
      x: dx * 0.5,
      y: dy * 0.5,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const onLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1,0.5)',
    });
    gsap.to(inner.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1,0.5)',
    });
  };

  return (
    <button
      ref={ref}
      className={`lp-mag-btn ${className ?? ''}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <span ref={inner}>{children}</span>
    </button>
  );
}

function SplitTitle({ text, className, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll('.lp-char');
    gsap.fromTo(
      chars,
      { y: '110%', opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.9,
        stagger: 0.04,
        delay,
        ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      },
    );
  }, [delay]);

  return (
    <div ref={ref} className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="lp-char"
          style={{ display: 'inline-block', overflow: 'hidden' }}
        >
          <span className="lp-char-inner" style={{ display: 'inline-block' }}>
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function LandingPig() {
  const wrapRef = useRef(null);
  const heroRef = useRef(null);
  const noiseRef = useRef(null);
  const tickerRef = useRef(null);
  const statsRef = useRef(null);
  const assetsRef = useRef(null);
  const stepsRef = useRef(null);
  const ctaRef = useRef(null);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.2 },
      );

      gsap.fromTo(
        '.lp-hero-eyebrow',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.6, ease: 'expo.out' },
      );
      gsap.fromTo(
        '.lp-hero-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.0, ease: 'expo.out' },
      );
      gsap.fromTo(
        '.lp-hero-actions',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: 'expo.out' },
      );
      gsap.fromTo(
        '.lp-hero-stats',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.4, ease: 'expo.out' },
      );

      gsap.to('.lp-tag-1', {
        y: -14,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
      gsap.to('.lp-tag-2', {
        y: 10,
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 0.8,
      });
      gsap.to('.lp-tag-3', {
        y: -8,
        duration: 2.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1.4,
      });

      gsap.to('.lp-grid', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: 80,
      });

      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            '.lp-stat-card',
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.12,
              ease: 'expo.out',
            },
          );
        },
      });

      gsap.fromTo(
        '.lp-asset-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: { amount: 0.6, from: 'start' },
          ease: 'expo.out',
          scrollTrigger: { trigger: assetsRef.current, start: 'top 80%' },
        },
      );

      gsap.utils.toArray('.lp-step').forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        );
      });

      gsap.fromTo(
        '.lp-cta-inner',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 75%' },
        },
      );

      gsap.to('.lp-ticker-track', {
        x: '-33.33%',
        duration: 22,
        ease: 'none',
        repeat: -1,
      });
    }, wrapRef);

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleDemo = () => {
    notyfError('Maaf, fitur ini masih dalam fase pengembangan!');
  };

  return (
    <div ref={wrapRef} className="lp-page">
      <Cursor />
      <div className="lp-noise" ref={noiseRef} />

      <nav
        ref={navRef}
        className={`lp-nav ${scrolled ? 'lp-nav--scrolled' : ''}`}
      >
        <div className="lp-nav-logo">
          <span className="lp-bracket-red">[</span>
          ASSETFLOW
          <span className="lp-bracket-red">]</span>
        </div>
        <div className="lp-nav-links">
          <a href="#assets">Katalog</a>
          <a href="#steps">Cara Kerja</a>
          <a href="#cta">Mulai</a>
        </div>
        <MagButton className="lp-nav-cta" onClick={() => navigate('/login')}>
          MASUK →
        </MagButton>
      </nav>

      <section ref={heroRef} className="lp-hero">
        <div className="lp-grid" />
        <div className="lp-hero-vline lp-hero-vline--1" />
        <div className="lp-hero-vline lp-hero-vline--2" />

        <div className="lp-tag lp-tag-1">⚡ LIVE</div>
        <div className="lp-tag lp-tag-2">v2.4.1</div>
        <div className="lp-tag lp-tag-3">INDUSTRIAL</div>

        <div className="lp-hero-inner">
          <div className="lp-hero-eyebrow">
            <span className="lp-pulse-dot" />
            SISTEM MANAJEMEN ASET PERUSAHAAN
            <span className="lp-pulse-dot" />
          </div>

          <div className="lp-hero-title-wrap">
            <SplitTitle
              text="KELOLA"
              className="lp-title-line lp-title-line--1"
              delay={0.5}
            />
            <div className="lp-title-line lp-title-line--2">
              <SplitTitle
                text="ASET"
                className="lp-title-outline"
                delay={0.6}
              />
              <SplitTitle text="KAMU" className="lp-title-block" delay={0.65} />
            </div>
            <SplitTitle
              text="TANPA RIBET."
              className="lp-title-line lp-title-line--3"
              delay={0.7}
            />
          </div>

          <p className="lp-hero-desc">
            Platform reservasi aset perusahaan yang menghilangkan konflik
            jadwal, lost asset, dan proses manual yang memakan waktu.
          </p>

          <div className="lp-hero-actions">
            <MagButton
              className="lp-btn-primary"
              onClick={() => navigate('/login')}
            >
              MULAI RESERVASI ↗
            </MagButton>
            <button className="lp-btn-ghost" onClick={handleDemo}>
              LIHAT DEMO ▶
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="lp-hero-stats">
          {STATS.map((s, i) => (
            <div key={i} className="lp-stat-card">
              <span className="lp-stat-value">{s.value}</span>
              <span className="lp-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TICKER ══ */}
      <div className="lp-ticker">
        <div className="lp-ticker-track" ref={tickerRef}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map(
            (item, i) => (
              <span key={i} className="lp-ticker-item">
                {item} <span className="lp-ticker-sep">◆</span>
              </span>
            ),
          )}
        </div>
      </div>

      {/* ══ ASSETS ══ */}
      <section ref={assetsRef} className="lp-section" id="assets">
        <div className="lp-section-header">
          <div className="lp-section-label">// KATALOG ASET</div>
          <div className="lp-section-title-row">
            <SplitTitle text="APA YANG BISA" className="lp-section-title" />
            <SplitTitle
              text="KAMU PINJAM?"
              className="lp-section-title lp-section-title--outline"
              delay={0.1}
            />
          </div>
        </div>

        <div className="lp-asset-grid">
          {ASSETS.map((asset, i) => (
            <div
              key={i}
              className="lp-asset-card"
              style={{ '--accent': asset.color }}
            >
              <div className="lp-asset-tag">{asset.tag}</div>
              <div className="lp-asset-icon">{asset.icon}</div>
              <div className="lp-asset-name">{asset.name}</div>
              <div className="lp-asset-count">
                <span className="lp-asset-num">{asset.count}</span>
                <span className="lp-asset-unit">unit</span>
              </div>
              <div className="lp-asset-bar">
                <div
                  className="lp-asset-bar-fill"
                  style={{ width: `${(asset.count / 40) * 100}%` }}
                />
              </div>
              <button className="lp-asset-cta">RESERVASI →</button>
              {/* hover reveal shine */}
              <div className="lp-card-shine" />
            </div>
          ))}
        </div>
      </section>

      {/* ══ STEPS ══ */}
      <section
        ref={stepsRef}
        className="lp-section lp-section--dark"
        id="steps"
      >
        <div className="lp-section-header">
          <div className="lp-section-label" style={{ color: '#f0e040' }}>
            // CARA KERJA
          </div>
          <SplitTitle
            text="4 LANGKAH."
            className="lp-section-title"
            style={{ color: '#fff' }}
          />
          <SplitTitle
            text="SELESAI."
            className="lp-section-title lp-section-title--yellow"
            delay={0.1}
          />
        </div>

        <div className="lp-steps">
          {STEPS.map((step, i) => (
            <div key={i} className="lp-step">
              <div className="lp-step-num">{step.num}</div>
              <div className="lp-step-line" />
              <h3 className="lp-step-title">{step.title}</h3>
              <p className="lp-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section ref={ctaRef} className="lp-cta" id="cta">
        <div className="lp-cta-inner">
          <div className="lp-cta-label">SIAP MULAI?</div>
          <h2 className="lp-cta-title">
            STOP MANUAL.
            <br />
            START SMART.
          </h2>
          <p className="lp-cta-sub">
            Bergabung dengan ratusan perusahaan yang mengelola aset lebih
            efisien.
          </p>
          <div className="lp-cta-actions">
            <MagButton
              className="lp-btn-dark"
              onClick={() => navigate('/login')}
            >
              DAFTAR GRATIS ↗
            </MagButton>
            <span className="lp-cta-note">
              Tidak perlu kartu kredit. Setup 5 menit.
            </span>
          </div>
        </div>
        <div className="lp-cta-deco">ASSETFLOW</div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="lp-footer">
        <div className="lp-footer-logo">
          <span className="lp-bracket-red">[</span>ASSETFLOW
          <span className="lp-bracket-red">]</span>
        </div>
        <p className="lp-footer-copy">
          © {new Date().getFullYear()} AssetFlow. Hak cipta dilindungi.
        </p>
        <div className="lp-footer-links">
          <a href="#">Privasi</a>
          <a href="#">Syarat</a>
          <a href="#">Kontak</a>
        </div>
      </footer>
    </div>
  );
}
