import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import logo from "../../imports/fwdlicensingafricandatasetslogo/LICENSING AFRICAN DATASETS.png";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map(link => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className="text-sm font-semibold transition-all relative"
                        style={{ color: isActive(link.to) ? '#E19111' : '#2F4F4F' }}
                    >
                      {link.label}
                      {isActive(link.to) && (
                          <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: '#F9A826' }} />
                      )}
                    </Link>
                ))}
                <Link
                    to="/get-involved"
                    className="px-6 py-2.5 text-sm font-bold rounded-lg transition-all hover:scale-105 shadow-md"
                    style={{ background: 'linear-gradient(135deg, #F9A826 0%, #E19111 100%)', color: '#1A2E2E' }}
                >
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
        <footer className="border-t mt-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A2E2E 0%, #2F4F4F 100%)' }}>
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="footerPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#footerPattern)" />
            </svg>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold text-white mb-3">About</h3>
                <p className="text-sm text-white/80 mb-4">
                  Building frameworks, tools, and resources for equitable African data sharing.
                </p>
                {/* Social links (Mozilla-inspired) */}
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform" style={{ backgroundColor: '#F9A826' }} aria-label="Twitter">
                    <svg className="w-4 h-4" fill="#1A2E2E" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform" style={{ backgroundColor: '#F9A826' }} aria-label="GitHub">
                    <svg className="w-4 h-4" fill="#1A2E2E" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform" style={{ backgroundColor: '#F9A826' }} aria-label="LinkedIn">
                    <svg className="w-4 h-4" fill="#1A2E2E" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/noodl-framework" className="text-sm text-white/80 hover:text-white transition-colors">
                      NOODL Framework
                    </Link>
                  </li>
                  <li>
                    <Link to="/nwulite-obodo-license" className="text-sm text-white/80 hover:text-white transition-colors">
                      View License
                    </Link>
                  </li>
                  <li>
                    <Link to="/noodl-framework/resources" className="text-sm text-white/80 hover:text-white transition-colors">
                      Resource Library
                    </Link>
                  </li>
                  <li>
                    <Link to="/noodl-framework/dictionary" className="text-sm text-white/80 hover:text-white transition-colors">
                      Dictionary
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-3">Community</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/get-involved" className="text-sm text-white/80 hover:text-white transition-colors">
                      Get Involved
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-sm text-white/80 hover:text-white transition-colors">
                      Blog & Updates
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-sm text-white/80 hover:text-white transition-colors">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-3">Contact</h3>
                <p className="text-sm text-white/80 mb-2">
                  Data Science Law Lab
                </p>
                <a href="mailto:research@datasciencelawlab.africa" className="text-sm text-white/80 hover:text-white transition-colors">
                  research@datasciencelawlab.africa
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/60">
                © {new Date().getFullYear()} Licensing African Datasets · Data Science Law Lab
              </p>
              <div className="flex gap-4 text-sm text-white/60">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
}
