import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Download, Copy, CheckCircle, AlertTriangle } from 'lucide-react';

const sections = [
    { id: 'definitions',    label: 'Section 1 — Definitions' },
    { id: 'scope',          label: 'Section 2 — Scope' },
    { id: 'conditions',     label: 'Section 3 — License Conditions' },
    { id: 'disclaimer',     label: 'Section 4 — Disclaimer & Liability' },
    { id: 'termination',    label: 'Section 5 — Term & Termination' },
    { id: 'other',          label: 'Section 6 — Other Terms' },
    { id: 'interpretation', label: 'Section 7 — Interpretation' },
];

function SectionHeading({ id, number, title }: { id: string; number: string; title: string }) {
    return (
        <h2
            id={id}
            className="font-extrabold mt-12 mb-4 flex items-center gap-3 scroll-mt-36"
            style={{ color: '#1A2E2E', fontSize: '1.2rem' }}
        >
            <span
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #268181 0%, #29D4AB 100%)', color: 'white' }}
            >
                {number}
            </span>
            {title}
        </h2>
    );
}

function SubHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="font-bold mt-6 mb-2" style={{ color: '#268181', fontSize: '0.95rem' }}>
            {children}
        </h3>
    );
}

function Clause({ id, children }: { id: string; children: React.ReactNode }) {
    return (
        <p className="mb-3 text-sm leading-relaxed" style={{ color: '#4A6363' }}>
            <span className="font-semibold mr-1" style={{ color: '#268181' }}>{id}</span>
            {children}
        </p>
    );
}

function DefinitionEntry({ term, children }: { term: string; children: React.ReactNode }) {
    return (
        <div className="mb-4 pl-4 border-l-2" style={{ borderColor: '#29D4AB' }}>
            <p className="text-sm font-bold mb-1" style={{ color: '#355E5E' }}>{term}</p>
            <p className="text-sm leading-relaxed" style={{ color: '#4A6363' }}>{children}</p>
        </div>
    );
}

function NavSidebar({ active, onDownload }: { active: string; onDownload: () => void }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(
            'This dataset is licensed under the Nwulite Obodo Open Data License. View the license at: https://licensingafricandatasets.com/nwulite-obodo-license'
        ).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
    };

    return (
        <div className="sticky top-28 space-y-4">
            {/* Nav */}
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: '#E2ECEC' }}>
                <div className="px-4 py-3" style={{ backgroundColor: '#1A2E2E' }}>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F9A826' }}>Sections</p>
                </div>
                <nav className="bg-white py-2">
                    {sections.map(s => {
                        const isActive = active === s.id;
                        return (

                            <a key={s.id}
                               href={`#${s.id}`}
                               className="flex items-center gap-2 px-4 py-2 text-xs font-medium transition-all"
                               style={{
                                   color: isActive ? '#268181' : '#718096',
                                   backgroundColor: isActive ? '#F0FAF9' : 'transparent',
                                   borderLeft: isActive ? '3px solid #268181' : '3px solid transparent',
                               }}
                            >
                                {s.label}
                            </a>
                        );
                    })}
                </nav>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl border bg-white overflow-hidden" style={{ borderColor: '#E2ECEC' }}>
                <div className="px-4 py-3 border-b" style={{ borderColor: '#E2ECEC' }}>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#718096' }}>Quick Actions</p>
                </div>
                <div className="p-4 space-y-3">
                    <button
                        onClick={onDownload}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-semibold border transition-all"
                        style={{ borderColor: '#268181', color: '#268181', backgroundColor: 'white' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F0FAF9'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'white'; }}
                    >
                        <Download className="w-3.5 h-3.5" />
                        Download license
                    </button>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-semibold border transition-all"
                        style={{
                            borderColor: copied ? '#29D4AB' : '#E2ECEC',
                            color: copied ? '#29D4AB' : '#718096',
                            backgroundColor: 'white',
                        }}
                    >
                        {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? 'Copied!' : 'Copy license notice'}
                    </button>
                </div>
            </div>

            {/* Related */}
            <div className="rounded-2xl border bg-white p-4 space-y-2" style={{ borderColor: '#E2ECEC' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#718096' }}>Related</p>
                {[
                    { label: 'Dictionary', href: '/noodl-framework/dictionary' },
                    { label: 'Resource Library', href: '/noodl-framework/resources' },
                    { label: 'Split Sheet', href: '/noodl-framework/split-sheet' },
                ].map(l => (
                    <Link
                        key={l.href}
                        to={l.href}
                        className="flex items-center justify-between text-xs font-semibold hover:opacity-70 transition-opacity"
                        style={{ color: '#268181' }}
                    >
                        <span>{l.label}</span>
                        <span style={{ color: '#F9A826' }}>→</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export function LicenseContent() {
    const [activeSection, setActiveSection] = useState('definitions');

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY + 160;
            let current = sections[0].id;
            for (const s of sections) {
                const el = document.getElementById(s.id);
                if (el && el.offsetTop <= scrollY) current = s.id;
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Inside the License component, add:
    const licenseRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        const html2pdf = (await import('html2pdf.js')).default;
        const element = licenseRef.current;
        if (!element) return;

        const opt = {
            margin:      [15, 15, 15, 15] as [number, number, number, number],
            filename:    'NOODL-License-v1.0.pdf',
            image:       { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' as const},
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F8FAFA' }}>

            {/* Hero */}
            <div className="relative overflow-hidden py-20" style={{ backgroundColor: '#1A2E2E' }}>
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="licGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1.5" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#licGrid)" />
                    </svg>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
                     style={{ background: 'radial-gradient(circle, #F9A826 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
                    <nav className="flex items-center gap-2 text-white/60 text-sm mb-6">
                        <Link to="/noodl-framework" className="hover:text-white transition-colors">NOODL Framework</Link>
                        <span>›</span>
                        <Link to="/noodl-license" className="hover:text-white transition-colors">License</Link>
                        <span>›</span>
                        <span className="text-white">Full Text</span>
                    </nav>
                    <div className="flex items-center gap-3 mb-5">
                        <div className="h-px w-10" style={{ backgroundColor: '#F9A826' }} />
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F9A826' }}>The NOODL Licence</span>
                    </div>
                    <h1 className="font-extrabold text-white mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                        Nwulite Obodo<br />Open Data License
                    </h1>
                    <p className="font-bold" style={{ color: '#F9A826', fontSize: '1rem' }}>Version 1.0 — Full Text</p>
                </div>
            </div>

            {/* Body */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-14">
                <div className="flex flex-col lg:flex-row gap-10 items-start">

                    {/* License text */}
                    <div id="license-content" ref={licenseRef} className="flex-1 min-w-0 bg-white rounded-2xl border p-8 lg:p-12" style={{ borderColor: '#E2ECEC' }}>

                        {/* Preamble */}
                        <p className="text-sm leading-relaxed mb-8 pb-8 border-b" style={{ color: '#4A6363', borderColor: '#E2ECEC' }}>
                            This Nwulite Obodo Open Data License — Version 1.0 is between the Dataset Provider(s) and the Dataset Recipient(s) (collectively, the "Parties") who agree as follows:
                        </p>

                        {/* Section 1 */}
                        <SectionHeading id="definitions" number="1" title="Definitions" />
                        <DefinitionEntry term="Adapted Material">
                            means material subject to any ownership or exclusive possessory Rights that is derived from or based upon the Licensed Material and in which the Licensed Material is translated, altered, arranged, transformed, or otherwise modified in a manner requiring permission under the ownership or exclusive possessory Rights held by the Dataset Provider(s). For purposes of this License, Adapted Material includes Results.
                        </DefinitionEntry>
                        <DefinitionEntry term="Adapter's License">
                            means the license which the Dataset Recipient(s) applies to any ownership or exclusive possessory Rights in the Dataset Recipient(s)'s contributions to Adapted Material in accordance with the terms and conditions of this License.
                        </DefinitionEntry>
                        <DefinitionEntry term="Dataset Provider(s)">
                            means the individual(s) or entity(ies) granting rights under this License.
                        </DefinitionEntry>
                        <DefinitionEntry term="Data Recipient">
                            means: (i) any person(s) who is a citizen of and is resident in a Developing country, or in the case of entity(ies), a firm or body corporate registered and headquartered in a Developing country that serves a purpose connected to citizens in a Developing Country, who receives the Licensed Material directly or indirectly from a Data Provider(s) and agrees to the terms of this agreement; or (ii) any person(s) or entity(ies) for whom (i) does not explicitly apply. For the avoidance of doubt, Section 1(d)(i) does not apply to Developing country subsidiaries of global/international companies.
                        </DefinitionEntry>
                        <DefinitionEntry term="Developing Country">
                            means any country that is not classified as a "high-income" economy by the World Bank.
                        </DefinitionEntry>
                        <DefinitionEntry term="Exceptions and Limitations">
                            includes any legal exception or limitation statutorily imposed on or applicable to the Dataset Recipient(s)'s use, modification or sharing of all or any portion of the Licensed Material.
                        </DefinitionEntry>
                        <DefinitionEntry term="Licensed Material">
                            means the material received by a Data Recipient under this agreement.
                        </DefinitionEntry>
                        <DefinitionEntry term="Licensed Rights">
                            means the rights granted to the Dataset Recipient(s) subject to the terms and conditions of this License, which cover all Rights that apply to the Dataset Recipient(s)'s use of the Licensed Material and that the Dataset Provider(s) has authority to license.
                        </DefinitionEntry>
                        <DefinitionEntry term="Results">
                            means any outcome obtained by computational analysis of Data, including for example machine learning models and models' insights.
                        </DefinitionEntry>
                        <DefinitionEntry term="Rights">
                            means any right applicable in law to the Licensed Material, without regard to how the rights are labeled or categorized.
                        </DefinitionEntry>
                        <DefinitionEntry term="Share">
                            means to provide material to the public by any means or process that requires permission under the Licensed Rights, and to make material available to the public in any manner or form.
                        </DefinitionEntry>
                        <DefinitionEntry term="Term">
                            means the period specified in Section 5.1.
                        </DefinitionEntry>
                        <DefinitionEntry term="Use">
                            as a verb, means doing any act that is restricted or exclusively reserved by law or contract with respect to the Licensed Material whether in the original medium or any other; and includes without limitation distributing, copying, publicly performing, publicly displaying, and preparing Adapted Material from the Licensed Material, as well as modifying the Licensed Material as may be technically necessary to use it in a different mode or format.
                        </DefinitionEntry>

                        {/* Section 2 */}
                        <SectionHeading id="scope" number="2" title="Scope" />
                        <SubHeading>2.1 License Grant</SubHeading>
                        <Clause id="2.1.1">Subject to the terms and conditions of this License, the Dataset Provider(s) hereby grants Dataset Recipient(s) for the Term, a worldwide, royalty-free, non-sublicensable, non-exclusive, irrevocable license to exercise the Licensed Rights in the Licensed Material, to reproduce, Use, modify and/or share the Licensed Material and any Adapted Material, in whole or in part and in all media and formats whether now known or hereafter created, and to make technical modifications necessary to do so.</Clause>
                        <Clause id="2.1.2">This License does not apply to, and does not impose any restrictions on, any part of the Licensed Material that is subject to any Exception and Limitation.</Clause>
                        <Clause id="2.1.3">Offer from the Dataset Provider(s) — Licensed Material: Every recipient of the Licensed Material automatically receives an offer from the Dataset Provider(s) to exercise the Licensed Rights under the terms and conditions of this License.</Clause>
                        <Clause id="2.1.4">Additional offer from the Dataset Provider(s) — Adapted Material: Every recipient of Adapted Material from Dataset Recipient(s) automatically receives an offer from the Dataset Provider(s) to exercise the Licensed Rights in the Adapted Material under the conditions of the Adapter's License Dataset Recipient(s) apply.</Clause>
                        <Clause id="2.1.5">No downstream restrictions: Dataset Recipient(s) may not offer or impose any additional or different terms or conditions on, or apply any Effective Technological Measures to, the Licensed Material if doing so restricts exercise of the Licensed Rights by any recipient of the Licensed Material.</Clause>
                        <Clause id="2.1.6">No endorsement: Nothing in this License constitutes or may be construed as permission to assert or imply that Dataset Recipient(s) are, or that Dataset Recipient(s)'s use of the Licensed Material is, connected with, or sponsored, endorsed, or granted official status by, the Dataset Provider(s) or others designated to receive attribution.</Clause>
                        <SubHeading>2.2 Other Rights</SubHeading>
                        <Clause id="2.2.1">Moral rights, such as the right of integrity, are not licensed under this License, nor are publicity, privacy, and/or other similar personality rights; however, to the extent possible, the Dataset Provider(s) waives and/or agrees not to assert any such rights to the limited extent necessary to allow Dataset Recipient(s) to exercise the Licensed Rights.</Clause>
                        <Clause id="2.2.2">Patent and trademark rights are not licensed under this License.</Clause>
                        <Clause id="2.2.3">To the extent possible, the Dataset Provider(s) waives, in respect of the Data Recipient(s) in Section 1(d)(i) only, any right to collect royalties for the exercise of the Licensed Rights. In all other cases including for the Data Recipient(s) in Section 1(d)(ii), the Dataset Provider(s) expressly reserves any right to collect such royalties.</Clause>

                        {/* Section 3 */}
                        <SectionHeading id="conditions" number="3" title="License Conditions" />
                        <SubHeading>3.1 Attribution</SubHeading>
                        <Clause id="3.1.1">If Dataset Recipient(s) Share the Licensed Material (including in modified form), Dataset Recipient(s) must: retain identification of the creator(s) and any others designated to receive attribution; retain a copyright notice if applicable; retain a notice referring to this License and to the disclaimer of warranties; retain a URI or hyperlink to the Licensed Material to the extent reasonably practicable; indicate if the Licensed Material was modified; and indicate the Licensed Material is licensed under this License, including the text of or a URI to this License.</Clause>
                        <Clause id="3.1.2">Dataset Recipient(s) may satisfy the conditions in Section 3.1.1 in any reasonable manner based on the medium, means, and context in which Dataset Recipient(s) Share the Licensed Material.</Clause>
                        <Clause id="3.1.3">If requested by the Dataset Provider(s), Dataset Recipient(s) must remove any of the information required by Section 3.1.1 to the extent reasonably practicable.</Clause>
                        <SubHeading>3.2 ShareAlike</SubHeading>
                        <Clause id="3.2.1">The Adapter's License which such Dataset Recipient(s) apply must be a license with the same provisions as the License herein or a future, revised version, or a license compatible with this Nwulite Obodo Open Data License.</Clause>
                        <Clause id="3.2.2">Save under the conditions indicated in this paragraph, neither the Licensed Material nor the Adapted Material may be exported to and/or made publicly available in any medium or manner unless reasonable measures are undertaken to verify that the recipient is located in a Developing country. Export is permitted where such export is for the purpose of collaboration or enjoying a benefit agreed upon pursuant to paragraph 3.3, or for other purposes where the exporting person or entity retains meaningful control of the material.</Clause>
                        <Clause id="3.2.3">Dataset Recipient(s) must include the text of, or the URI or hyperlink to, the Adapter's License they apply.</Clause>
                        <Clause id="3.2.4">Dataset Recipient(s) may not offer or impose any additional or different terms or conditions on, or apply any Effective Technological Measures to, Adapted Material that restrict exercise of the rights granted under the Adapter's License.</Clause>
                        <p className="text-xs italic mb-4" style={{ color: '#9CA3AF' }}>For the avoidance of doubt, Section 3.2 applies only to the Dataset Recipient(s) indicated in Section 1(d)(i).</p>
                        <SubHeading>3.3 Sharing of Value or Benefits</SubHeading>
                        <Clause id="3.3.1">The Data Recipient(s) shall, prior to using, modifying or otherwise sharing, give or transfer to the Dataset Provider(s) the benefit or value indicated by the Dataset Provider(s) and supplied with the Licensed Material.</Clause>
                        <Clause id="3.3.2">The Data Recipient(s) shall also retain the statement on the designated benefit or value if supplied by the Dataset Provider(s) with the Licensed Material, in any reasonable manner requested by the Dataset Provider(s).</Clause>
                        <Clause id="3.3.3">The Data Recipient(s) shall also indicate if Dataset Recipient(s) modified the Licensed Material and retain an indication of any previous modifications.</Clause>
                        <Clause id="3.3.4">Dataset Recipient(s) may satisfy the conditions in Section 3.3.2 in any reasonable manner based on the medium, means, and context in which Dataset Recipient(s) Share the Licensed Material.</Clause>
                        <Clause id="3.3.5">Dataset Recipient(s) may not offer or impose any additional or different terms or conditions on, or apply any Effective Technological Measures to, Adapted Material that restrict exercise of the rights granted under the Adapter's License Dataset Recipient(s) apply.</Clause>
                        <p className="text-xs italic mb-4" style={{ color: '#9CA3AF' }}>For the avoidance of doubt, Section 3.3 applies only to the Dataset Recipient(s) indicated in Section 1(d)(ii).</p>

                        {/* Section 4 */}
                        <SectionHeading id="disclaimer" number="4" title="Disclaimer of Warranties and Limitation of Liability" />
                        <Clause id="4.1">Unless otherwise separately undertaken by the Dataset Provider(s), to the extent possible, the Dataset Provider(s) offers the Licensed Material as-is and as-available, and makes no representations or warranties of any kind concerning the Licensed Material, whether express, implied, statutory, or other. This includes, without limitation, warranties of title, merchantability, fitness for a particular purpose, non-infringement, absence of latent or other defects, accuracy, or the presence or absence of errors, whether or not known or discoverable.</Clause>
                        <Clause id="4.2">To the extent possible, in no event will the Dataset Provider(s) be liable to Dataset Recipient(s) on any legal theory (including, without limitation, negligence) or otherwise for any direct, special, indirect, incidental, consequential, punitive, exemplary, or other losses, costs, expenses, or damages arising out of this License or use of the Licensed Material, even if the Dataset Provider(s) has been advised of the possibility of such losses, costs, expenses, or damages.</Clause>
                        <Clause id="4.3">The disclaimer of warranties and limitation of liability provided above shall be interpreted in a manner that, to the extent possible, most closely approximates an absolute disclaimer and waiver of all liability.</Clause>

                        {/* Section 5 */}
                        <SectionHeading id="termination" number="5" title="Term and Termination" />
                        <Clause id="5.1">This License applies for the term of the Licensed Rights as stated under any law. However, if Dataset Recipient(s) fail to comply with this License, then Dataset Recipient(s)'s rights under this License terminate automatically.</Clause>
                        <Clause id="5.2">Where Dataset Recipient(s)'s right to use the Licensed Material has terminated under Section 5.1, it reinstates: (a) automatically as of the date the violation is cured, provided it is cured within 30 days of Dataset Recipient(s)'s discovery of the violation; or (b) upon express reinstatement by the Dataset Provider(s).</Clause>
                        <Clause id="5.3">For the avoidance of doubt, the Dataset Provider(s) may also offer the Licensed Material under separate terms or conditions or stop distributing the Licensed Material at any time; however, doing so will not terminate this License.</Clause>
                        <Clause id="5.4">In the case of Data Recipients indicated under Section 1(d)(i), this License and the rights granted hereunder will terminate automatically if any Developing country in which the Licensed Material is used, exported or distributed ceases to qualify as a Developing country, in which case this License will automatically terminate with respect to such country five (5) years after the date of such reclassification.</Clause>
                        <Clause id="5.5">Sections 1, 4, 5, 6, and 7 survive termination of this License.</Clause>

                        {/* Section 6 */}
                        <SectionHeading id="other" number="6" title="Other Terms and Conditions" />
                        <Clause id="6.1">The Dataset Provider(s) shall not be bound by any additional or different terms or conditions communicated by Dataset Recipient(s) unless expressly agreed.</Clause>
                        <Clause id="6.2">Any arrangements, understandings, or agreements regarding the Licensed Material not stated herein are separate from and independent of the terms and conditions of this Public License.</Clause>

                        {/* Section 7 */}
                        <SectionHeading id="interpretation" number="7" title="Interpretation" />
                        <Clause id="7.1">For the avoidance of doubt, this License does not, and shall not be interpreted to, reduce, limit, restrict, or impose conditions on any use of the Licensed Material that could lawfully be made without permission under this License.</Clause>
                        <Clause id="7.2">To the extent possible, if any provision of this License is deemed unenforceable, it shall be automatically reformed to the minimum extent necessary to make it enforceable. If the provision cannot be reformed, it shall be severed from this License without affecting the enforceability of the remaining terms and conditions.</Clause>
                        <Clause id="7.3">No term or condition of this License will be waived and no failure to comply consented to unless expressly agreed to by the Dataset Provider(s).</Clause>
                        <Clause id="7.4">Nothing in this License constitutes or may be interpreted as a limitation upon, or waiver of, any privileges and immunities that apply to the Dataset Provider(s) or Dataset Recipient(s), including from the legal processes of any jurisdiction or authority.</Clause>

                        {/* Footer */}
                        <div className="mt-12 pt-8 border-t flex items-start gap-3" style={{ borderColor: '#E2ECEC' }}>
                            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#F9A826' }} />
                            <p className="text-xs leading-relaxed" style={{ color: '#9CA3AF' }}>
                                <strong style={{ color: '#718096' }}>Legal notice:</strong> We are not a law firm and do not provide legal services. Distribution and use of the documents and information on this website does not create an attorney-client relationship. All information is provided on an "as-is" basis.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <NavSidebar active={activeSection} onDownload={handleDownload} />
                    </div>

                </div>
            </div>
        </div>
    );
}