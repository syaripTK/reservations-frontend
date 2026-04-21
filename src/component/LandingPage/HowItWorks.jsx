const STEPS = [
  {
    num: '01',
    title: 'Pilih Aset',
    desc: 'Telusuri katalog aset perusahaan yang tersedia secara real-time.',
  },
  {
    num: '02',
    title: 'Tentukan Waktu',
    desc: 'Atur jadwal peminjaman dengan kalender interaktif dan cek ketersediaan.',
  },
  {
    num: '03',
    title: 'Konfirmasi',
    desc: 'Ajukan permintaan dan dapatkan persetujuan otomatis atau dari manajer.',
  },
  {
    num: '04',
    title: 'Gunakan',
    desc: 'QR code dikirim ke email. Scan untuk akses aset kapan pun dibutuhkan.',
  },
];

const Step = ({ step }) => {
  return (
    <div className="step">
      <div className="step-num">{step.num}</div>
      <div className="step-connector" />
      <div className="step-content">
        <h3 className="step-title">{step.title}</h3>
        <p className="step-desc">{step.desc}</p>
      </div>
    </div>
  );
};

function HowItWorks() {
  return (
    <section className="section section--dark" id="cara-kerja">
      <div className="section-header">
        <div className="section-label" style={{ color: '#f0e040' }}>
          // CARA KERJA
        </div>
        <h2 className="section-title" style={{ color: '#fff' }}>
          4 LANGKAH.
          <br />
          <em style={{ color: '#f0e040' }}>SELESAI.</em>
        </h2>
      </div>

      <div className="steps">
        {STEPS.map((step, i) => (
          <Step key={i} step={step} />
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
