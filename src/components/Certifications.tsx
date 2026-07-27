'use client';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Award, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';

const CERTS = [
  // Professional
  { title:'Safety Officer 2 (SO2)', issuer:'DOLE Accredited Provider', date:'June 2026', cat:'Safety', accent:'#E63946', emoji:'🦺', img:'/certs/so2.jpg', highlight:true, desc:'Occupational Safety & Health, HIRAC, emergency preparedness, and risk management.' },
  // Huawei
  { title:'AI Basic: Overview of AI', issuer:'Huawei Talent (CRA)', date:'Dec 2024', cat:'AI', accent:'#F87171', emoji:'🤖', img:'/certs/huawei_ai.png', desc:'AI foundations and machine learning concepts.' },
  { title:'Cloud Basics: Dev & Concepts', issuer:'Huawei ICT Academy', date:'May 2025', cat:'Cloud', accent:'#38BDF8', emoji:'☁️', img:'/certs/huawei_cloud.png', desc:'Cloud computing fundamentals and deployment models.' },
  { title:'Dev & Concepts of Cloud Computing', issuer:'Huawei Talent', date:'May 2025', cat:'Cloud', accent:'#60A5FA', emoji:'🌐', img:'/certs/huawei_network.png', desc:'Advanced cloud computing concepts.' },
  { title:'Network Layer Protocols (Micro)', issuer:'Huawei Certification', date:'Nov 2025', cat:'Networking', accent:'#818CF8', emoji:'🔗', img:'/certs/dsp.png', desc:'Routing, packet switching, and network protocols.' },
  { title:'HCIA-AI V4.0 Course', issuer:'Huawei ICT Academy', date:'Sept 2025', cat:'AI', accent:'#FB923C', emoji:'🧠', img:'/certs/huawei_ict.png', desc:'Huawei AI certification course covering AI infrastructure.' },
  // Cisco
  { title:'Networking Basics', issuer:'Cisco Networking Academy', date:'Feb 2025', cat:'Networking', accent:'#34D399', emoji:'📡', img:'/certs/cisco.png', desc:'Foundational networking, OSI model, Cisco infrastructure.' },
  // BulSU Seminars
  { title:'UPLINK: Software Test Automation', issuer:'BulSU – Bulacan State University', date:'Mar 2026', cat:'Dev', accent:'#C8F135', emoji:'⚙️', img:'/certs/uplink.png', desc:'Software testing, quality assurance, and automation.' },
  { title:'Level Up: Beyond the Degree', issuer:'BulSU', date:'Jan 2026', cat:'Career', accent:'#FFD166', emoji:'🚀', img:'/certs/level_up.jpg', desc:"Workers' rights, responsibilities, and workplace issues." },
  { title:'Becoming You: Personality Dev', issuer:'BulSU', date:'Jan 2026', cat:'Soft Skills', accent:'#F472B6', emoji:'✨', img:'/certs/becoming_you.jpg', desc:'Personality skills development and personal branding.' },
  { title:'REACTivate: Mobile App Dev', issuer:'BulSU', date:'Jan 2026', cat:'Dev', accent:'#A78BFA', emoji:'📱', img:'/certs/react.jpg', desc:'Mobile application development through React Native.' },
  { title:'Own the Clock: Time Management', issuer:'BulSU', date:'Jan 2026', cat:'Soft Skills', accent:'#FBBF24', emoji:'⏰', img:'/certs/own_the_clock.jpg', desc:'Time management and stress reduction strategies.' },
  { title:'DevX: App Development', issuer:'BulSU', date:'Jan 2026', cat:'Dev', accent:'#6EE7B7', emoji:'💻', img:'/certs/devx.jpg', desc:'Powering ideas through app development and machine learning.' },
  { title:'Learn, Build, Launch: Web Dev', issuer:'BulSU', date:'Jan 2026', cat:'Dev', accent:'#93C5FD', emoji:'🌍', img:'/certs/learn_build.jpg', desc:'Modern web development fundamentals.' },
  { title:'PANDAY: Shaping Leaders', issuer:'BulSU', date:'Jan 2026', cat:'Leadership', accent:'#E63946', emoji:'👑', img:'/certs/panday.jpg', desc:'Leadership development beyond the code.' },
  { title:'Speak Up to Stand Out', issuer:'BulSU', date:'Jan 2026', cat:'Soft Skills', accent:'#FCA5A5', emoji:'🎤', img:'/certs/speak_up.jpg', desc:'Building strong communication skills.' },
  { title:'HIBLA: Machine Learning', issuer:'BulSU', date:'Jan 2026', cat:'AI', accent:'#67E8F9', emoji:'🔬', img:'/certs/hibla.jpg', desc:'Weaving intelligence through machine learning.' },
  { title:'Unlock the Path: Career', issuer:'BulSU', date:'Feb 2026', cat:'Career', accent:'#86EFAC', emoji:'🔓', img:'/certs/unlock.jpg', desc:'Shape your career and own your future.' },
];

const CATS_C = ['All','Safety','AI','Cloud','Networking','Dev','Career','Soft Skills','Leadership'];

function CertLightbox({ cert, onClose, onPrev, onNext }: { cert: typeof CERTS[0]; onClose:()=>void; onPrev:()=>void; onNext:()=>void }) {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background:'rgba(0,0,0,0.92)', backdropFilter:'blur(16px)' }}
      onClick={onClose}>
      <motion.div initial={{ scale:0.85, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.85, y:20 }}
        className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ boxShadow:`0 32px 80px ${cert.accent}30` }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center text-white"
          style={{ background:'rgba(0,0,0,0.7)' }}>
          <X size={16}/>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cert.img} alt={cert.title} className="w-full h-auto max-h-[70vh] object-contain"
          style={{ background:'#fff' }}/>
        <div className="p-4 flex items-center justify-between" style={{ background:'var(--bg2)' }}>
          <div>
            <div className="font-display font-bold text-sm" style={{ color:'var(--text)' }}>{cert.title}</div>
            <div className="text-xs mt-0.5" style={{ color:cert.accent }}>{cert.issuer} · {cert.date}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={onPrev} className="w-8 h-8 rounded-lg glass flex items-center justify-center" style={{ color:'var(--muted)' }}><ChevronLeft size={15}/></button>
            <button onClick={onNext} className="w-8 h-8 rounded-lg glass flex items-center justify-center" style={{ color:'var(--muted)' }}><ChevronRight size={15}/></button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certifications() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<number|null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  const visible = filter==='All' ? CERTS : CERTS.filter(c=>c.cat===filter);

  const prev = () => {
    if (selected === null) return;
    const idx = CERTS.findIndex((_,i)=> i===selected);
    setSelected((idx-1+CERTS.length)%CERTS.length);
  };
  const next = () => {
    if (selected === null) return;
    const idx = CERTS.findIndex((_,i)=> i===selected);
    setSelected((idx+1)%CERTS.length);
  };

  return (
    <section id="certifications" className="py-24 relative">
      <div className="blob w-[500px] h-[500px] right-[-5%] bottom-0" style={{ background:'var(--red3)', opacity:0.07 }} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div ref={ref} initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.6 }} className="mb-14">
          <span className="section-tag"><Award size={11}/> Certifications</span>
          <h2 className="section-title">Credentials & <span className="gradient-text">training</span></h2>
          <p className="text-sm mt-2" style={{ color:'var(--muted)' }}>Click any certificate to view full image</p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATS_C.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
              style={filter===cat
                ? { background:'linear-gradient(135deg,#C1121F,#E63946)', color:'#fff', border:'none' }
                : { background:'rgba(255,255,255,0.03)', color:'var(--muted)', border:'1px solid var(--border)' }}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((c, i) => {
              const globalIdx = CERTS.indexOf(c);
              return (
                <motion.div key={c.title} layout
                  initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                  exit={{ opacity:0, scale:0.88 }}
                  transition={{ duration:0.35, delay:i*0.04 }}>
                  <div
                    onClick={() => setSelected(globalIdx)}
                    className="glass glass-hover cursor-pointer h-full flex flex-col overflow-hidden group"
                    style={c.highlight ? { borderColor:'rgba(230,57,70,0.4)', boxShadow:'0 0 24px rgba(230,57,70,0.08)' } : {}}>
                    {/* Cert image preview */}
                    <div className="relative h-32 overflow-hidden" style={{ background:'#fff' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.img} alt={c.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"/>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-bold"
                        style={{ background:'rgba(0,0,0,0.55)' }}>
                        Click to view
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-3 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-1.5">
                        <span className="text-lg">{c.emoji}</span>
                        {c.highlight && <span className="badge badge-red text-[9px]">★ Featured</span>}
                      </div>
                      <h3 className="font-display font-semibold text-xs leading-tight mb-1" style={{ color:'var(--text)' }}>{c.title}</h3>
                      <p className="text-[10px] font-semibold mb-1 flex-1" style={{ color:c.accent }}>{c.issuer}</p>
                      <div className="flex items-center gap-1 text-[10px] mt-auto" style={{ color:'var(--muted)' }}>
                        <Calendar size={9}/> {c.date}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <CertLightbox
            cert={CERTS[selected]}
            onClose={() => setSelected(null)}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
