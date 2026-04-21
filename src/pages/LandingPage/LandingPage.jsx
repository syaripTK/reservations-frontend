import './LandingPage.css';
import Navigation from '../../component/LandingPage/Navigation';
import Hero from '../../component/LandingPage/Hero';
import Ticker from '../../component/LandingPage/Ticker';
import AssetCatalog from '../../component/LandingPage/AssetCatalog';
import HowItWorks from '../../component/LandingPage/HowItWorks';
import Features from '../../component/LandingPage/Features';
import CtaSection from '../../component/LandingPage/CtaSection';
import Footer from '../../component/LandingPage/Footer';

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
