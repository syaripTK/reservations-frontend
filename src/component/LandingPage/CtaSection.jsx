import { notyfError } from '../../utils/notyf';

const CtaSection = () => {
  const handleClick = () => {
    notyfError('Mohon maaf, fitur ini masih dalam masa development.');
  };
  return (
    <section className="cta-section">
      <div className="cta-noise" />
      <div className="cta-inner">
        <div className="cta-label">SIAP MULAI?</div>
        <h2 className="cta-title">
          STOP MANUAL.
          <br />
          START SMART.
        </h2>
        <p className="cta-sub">
          Bergabung dengan ratusan perusahaan yang sudah mengelola aset lebih
          efisien.
        </p>
        <div className="cta-actions">
          <button onClick={handleClick} className="btn-main btn-main--light">
            <span>DAFTAR GRATIS</span>
            <span className="btn-arrow">↗</span>
          </button>
          <span className="cta-note">
            Tidak perlu kartu kredit. Setup dalam 5 menit.
          </span>
        </div>
      </div>
      <div className="cta-deco">ASSETFLOW</div>
    </section>
  );
};

export default CtaSection;
