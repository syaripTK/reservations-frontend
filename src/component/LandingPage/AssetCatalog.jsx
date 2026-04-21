import { useState } from 'react';
import { Car, Building2, Laptop, Camera, Wrench, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ASSETS = [
  { id: 1, icon: Car, name: 'Kendaraan Dinas', count: 12, tag: 'FLEET' },
  { id: 2, icon: Building2, name: 'Ruang Meeting', count: 8, tag: 'SPACE' },
  { id: 3, icon: Laptop, name: 'Laptop & Device', count: 34, tag: 'TECH' },
  { id: 4, icon: Camera, name: 'Peralatan Foto', count: 6, tag: 'MEDIA' },
  { id: 5, icon: Wrench, name: 'Alat Teknik', count: 20, tag: 'TOOLS' },
  { id: 6, icon: Radio, name: 'AV Equipment', count: 9, tag: 'AV' },
];

const AssetCard = ({ asset, isActive, onHover, onLeave }) => {
  const IconComponent = asset.icon;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };
  return (
    <div
      className={`asset-card ${isActive ? 'asset-card--active' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="asset-tag">{asset.tag}</div>
      <div
        className="asset-icon"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <IconComponent size={48} stroke={1.5} />
      </div>
      <div className="asset-name">{asset.name}</div>
      <div className="asset-count">
        <span className="asset-count-num">{asset.count}</span>
        <span className="asset-count-label">unit tersedia</span>
      </div>
      <div className="asset-bar">
        <div
          className="asset-bar-fill"
          style={{ width: `${(asset.count / 40) * 100}%` }}
        />
      </div>
      <button onClick={handleClick} className="asset-btn">
        RESERVASI →
      </button>
    </div>
  );
};

function AssetCatalog() {
  const [activeAsset, setActiveAsset] = useState(null);

  return (
    <section className="section" id="aset">
      <div className="section-header">
        <div className="section-label">// KATALOG ASET</div>
        <h2 className="section-title">
          APA YANG BISA
          <br />
          <em>KAMU</em>
          <span style={{ color: 'var(--yellow)' }}>KAMU PINJAM?</span>
        </h2>
      </div>

      <div className="asset-grid">
        {ASSETS.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            isActive={activeAsset === asset.id}
            onHover={() => setActiveAsset(asset.id)}
            onLeave={() => setActiveAsset(null)}
          />
        ))}
      </div>
    </section>
  );
}

export default AssetCatalog;
