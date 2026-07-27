'use client';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

/* ── Loading Screen ── */
function Loader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div initial={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6"
          style={{ background:'var(--bg)' }}>
          <motion.div
            initial={{ scale:0.5, opacity:0 }} animate={{ scale:1, opacity:1 }}
            transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center font-display font-black text-white text-3xl"
            style={{ background:'linear-gradient(135deg,#C1121F,#E63946)' }}>
            M
          </motion.div>
          <div className="w-52 h-0.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.07)' }}>
            <motion.div className="h-full rounded-full"
              style={{ background:'linear-gradient(90deg,#C1121F,#E63946,#FFD166)' }}
              initial={{ width:'0%' }} animate={{ width:'100%' }}
              transition={{ duration:1.3, ease:'easeInOut' }}/>
          </div>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
            className="text-xs tracking-widest uppercase" style={{ color:'var(--muted)' }}>
            Loading portfolio…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [dark,   setDark]   = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);

  /* Loader */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1600);
    return () => clearTimeout(t);
  }, []);

  /* Dark/light mode: toggle class on <html> */
  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.remove('light');
    } else {
      html.classList.add('light');
    }
  }, [dark]);

  /* Cursor glow */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top  = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', move, { passive:true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  /* Particles */
  useEffect(() => {
    const container = document.getElementById('particles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 2.5 + 1;
      const col = Math.random() > 0.6 ? '#E63946' : Math.random() > 0.5 ? '#C1121F' : '#FFD166';
      p.style.cssText = `
        position:absolute;left:${Math.random()*100}%;
        width:${size}px;height:${size}px;border-radius:50%;
        background:${col};opacity:0;
        animation:particleFloat ${12+Math.random()*14}s linear ${Math.random()*10}s infinite;
      `;
      container.appendChild(p);
    }
    return () => { if (container) container.innerHTML = ''; };
  }, []);

  return (
    <>
      <style>{`
        @keyframes particleFloat {
          0%   { transform:translateY(100vh) rotate(0deg);    opacity:0; }
          10%  { opacity:0.2; }
          90%  { opacity:0.2; }
          100% { transform:translateY(-120px) rotate(360deg); opacity:0; }
        }
      `}</style>

      <Loader done={loaded} />
      <div ref={cursorRef} id="cursor-glow" />
      <div id="particles" className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />

      <Navbar dark={dark} toggle={() => setDark(!dark)} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
