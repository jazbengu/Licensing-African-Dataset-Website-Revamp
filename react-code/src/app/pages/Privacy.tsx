import { Link } from 'react-router';

export function PrivacyPolicy() {
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
                        Privacy Policy
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Last updated: June 2025</p>
                </div>
            </section>

            {/* Content */}
            <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="rounded-2xl bg-white p-8 sm:p-12 space-y-10" style={{ border: '1px solid #E2ECEC' }}>

                    <section>
                        <p className="text-base leading-relaxed" style={{ color: '#4A6363' }}>
                            This Privacy Policy explains how Licensing African Datasets, a project of the Data Science Law Lab at the University of Pretoria, handles information when you visit{' '}
                            <a href="https://licensingafricandatasets.com" className="underline hover:opacity-70" style={{ color: '#268181' }}>licensingafricandatasets.com</a>.
                            We are committed to being transparent about what we collect and why.
                        </p>
                    </section>

                    {[
                        {
                            title: 'What we collect',
                            content: (
                                <div className="space-y-4 text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    <p>We use <strong style={{ color: '#355E5E' }}>Google Analytics</strong> to understand how visitors use this site. Google Analytics collects:</p>
                                    <ul className="space-y-2 pl-2">
                                        {[
                                            'General geographic location (country and city level) — we do not collect precise location data',
                                            'Which pages you visit and how long you spend on them',
                                            'How you arrived at the site (e.g. search engine, direct link, referral)',
                                            'Clicks on links and buttons',
                                            'Your browser type and device category (desktop, mobile, tablet)',
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-3">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#F9A826' }} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p>We do <strong style={{ color: '#355E5E' }}>not</strong> collect your name, email address, or any information that identifies you personally. We do not sell data or share it with third parties for advertising purposes.</p>
                                </div>
                            ),
                        },
                        {
                            title: 'Why we collect it',
                            content: (
                                <div className="space-y-3 text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    <p>We use analytics solely to understand which parts of the site are useful to visitors and which need improvement. This helps us prioritise what resources to add, how to structure content, and whether the site is reaching the communities it is built for.</p>
                                    <p>We are a research project, not a commercial product. We have no interest in your personal data beyond making this site as useful as possible.</p>
                                </div>
                            ),
                        },
                        {
                            title: 'Cookies',
                            content: (
                                <div className="space-y-3 text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    <p>Google Analytics sets cookies in your browser to distinguish visitors and track sessions. These cookies do not store personally identifiable information.</p>
                                    <p>You can opt out of Google Analytics tracking at any time by installing the{' '}
                                        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70" style={{ color: '#268181' }}>Google Analytics Opt-out Browser Add-on</a>,
                                        or by using a browser extension that blocks analytics scripts.
                                    </p>
                                </div>
                            ),
                        },
                        {
                            title: 'Third-party services',
                            content: (
                                <div className="space-y-3 text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    <p>This site uses Google Analytics, a service provided by Google LLC. Google may process data on servers outside your country of residence. Google's privacy practices are governed by the{' '}
                                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70" style={{ color: '#268181' }}>Google Privacy Policy</a>.
                                    </p>
                                    <p>We do not use any other third-party analytics, advertising, or tracking services.</p>
                                </div>
                            ),
                        },
                        {
                            title: 'Data retention',
                            content: (
                                <p className="text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    Analytics data is retained for 14 months within Google Analytics, after which it is automatically deleted. We do not retain any personally identifiable information because we do not collect it.
                                </p>
                            ),
                        },
                        {
                            title: 'Your rights',
                            content: (
                                <p className="text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    Depending on your jurisdiction, you may have rights to access, correct, or request deletion of personal data. Since we do not collect personal data directly, these rights would apply to data held by Google. You can manage Google's use of your data through{' '}
                                    <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70" style={{ color: '#268181' }}>Google's privacy controls</a>.
                                </p>
                            ),
                        },
                        {
                            title: 'Changes to this policy',
                            content: (
                                <p className="text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    If we change how we collect or use data, we will update this page and revise the date at the top. We will not start collecting new categories of data without updating this policy first.
                                </p>
                            ),
                        },
                        {
                            title: 'Contact',
                            content: (
                                <p className="text-base leading-relaxed" style={{ color: '#4A6363' }}>
                                    If you have questions about this policy, please contact the Data Science Law Lab at{' '}
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
                    <Link to="/termsofservice" className="underline hover:opacity-70" style={{ color: '#268181' }}>Terms of Service</Link>
                    <span style={{ color: '#9CA3AF' }}>·</span>
                    <Link to="/" className="underline hover:opacity-70" style={{ color: '#268181' }}>Back to home</Link>
                </div>
            </div>
        </div>
    );
}