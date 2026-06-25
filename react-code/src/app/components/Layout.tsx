import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import {  ExternalLink } from "lucide-react";

import logo from "../../imports/fwdlicensingafricandatasetslogo/LICENSING AFRICAN DATASETS.png";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);



  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/noodl-framework', label: 'NOODL Framework' },
    { to: '/nwulite-obodo-license', label: 'View License' },
    { to: '/blog', label: 'Updates' },
  ];

  return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F5F5F5' }}>
        {/* Header/Navigation */}
        <header className="sticky top-0 z-40 w-full border-b backdrop-blur-lg shadow-sm" style={{ borderColor: 'rgba(38,129,129,0.2)', backgroundColor: 'rgba(255,255,255,0.97)' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md" style={{ background: 'linear-gradient(135deg, #268181 0%, #29D4AB 100%)' }}>
                  <img src={logo} alt={"lICENSING African Datasets"}/>
                </div>
                <span className="font-extrabold text-xl group-hover:opacity-70 transition-opacity" style={{ color: '#1A2E2E', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Licensing African Datasets
              </span>
              </Link>



              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map(link => {
                  if (link.to === '/about') {
                    return (
                        <div key="/about" className="relative" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
                          <Link to="/about"
                                className="text-sm font-semibold transition-all relative flex items-center gap-1"
                                style={{ color: isActive('/about') ? '#E19111' : '#2F4F4F' }}>
                            About
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginTop: 1 }}>
                              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {isActive('/about') && <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: '#F9A826' }} />}
                          </Link>

                          {aboutOpen && (
                              <div className="absolute top-full left-0 mt-0 w-44 rounded-xl border shadow-lg overflow-hidden z-50"
                                   style={{ backgroundColor: 'white', borderColor: '#E2ECEC' }}>
                                <Link to="/about?section=history"
                                      onClick={() => setAboutOpen(false)}
                                      className="block px-4 py-3 text-sm font-semibold transition-colors hover:bg-gray-50"
                                      style={{ color: '#2F4F4F', borderBottom: '1px solid #F0F4F4' }}>
                                  History
                                </Link>
                                <Link to="/about?section=press"
                                      onClick={() => setAboutOpen(false)}
                                      className="block px-4 py-3 text-sm font-semibold transition-colors hover:bg-gray-50"
                                      style={{ color: '#2F4F4F' }}>
                                  Press
                                </Link>
                              </div>
                          )}
                        </div>
                    );
                  }

                  return (
                      <Link key={link.to} to={link.to}
                            className="text-sm font-semibold transition-all relative"
                            style={{ color: isActive(link.to) ? '#E19111' : '#2F4F4F' }}>
                        {link.label}
                        {isActive(link.to) && <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: '#F9A826' }} />}
                      </Link>
                  );
                })}

                <Link to="/get-involved"
                      className="px-6 py-2.5 text-sm font-bold rounded-lg transition-all hover:scale-105 shadow-md"
                      style={{ background: 'linear-gradient(135deg, #F9A826 0%, #E19111 100%)', color: '#1A2E2E' }}>
                  Get Involved
                </Link>
              </nav>
              {/* Hamburger button — mobile only */}
              <button
                  className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg transition-colors"
                  style={{ backgroundColor: menuOpen ? '#F0FAF9' : 'transparent' }}
                  onClick={() => setMenuOpen(o => !o)}
                  aria-label="Toggle menu"
              >
                <span className="block w-5 h-0.5 transition-all" style={{ backgroundColor: '#355E5E', transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none' }} />
                <span className="block w-5 h-0.5 my-1 transition-all" style={{ backgroundColor: '#355E5E', opacity: menuOpen ? 0 : 1 }} />
                <span className="block w-5 h-0.5 transition-all" style={{ backgroundColor: '#355E5E', transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none' }} />
              </button>
            </div>

            {/* Mobile drawer */}
            {menuOpen && (
                <div className="md:hidden border-t pb-4" style={{ borderColor: '#E2ECEC' }}>
                  <nav className="flex flex-col pt-2">
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMenuOpen(false)}
                            className="px-4 py-3 text-sm font-semibold transition-colors hover:opacity-70 border-b"
                            style={{
                              color: isActive(link.to) ? '#E19111' : '#2F4F4F',
                              borderColor: '#F0F4F4',
                              backgroundColor: isActive(link.to) ? '#FFF8E7' : 'transparent',
                            }}
                        >
                          {link.label}
                        </Link>
                    ))}
                    <div className="px-4 pt-4">
                      <Link
                          to="/get-involved"
                          onClick={() => setMenuOpen(false)}
                          className="block w-full text-center px-6 py-3 text-sm font-bold rounded-lg shadow-md"
                          style={{ background: 'linear-gradient(135deg, #F9A826 0%, #E19111 100%)', color: '#1A2E2E' }}
                      >
                        Get Involved
                      </Link>
                    </div>
                  </nav>
                </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        {/* Footer */}
        <footer style={{ backgroundColor: "#1A2E2E" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-sm"
                       style={{ background: "linear-gradient(135deg, #F9A826, #E19111)", color: "#1A2E2E" }}>N</div>
                  <span className="font-extrabold text-white">NOODL</span>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  The Nwulite Obodo Open Data Licence — equitable sharing for African datasets.
                </p>
                <a href="https://datasciencelawlab.africa" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1.5 text-xs font-semibold hover:opacity-80 transition-opacity"
                   style={{ color: "#29D4AB" }}>
                  Data Science Law Lab <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest mb-5" style={{ color: "#F9A826" }}>Resources</h4>
                <ul className="space-y-3">
                  {[
                    { to: "/noodl-framework", label: "NOODL Framework" },
                    { to: "/nwulite-obodo-license", label: "View License" },
                    { to: "/noodl-framework/resources", label: "Resource Library" },
                    { to: "/noodl-framework/dictionary", label: "Equitable Dictionary" },
                  ].map(link => (
                      <li key={link.to}>
                        <Link to={link.to} className="text-sm font-medium transition-opacity"
                              style={{ color: "rgba(255,255,255,0.55)" }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; }}>
                          {link.label}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>

              {/* Community */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest mb-5" style={{ color: "#F9A826" }}>Community</h4>
                <ul className="space-y-3">
                  {[
                    { to: "/get-involved", label: "Get Involved" },
                    { to: "/blog", label: "Blog & Updates" },
                    { to: "/about", label: "About Us" },
                  ].map(link => (
                      <li key={link.to}>
                        <Link to={link.to} className="text-sm font-medium transition-opacity"
                              style={{ color: "rgba(255,255,255,0.55)" }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; }}>
                          {link.label}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest mb-5" style={{ color: "#F9A826" }}>Contact</h4>
                <ul className="space-y-3">
                  <li className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>Data Science Law Lab</li>
                  <li>
                    <a href="mailto:research@datasciencelawlab.africa"
                       className="text-sm font-medium transition-opacity"
                       style={{ color: "rgba(255,255,255,0.55)" }}
                       onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                       onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; }}>
                      research@datasciencelawlab.africa
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                 style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                © {new Date().getFullYear()} Licensing African Datasets · Data Science Law Lab
              </p>
              <div className="flex items-center gap-5">
                <Link to="/privacy" className="text-xs hover:opacity-80 transition-opacity"
                      style={{ color: "rgba(255,255,255,0.35)" }}>Privacy Policy</Link>
                <Link to="/terms" className="text-xs hover:opacity-80 transition-opacity"
                      style={{ color: "rgba(255,255,255,0.35)" }}>Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
}
