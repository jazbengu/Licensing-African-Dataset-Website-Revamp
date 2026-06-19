import { Download, Copy, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { LicenseGenerator } from '../components/LicenseGenerator';

function HowToUseTile() {
  const [copied, setCopied] = useState(false);
  const noticeText = 'This dataset is licensed under the Nwulite Obodo Open Data License. View the license at this link: https://licensingafricandatasets.com/nwulite-obodo-license.';

  const handleCopy = () => {
    navigator.clipboard.writeText(noticeText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
      <div className="rounded-2xl border-2 overflow-hidden sticky top-28" style={{ borderColor: '#F9A826' }}>
        {/* Tile header */}
        <div className="px-5 py-4" style={{ background: 'linear-gradient(135deg, #1A2E2E 0%, #2F4F4F 100%)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#F9A826' }}>Quick guide</p>
          <h3 className="font-extrabold text-white" style={{ fontSize: '1rem' }}>How to use the license</h3>
        </div>

        <div className="bg-white px-5 py-5 space-y-5">
          {/* Step 1 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#F9A826', color: '#1A2E2E' }}>1</span>
              <p className="text-sm font-bold" style={{ color: '#1A2E2E' }}>Insert this notice prominently</p>
            </div>
            <p className="text-xs mb-2" style={{ color: '#718096', lineHeight: 1.6 }}>
              Add this text in all relevant locations — README files, dataset cards, repository descriptions, and publications.
            </p>
            <div className="rounded-lg p-3 border text-xs" style={{ backgroundColor: '#FFF8E7', borderColor: '#F9A82660', color: '#1A2E2E', lineHeight: 1.6 }}>
              {noticeText}
            </div>
            <button
                onClick={handleCopy}
                className="mt-2 flex items-center gap-1.5 text-xs font-bold transition-colors"
                style={{ color: copied ? '#29D4AB' : '#F9A826' }}
            >
              {copied
                  ? <><CheckCircle className="w-3.5 h-3.5" /> Copied!</>
                  : <><Copy className="w-3.5 h-3.5" /> Copy notice text</>
              }
            </button>
          </div>

          <div className="border-t" style={{ borderColor: '#F5F5F5' }} />

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#F9A826', color: '#1A2E2E' }}>2</span>
              <p className="text-sm font-bold" style={{ color: '#1A2E2E' }}>Download and include a copy</p>
            </div>
            <p className="text-xs mb-3" style={{ color: '#718096', lineHeight: 1.6 }}>
              Download the license and put a copy in your project repository or dataset package.
            </p>
            <div className="space-y-2">
              {[{ label: 'Download (.txt)', sub: 'Plain text' }, { label: 'Download (.pdf)', sub: 'For sharing' }].map(btn => (
                  <a
                      key={btn.label}
                      href="#"
                      className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg border text-xs font-semibold transition-all hover:shadow-sm"
                      style={{ borderColor: '#E2ECEC', color: '#1A2E2E', backgroundColor: '#F5F5F5' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#F9A826'; (e.currentTarget as HTMLElement).style.backgroundColor = '#FFF8E7'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E2ECEC'; (e.currentTarget as HTMLElement).style.backgroundColor = '#F5F5F5'; }}
                  >
                    <span className="flex items-center gap-2"><Download className="w-3.5 h-3.5" style={{ color: '#F9A826' }} /> {btn.label}</span>
                    <span className="opacity-50 font-normal">{btn.sub}</span>
                  </a>
              ))}
            </div>
          </div>

          <div className="border-t" style={{ borderColor: '#F5F5F5' }} />

          {/* Help links */}
          <div className="space-y-2">
            {[
              { label: 'Equitable Licensing Dictionary', href: '/noodl-framework/dictionary' },
              { label: 'Plain-language explainer & summary', href: '/noodl-framework/resources' },
              { label: 'Dataset Creator Split Sheet', href: '/noodl-framework/split-sheet' },
            ].map(link => (
                <a key={link.href} href={link.href} className="flex items-center justify-between text-xs font-semibold hover:opacity-70 transition-opacity" style={{ color: '#268181' }}>
                  <span>{link.label}</span>
                  <span style={{ color: '#F9A826' }}>→</span>
                </a>
            ))}
          </div>
        </div>
      </div>
  );
}

export function ViewLicense() {
  return (
      <div className="w-full">
        {/* Header */}
        <section className="relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#1A2E2E' }}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle, #F9A826 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none opacity-8" style={{ background: 'radial-gradient(circle, #29D4AB 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ backgroundColor: '#F9A826' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F9A826' }}>The NOODL Licence</span>
            </div>
            <h1 className="font-extrabold text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Nwulite Obodo<br />Open Data License
            </h1>
            <p className="font-bold" style={{ color: '#F9A826', fontSize: '1.1rem' }}>Version 1.0</p>
          </div>
        </section>

        {/* License Generator Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="container mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#F9A826' }}>Generate your licence notice</p>
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2" style={{ borderColor: '#F9A826' }}>
              <LicenseGenerator />
            </div>
          </div>
        </section>

        {/* License Text + Sidebar */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'white' }}>
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col lg:flex-row gap-10 items-start">

              {/* License text — main column */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#F9A826' }}>Licence text</p>
                <h2 className="font-extrabold mb-6" style={{ color: '#1A2E2E', fontSize: '1.5rem', letterSpacing: '-0.01em' }}>NWULITE OBODO OPEN DATA LICENSE</h2>

                <div className="space-y-6" style={{ color: '#4A6363', lineHeight: 1.8 }}>
                  <p><strong style={{ color: '#1A2E2E' }}>Version 1.0</strong></p>
                  <p>
                    This is the Nwulite Obodo Open Data License (NOODL). It allows you to share African datasets openly while ensuring equitable returns for the communities and creators behind them.
                  </p>

                  <div>
                    <h3 className="font-extrabold mb-2" style={{ color: '#1A2E2E', fontSize: '1.05rem' }}>Purpose</h3>
                    <p>
                      The NOODL is designed to balance open access with fair benefit-sharing. It treats different users differently based on their context and resources, ensuring that openness leads to equity rather than extraction.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-extrabold mb-3" style={{ color: '#1A2E2E', fontSize: '1.05rem' }}>Key Provisions</h3>
                    <ul className="space-y-2">
                      {[
                        'Open access for researchers and organizations in developing countries',
                        'Benefit-sharing requirements for well-resourced users',
                        'Attribution requirements for all users',
                        'ShareAlike provisions to maintain equitable terms',
                        'Recognition of multiple contributors through the Dataset Creator Split Sheet',
                      ].map(item => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: '#F9A826' }} />
                            {item}
                          </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-extrabold mb-2" style={{ color: '#1A2E2E', fontSize: '1.05rem' }}>Full License Text</h3>
                    <p className="italic" style={{ color: '#9CA3AF' }}>
                      [The complete legal text of the NOODL License would appear here. This is a placeholder for demonstration purposes.]
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl border-l-4" style={{ backgroundColor: '#FFF8E7', borderColor: '#F9A826' }}>
                    <p className="font-bold mb-2" style={{ color: '#1A2E2E' }}>Need help understanding the license?</p>
                    <p className="text-sm">
                      Check out our <a href="/noodl-framework/dictionary" className="font-semibold underline hover:opacity-70" style={{ color: '#268181' }}>Equitable Licensing Dictionary</a> for plain-language explanations of all terms, or browse our <a href="/noodl-framework/resources" className="font-semibold underline hover:opacity-70" style={{ color: '#268181' }}>resource library</a> for guides and explainers.
                    </p>
                  </div>
                </div>
              </div>

              {/* How to use — sidebar */}
              <div className="w-full lg:w-72 flex-shrink-0">
                <HowToUseTile />
              </div>

            </div>
          </div>
        </section>

        {/* Legal disclaimer */}
        <section className="py-6 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: 'rgba(249,168,38,0.2)', backgroundColor: '#1A2E2E' }}>
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 flex-shrink-0" style={{ color: '#F9A826' }} />
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Legal notice:</strong> We are not a law firm and do not provide legal services. Distribution and use of the documents and information on this website does not create an attorney-client relationship. All information is provided on an "as-is" basis. We make no warranties regarding the information provided, and disclaim liability for damages resulting from its use.
              </p>
            </div>
          </div>
        </section>
      </div>
  );
}
