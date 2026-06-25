import { useState } from 'react';
import { Link } from 'react-router';
import { FileText, BookOpen, ChevronDown, ArrowRight } from 'lucide-react';

import creatorsImg from '../../imports/home_images/Licensing African Datasets_Content creators.png';
import communitiesImg from '../../imports/home_images/Licensing African Datasets_Language practitioners.png';
import researchersImg from '../../imports/home_images/Licensing African Datasets_Language innovators .jpg';
import policymakersImg from '../../imports/home_images/Licensing African Datasets_Content curators .png';

type Audience = 'creators' | 'communities' | 'researchers' | 'policymakers' | null;

const audienceResources: Record<NonNullable<Audience>, {
  heading: string;
  intro: string;
  links: { label: string; sublabel?: string; to: string }[];
}> = {
  creators: {
    heading: 'For Dataset Creators',
    intro: 'Everything you need to share your dataset openly — on terms that keep value with the communities behind it.',
    links: [
      { label: 'Use the NOODL Licence', sublabel: 'Apply the licence and generate your licence notice', to: '/nwulite-obodo-license' },
      { label: 'African Dataset Creation Split Sheet', sublabel: 'Document every contributor before you publish', to: '/noodl-framework/split-sheet' },
      { label: 'Guidance on determining benefits', sublabel: 'Decide what you want in return for use of your dataset', to: '/noodl-framework/resources' },
      { label: 'Equitable Licensing Dictionary', sublabel: 'Plain-language definitions of every key term', to: '/noodl-framework/dictionary' },
    ],
  },
  communities: {
    heading: 'For Communities & Data Sources',
    intro: 'Plain-language guidance on what data sharing means for your community — and what you have the right to ask for.',
    links: [
      { label: 'Plain-Language Explainer & Summary Sheet', sublabel: 'What the NOODL Licence says in plain terms', to: '/noodl-framework/resources' },
      { label: 'African Dataset Creation Split Sheet', sublabel: 'Make sure your contribution is documented and credited', to: '/noodl-framework/split-sheet' },
      { label: 'Community stories — In Practice', sublabel: 'See how other communities have used the framework', to: '/noodl-framework/in-practice' },
      { label: 'Equitable Licensing Dictionary', sublabel: 'Understand the language used in data sharing agreements', to: '/noodl-framework/dictionary' },
    ],
  },
  researchers: {
    heading: 'For Researchers & Dataset Users',
    intro: 'Understand what using a NOODL-licensed dataset means for your project — with a clear compliance path.',
    links: [
      { label: 'View the NOODL Licence', sublabel: 'Read the full licence text', to: '/nwulite-obodo-license' },
      { label: 'Equitable Licensing Dictionary', sublabel: 'Esp. Dataset Recipient 1(d)(i) vs 1(d)(ii), ShareAlike, Section 3.3', to: '/noodl-framework/dictionary' },
      { label: 'In Practice — researcher case studies', sublabel: 'How other researchers have navigated NOODL compliance', to: '/noodl-framework/in-practice' },
      { label: 'Resource Library', sublabel: 'Reports, explainers, and guidance notes', to: '/noodl-framework/resources' },
    ],
  },
  policymakers: {
    heading: 'For Policymakers & Institutions',
    intro: 'Policy briefs, adoption evidence, and a framework to help institutions move from principles to practice.',
    links: [
      { label: 'About the NOODL Framework', sublabel: 'The rationale, history, and design principles', to: '/noodl-framework' },
      { label: 'Policy briefs & reports', sublabel: 'Including the Open Future report and CC governance brief', to: '/noodl-framework/resources' },
      { label: 'In Practice — institutional case studies', sublabel: 'University and funder examples', to: '/noodl-framework/in-practice' },
      { label: 'Request a consultation', sublabel: 'Talk through NOODL adoption with the Data Science Law Lab', to: '/get-involved' },
    ],
  },
};


export function Home() {
  const [activeAudience, setActiveAudience] = useState<Audience>(null);

  const handleTileClick = (audience: NonNullable<Audience>) => {
    setActiveAudience(prev => prev === audience ? null : audience);
    if (activeAudience !== audience) {
      setTimeout(() => {
        document.getElementById('audience-panel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  };

  return (
      <div className="w-full">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #1A2E2E 0%, #2F4F4F 50%, #355E5E 100%)', minHeight: '92vh', display: 'flex', alignItems: 'center' }}>
          {/* Background grid */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="heroGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#heroGrid)" />
            </svg>
          </div>

          {/* Amber blob */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
               style={{ background: 'radial-gradient(circle, #F9A826 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 pointer-events-none"
               style={{ background: 'radial-gradient(circle, #29D4AB 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10 py-24">
            <div className="max-w-4xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12" style={{ backgroundColor: '#F9A826' }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F9A826' }}>
                Data Science Law Lab
              </span>
              </div>

              {/* Massive headline */}
              <h1 className="font-extrabold leading-none mb-8" style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', color: 'white', letterSpacing: '-0.02em' }}>
                Sharing African<br />
                datasets{' '}
                <span className="relative inline-block">
                <span style={{ color: '#F9A826' }}>equitably.</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0 5 Q50 0 100 5 T200 5" stroke="#F9A826" strokeWidth="2.5" fill="none" opacity="0.5"/>
                </svg>
              </span>
              </h1>

              <p className="mb-10 max-w-2xl" style={{ fontSize: '1.2rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.75)' }}>
                The NOODL Framework gives dataset creators, communities, researchers, and policymakers the tools to share African data openly — without giving up the right to benefit. Practical, plain-language, and built with the communities it serves.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                    to="/noodl-framework"
                    className="inline-flex items-center gap-2 px-8 py-4 font-extrabold rounded-xl hover:scale-105 transition-all shadow-xl text-base"
                    style={{ background: 'linear-gradient(135deg, #F9A826 0%, #E19111 100%)', color: '#1A2E2E' }}
                >
                  Explore the Framework <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                    to="/nwulite-obodo-license"
                    className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-xl border-2 transition-all hover:bg-white/10 text-base"
                    style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
                >
                  View the Licence
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* ── FRAMEWORK TOOLS STRIP ────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#F9A826' }}>The NOODL Framework</p>
                <h2 className="font-extrabold" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#1A2E2E', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                  Several tools.<br />One framework.
                </h2>
              </div>
              <Link to="/noodl-framework" className="flex-shrink-0 flex items-center gap-2 text-sm font-bold hover:opacity-70 transition-opacity" style={{ color: '#268181' }}>
                Full framework overview <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { num: '01', title: 'NOODL Licence', desc: 'Open sharing on equitable terms — treats different users differently.', to: '/nwulite-obodo-license', accent: '#268181' },
                { num: '02', title: 'Split Sheet', desc: 'A signed record of every contributor, their role, and their share.', to: '/noodl-framework/split-sheet', accent: '#29D4AB' },
                { num: '03', title: 'Equitable Dictionary', desc: 'Plain-language definitions of every term in equitable data licensing.', to: '/noodl-framework/dictionary', accent: '#F9A826' },
                { num: '04', title: 'Resource Library', desc: 'Explainers, briefs, reports, and videos as the framework grows.', to: '/noodl-framework/resources', accent: '#E19111' },
              ].map(tool => (
                  <Link
                      key={tool.num}
                      to={tool.to}
                      className="group flex flex-col justify-between p-6 rounded-2xl border-2 transition-all hover:shadow-xl hover:-translate-y-1 bg-white"
                      style={{ borderColor: '#E2ECEC' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = tool.accent; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E2ECEC'; }}
                  >
                    <div>
                      <div className="font-extrabold mb-4" style={{ fontSize: '2.5rem', lineHeight: 1, color: tool.accent, opacity: 0.25 }}>{tool.num}</div>
                      <h3 className="font-extrabold mb-2" style={{ color: '#1A2E2E', fontSize: '1.1rem' }}>{tool.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#4A6363' }}>{tool.desc}</p>
                    </div>
                    <div className="mt-5 flex items-center gap-1 text-xs font-bold transition-all group-hover:gap-2" style={{ color: tool.accent }}>
                      Open <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO ARE YOU ──────────────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'white' }}>
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#F9A826' }}>Your starting point</p>
              <h2 className="font-extrabold mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#1A2E2E', letterSpacing: '-0.02em' }}>
                Who are you?
              </h2>
              <p className="max-w-xl mx-auto" style={{ color: '#4A6363', fontSize: '1.05rem' }}>
                Pick your role — we'll show you exactly where to start.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {([
                { id: 'creators' as const,     label: 'CREATORS',     headline: "I'm building a dataset",             body: 'Use the NOODL Licence, find templates, and guidance to share your dataset openly without giving up your right to benefit.', icon: creatorsImg, accent: '#268181' },
                { id: 'communities' as const,  label: 'COMMUNITIES',  headline: "My community's data is being shared", body: 'Plain-language guidance on what data sharing means for your community and what you have the right to ask for.',           icon: communitiesImg,    accent: '#29D4AB' },
                { id: 'researchers' as const,  label: 'RESEARCHERS',  headline: "I want to use a dataset",            body: 'Understand what using a NOODL-licensed dataset means for your project, with a clear compliance path.',                  icon: researchersImg, accent: '#F9A826' },
                { id: 'policymakers' as const, label: 'POLICYMAKERS', headline: "I'm setting data sharing policy",    body: 'Policy briefs, adoption evidence, and a framework to help institutions move from principles to practice.',              icon: policymakersImg, accent: '#E19111' },
              ]).map(tile => {
                const isActive = activeAudience === tile.id;
                return (
                    <div
                        key={tile.id}
                        className="group cursor-pointer rounded-2xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1"
                        style={{
                          border: `2px solid ${isActive ? tile.accent : '#E2ECEC'}`,
                          transform: isActive ? 'translateY(-4px)' : undefined,
                          boxShadow: isActive ? `0 12px 40px ${tile.accent}30` : undefined,
                        }}
                        onClick={() => handleTileClick(tile.id)}
                    >
                      {/* Coloured top bar */}
                      <div className="h-2 w-full" style={{ backgroundColor: tile.accent }} />
                      <div className="p-6 bg-white">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 overflow-hidden transition-transform group-hover:scale-110"
                            style={{ backgroundColor: `${tile.accent}10` }}
                        >
                          <img
                              src={tile.icon}
                              alt={tile.label}
                              className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-extrabold uppercase tracking-widest block mb-2" style={{ color: tile.accent }}>{tile.label}</span>
                        <h3 className="font-extrabold mb-2" style={{ color: '#1A2E2E', fontSize: '1rem', lineHeight: 1.3 }}>{tile.headline}</h3>
                        <p className="text-sm mb-5 leading-relaxed" style={{ color: '#4A6363' }}>{tile.body}</p>
                        <button
                            className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 text-sm font-bold rounded-lg transition-all"
                            style={{
                              backgroundColor: isActive ? tile.accent : `${tile.accent}15`,
                              color: isActive ? 'white' : tile.accent,
                            }}
                        >
                          {isActive ? 'Hide resources' : 'Start here'}
                          <ChevronDown className={`w-4 h-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>
                );
              })}
            </div>

            {/* Expanded resource panel */}
            {activeAudience && (
                <div id="audience-panel" className="mt-6 rounded-2xl overflow-hidden border-2" style={{ borderColor: '#268181' }}>
                  <div className="px-8 py-5" style={{ background: 'linear-gradient(135deg, #1A2E2E 0%, #268181 100%)' }}>
                    <h3 className="font-extrabold text-white text-lg">{audienceResources[activeAudience].heading}</h3>
                    <p className="text-white/70 text-sm mt-1">{audienceResources[activeAudience].intro}</p>
                  </div>
                  <div className="bg-white px-8 py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {audienceResources[activeAudience].links.map(link => (
                          <Link
                              key={link.to + link.label}
                              to={link.to}
                              className="flex items-start justify-between gap-3 px-5 py-4 rounded-xl border transition-all hover:shadow-md group"
                              style={{ borderColor: '#E2ECEC', backgroundColor: '#F8FAFA' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#F9A826'; (e.currentTarget as HTMLElement).style.backgroundColor = '#FFF8E7'; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E2ECEC'; (e.currentTarget as HTMLElement).style.backgroundColor = '#F8FAFA'; }}
                          >
                            <div>
                              <p className="text-sm font-bold" style={{ color: '#1A2E2E' }}>{link.label}</p>
                              {link.sublabel && <p className="text-xs mt-0.5" style={{ color: '#718096' }}>{link.sublabel}</p>}
                            </div>
                            <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" style={{ color: '#F9A826' }} />
                          </Link>
                      ))}
                    </div>
                  </div>
                </div>
            )}

            {/* Shared destinations */}
            <div className="mt-5 rounded-2xl border px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ borderColor: '#F9A82650', backgroundColor: '#FFF8E7' }}>
              <p className="text-sm font-bold flex-shrink-0" style={{ color: '#1A2E2E' }}>All resources are available to everyone:</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/noodl-framework/dictionary" className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all hover:shadow-sm" style={{ borderColor: '#E19111', color: '#E19111', backgroundColor: 'white' }}>
                  <BookOpen className="w-3.5 h-3.5" /> Equitable Licensing Dictionary
                </Link>
                <Link to="/noodl-framework/resources" className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all hover:shadow-sm" style={{ borderColor: '#E19111', color: '#E19111', backgroundColor: 'white' }}>
                  <FileText className="w-3.5 h-3.5" /> Resource Library
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── APPROACH ─────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#1A2E2E' }}>
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#F9A826' }}>Approach & History</p>
                <h2 className="font-extrabold mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'white', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                  Openness alone does not guarantee equity.
                </h2>
                <p className="mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem' }}>
                  The Licensing African Datasets project began in 2024 out of a simple recognition: unconditional open licensing too often lets well-resourced actors extract African datasets while the communities closest to the data are left behind. Our work treats licensing as equitable sharing — starting with the NOODL Licence and growing into the wider NOODL Framework.
                </p>
                <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-7 py-3.5 font-bold rounded-xl hover:scale-105 transition-all shadow-xl"
                    style={{ background: 'linear-gradient(135deg, #F9A826 0%, #E19111 100%)', color: '#1A2E2E' }}
                >
                  Read the full story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Pull-quote block */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 text-9xl font-extrabold leading-none select-none" style={{ color: 'rgba(249,168,38,0.1)' }}>"</div>
                <blockquote className="rounded-2xl p-8 border relative z-10" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(249,168,38,0.2)' }}>
                  <p className="font-bold mb-6" style={{ fontSize: '1.25rem', color: 'white', lineHeight: 1.5 }}>
                    "Nwulite Obodo is Igbo for raising, reviving, and building up the community. The licence was named in Igbo — a deliberate choice to give an African licence a truly African name."
                  </p>
                  <footer className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: '#F9A826', color: '#1A2E2E' }}>CO</div>
                    <div>
                      <p className="font-bold text-sm text-white">Chijioke Okorie</p>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Data Science Law Lab</p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ── VIDEO ────────────────────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#F9A826' }}>Watch</p>
              <h2 className="font-extrabold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#1A2E2E', letterSpacing: '-0.02em' }}>
                Project Overview
              </h2>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4" style={{ borderColor: '#1A2E2E' }}>
              <div className="aspect-video">
                <iframe
                    src="https://www.youtube-nocookie.com/embed/4jRsglaeQfs"
                    title="LAD Project Overview Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <a
                  href="https://drive.google.com/file/d/1OqLstrvHnxwcjS-WAEUoNOfVYtZJEm2k/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold underline hover:opacity-70 transition-opacity"
                  style={{ color: '#268181' }}
              >
                View Transcript (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* ── GET INVOLVED ─────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ backgroundColor: '#F9A826', minHeight: '40vh', display: 'flex', alignItems: 'center' }}>
          {/* Large background text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="font-extrabold select-none whitespace-nowrap" style={{ fontSize: 'clamp(6rem, 20vw, 18rem)', color: 'rgba(26,46,46,0.06)', lineHeight: 1, letterSpacing: '-0.04em' }}>
            NOODL
          </span>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 py-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(26,46,46,0.5)' }}>Join the work</p>
                <h2 className="font-extrabold" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#1A2E2E', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                  Get Involved.
                </h2>
                <p className="mt-4 text-lg" style={{ color: 'rgba(26,46,46,0.65)' }}>
                  Share a story, collaborate, fund, or request a consultation.
                </p>
              </div>
              <Link
                  to="/get-involved"
                  className="flex-shrink-0 inline-flex items-center gap-3 px-10 py-5 font-extrabold rounded-2xl hover:scale-105 transition-all shadow-2xl text-lg whitespace-nowrap"
                  style={{ backgroundColor: '#1A2E2E', color: '#F9A826' }}
              >
                Get involved <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

      </div>
  );
}
