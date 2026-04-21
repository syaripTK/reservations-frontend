import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { notyfError } from '../../utils/notyf';

const STATS = [
  { value: '2,400+', label: 'Transaksi / Bulan' },
  { value: '98%', label: 'Tingkat Kepuasan' },
  { value: '< 2 Min', label: 'Waktu Reservasi' },
  { value: '0 Konflik', label: 'Jadwal Bentrok' },
];

const Hero = () => {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  const handleDemo = () => {
    notyfError('Mohon maaf, fitur ini sedang dalam masa development.');
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-grid-lines" />

      <div className="hero-eyebrow">
        <span className="hero-dot" />
        SISTEM MANAJEMEN ASET PERUSAHAAN
        <span className="hero-dot" />
      </div>

      <h1 className="hero-title">
        <span className="hero-line hero-line--1">KELOLA</span>
        <span className="hero-line hero-line--2">
          <span className="hero-outline">ASET</span>
          <span className="hero-accent-block">KAMU</span>
        </span>
        <span className="hero-line hero-line--3">TANPA RIBET.</span>
      </h1>

      <p className="hero-desc">
        Platform reservasi aset perusahaan yang menghilangkan konflik jadwal,
        lost asset, dan proses manual yang memakan waktu.
      </p>

      <div className="hero-actions">
        <button onClick={handleClick} className="btn-main">
          <span>MULAI RESERVASI</span>
          <span className="btn-arrow">↗</span>
        </button>
        <button className="btn-ghost" onClick={handleDemo}>
          LIHAT DEMO ▶
        </button>
      </div>

      <div className="hero-stats">
        {STATS.map((s, i) => (
          <div className="hero-stat" key={i}>
            <span className="hero-stat-value">{s.value}</span>
            <span className="hero-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* floating tag */}
      <div className="hero-tag hero-tag--1">⚡ LIVE</div>
      <div className="hero-tag hero-tag--2">v2.4.1</div>
    </section>
  );
};

export default Hero;
