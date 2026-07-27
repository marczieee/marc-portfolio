'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const NAV = [
  { label: 'About',          href: 'about' },
  { label: 'Skills',         href: 'skills' },
  { label: 'Experience',     href: 'experience' },
  { label: 'Projects',       href: 'projects' },
  { label: 'Certifications', href: 'certifications' },
  { label: 'Contact',        href: 'contact' },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const { href } of [...NAV].reverse()) {
        const el = document.getElementById(href);
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(href); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur shadow-2xl' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-white text-sm group-hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg, #C1121F, #E63946)' }}>
              M
            </span>
            <span className="font-display font-bold text-sm hidden sm:block" style={{ color: 'var(--text)' }}>Marc Eldrian</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV.map(({ label, href }) => (
              <button key={href} onClick={() => scrollTo(href)}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ color: active === href ? 'var(--red)' : 'var(--muted)', background: active === href ? 'rgba(230,57,70,0.08)' : 'transparent' }}>
                {label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale: 0.9 }} onClick={toggle}
              className="w-9 h-9 rounded-lg glass flex items-center justify-center transition-colors"
              style={{ color: 'var(--muted)' }} aria-label="Toggle theme">
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('contact')}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl btn-red text-sm font-bold">
              Hire Me
            </motion.button>
            <button onClick={() => setOpen(!open)}
              className="md:hidden w-9 h-9 rounded-lg glass flex items-center justify-center"
              style={{ color: 'var(--muted)' }} aria-label="Menu">
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.18 }}
            className="fixed top-16 left-0 right-0 z-40 nav-blur border-b px-5 py-4"
            style={{ borderColor: 'var(--border)' }}>
            <div className="flex flex-col gap-1">
              {NAV.map(({ label, href }) => (
                <button key={href} onClick={() => { setOpen(false); scrollTo(href); }}
                  className="text-left px-4 py-3 rounded-xl font-medium transition-all"
                  style={{ color: 'var(--muted)' }}>
                  {label}
                </button>
              ))}
              <button onClick={() => { setOpen(false); scrollTo('contact'); }}
                className="mt-2 px-4 py-3 rounded-xl btn-red text-center font-bold">
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
