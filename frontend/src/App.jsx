import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, MotionConfig } from 'framer-motion';
import './App.css';

import { PerformanceContext } from './context/PerformanceContext';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WAButton from './components/WAButton';

import HeroSection from './components/HeroSection';
import SocialProofBar from './components/SocialProofBar';
import LayananSection from './components/LayananSection';
import StatsSection from './components/StatsSection';
import MasalahSection from './components/MasalahSection';
import CeritaSection from './components/CeritaSection';
import ProsesSection from './components/ProsesSection';
import PortfolioSection from './components/PortfolioSection';
import ProfilSection from './components/ProfilSection';
import ExperienceSection from './components/ExperienceSection';
import AwardsSection from './components/AwardsSection';
import TechStackSection from './components/TechStackSection';
import TestimonialsSection from './components/TestimonialsSection';
import PaketSection from './components/PaketSection';
import FAQSection from './components/FAQSection';
import KontakSection from './components/KontakSection';
import ParallaxDivider from './components/ui/ParallaxDivider';
import CustomCursor from './components/ui/CustomCursor';

const SECTION_IDS = ['home', 'layanan', 'portfolio', 'tentang', 'testimoni', 'harga', 'kontak'];

export default function App() {
  const [lang, setLang] = useState('id');
  const [performanceMode, setPerformanceMode] = useState('high');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const stored = localStorage.getItem('ct-lang');
    if (stored === 'id' || stored === 'en') setLang(stored);
  }, []);
  useEffect(() => { localStorage.setItem('ct-lang', lang); }, [lang]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    const sectionMap = new Map();

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          sectionMap.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          let best = 'home';
          let bestRatio = 0;
          sectionMap.forEach((ratio, sid) => {
            if (ratio > bestRatio) { bestRatio = ratio; best = sid; }
          });
          setActiveSection(best);
        },
        { threshold: [0, 0.1, 0.3, 0.5], rootMargin: '-60px 0px -20% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    if (prefersReducedMotion || cores < 4 || memory < 4) setPerformanceMode('low');
    else if (cores >= 8 && memory >= 8) setPerformanceMode('high');
    else setPerformanceMode('medium');
  }, []);

  return (
    <DataProvider>
    <ThemeProvider>
      <PerformanceContext.Provider value={performanceMode}>
        <MotionConfig reducedMotion="user">
          <motion.div className="scroll-progress" style={{ scaleX }} />

          <Navbar
            scrolled={scrolled}
            lang={lang}
            setLang={setLang}
            activeSection={activeSection}
          />

          <main>
            <HeroSection lang={lang} />
            <SocialProofBar lang={lang} />

            <ParallaxDivider
              image="/parallax/bank-indonesia.jpg"
              overlayOpacity={0.45}
              label={lang === 'id' ? 'Dipercaya Bank Indonesia' : 'Trusted by Bank Indonesia'}
              speed={0.2}
              height={430}
              zoom
              particles
              counter={{ value: 1, suffix: lang === 'id' ? ' Tahun+' : ' Year+', label: lang === 'id' ? 'Kolaborasi Aktif' : 'Active Collaboration' }}
            />

            <MasalahSection lang={lang} />

            <CeritaSection lang={lang} />

            <div className="section-tilt-wrapper">
              <div className="section-tilt">
                <LayananSection lang={lang} />
              </div>
            </div>

            <StatsSection lang={lang} />

            <ParallaxDivider
              image="/parallax/parallax1.jpg"
              overlayOpacity={0.52}
              label={lang === 'id' ? 'Menjangkau Dunia Digital' : 'Reaching the Digital World'}
              speed={0.3}
              height={370}
              zoom
              animatedLines
            />

            <ProsesSection lang={lang} />

            <ParallaxDivider
              image="/parallax/parallax2.jpg"
              overlayOpacity={0.48}
              label={lang === 'id' ? 'Kode yang Mengubah Bisnis' : 'Code That Transforms Business'}
              speed={0.18}
              height={350}
              zoom
              grayscale
            />

            <div className="section-tilt-wrapper">
              <div className="section-tilt">
                <PortfolioSection lang={lang} />
              </div>
            </div>

            <ParallaxDivider
              image="/parallax/ipbuniversitywisuda.webp"
              overlayOpacity={0.5}
              label={lang === 'id' ? 'Alumni IPB University' : 'IPB University Alumni'}
              speed={0.25}
              height={400}
              zoom
              particles
            />

            <ProfilSection lang={lang} />
            <ExperienceSection lang={lang} />

            <ParallaxDivider
              image="/parallax/REKTORAT-IPB.jpeg"
              overlayOpacity={0.42}
              label="IPB University"
              speed={0.22}
              height={450}
              zoom
              grayscale
              waveOverlap
            />

            <AwardsSection lang={lang} />

            <div className="section-tilt-wrapper">
              <div className="section-tilt">
                <TechStackSection lang={lang} />
              </div>
            </div>

            <ParallaxDivider
              image="/parallax/parallax3.jpg"
              overlayOpacity={0.55}
              label={lang === 'id' ? 'Teknologi Modern, Hasil Nyata' : 'Modern Tech, Real Results'}
              speed={0.2}
              height={380}
              zoom
              animatedLines
            />

            <TestimonialsSection lang={lang} />

            <div className="section-tilt-wrapper">
              <div className="section-tilt">
                <PaketSection lang={lang} />
              </div>
            </div>

            <FAQSection lang={lang} />

            <ParallaxDivider
              image="/parallax/parallax4.jpg"
              overlayOpacity={0.48}
              label={lang === 'id' ? 'Mulai Bangun Bisnis Digital Anda' : 'Start Building Your Digital Business'}
              speed={0.15}
              height={420}
              zoom
              particles
              counter={{ value: 7, suffix: '+', label: lang === 'id' ? 'Proyek Selesai' : 'Projects Delivered' }}
            />

            <KontakSection lang={lang} />
          </main>

          <Footer lang={lang} />

          <WAButton lang={lang} />

          <CustomCursor />
        </MotionConfig>
      </PerformanceContext.Provider>
    </ThemeProvider>
    </DataProvider>
  );
}
