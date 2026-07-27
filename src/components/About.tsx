'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, User, Target } from 'lucide-react';

const EDUCATION = [
  { school:'Bulacan State University', location:'Malolos, Bulacan', degree:'BS Computer Engineering', period:'Sept 2022 – June 2026' },
  { school:'Bulacan Standard Academy', location:'San Jose Del Monte, Bulacan', degree:'STEM Track', period:'June 2020 – Apr 2022' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section id="about" className="py-24 relative">
      <div className="blob w-[450px] h-[450px] right-[-5%] top-[5%]" style={{ background:'var(--red3)', opacity:0.07 }} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div ref={ref} initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }} className="mb-14">
          <span className="section-tag"><User size={11}/> About Me</span>
          <h2 className="section-title">The person behind <br/><span className="gradient-text">the engineer</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left */}
          <div className="space-y-5">
            {[0.1, 0.2].map((delay, i) => (
              <motion.div key={i} initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay }}>
                {i === 0 ? (
                  <div className="glass glass-hover p-7">
                    <p className="text-[15px] leading-[1.85]" style={{ color:'var(--muted)' }}>
                      I&apos;m a driven Computer Engineering student at{' '}
                      <span className="font-semibold" style={{ color:'var(--red)' }}>Bulacan State University</span>, blending deep technical knowledge with a commitment to people-first safety.
                      My OJT at <span className="font-semibold" style={{ color:'var(--red)' }}>Grace Medical Center</span> gave me real-world experience managing hospital IT infrastructure —
                      maintaining desktops, printers, and network devices while keeping downtime near zero.
                    </p>
                    <p className="text-[15px] leading-[1.85] mt-4" style={{ color:'var(--muted)' }}>
                      Outside support work, I build with my hands: PCB etching, embedded system projects, and autonomous robots.
                      My <span className="font-semibold" style={{ color:'var(--red)' }}>Safety Officer 2</span> certification rounds out a profile that bridges hardware, software, and the human dimension of engineering.
                    </p>
                  </div>
                ) : (
                  <div className="glass glass-hover p-7">
                    <div className="flex items-center gap-2 mb-4">
                      <Target size={16} style={{ color:'var(--red)' }} />
                      <span className="font-display font-semibold text-sm" style={{ color:'var(--red)' }}>Career Objective</span>
                    </div>
                    <p className="text-[15px] leading-[1.85]" style={{ color:'var(--muted)' }}>
                      To contribute to technology-driven organizations where <em>safety, reliability, and innovation</em> intersect.
                      I aim to apply my engineering foundation and OSH expertise to build systems that protect and empower people — from hospitals to factories to smart cities.
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right */}
          <div className="space-y-5">
            <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.15 }}>
              <div className="glass glass-hover p-7">
                <div className="flex items-center gap-2 mb-5">
                  <GraduationCap size={16} style={{ color:'var(--red)' }} />
                  <span className="font-display font-semibold text-sm" style={{ color:'var(--red)' }}>Education</span>
                </div>
                <div className="space-y-5">
                  {EDUCATION.map((edu, i) => (
                    <div key={i} className={i < EDUCATION.length-1 ? 'pb-5 border-b' : ''} style={{ borderColor:'var(--border)' }}>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <h3 className="font-display font-semibold text-[15px]" style={{ color:'var(--text)' }}>{edu.school}</h3>
                          <p className="text-sm font-medium mt-0.5" style={{ color:'var(--red)' }}>{edu.degree}</p>
                          <div className="flex items-center gap-1 mt-1.5 text-xs" style={{ color:'var(--muted)' }}>
                            <MapPin size={11}/> {edu.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs whitespace-nowrap" style={{ color:'var(--muted)' }}>
                          <Calendar size={11}/> {edu.period}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.25 }}>
              <div className="glass glass-hover p-7">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label:'Location',  value:'Bulacan, PH'       },
                    { label:'Degree',    value:'BS CompEng'         },
                    { label:'Languages', value:'Filipino, English'  },
                    { label:'Status',    value:'Open to Work 🟢'   },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl p-4" style={{ background:'rgba(255,255,255,0.03)' }}>
                      <div className="text-xs mb-1" style={{ color:'var(--muted)' }}>{label}</div>
                      <div className="text-sm font-semibold" style={{ color:'var(--text)' }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
