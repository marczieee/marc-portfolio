'use client';
import { motion } from 'framer-motion';
import { Code2, Link2, Mail, Heart, ArrowUp, Shield } from 'lucide-react';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top:0, behavior:'smooth' });
  return (
    <footer className="relative mt-8" style={{ borderTop:'1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-white text-sm"
              style={{ background:'linear-gradient(135deg,#C1121F,#E63946)' }}>M</div>
            <div>
              <div className="font-display font-bold text-sm" style={{ color:'var(--text)' }}>Marc Eldrian L. Gelera</div>
              <div className="text-xs flex items-center gap-1 mt-0.5" style={{ color:'var(--muted)' }}>
                <Shield size={10} style={{ color:'var(--red)' }}/> Safety Officer 2 · BS Computer Engineering
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { href:'https://linkedin.com/in/marc-eldrian-gelera', Icon:Link2, label:'LinkedIn' },
              { href:'https://github.com/marceldriangelera',         Icon:Code2, label:'GitHub'  },
              { href:'mailto:geleramarceldrian@gmail.com',           Icon:Mail,  label:'Email'   },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-9 h-9 rounded-xl glass flex items-center justify-center transition-all"
                style={{ color:'var(--muted)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='var(--red)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='var(--muted)'; }}>
                <Icon size={15}/>
              </a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button onClick={scrollTop} whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
            className="flex items-center gap-2 text-xs transition-colors"
            style={{ color:'var(--muted)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='var(--red)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='var(--muted)'; }}>
            <ArrowUp size={14}/> Back to top
          </motion.button>
        </div>

        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderTop:'1px solid var(--border)', color:'var(--muted)' }}>
          <span>© {new Date().getFullYear()} Marc Eldrian L. Gelera. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
