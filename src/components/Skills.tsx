'use client';
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Brain } from 'lucide-react';

const TECH = [
  { name:'Occupational Safety & Health', pct:85 },
  { name:'Hardware Troubleshooting',      pct:88 },
  { name:'PCB Design & Etching',          pct:80 },
  { name:'Embedded Systems / Arduino',    pct:83 },
  { name:'Python',                        pct:78 },
  { name:'C++',                           pct:75 },
  { name:'JavaScript / React',            pct:72 },
  { name:'Network Fundamentals',          pct:76 },
  { name:'Microsoft Office Suite',        pct:88 },
  { name:'Figma / UI-UX',                pct:74 },
  { name:'HTML & Web Development',        pct:70 },
];

const SOFT = [
  { name:'Leadership',        emoji:'👑' },
  { name:'Communication',     emoji:'💬' },
  { name:'Problem Solving',   emoji:'🧩' },
  { name:'Teamwork',          emoji:'🤝' },
  { name:'Adaptability',      emoji:'🔄' },
  { name:'Time Management',   emoji:'⏰' },
  { name:'Attention to Detail', emoji:'🔍' },
  { name:'Fast Learner',      emoji:'⚡' },
];

const TOOLS = ['Arduino IDE','VS Code','Figma','MATLAB','BizBox','Canva','GitHub','Packet Tracer','MS 365','CapCut','Huawei ICT','Cisco Netacad'];

function SkillBar({ name, pct, delay }: { name:string; pct:number; delay:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:'-40px' });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const bar = ref.current.querySelector<HTMLDivElement>('.skill-fill');
    if (bar) bar.style.transform = `scaleX(${pct/100})`;
  }, [inView, pct]);
  return (
    <motion.div ref={ref} initial={{ opacity:0, x:-16 }} animate={inView?{opacity:1,x:0}:{}}
      transition={{ duration:0.55, delay, ease:[0.22,1,0.36,1] }}>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium" style={{ color:'var(--text)' }}>{name}</span>
        <span className="text-xs font-bold" style={{ color:'var(--red)' }}>{pct}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ transition:`transform 1.1s ${delay*0.4+0.2}s cubic-bezier(0.22,1,0.36,1)` }} />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  return (
    <section id="skills" className="py-24 relative">
      <div className="blob w-[450px] h-[450px] left-[-8%] top-[20%]" style={{ background:'var(--red)', opacity:0.06 }} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div ref={ref} initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.6 }} className="mb-14">
          <span className="section-tag"><Zap size={11}/> Skills</span>
          <h2 className="section-title">What I bring <span className="gradient-text">to the table</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
          {/* Technical */}
          <div className="glass p-8">
            <div className="flex items-center gap-2 mb-7">
              <Zap size={16} style={{ color:'var(--red)' }} />
              <span className="font-display font-semibold text-sm" style={{ color:'var(--red)' }}>Technical Skills</span>
            </div>
            <div className="space-y-4">
              {TECH.map((s, i) => <SkillBar key={s.name} name={s.name} pct={s.pct} delay={i*0.04} />)}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="glass p-7">
              <div className="flex items-center gap-2 mb-6">
                <Brain size={16} style={{ color:'var(--red)' }} />
                <span className="font-display font-semibold text-sm" style={{ color:'var(--red)' }}>Soft Skills</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {SOFT.map(({ name, emoji }, i) => (
                  <motion.div key={name} initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }}
                    viewport={{ once:true }} transition={{ delay:i*0.06, duration:0.4 }}
                    className="glass glass-hover px-3 py-2.5 flex items-center gap-2 text-sm font-medium"
                    style={{ color:'var(--text)' }}>
                    <span>{emoji}</span>{name}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass p-6">
              <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color:'var(--muted)' }}>Tools & Platforms</div>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map(t => (
                  <span key={t} className="badge badge-dark text-xs">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
