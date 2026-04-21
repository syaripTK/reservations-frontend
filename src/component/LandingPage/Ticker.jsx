const TICKER_ITEMS = [
  'RESERVASI ASET',
  'REAL-TIME',
  'MANAJEMEN TERPADU',
  'AUDIT TRAIL',
  'NOTIFIKASI INSTAN',
  'ZERO KONFLIK',
];

const Ticker = () => {
  return (
    <div className="ticker">
      <div className="ticker-track">
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className="ticker-item">
            {item} <span className="ticker-sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
