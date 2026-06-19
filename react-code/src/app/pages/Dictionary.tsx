import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';

interface DictionaryEntry {
    term: string;
    category: 'Legal' | 'Data Governance' | 'NOODL' | 'Technical' | 'Policy';
    definition: string;
    relatedTerms?: string[];
    example?: string;
}

const entries: DictionaryEntry[] = [
    // A
    {
        term: 'Attribution',
        category: 'Legal',
        definition: 'The requirement to give appropriate credit to the original creator or rights holder of a dataset when reusing, sharing, or building upon it. Attribution is a core principle in open licensing and data sharing agreements, ensuring that data producers are recognised for their contributions.',
        relatedTerms: ['License', 'Copyright', 'Data Rights'],
        example: 'Under an attribution license, a researcher using a Kenyan health dataset must cite the originating institution in any publication.',
    },
    {
        term: 'Access Rights',
        category: 'Data Governance',
        definition: 'The permissions granted to individuals, institutions, or communities to view, download, use, or modify a dataset. Access rights may be tiered — from fully open public access to restricted access requiring formal application or institutional affiliation.',
        relatedTerms: ['Open Data', 'Restricted Data', 'Data Sovereignty'],
    },
    {
        term: 'African Data Commons',
        category: 'Policy',
        definition: 'A conceptual and practical framework for establishing shared data repositories and governance structures that centre African community needs, values, and oversight. The African Data Commons aims to counteract extractive data practices by ensuring that data generated on the continent benefits African peoples first.',
        relatedTerms: ['Data Sovereignty', 'Ubuntu Data Ethics', 'Communal Ownership'],
        example: 'The African Data Commons initiative envisions federated data repositories governed by African institutions with community consent mechanisms.',
    },
    {
        term: 'Anonymisation',
        category: 'Technical',
        definition: 'The process of removing or transforming personally identifiable information (PII) from a dataset so that individuals cannot be directly or indirectly identified. Proper anonymisation is a prerequisite for sharing sensitive datasets under open or restricted licenses.',
        relatedTerms: ['Pseudonymisation', 'Privacy', 'De-identification'],
    },
    // B
    {
        term: 'Benefit Sharing',
        category: 'Policy',
        definition: 'The equitable distribution of economic, social, or intellectual benefits derived from the use of a dataset among its contributors, custodians, and source communities. Benefit sharing is a foundational principle in the NOODL Framework, requiring that value generated from African data returns to African communities.',
        relatedTerms: ['NOODL Framework', 'Reciprocity', 'Data Sovereignty'],
        example: 'A tech company using a multilingual African speech dataset must share revenue or provide capacity-building resources to the communities who contributed recordings.',
    },
    {
        term: 'Biometric Data',
        category: 'Technical',
        definition: 'Data derived from physical or behavioural characteristics unique to individuals, including fingerprints, facial recognition data, voice patterns, and retinal scans. Biometric data is considered highly sensitive across African data protection frameworks and requires explicit consent before collection or use.',
        relatedTerms: ['Sensitive Data', 'Privacy', 'Consent'],
    },
    // C
    {
        term: 'Collective Consent',
        category: 'Data Governance',
        definition: 'A consent model where a community or group, rather than solely individuals, has the authority to approve or reject the collection, use, or sharing of data that pertains to the group as a whole. Collective consent is particularly relevant for indigenous and community datasets in Africa where data may represent shared cultural knowledge.',
        relatedTerms: ['Informed Consent', 'Ubuntu Data Ethics', 'Community Data'],
        example: 'A linguistic dataset capturing a minority language requires approval from the community elders and governance structures, not just individual speakers.',
    },
    {
        term: 'Commercialisation Restriction',
        category: 'Legal',
        definition: 'A license condition that prohibits or limits the use of a dataset for commercial purposes without prior written permission from the rights holder. Under the NOODL Framework, commercialisation restrictions may be applied selectively to protect community interests while still enabling academic or non-profit use.',
        relatedTerms: ['NonCommercial License', 'License Conditions', 'Benefit Sharing'],
    },
    {
        term: 'Copyright',
        category: 'Legal',
        definition: 'A legal right that grants creators exclusive control over the reproduction, distribution, adaptation, and public display of original works, including datasets. Copyright in datasets typically protects the selection and arrangement of data, even when the underlying facts are not protected.',
        relatedTerms: ['License', 'Sui Generis Database Right', 'Intellectual Property'],
    },
    {
        term: 'Creative Commons',
        category: 'Legal',
        definition: 'A non-profit organisation that publishes standardised open licensing tools widely used for datasets, creative works, and educational resources. Creative Commons licenses range from fully open (CC0) to more restrictive (CC BY-NC-ND). The NOODL Framework builds on Creative Commons concepts while adding Africa-specific provisions.',
        relatedTerms: ['Open License', 'CC BY', 'CC0', 'NOODL Framework'],
    },
    {
        term: 'Custodian',
        category: 'Data Governance',
        definition: 'An individual, institution, or organisation that is responsible for the storage, maintenance, and stewardship of a dataset on behalf of the data owner or source community. A custodian holds data in trust and must act in accordance with the terms agreed upon with data owners.',
        relatedTerms: ['Data Stewardship', 'Data Owner', 'Fiduciary Duty'],
    },
    // D
    {
        term: 'Data Controller',
        category: 'Legal',
        definition: 'Under data protection law, the natural or legal person who determines the purposes and means of processing personal data. African data protection frameworks such as Kenya\'s Data Protection Act and South Africa\'s POPIA designate data controllers with specific legal obligations.',
        relatedTerms: ['Data Processor', 'POPIA', 'Personal Data'],
    },
    {
        term: 'Data Extractivism',
        category: 'Policy',
        definition: 'The practice whereby external actors — typically from the Global North — collect, use, and profit from data generated by African communities or institutions without fair compensation, acknowledgment, or benefit sharing. Data extractivism mirrors colonial resource extraction and is a central concern addressed by the NOODL Framework.',
        relatedTerms: ['Data Colonialism', 'Benefit Sharing', 'Data Sovereignty'],
    },
    {
        term: 'Data Fiduciary',
        category: 'Data Governance',
        definition: 'An entity that holds and manages data on behalf of individuals or communities with a legal and ethical obligation to act in their best interests. The fiduciary model places a duty of loyalty and care on data custodians, prioritising the welfare of data subjects over the commercial interests of the fiduciary.',
        relatedTerms: ['Custodian', 'Trust', 'Data Governance'],
    },
    {
        term: 'Data Localisation',
        category: 'Policy',
        definition: 'The requirement that data about residents of a country or region be collected, processed, and stored within that country\'s or region\'s borders. Several African nations have enacted or are considering data localisation laws to retain economic and regulatory control over locally generated data.',
        relatedTerms: ['Data Sovereignty', 'Cross-Border Data Flows', 'Regulation'],
    },
    {
        term: 'Data Minimisation',
        category: 'Legal',
        definition: 'The principle that only the minimum amount of personal data necessary to achieve a specific purpose should be collected and retained. Data minimisation is a core requirement under African data protection laws and is relevant to the ethical design of data collection instruments.',
        relatedTerms: ['Privacy by Design', 'POPIA', 'Purpose Limitation'],
    },
    {
        term: 'Data Provenance',
        category: 'Technical',
        definition: 'The documented history of a dataset\'s origins, transformations, and movements — including who collected it, under what conditions, how it has been processed, and who has had access. Provenance metadata is essential for assessing the trustworthiness and ethical standing of a dataset.',
        relatedTerms: ['Metadata', 'Lineage', 'Transparency'],
    },
    {
        term: 'Data Sovereignty',
        category: 'Policy',
        definition: 'The right of a community, nation, or group to govern data about themselves according to their own laws, values, and self-determination. In the African context, data sovereignty is about ensuring that African states and communities — not foreign corporations — have primary authority over data generated on the continent.',
        relatedTerms: ['Indigenous Data Sovereignty', 'Data Localisation', 'African Data Commons'],
    },
    {
        term: 'Data Stewardship',
        category: 'Data Governance',
        definition: 'The responsible management, maintenance, and curation of data over its lifecycle, ensuring it remains accurate, accessible, and used ethically. Stewardship goes beyond mere custody, involving active advocacy for appropriate use and protection of the interests of data subjects and source communities.',
        relatedTerms: ['Custodian', 'Data Lifecycle', 'Governance'],
    },
    {
        term: 'De-identification',
        category: 'Technical',
        definition: 'The process of removing or modifying information that could be used to identify individuals in a dataset. De-identification is a spectrum — from simple removal of direct identifiers to sophisticated techniques like k-anonymity — and its adequacy must be assessed in context.',
        relatedTerms: ['Anonymisation', 'Pseudonymisation', 'Re-identification Risk'],
    },
    {
        term: 'Derivative Work',
        category: 'Legal',
        definition: 'A new work created by modifying, adapting, transforming, or building upon an existing dataset or work. Many data licenses contain conditions specifying whether derivative works may be created and, if so, under what terms they must be shared.',
        relatedTerms: ['ShareAlike', 'Adaptation', 'Copyright'],
    },
    // E
    {
        term: 'Ethical Review',
        category: 'Data Governance',
        definition: 'A formal assessment process — typically conducted by an Institutional Review Board (IRB), Ethics Committee, or community governance body — that evaluates proposed data collection or use activities against ethical standards. In Africa, ethical review increasingly incorporates community-based perspectives alongside formal institutional procedures.',
        relatedTerms: ['Informed Consent', 'IRB', 'Community Governance'],
    },
    {
        term: 'Exclusivity',
        category: 'Legal',
        definition: 'A contractual or licensing arrangement that grants a single party the sole right to use a dataset for a defined purpose, time period, or geography, to the exclusion of all others. Exclusivity arrangements can undermine equitable access and should be considered carefully under African data governance principles.',
        relatedTerms: ['License', 'Commercialisation Restriction', 'Access Rights'],
    },
    // F
    {
        term: 'Federated Data Governance',
        category: 'Data Governance',
        definition: 'A governance model in which data management authority is distributed across multiple institutions or communities rather than centralised in a single body. Federated governance supports African data sovereignty by allowing diverse national and community-level oversight while enabling interoperability.',
        relatedTerms: ['African Data Commons', 'Decentralisation', 'Interoperability'],
    },
    {
        term: 'Free and Open Source',
        category: 'Technical',
        definition: 'Software or data released under licenses that grant users the freedom to use, study, modify, and redistribute the resource. In the data context, free and open source principles inform open data licensing, though "free" and "open" are not synonymous and different licenses impose different conditions.',
        relatedTerms: ['Open License', 'Open Data', 'Copyleft'],
    },
    // G
    {
        term: 'Governance Framework',
        category: 'Data Governance',
        definition: 'A structured set of policies, principles, roles, responsibilities, and procedures that guide how data is managed, shared, and protected within an organisation or community. Governance frameworks such as NOODL provide a systematic approach to ensuring data is handled equitably and in accordance with community values.',
        relatedTerms: ['NOODL Framework', 'Data Stewardship', 'Policy'],
    },
    // I
    {
        term: 'Indigenous Data Sovereignty',
        category: 'Policy',
        definition: 'The right of indigenous peoples to govern data about their communities, territories, resources, and cultures. Indigenous Data Sovereignty movements, including CARE Principles and the Global Indigenous Data Alliance, advocate for indigenous peoples\' authority over data that has historically been collected and exploited without consent.',
        relatedTerms: ['Data Sovereignty', 'Collective Consent', 'CARE Principles'],
    },
    {
        term: 'Informed Consent',
        category: 'Legal',
        definition: 'A process by which data subjects or communities are provided with clear, comprehensible information about how their data will be collected, used, and shared, and freely agree to participate. Consent must be specific, voluntary, and revocable. Many African data protection laws require informed consent as a precondition for lawful data processing.',
        relatedTerms: ['Collective Consent', 'Data Rights', 'Autonomy'],
    },
    {
        term: 'Interoperability',
        category: 'Technical',
        definition: 'The ability of datasets, systems, or institutions to work together by using common standards, formats, and protocols. Interoperability is essential for the African Data Commons to function effectively, allowing datasets from different countries and institutions to be discovered, combined, and used cohesively.',
        relatedTerms: ['Open Standards', 'Metadata', 'Federated Data Governance'],
    },
    // L
    {
        term: 'License',
        category: 'Legal',
        definition: 'A legal instrument that specifies the terms and conditions under which a dataset may be used, shared, adapted, or commercialised. A license does not transfer ownership but grants specific permissions to users. Well-designed licenses balance openness with protections for rights holders and source communities.',
        relatedTerms: ['Nwulite Obodo License', 'Creative Commons', 'Copyright'],
    },
    {
        term: 'License Compatibility',
        category: 'Legal',
        definition: 'The ability to combine datasets released under different licenses without violating the terms of either. License incompatibility — particularly between ShareAlike and non-ShareAlike conditions — is a common obstacle to data reuse and must be considered when selecting a license for a new dataset.',
        relatedTerms: ['ShareAlike', 'License', 'Derivative Work'],
    },
    // M
    {
        term: 'Metadata',
        category: 'Technical',
        definition: 'Structured information that describes the content, context, quality, condition, and provenance of a dataset. Rich metadata enables data discovery, proper attribution, and informed reuse decisions. Metadata standards such as Dublin Core and DCAT are widely used in open data portals.',
        relatedTerms: ['Data Provenance', 'Interoperability', 'Documentation'],
    },
    // N
    {
        term: 'NOODL Framework',
        category: 'NOODL',
        definition: 'The NOODL (Navigating Open and Obligatory Data Licensing) Framework is a structured approach to data licensing developed specifically for the African context. It provides a set of principles, tools, and license templates designed to promote equitable data sharing while protecting the rights and interests of African communities, institutions, and data contributors.',
        relatedTerms: ['Nwulite Obodo License', 'Data Sovereignty', 'Benefit Sharing'],
        example: 'An African research consortium applies the NOODL Framework to establish governance rules for a shared agricultural dataset, ensuring member institutions benefit equitably from downstream use.',
    },
    {
        term: 'NonCommercial',
        category: 'Legal',
        definition: 'A license condition, as used in Creative Commons and similar frameworks, that restricts the use of a dataset to non-commercial purposes only. "NonCommercial" is defined as use not primarily intended for or directed toward commercial advantage or monetary compensation.',
        relatedTerms: ['License Conditions', 'Commercialisation Restriction', 'Benefit Sharing'],
    },
    {
        term: 'Nwulite Obodo License',
        category: 'NOODL',
        definition: 'The flagship license developed under the NOODL Framework for African datasets. "Nwulite Obodo" means "for the good of the community" in Igbo, reflecting the license\'s emphasis on communal benefit and equitable sharing. The Nwulite Obodo License incorporates provisions for benefit sharing, attribution, and restricted commercialisation tailored to African data realities.',
        relatedTerms: ['NOODL Framework', 'License', 'Benefit Sharing', 'Attribution'],
    },
    // O
    {
        term: 'Open Data',
        category: 'Data Governance',
        definition: 'Data that can be freely used, reused, and redistributed by anyone, subject only to conditions such as attribution. Open data is often contrasted with proprietary or restricted data. While openness promotes innovation, African data governance perspectives caution that unrestricted openness can enable extractive practices if not accompanied by benefit-sharing safeguards.',
        relatedTerms: ['Open License', 'Data Sovereignty', 'Access Rights'],
    },
    {
        term: 'Open License',
        category: 'Legal',
        definition: 'A license that grants broad permissions to use, modify, and redistribute a dataset with few or no restrictions. Open licenses include Creative Commons CC0 and CC BY. The degree of "openness" varies and open licensing in the African context must be evaluated alongside equity and sovereignty considerations.',
        relatedTerms: ['Creative Commons', 'CC0', 'Open Data'],
    },
    // P
    {
        term: 'Personal Data',
        category: 'Legal',
        definition: 'Any information relating to an identified or identifiable natural person. In African data protection law, personal data is broadly defined and includes names, identification numbers, location data, and online identifiers. The lawful collection and processing of personal data requires a valid legal basis such as consent or legitimate interest.',
        relatedTerms: ['Data Protection', 'Privacy', 'Sensitive Data'],
    },
    {
        term: 'POPIA',
        category: 'Legal',
        definition: 'The Protection of Personal Information Act (POPIA) is South Africa\'s primary data protection legislation, enacted in 2013 and fully effective from 2021. POPIA establishes eight conditions for lawful data processing and created the Information Regulator as an independent oversight authority. It is one of Africa\'s most comprehensive data protection frameworks.',
        relatedTerms: ['Data Protection', 'Personal Data', 'African Data Regulation'],
    },
    {
        term: 'Privacy by Design',
        category: 'Technical',
        definition: 'An approach to systems and dataset design that embeds privacy protections proactively into the architecture of a project rather than adding them as an afterthought. Privacy by Design requires that data minimisation, access controls, and security are considered from the outset.',
        relatedTerms: ['Data Minimisation', 'Privacy', 'De-identification'],
    },
    {
        term: 'Public Domain',
        category: 'Legal',
        definition: 'The body of creative works and data not covered by copyright or whose copyright has expired, making them freely available for use by anyone for any purpose. CC0 is a legal tool that allows rights holders to voluntarily dedicate their datasets to the public domain.',
        relatedTerms: ['CC0', 'Copyright', 'Open License'],
    },
    {
        term: 'Purpose Limitation',
        category: 'Legal',
        definition: 'The data protection principle that personal data must be collected for specified, explicit, and legitimate purposes and must not be used in ways incompatible with those purposes. Purpose limitation prevents mission creep and secondary uses that data subjects would not reasonably anticipate.',
        relatedTerms: ['Data Minimisation', 'Informed Consent', 'POPIA'],
    },
    // R
    {
        term: 'Reciprocity',
        category: 'Data Governance',
        definition: 'The principle that those who benefit from a shared dataset should contribute back to the commons that produced it — through attribution, improvements, data contributions, financial support, or other forms of value. Reciprocity is a key mechanism for ensuring sustainable and equitable data ecosystems in Africa.',
        relatedTerms: ['Benefit Sharing', 'ShareAlike', 'Ubuntu Data Ethics'],
    },
    {
        term: 'Re-identification',
        category: 'Technical',
        definition: 'The process by which anonymised or pseudonymised data is traced back to the individuals it describes, undermining the privacy protections of de-identification. Re-identification risk increases as datasets are combined with external information, and must be assessed before releasing any dataset.',
        relatedTerms: ['Anonymisation', 'De-identification', 'Privacy'],
    },
    {
        term: 'Restricted Data',
        category: 'Data Governance',
        definition: 'Data that is not publicly available and requires formal application, institutional approval, or contractual agreement before access is granted. Restrictions may be imposed for privacy, commercial, security, or community-consent reasons. Restricted data can still be shared equitably through well-designed data access frameworks.',
        relatedTerms: ['Access Rights', 'Data Governance', 'Sensitive Data'],
    },
    // S
    {
        term: 'Sensitive Data',
        category: 'Legal',
        definition: 'A category of personal data that warrants heightened protection due to the particular risks of harm or discrimination its disclosure could cause. Under African data protection laws, sensitive data typically includes health information, ethnic or racial origin, political opinions, religious beliefs, and biometric data.',
        relatedTerms: ['Personal Data', 'Biometric Data', 'Data Protection'],
    },
    {
        term: 'ShareAlike',
        category: 'Legal',
        definition: 'A copyleft-style license condition requiring that derivative works be released under the same or a compatible license as the original dataset. ShareAlike ensures that open data remains open and prevents downstream users from imposing more restrictive terms on adapted works.',
        relatedTerms: ['Derivative Work', 'Copyleft', 'License Compatibility'],
    },
    {
        term: 'Split Sheet',
        category: 'NOODL',
        definition: 'A governance and rights-management document used within the NOODL Framework to record the contributions, roles, and entitlements of multiple parties who have contributed to a dataset. Inspired by music industry split sheet agreements, data split sheets clarify ownership shares and benefit distribution among co-creators.',
        relatedTerms: ['NOODL Framework', 'Benefit Sharing', 'Attribution'],
    },
    {
        term: 'Sui Generis Database Right',
        category: 'Legal',
        definition: 'A specific intellectual property right, originating in EU law, that protects the investment made in creating a database — regardless of whether the contents are individually copyrightable. Sui generis rights are distinct from copyright and prevent extraction of substantial parts of a database without permission.',
        relatedTerms: ['Copyright', 'Database', 'Intellectual Property'],
    },
    // T
    {
        term: 'Transparency',
        category: 'Data Governance',
        definition: 'The principle that data collectors, custodians, and users should be open about how data is obtained, processed, stored, and shared. Transparency builds trust between communities and data institutions and is a prerequisite for informed consent and effective governance.',
        relatedTerms: ['Informed Consent', 'Data Provenance', 'Accountability'],
    },
    {
        term: 'Trust Framework',
        category: 'Data Governance',
        definition: 'A set of agreed-upon rules, standards, and processes that enable different parties to share data with confidence. Trust frameworks define the rights and obligations of data providers and users, certification processes, and dispute resolution mechanisms. They are foundational infrastructure for the African Data Commons.',
        relatedTerms: ['Data Fiduciary', 'Governance Framework', 'Interoperability'],
    },
    // U
    {
        term: 'Ubuntu Data Ethics',
        category: 'Policy',
        definition: 'An approach to data ethics grounded in the African philosophical concept of Ubuntu — "I am because we are" — which emphasises communal relationships, collective wellbeing, and mutual responsibility. Ubuntu Data Ethics challenges individualistic Western data rights frameworks and centres the community as the primary unit of data governance.',
        relatedTerms: ['Collective Consent', 'Communal Ownership', 'African Data Commons'],
        example: 'Applying Ubuntu Data Ethics, a dataset collected from rural communities is governed by representatives of those communities rather than solely by the university that funded the research.',
    },
];

// Build a map: letter → entries
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function buildIndex() {
    const map: Record<string, DictionaryEntry[]> = {};
    for (const entry of entries) {
        const letter = entry.term[0].toUpperCase();
        if (!map[letter]) map[letter] = [];
        map[letter].push(entry);
    }
    // Sort entries within each letter
    for (const letter of Object.keys(map)) {
        map[letter].sort((a, b) => a.term.localeCompare(b.term));
    }
    return map;
}

const categoryColors: Record<DictionaryEntry['category'], { bg: string; text: string }> = {
    Legal: { bg: '#FEF3C7', text: '#92400E' },
    'Data Governance': { bg: '#D1FAE5', text: '#065F46' },
    NOODL: { bg: '#E0F2FE', text: '#0369A1' },
    Technical: { bg: '#EDE9FE', text: '#5B21B6' },
    Policy: { bg: '#FCE7F3', text: '#9D174D' },
};

export function Dictionary() {
    const [selected, setSelected] = useState<DictionaryEntry | null>(null);
    const [activeLetterHighlight, setActiveLetterHighlight] = useState<string>('');
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const indexData = buildIndex();
    const availableLetters = new Set(Object.keys(indexData));

    // Scroll spy: update highlighted letter based on scroll position
    useEffect(() => {
        if (selected) return;
        const handleScroll = () => {
            const scrollY = window.scrollY + 160;
            let current = '';
            for (const letter of alphabet) {
                const el = sectionRefs.current[letter];
                if (el && el.offsetTop <= scrollY) {
                    current = letter;
                }
            }
            setActiveLetterHighlight(current);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [selected]);

    const scrollToLetter = (letter: string) => {
        const el = sectionRefs.current[letter];
        if (el) {
            const offset = 130;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    if (selected) {
        return (
            <TermDetail
                entry={selected}
                onBack={() => setSelected(null)}
                onNavigate={(term) => setSelected(entries.find(e => e.term === term) ?? selected)}
            />
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F8FAFA' }}>
            {/* Hero */}
            <div className="relative overflow-hidden py-24" style={{ backgroundColor: '#1A2E2E' }}>
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="dGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1.5" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dGrid)" />
                    </svg>
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <nav className="flex items-center gap-2 text-white/60 text-sm mb-6">
                        <Link to="/noodl-framework" className="hover:text-white transition-colors">NOODL Framework</Link>
                        <span>›</span>
                        <span className="text-white">Dictionary</span>
                    </nav>
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle, #F9A826 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
                    <div className="flex items-center gap-3 mb-5">
                        <div className="h-px w-10" style={{ backgroundColor: '#F9A826' }} />
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F9A826' }}>NOODL Framework</span>
                    </div>
                    <h1 className="text-white mb-3 font-extrabold" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                        Data Licensing Dictionary
                    </h1>
                    <p className="text-white/80 max-w-2xl" style={{ fontSize: '1.1rem' }}>
                        Key terms and concepts in African data licensing, governance, and the NOODL Framework — from legal foundations to community-centred principles.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                        {Object.entries(categoryColors).map(([cat, colors]) => (
                            <span key={cat} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: colors.bg + 'CC', color: colors.text }}>
                {cat}
              </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky alphabet bar */}
            <div className="sticky top-[80px] z-30 border-b shadow-sm" style={{ backgroundColor: 'white', borderColor: '#E2ECEC' }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-1 py-3">
                        {alphabet.map(letter => {
                            const available = availableLetters.has(letter);
                            const isActive = activeLetterHighlight === letter;
                            return (
                                <button
                                    key={letter}
                                    onClick={() => available && scrollToLetter(letter)}
                                    disabled={!available}
                                    className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold transition-all"
                                    style={{
                                        backgroundColor: isActive ? '#268181' : available ? '#E8F5F5' : 'transparent',
                                        color: isActive ? 'white' : available ? '#355E5E' : '#C4D4D4',
                                        cursor: available ? 'pointer' : 'default',
                                        transform: isActive ? 'scale(1.15)' : 'scale(1)',
                                    }}
                                >
                                    {letter}
                                </button>
                            );
                        })}
                        <span className="ml-auto text-sm self-center" style={{ color: '#718096' }}>
              {entries.length} terms
            </span>
                    </div>
                </div>
            </div>

            {/* Term index */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
                {alphabet.filter(l => availableLetters.has(l)).map(letter => (
                    <section
                        key={letter}
                        ref={el => { sectionRefs.current[letter] = el; }}
                        className="mb-10"
                    >
                        {/* Letter heading */}
                        <div className="flex items-center gap-4 mb-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #268181 0%, #29D4AB 100%)' }}
                            >
                                <span className="text-white font-bold" style={{ fontSize: '1.25rem' }}>{letter}</span>
                            </div>
                            <div className="flex-1 h-px" style={{ backgroundColor: '#D0E8E8' }} />
                        </div>

                        {/* Terms in this letter */}
                        <div className="space-y-2 pl-16">
                            {indexData[letter].map(entry => (
                                <button
                                    key={entry.term}
                                    onClick={() => { setSelected(entry); window.scrollTo({ top: 0 }); }}
                                    className="w-full text-left group flex items-center justify-between px-4 py-3 rounded-lg border transition-all hover:shadow-md"
                                    style={{ backgroundColor: 'white', borderColor: '#E2ECEC' }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.borderColor = '#268181';
                                        (e.currentTarget as HTMLElement).style.backgroundColor = '#F0FAF9';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.borderColor = '#E2ECEC';
                                        (e.currentTarget as HTMLElement).style.backgroundColor = 'white';
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold" style={{ color: '#268181' }}>{entry.term}</span>
                                        <span
                                            className="hidden sm:inline px-2 py-0.5 rounded-full text-xs font-medium"
                                            style={{ backgroundColor: categoryColors[entry.category].bg, color: categoryColors[entry.category].text }}
                                        >
                      {entry.category}
                    </span>
                                    </div>
                                    <svg
                                        className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1"
                                        style={{ color: '#29D4AB' }}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

function TermDetail({ entry, onBack, onNavigate }: { entry: DictionaryEntry; onBack: () => void; onNavigate: (term: string) => void }) {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F8FAFA' }}>
            {/* Header bar */}
            <div className="py-6 border-b" style={{ backgroundColor: 'white', borderColor: '#E2ECEC' }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                    <nav className="flex items-center gap-2 text-sm mb-4" style={{ color: '#718096' }}>
                        <Link to="/noodl-framework" className="hover:underline transition-colors" style={{ color: '#268181' }}>
                            NOODL Framework
                        </Link>
                        <span>›</span>
                        <button onClick={onBack} className="hover:underline transition-colors" style={{ color: '#268181' }}>
                            Dictionary
                        </button>
                        <span>›</span>
                        <span style={{ color: '#2F4F4F' }}>{entry.term}</span>
                    </nav>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all hover:shadow-sm"
                        style={{ borderColor: '#268181', color: '#268181', backgroundColor: 'white' }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = '#F0FAF9';
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = 'white';
                        }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dictionary
                    </button>
                </div>
            </div>

            {/* Term content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-12">
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: '#E2ECEC' }}>
                    {/* Term header */}
                    <div className="px-8 pt-8 pb-6 border-b" style={{ borderColor: '#E2ECEC', background: 'linear-gradient(135deg, #F0FAF9 0%, white 100%)' }}>
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                            <h1 style={{ color: '#355E5E', fontSize: '2rem', fontWeight: 700, lineHeight: 1.2 }}>
                                {entry.term}
                            </h1>
                            <span
                                className="px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0"
                                style={{ backgroundColor: categoryColors[entry.category].bg, color: categoryColors[entry.category].text }}
                            >
                {entry.category}
              </span>
                        </div>
                        <div className="w-16 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #268181, #29D4AB)' }} />
                    </div>

                    {/* Definition */}
                    <div className="px-8 py-6">
                        <p style={{ color: '#2F4F4F', lineHeight: 1.8, fontSize: '1.05rem' }}>
                            {entry.definition}
                        </p>
                    </div>

                    {/* Example */}
                    {entry.example && (
                        <div className="mx-8 mb-6 rounded-xl p-5 border-l-4" style={{ backgroundColor: '#F0FAF9', borderColor: '#29D4AB' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <svg className="w-4 h-4" style={{ color: '#268181' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-semibold" style={{ color: '#268181' }}>Example in Practice</span>
                            </div>
                            <p className="text-sm" style={{ color: '#355E5E', lineHeight: 1.7 }}>{entry.example}</p>
                        </div>
                    )}

                    {/* Related Terms */}
                    {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                        <div className="px-8 pb-8">
                            <h3 className="text-sm font-semibold mb-3" style={{ color: '#718096' }}>
                                RELATED TERMS
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {entry.relatedTerms.map(rt => {
                                    // Check if this term exists in our dictionary
                                    const exists = entries.find(e => e.term === rt);
                                    return exists ? (
                                        <button
                                            key={rt}
                                            onClick={() => { window.scrollTo({ top: 0 }); onNavigate(rt); }}
                                            className="px-3 py-1.5 rounded-lg text-sm border font-medium transition-all hover:shadow-sm"
                                            style={{ borderColor: '#268181', color: '#268181', backgroundColor: 'white' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F0FAF9'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'white'; }}
                                        >
                                            {rt}
                                        </button>
                                    ) : (
                                        <span
                                            key={rt}
                                            className="px-3 py-1.5 rounded-lg text-sm border"
                                            style={{ borderColor: '#D0E8E8', color: '#718096', backgroundColor: '#F8FAFA' }}
                                        >
                      {rt}
                    </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Back button at bottom */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 shadow-md"
                        style={{ background: 'linear-gradient(135deg, #268181 0%, #29D4AB 100%)' }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dictionary
                    </button>
                </div>
            </div>
        </div>
    );
}
