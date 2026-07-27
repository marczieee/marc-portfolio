'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Shield, Calendar, MapPin, ChevronRight, Clock } from 'lucide-react';

const EVENTS = [
  {
    type:'OJT', title:'Technical Support Intern',
    org:'Grace Medical Center', location:'Bulacan, PH',
    period:'June – July 2025', duration:'2 months',
    color:'#38BDF8', badge:'badge-dark',
    Icon: Briefcase,
    points:[
      'Delivered hardware & software support for hospital computer systems using the BizBox ticketing platform — triaging incidents and communicating resolutions to clinical staff.',
      'Installed, configured, and maintained desktops, printers, and network-connected devices; applied security patches and performed peripheral repairs.',
      'Executed routine maintenance: backups, software updates, and asset inventory tracking — reducing system downtime across departments.',
    ],
  },
  {
    type:'Training', title:'Safety Officer 2 Certification',
    org:'DOLE-Accredited Training', location:'Philippines',
    period:'June 2026', duration:'Professional License',
    color:'var(--red)', badge:'badge-red',
    Icon: Shield,
    points:[
      'Completed SO2 training covering Occupational Safety and Health (OSH) frameworks, hazard identification, and risk management protocols.',
      'Acquired practical competency in HIRAC (Hazard Identification, Risk Assessment, and Control) methodologies.',
      'Gained skills in emergency preparedness planning and OSH compliance reporting per DOLE standards.',
    ],
  },
];

function EventCard({ ev, isLeft }: { ev: typeof EVENTS[0]; isLeft: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, x: isLeft ? -32 : 32 }}
      animate={inView ? { opacity:1, x:0 } : {}}
      transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
      className="glass glass-hover p-6 w-full max-w-lg">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`badge ${ev.badge}`}>{ev.type}</span>
        <span className="flex items-center gap-1 text-xs" style={{ color:'var(--muted)' }}>
          <Clock size={10}/> {ev.duration}
        </span>
      </div>
      <h3 className="font-display font-bold text-lg mb-1" style={{ color:'var(--text)' }}>{ev.title}</h3>
      <div className="text-sm font-semibold mb-1" style={{ color:ev.color }}>{ev.org}</div>
      <div className="flex items-center gap-3 text-xs mb-4 flex-wrap" style={{ color:'var(--muted)' }}>
        <span className="flex items-center gap-1"><Calendar size={10}/> {ev.period}</span>
        <span className="flex items-center gap-1"><MapPin size={10}/> {ev.location}</span>
      </div>
      <ul className="space-y-2">
        {ev.points.map((p, i) => (
          <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed" style={{ color:'var(--muted)' }}>
            <ChevronRight size={13} className="mt-0.5 flex-shrink-0" style={{ color:ev.color }}/>
            {p}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section id="experience" className="py-24 relative">
      <div className="blob w-[500px] h-[500px] right-0 top-[20%]" style={{ background:'var(--red3)', opacity:0.07 }} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div ref={ref} initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.6 }} className="mb-16 text-center">
          <span className="section-tag"><Briefcase size={11}/> Experience</span>
          <h2 className="section-title">Where I&apos;ve worked <span className="gradient-text">&amp; what I learned</span></h2>
        </motion.div>

        {/* Timeline container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Spine — desktop only */}
          <div className="hidden md:block timeline-spine" />

          <div className="space-y-12 md:space-y-0">
            {EVENTS.map((ev, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={ev.title} className="relative md:grid md:grid-cols-[1fr_60px_1fr] md:gap-6 md:mb-16">
                  {/* Left slot */}
                  <div className={`hidden md:flex ${isLeft ? 'justify-end' : ''}`}>
                    {isLeft && <EventCard ev={ev} isLeft={true} />}
                  </div>

                  {/* Dot */}
                  <div className="hidden md:flex flex-col items-center justify-start pt-6">
                    <motion.div
                      initial={{ scale:0 }} whileInView={{ scale:1 }} viewport={{ once:true }}
                      transition={{ duration:0.4, delay:0.2 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center z-10 flex-shrink-0"
                      style={{ background:`${ev.color}22`, border:`2px solid ${ev.color}` }}>
                      <ev.Icon size={15} style={{ color:ev.color }} />
                    </motion.div>
                  </div>

                  {/* Right slot */}
                  <div className={`hidden md:flex ${!isLeft ? '' : ''}`}>
                    {!isLeft && <EventCard ev={ev} isLeft={false} />}
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden">
                    <EventCard ev={ev} isLeft={false} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
