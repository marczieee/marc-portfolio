'use client';
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Code2, ExternalLink, FolderOpen, Star, X, ChevronLeft, ChevronRight } from 'lucide-react';

const PROJECTS = [
  {
    title:'Smart Plastic Bottle Bin',
    sub:'Vending & Shredding Machine',
    desc:'IoT-enabled smart bin that sorts, shreds, and rewards users for depositing plastic bottles — promoting waste segregation in public spaces with an automated vending mechanism.',
    tech:['Arduino','C++','IoT Sensors','Motor Control','PCB Design'],
    cat:'Embedded', year:2025, accent:'#E63946', emoji:'♻️', featured:true,
    images:['/projects/smartbottlebin.png'],
    gh:'https://github.com/marceldriangelera',
  },
  {
    title:'AquaSense',
    sub:'Water Level Indicator',
    desc:'Automated water level monitoring using ultrasonic sensors and Arduino. Provides real-time visual and audio alerts at critical thresholds — ideal for flood-prone areas and water tanks.',
    tech:['Arduino','Ultrasonic Sensor','C++','LED Matrix','Buzzer'],
    cat:'Embedded', year:2025, accent:'#38BDF8', emoji:'💧', featured:true,
    images:['/projects/aquasense.png'],
    gh:'https://github.com/marceldriangelera',
  },
  {
    title:'Line Following Robot',
    sub:'Autonomous Navigation',
    desc:'Autonomous robot using IR sensors and PID control to follow a line path with precision — handles curves, intersections, and variable-speed sections.',
    tech:['Arduino','IR Sensors','Motor Driver','C++','PID Control'],
    cat:'Robotics', year:2024, accent:'#A78BFA', emoji:'🤖', featured:true,
    images:['/projects/Line Following.jpg'],
    gh:'https://github.com/marceldriangelera',
  },
  {
    title:'Arduino LCD Jumpman',
    sub:'Retro Arcade Game',
    desc:'Classic endless-runner built on Arduino with LCD display. Features collision detection, increasing difficulty, score tracking, and custom character sprites.',
    tech:['Arduino','C++','LCD Display','Custom Sprites'],
    cat:'Game Dev', year:2024, accent:'#F472B6', emoji:'🎮', featured:false,
    images:['/projects/lcdjumpman.jpg', '/projects/lcdjumpman2.jpg'],
    gh:'https://github.com/marceldriangelera',
  },
  {
    title:'SAP-1 Architecture',
    sub:'Hardware & Software',
    desc:'Full hardware & software implementation of the Simple As Possible 1 computer architecture — demonstrating registers, ALU, control unit, and instruction set fundamentals.',
    tech:['Digital Logic','Hardware Design','MATLAB','Assembly'],
    cat:'CompArch', year:2025, accent:'#34D399', emoji:'🖥️', featured:false,
    images:['/projects/sap1.jpg'],
    gh:'https://github.com/marceldriangelera',
  },
  {
    title:'Automatic Light Bulb System',
    sub:'Embedded Automation',
    desc:'Intelligent lighting system using LDR sensors and Arduino to auto-control brightness based on ambient light conditions — reducing energy waste.',
    tech:['Arduino','LDR Sensor','Relay Module','PWM Control'],
    cat:'Embedded', year:2025, accent:'#FFD166', emoji:'💡', featured:false,
    images:['/projects/lightbulb.jpg', '/projects/lightbulb2.jpg'],
    gh:'https://github.com/marceldriangelera',
  },
];

const CATS = ['All','Embedded','Robotics','Game Dev','CompArch'];

/* ── Image Gallery Modal ── */
function Gallery({ images, title, onClose }: { images:string[]; title:string; onClose:()=>void }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((idx - 1 + images.length) % images.length);
  const next = () => setIdx((idx + 1) % images.length);
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background:'rgba(0,0,0,0.9)', backdropFilter:'blur(12px)' }}
      onClick={onClose}>
      <motion.div initial={{ scale:0.88 }} animate={{ scale:1 }} exit={{ scale:0.88 }}
        className="relative max-w-3xl w-full rounded-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white"
          style={{ background:'rgba(0,0,0,0.6)' }}>
          <X size={16}/>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[idx]} alt={title} className="w-full h-auto max-h-[75vh] object-contain" style={{ background:'#000' }}/>
        {images.length > 1 && (
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none">
            <button onClick={prev} className="pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background:'rgba(0,0,0,0.5)' }}><ChevronLeft size={18}/></button>
            <button onClick={next} className="pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background:'rgba(0,0,0,0.5)' }}><ChevronRight size={18}/></button>
          </div>
        )}
        <div className="py-3 px-4 text-sm font-semibold text-center" style={{ background:'var(--bg2)', color:'var(--text)' }}>
          {title} {images.length > 1 && `— ${idx+1}/${images.length}`}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Flip Project Card ── */
function ProjectCard({ p }: { p: typeof PROJECTS[0] }) {
  const [gallery, setGallery] = useState(false);
  const hasImages = p.images.length > 0;

  return (
    <>
      <div className="flip-card h-72">
        <div className="flip-inner h-full">
          {/* Front */}
          <div className="flip-front glass" style={{ borderColor:'var(--border)' }}>
            {hasImages ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover"/>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3"
                style={{ background: `linear-gradient(135deg, ${p.accent}15, ${p.accent}05)` }}>
                <span className="text-5xl">{p.emoji}</span>
                <span className="font-display font-bold text-lg" style={{ color:'var(--text)' }}>{p.title}</span>
                <span className="text-xs font-medium" style={{ color:p.accent }}>{p.sub}</span>
              </div>
            )}
            {/* overlay label */}
            <div className="absolute bottom-0 left-0 right-0 p-4"
              style={{ background:'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
              <div className="text-white font-display font-bold text-base">{p.title}</div>
              <div className="text-xs mt-0.5" style={{ color:p.accent }}>{p.sub}</div>
            </div>
            <div className="absolute top-3 right-3 flex gap-1.5">
              {p.featured && <span className="badge badge-red text-[10px]">★ Featured</span>}
              <span className="badge badge-dark text-[10px]">{p.cat}</span>
            </div>
          </div>

          {/* Back */}
          <div className="flip-back" style={{ background:'var(--bg3)' }}>
            <h3 className="font-display font-bold text-base mb-1" style={{ color:'var(--text)' }}>{p.title}</h3>
            <p className="text-xs font-semibold mb-3" style={{ color:p.accent }}>{p.sub}</p>
            <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color:'var(--muted)' }}>{p.desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.tech.map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background:`${p.accent}18`, color:p.accent, border:`1px solid ${p.accent}33` }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-3" style={{ borderTop:'1px solid var(--border)' }}>
              <a href={p.gh} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs transition-colors"
                style={{ color:'var(--muted)' }}>
                <Code2 size={12}/> Code
              </a>
              {hasImages && (
                <button onClick={() => setGallery(true)}
                  className="flex items-center gap-1 text-xs font-semibold transition-colors"
                  style={{ color:p.accent }}>
                  <ExternalLink size={12}/> View Photos
                </button>
              )}
              <span className="ml-auto text-[10px]" style={{ color:'var(--muted)' }}>{p.year}</span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {gallery && hasImages && (
          <Gallery images={p.images} title={p.title} onClose={() => setGallery(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const visible = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === filter);

  return (
    <section id="projects" className="py-24 relative">
      <div className="blob w-[500px] h-[500px] left-0 top-[40%]" style={{ background:'var(--red3)', opacity:0.05 }} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div ref={ref} initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.6 }} className="mb-14">
          <span className="section-tag"><FolderOpen size={11}/> Projects</span>
          <h2 className="section-title">Things I&apos;ve <span className="gradient-text">built</span></h2>
          <p className="text-sm mt-2" style={{ color:'var(--muted)' }}>Hover a card to flip it and see details · Click &quot;View Photos&quot; for project gallery</p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATS.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={filter===cat
                ? { background:'linear-gradient(135deg,#C1121F,#E63946)', color:'#fff', border:'none' }
                : { background:'rgba(255,255,255,0.03)', color:'var(--muted)', border:'1px solid var(--border)' }}>
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div key={p.title} layout
                initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }}
                exit={{ opacity:0, scale:0.88 }}
                transition={{ duration:0.4, delay:i*0.05, ease:[0.22,1,0.36,1] }}>
                <ProjectCard p={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
