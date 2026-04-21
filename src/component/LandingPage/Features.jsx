import { BarChart3, Bell, Shield, Zap } from 'lucide-react';

const FEATURES = [
  {
    id: 'dashboard',
    icon: BarChart3,
    title: 'Dashboard Real-Time',
    desc: 'Pantau seluruh aset perusahaan dalam satu layar. Status, lokasi, dan jadwal — semuanya live.',
    isLarge: true,
    isBig: true,
  },
  {
    id: 'notif',
    icon: Bell,
    title: 'Notifikasi Pintar',
    desc: 'Pengingat otomatis via email & push notification. Tidak ada lagi aset yang terlupakan.',
  },
  {
    id: 'audit',
    icon: Shield,
    title: 'Audit Trail Lengkap',
    desc: 'Setiap peminjaman tercatat rapi. Siapa, kapan, berapa lama — transparan 100%.',
  },
  {
    id: 'approval',
    icon: Zap,
    title: 'Approval Cepat',
    desc: 'Sistem persetujuan berlapis dengan eskalasi otomatis. Reservasi bisa disetujui dalam hitungan detik tanpa menunggu approval manual yang lambat.',
    isWide: true,
  },
];

const Feature = ({ feature }) => {
  const IconComponent = feature.icon;
  const classNames = `feature ${feature.isBig ? 'feature--big' : ''} ${
    feature.isWide ? 'feature--wide' : ''
  }`;

  return (
    <div className={classNames}>
      <div
        className="feature-icon"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconComponent size={40} stroke={1.5} />
      </div>
      <h3>{feature.title}</h3>
      <p>{feature.desc}</p>

      {feature.id === 'dashboard' && (
        <div className="feature-visual">
          <div className="mini-chart">
            {[60, 80, 45, 90, 70, 85, 55, 95, 65, 75].map((h, i) => (
              <div
                key={i}
                className="mini-bar"
                style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {feature.id === 'approval' && (
        <div className="approval-flow">
          <div className="af-step af-step--done">Request</div>
          <div className="af-arrow">→</div>
          <div className="af-step af-step--done">Auto Check</div>
          <div className="af-arrow">→</div>
          <div className="af-step af-step--active">Approved ✓</div>
        </div>
      )}
    </div>
  );
};

function Features() {
  return (
    <section className="section" id="fitur">
      <div className="section-header">
        <div className="section-label">// FITUR UNGGULAN</div>
        <h2 className="section-title">
          KENAPA PILIH
          <br />
          <em className="brand">FLOW</em>
          <span style={{ color: 'var(--yellow)' }}>ASSETFLOW?</span>
        </h2>
      </div>

      <div className="features">
        {FEATURES.map((feature) => (
          <Feature key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}

export default Features;
