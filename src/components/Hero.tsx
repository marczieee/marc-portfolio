'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Code2, Link2, ArrowDown, Shield, Cpu, Wrench } from 'lucide-react';

const TITLES = [
  'Safety Officer 2',
  'Computer Engineer',
  'Technical Support Specialist',
  'Embedded Systems Builder',
  'Hardware & Software Engineer',
];

const STATS = [
  { n: 20, label: 'Certifications', suffix: '+' },
  { n: 6,  label: 'Projects Built',  suffix: '+' },
  { n: 20, label: 'Tech Skills',     suffix: '+' },
  { n: 2,  label: 'Months OJT',      suffix: '' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let start = 0;
      const step = () => {
        start += Math.ceil(target / 40);
        if (start >= target) { setCount(target); return; }
        setCount(start);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      obs.disconnect();
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const full = TITLES[titleIdx];
    if (typing) {
      if (displayed.length < full.length) {
        const t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 65);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
        return () => clearTimeout(t);
      } else {
        setTitleIdx((titleIdx + 1) % TITLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, titleIdx]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" id="hero">
      {/* Decorative blobs */}
      <div className="blob w-[600px] h-[600px] left-[-10%] top-[-5%]" style={{ background: '#C1121F' }} />
      <div className="blob w-[500px] h-[500px] right-[-8%] top-[15%]" style={{ background: '#E63946', animationDelay:'-5s' }} />
      <div className="blob w-[350px] h-[350px] left-[35%] bottom-[-5%]" style={{ background: '#FFD166', animationDelay:'-10s' }} />
      <div className="grid-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ── Left: Text ── */}
          <div className="flex-1 min-w-0">
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
              <span className="section-tag"><Shield size={11} /> Open to Opportunities</span>
            </motion.div>

            <motion.h1 initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.8, delay:0.1 }}
              className="section-title mt-3 mb-2">
              Hi, I&apos;m{' '}
              <span className="gradient-text block sm:inline">Marc Eldrian</span>
            </motion.h1>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3, duration:0.6 }}
              className="flex items-center gap-2 mt-3 mb-6 h-9">
              <span className="text-2xl font-display font-semibold" style={{ color:'var(--muted)' }}>—</span>
              <span className="text-xl sm:text-2xl font-display font-semibold typing-cursor truncate"
                style={{ color:'var(--red)' }}>
                {displayed}
              </span>
            </motion.div>

            <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.45, duration:0.7 }}
              className="text-base sm:text-lg leading-relaxed max-w-xl mb-8"
              style={{ color:'var(--muted)' }}>
              Computer Engineering student at Bulacan State University. I build safer systems,
              maintain critical IT infrastructure, and craft embedded solutions — from hospital
              networks to autonomous robots.
            </motion.p>

            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.6, duration:0.6 }}
              className="flex flex-wrap gap-3 mb-8">
              <a href="/resume.pdf" download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn-red text-sm font-bold">
                <Download size={15} /> Download CV
              </a>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn-outline text-sm font-semibold">
                <Mail size={15} /> Contact Me
              </button>
            </motion.div>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.75, duration:0.5 }}
              className="flex items-center gap-3">
              {[
                { href:'https://linkedin.com/in/marc-eldrian-gelera', Icon:Link2, label:'LinkedIn' },
                { href:'https://github.com/marceldriangelera',         Icon:Code2, label:'GitHub'  },
                { href:'mailto:geleramarceldrian@gmail.com',           Icon:Mail,  label:'Email'   },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center transition-all duration-200"
                  style={{ color:'var(--muted)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='var(--red)'; (e.currentTarget as HTMLElement).style.borderColor='var(--bhi)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='var(--muted)'; (e.currentTarget as HTMLElement).style.borderColor=''; }}>
                  <Icon size={16} />
                </a>
              ))}
              <span className="text-xs ml-1 hidden sm:block" style={{ color:'var(--muted)' }}>geleramarceldrian@gmail.com</span>
            </motion.div>
          </div>

          {/* ── Right: Profile ── */}
          <motion.div initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.9, delay:0.2, ease:[0.22,1,0.36,1] }}
            className="flex-shrink-0 relative">

            {/* Floating badges */}
            {[
              { icon:<Shield size={12}/>, text:'Safety Officer 2', cls:'-left-8 top-6',     delay:0.9 },
              { icon:<Cpu size={12}/>,    text:'CompEng Student',  cls:'-right-6 top-16',   delay:1.1 },
              { icon:<Wrench size={12}/>, text:'Tech Support',     cls:'-left-4 bottom-10', delay:1.3 },
            ].map(({ icon, text, cls, delay }) => (
              <motion.div key={text}
                initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }}
                transition={{ delay, duration:0.5, ease:[0.22,1,0.36,1] }}
                className={`absolute ${cls} z-20 glass px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap`}
                style={{ color:'var(--red)' }}>
                {icon} {text}
              </motion.div>
            ))}

            {/* Static ring + photo */}
            <div className="profile-ring-static w-64 h-64 sm:w-72 sm:h-72">
              <div className="w-full h-full rounded-full overflow-hidden" style={{ background:'var(--bg2)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/profile.jpg" alt="Marc Eldrian Gelera"
                  className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.9, duration:0.7 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map(({ n, label, suffix }) => (
            <div key={label} className="glass px-5 py-5 text-center">
              <div className="stat-num"><AnimatedCounter target={n} suffix={suffix} /></div>
              <div className="text-xs mt-1.5 font-medium" style={{ color:'var(--muted)' }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }}
          className="flex justify-center mt-10">
          <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:2 }}
            className="flex flex-col items-center gap-1 text-xs cursor-pointer"
            style={{ color:'var(--muted)' }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior:'smooth' })}>
            <ArrowDown size={16} style={{ color:'var(--red)' }} />
            scroll down
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
