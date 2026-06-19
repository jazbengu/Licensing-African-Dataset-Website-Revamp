import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LicenseGenerator } from './LicenseGenerator';

export function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenWelcomePopup');
    if (!hasSeenPopup) {
      setTimeout(() => setOpen(true), 500);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem('hasSeenWelcomePopup', 'true');
  };

  return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild>
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 backdrop-blur-sm"
                      style={{ backgroundColor: 'rgba(26,46,46,0.85)' }}
                  />
                </Dialog.Overlay>
                <Dialog.Content asChild>
                  <motion.div
                      initial={{ opacity: 0, scale: 0.92, y: 24 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: 24 }}
                      transition={{ type: 'spring', duration: 0.45, bounce: 0.2 }}
                      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92vw] max-w-5xl"
                  >
                    <div className="relative rounded-2xl shadow-2xl overflow-hidden" style={{ border: '2px solid rgba(249,168,38,0.3)' }}>
                      {/* Close button */}
                      <Dialog.Close asChild>
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full transition-all hover:scale-110"
                            style={{ backgroundColor: 'rgba(249,168,38,0.15)', color: '#F9A826' }}
                            aria-label="Close"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </Dialog.Close>

                      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">

                        {/* Left — welcome text */}
                        <div className="relative flex flex-col justify-between p-10 overflow-hidden" style={{ backgroundColor: '#1A2E2E' }}>
                          {/* Amber glow */}
                          <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-15"
                               style={{ background: 'radial-gradient(circle, #F9A826 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

                          <div className="relative z-10">
                            {/* Eyebrow */}
                            <div className="flex items-center gap-2 mb-5">
                              <div className="h-px w-8" style={{ backgroundColor: '#F9A826' }} />
                              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F9A826' }}>
                            Licensing African Datasets
                          </span>
                            </div>

                            <Dialog.Title className="font-extrabold text-white mb-5" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                              Welcome!
                            </Dialog.Title>

                            <Dialog.Description asChild>
                              <div className="text-sm space-y-4" style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
                                <p>
                                  Within the Licensing African Datasets project, the Data Science Law Lab builds frameworks, tools, and resources that help everyone in the data ecosystem do so equitably, responsibly and with confidence.
                                </p>

                                <ul className="space-y-3 mt-2">
                                  {[
                                    'Use the NOODL Licence to balance open access with your right to future returns.',
                                    'Understand in plain language what using a NOODL-licensed dataset means for your project.',
                                    'Get plain-language guidance on what data sharing means for your context.',
                                    'Explore policy briefs, guidance notes, and adoption evidence.',
                                  ].map(item => (
                                      <li key={item} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#F9A826' }} />
                                        <span>{item}</span>
                                      </li>
                                  ))}
                                </ul>
                              </div>
                            </Dialog.Description>
                          </div>

                          {/* Bottom link */}
                          <div className="relative z-10 mt-8 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                            <Link
                                to="/about"
                                onClick={handleClose}
                                className="inline-flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-70"
                                style={{ color: '#F9A826' }}
                            >
                              New here? Read our Information Guide
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>

                        {/* Right — licence generator */}
                        <div className="flex flex-col overflow-y-auto max-h-[80vh]" style={{ backgroundColor: '#F5F5F5' }}>
                          {/* Right header */}
                          <div className="px-8 pt-8 pb-4 border-b" style={{ borderColor: 'rgba(249,168,38,0.2)', backgroundColor: 'white' }}>
                            <p className="font-extrabold" style={{ color: '#1A2E2E', fontSize: '1rem' }}>Generate your licence notice</p>
                          </div>

                          <div className="p-8 flex-1">
                            <LicenseGenerator />
                          </div>

                          <div className="px-8 pb-8">
                            <button
                                onClick={handleClose}
                                className="w-full py-3.5 px-6 font-extrabold rounded-xl transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                style={{ background: 'linear-gradient(135deg, #F9A826 0%, #E19111 100%)', color: '#1A2E2E' }}
                            >
                              Start exploring <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
  );
}
