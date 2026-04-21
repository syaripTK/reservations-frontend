const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <span className="nav-logo-bracket">
          [<span className="brand">ASSETFLOW</span>]
        </span>
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} Ahmad Syangkan Syarip. Hak cipta dilindungi
        undang-undang.
      </p>
      <div className="footer-links">
        <a href="#">Privasi</a>
        <a href="#">Syarat</a>
        <a href="#">Kontak</a>
      </div>
    </footer>
  );
};

export default Footer;
