import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Footer from '../components/landing/Footer';
import ThreeBackground from '../components/common/ThreeBackground';

const LandingPage = () => {
  return (
    <div className="relative">
      <ThreeBackground />
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
