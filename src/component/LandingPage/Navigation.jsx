import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <nav className={`nav ${scrollY > 60 ? 'nav--scrolled' : ''}`}>
      <div className="nav-logo">
        <span className="nav-logo-bracket">
          [<span className='brand'>ASSETFLOW</span>]
        </span>
      </div>
      <div className="nav-links">
        <a href="#fitur">Fitur</a>
        <a href="#cara-kerja">Cara Kerja</a>
        <a href="#aset">Katalog</a>
      </div>
      <button className="nav-cta" onClick={handleClick}>
        MASUK SISTEM →
      </button>
    </nav>
  );
};

export default Navigation;
