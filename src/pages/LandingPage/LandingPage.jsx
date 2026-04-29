import './LandingPage.css';
import AssetCatalog from '../../component/LandingPage/AssetCatalog';
import CtaSection from '../../component/LandingPage/CtaSection';
import Features from '../../component/LandingPage/Features';
import Footer from '../../component/LandingPage/Footer';
import Hero from '../../component/LandingPage/Hero';
import HowItWorks from '../../component/LandingPage/HowItWorks';
import Navigation from '../../component/LandingPage/Navigation';
import Ticker from '../../component/LandingPage/Ticker';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="noise" />

      <Navigation />
      <Hero />
      <Ticker />
      <AssetCatalog />
      <HowItWorks />
      <Features />
      <CtaSection />
      <Footer />
    </div>
  );
}

export default LandingPage;
