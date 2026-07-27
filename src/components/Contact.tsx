'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="blob w-[500px] h-[500px] left-[-8%] bottom-[-5%]" style={{ background:'var(--red3)', opacity:0.07 }} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div ref={ref} initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.6 }} className="mb-14">
          <span className="section-tag"><MessageSquare size={11}/> Contact</span>
          <h2 className="section-title">Let&apos;s work <span className="gradient-text">together</span></h2>
          <p className="text-base mt-3 max-w-xl" style={{ color:'var(--muted)' }}>
            Open to full-time roles, internships, freelance projects, and collaborations. I&apos;ll respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8">
          {/* Info */}
          <motion.div initial={{ opacity:0, x:-24 }} animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:0.65, delay:0.1 }} className="space-y-4">
            {[
              { icon:Mail,   label:'Email',    value:'geleramarceldrian@gmail.com', href:'mailto:geleramarceldrian@gmail.com' },
              { icon:Phone,  label:'Phone',    value:'0977-231-3162',               href:'tel:+639772313162' },
              { icon:MapPin, label:'Location', value:'San Jose del Monte, Bulacan', href:'#' },
            ].map(({ icon:Icon, label, value, href }) => (
              <a key={label} href={href}
                className="glass glass-hover flex items-center gap-4 p-5 block">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:'rgba(230,57,70,0.1)' }}>
                  <Icon size={18} style={{ color:'var(--red)' }}/>
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color:'var(--muted)' }}>{label}</div>
                  <div className="text-sm font-medium break-all" style={{ color:'var(--text)' }}>{value}</div>
                </div>
              </a>
            ))}

            {/* Availability */}
            <div className="glass p-5" style={{ borderColor:'rgba(230,57,70,0.3)', boxShadow:'0 0 24px rgba(230,57,70,0.06)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background:'var(--red)' }}/>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color:'var(--red)' }}>Available Now</span>
              </div>
              <p className="text-sm" style={{ color:'var(--muted)' }}>
                Actively seeking entry-level roles in IT Support, Safety Engineering, or Embedded Systems development.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity:0, x:24 }} animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:0.65, delay:0.2 }}>
            <div className="glass p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <CheckCircle size={52} style={{ color:'var(--red)' }}/>
                  <h3 className="font-display font-bold text-xl" style={{ color:'var(--text)' }}>Message sent!</h3>
                  <p className="text-sm text-center" style={{ color:'var(--muted)' }}>
                    Thanks, {form.name}. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSent(false)}
                    className="btn-outline px-5 py-2 rounded-xl text-sm font-semibold mt-2">
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-2" style={{ color:'var(--muted)' }}>Your Name *</label>
                      <input required className="form-input" placeholder="Juan dela Cruz"
                        value={form.name} onChange={e => setForm({...form, name:e.target.value})}/>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-2" style={{ color:'var(--muted)' }}>Email *</label>
                      <input required type="email" className="form-input" placeholder="you@example.com"
                        value={form.email} onChange={e => setForm({...form, email:e.target.value})}/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color:'var(--muted)' }}>Subject</label>
                    <input className="form-input" placeholder="Job Opportunity / Collaboration"
                      value={form.subject} onChange={e => setForm({...form, subject:e.target.value})}/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color:'var(--muted)' }}>Message *</label>
                    <textarea required rows={5} className="form-input resize-none"
                      placeholder="Tell me about the opportunity or project..."
                      value={form.message} onChange={e => setForm({...form, message:e.target.value})}/>
                  </div>
                  <motion.button type="submit"
                    whileHover={{ scale:1.01 }} whileTap={{ scale:0.98 }}
                    className="w-full py-3.5 rounded-xl btn-red font-bold flex items-center justify-center gap-2 text-sm">
                    <Send size={15}/> Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
