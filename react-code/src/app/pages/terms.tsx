import { Link } from 'react-router';

export function TermsOfService() {
    return (
        <div className="w-full" style={{ backgroundColor: '#F5F5F5' }}>
            {/* Hero */}
            <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#1A2E2E' }}>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10"
                     style={{ background: 'radial-gradient(circle, #F9A826 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
                <div className="container mx-auto max-w-3xl relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="h-px w-10" style={{ backgroundColor: '#F9A826' }} />
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F9A826' }}>Legal</span>
                    </div>
                    <h1 className="font-extrabold text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                        Terms of Service
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Last updated: June 2025</p>
                </div>
            </section>

            {/* Content */}
            <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="rounded-2xl bg-white p-8 sm:p-12 space-y-10" style={{ border: '1px solid #E2ECEC' }}>

                    <section>
                        <p className="text-base leading-relaxed" style={{ color: '#4A6363' }}>
                            These Terms of Service govern your use of{' '}
                            <a href="https://licensingafricandatasets.com" className="underline hover:opacity-70" style={{ color: '#268181' }}>licensingafricandatasets.com</a>,
                            operated by the Data Science Law Lab at the University of Pretoria. By using this site, you agree to these terms.
                        </p>
                    </section>

                    {[
                        {
                            title: 'About this site',
                            content: (
                                <p className="text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    Licensing African Datasets is a research project. This site publishes open educational and legal resources — including the Nwulite Obodo Open Data Licence (NOODL), the NOODL Framework, the Resource Library, and related tools — to support equitable sharing of African datasets. It is not a commercial service.
                                </p>
                            ),
                        },
                        {
                            title: 'Use of content',
                            content: (
                                <div className="space-y-3 text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    <p>The content on this site — including the NOODL Licence text, framework documentation, explainers, and written resources — is made available under a{' '}
                                        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70" style={{ color: '#268181' }}>Creative Commons Attribution 4.0 International (CC BY 4.0)</a> licence unless otherwise stated.
                                    </p>
                                    <p>You are free to share and adapt the content for any purpose, including commercial use, provided you give appropriate credit to Licensing African Datasets and the Data Science Law Lab.</p>
                                    <p>Some resources link to third-party materials — those are governed by their own licences and terms.</p>
                                </div>
                            ),
                        },
                        {
                            title: 'No legal advice',
                            content: (
                                <p className="text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    Nothing on this site constitutes legal advice. The NOODL Licence, framework documents, and all other resources are provided for informational and educational purposes only. If you need legal advice about licensing, data governance, or intellectual property, please consult a qualified legal professional in your jurisdiction.
                                </p>
                            ),
                        },
                        {
                            title: 'Accuracy of information',
                            content: (
                                <p className="text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    We aim to keep information accurate and up to date. However, the law and practice in this area are evolving, and we cannot guarantee that all content on this site is current or complete. We recommend verifying any legal or regulatory information independently before relying on it.
                                </p>
                            ),
                        },
                        {
                            title: 'External links',
                            content: (
                                <p className="text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    This site links to external websites, including third-party publications, datasets, and tools. We are not responsible for the content, accuracy, or practices of external sites. Links do not constitute endorsement.
                                </p>
                            ),
                        },
                        {
                            title: 'Limitation of liability',
                            content: (
                                <p className="text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    To the fullest extent permitted by law, the Data Science Law Lab and the University of Pretoria accept no liability for any loss or damage arising from your use of this site or reliance on its content. The site is provided on an "as is" basis without warranties of any kind.
                                </p>
                            ),
                        },
                        {
                            title: 'Changes to these terms',
                            content: (
                                <p className="text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    We may update these terms from time to time. When we do, we will revise the date at the top of this page. Continued use of the site after changes constitutes acceptance of the updated terms.
                                </p>
                            ),
                        },
                        {
                            title: 'Governing law',
                            content: (
                                <p className="text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    These terms are governed by the laws of the Republic of South Africa. Any disputes arising from your use of this site are subject to the jurisdiction of the South African courts.
                                </p>
                            ),
                        },
                        {
                            title: 'Contact',
                            content: (
                                <p className="text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    Questions about these terms can be directed to the Data Science Law Lab at{' '}
                                    <a href="mailto:research@datasciencelawlab.africa" className="underline hover:opacity-70" style={{ color: '#268181' }}>research@datasciencelawlab.africa</a>.
                                </p>
                            ),
                        },
                    ].map(({ title, content }) => (
                        <section key={title}>
                            <h2 className="font-extrabold mb-4" style={{ color: '#1A2E2E', fontSize: '1.15rem', letterSpacing: '-0.01em' }}>{title}</h2>
                            {content}
                        </section>
                    ))}

                </div>

                <div className="mt-8 flex flex-wrap gap-4 text-sm">
                    <Link to="/privacy" className="underline hover:opacity-70" style={{ color: '#268181' }}>Privacy Policy</Link>
                    <span style={{ color: '#9CA3AF' }}>·</span>
                    <Link to="/" className="underline hover:opacity-70" style={{ color: '#268181' }}>Back to home</Link>
                </div>
            </div>
        </div>
    );
}