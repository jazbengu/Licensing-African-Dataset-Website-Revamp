import { useState } from 'react';
import { Link } from 'react-router';
import { Users, Search, BookOpen, FileText } from 'lucide-react';

type Audience = 'All' | 'Dataset Creator' | 'Researcher' | 'Community' | 'Policymaker';
type Tool = 'NOODL Licence' | 'Split Sheet' | 'Dictionary' | 'Resource Library';

interface CaseStudy {
    id: string;
    name: string;
    location: string;
    role: string;
    audience: Exclude<Audience, 'All'>;
    tools: Tool[];
    problem: string;
    outcome: string;
    quote?: string;
    tag?: string;
}

const studies: CaseStudy[] = [
    {
        id: 'cs1',
        name: 'Amara',
        location: 'Nigeria',
        role: 'Computational Linguist',
        audience: 'Dataset Creator',
        tools: ['NOODL Licence', 'Split Sheet'],
        problem: 'Amara led a team of four linguists to build a large Igbo speech corpus. She wanted to share it openly for NLP research but was worried that commercial AI companies would train proprietary models on it without any return to the Igbo-speaking community that contributed the recordings.',
        outcome: 'Using the NOODL Licence, Amara applied a benefit-sharing condition requiring commercial users to fund a community linguistics workshop before using the dataset. The Split Sheet documented each team member\'s contribution percentage upfront, so recognition and any future benefits were clear from the start.',
        quote: 'For the first time I could share the dataset without feeling like I was giving it away.',
        tag: 'Speech & Audio',
    },
    {
        id: 'cs2',
        name: 'Dr Kwame',
        location: 'Ghana',
        role: 'AI Research Lead',
        audience: 'Researcher',
        tools: ['NOODL Licence', 'Dictionary'],
        problem: 'Dr Kwame\'s lab needed to use a Twi text dataset released under NOODL for a commercial speech-to-text tool. He was unsure whether his lab\'s funding structure classified them as a Section 1(d)(i) or 1(d)(ii) recipient — and what that meant for their obligations.',
        outcome: 'The Equitable Licensing Dictionary clarified the Developing Country definition and the two recipient categories. The lab fell under 1(d)(ii) and satisfied the benefit-sharing condition by providing free API access to a Ghanaian-registered NGO. The process took three days from question to resolution.',
        tag: 'Text & NLP',
    },
    {
        id: 'cs3',
        name: 'Fatou & the Wolof Speakers Network',
        location: 'Senegal',
        role: 'Community Data Steward',
        audience: 'Community',
        tools: ['NOODL Licence', 'Split Sheet', 'Dictionary'],
        problem: 'The Wolof Speakers Network had contributed hundreds of hours of recorded speech to a dataset held by a European university, but the dataset was released under a standard CC BY licence with no acknowledgement of the community\'s role. When a tech company later built a voice assistant on the data, the community received nothing.',
        outcome: 'After learning about NOODL through the resource library, the Network worked with the university to re-release a new version of the dataset under NOODL-1.0. The Split Sheet was completed retrospectively to document all contributors, and the benefit-sharing clause was set to require capacity-building support from commercial users going forward.',
        quote: 'We didn\'t know we had options. The framework gave us language and tools to ask for what was fair.',
        tag: 'Speech & Audio',
    },
    {
        id: 'cs4',
        name: 'Prof Naledi',
        location: 'South Africa',
        role: 'Data Policy Researcher',
        audience: 'Policymaker',
        tools: ['Resource Library', 'Dictionary'],
        problem: 'Prof Naledi was advising a South African government working group developing a national AI data strategy. The group needed to understand how open licensing could be adapted to protect community interests without creating barriers to legitimate research access.',
        outcome: 'The NOODL Framework — including the fair-dealing paper and the Open Future report — provided the working group with concrete evidence that context-sensitive licensing is both legally feasible and practically adopted. NOODL was cited as a model in the working group\'s draft recommendations.',
        tag: 'Policy & Governance',
    },
    {
        id: 'cs5',
        name: 'Chidi',
        location: 'Kenya',
        role: 'Graduate Student & Dataset Builder',
        audience: 'Dataset Creator',
        tools: ['Split Sheet', 'NOODL Licence'],
        problem: 'Chidi was building a Dholuo text dataset as part of his master\'s thesis, with contributions from eight community volunteers who transcribed audio recordings. He had no formal legal training and wasn\'t sure how to give proper credit to each contributor or what licence would protect them.',
        outcome: 'Chidi used the Split Sheet to record each volunteer\'s name, role, and contribution share before the dataset was published. He then applied the NOODL Licence, setting attribution requirements and a benefit-sharing condition for commercial use. All eight contributors are named in the published dataset record on Mozilla Data Collective.',
        tag: 'Text & NLP',
    },
    {
        id: 'cs6',
        name: 'Aïcha',
        location: 'Mali',
        role: 'Language Technologist',
        audience: 'Researcher',
        tools: ['NOODL Licence', 'Dictionary'],
        problem: 'Aïcha was fine-tuning a multilingual model using three NOODL-licensed datasets from different providers. She needed to understand whether her fine-tuned model — which she planned to release publicly — was considered Adapted Material under NOODL, and if so, what licence she had to apply to it.',
        outcome: 'The Dictionary entry on Adapted Material confirmed that a model trained on NOODL data is Adapted Material. Aïcha released her model under a compatible licence as required by the ShareAlike clause, and included the benefit statements from all three source datasets in the model card, satisfying the attribution conditions.',
        tag: 'Machine Learning',
    },
    {
        id: 'cs7',
        name: 'The KenCorpus Team',
        location: 'Kenya',
        role: 'Collaborative Research Team',
        audience: 'Dataset Creator',
        tools: ['NOODL Licence', 'Split Sheet'],
        problem: 'The KenCorpus team was one of the first groups consulted during the drafting of NOODL. They were building a large Kenyan-language corpus with contributions from linguists, community members, and two university departments — each with different institutional IP obligations.',
        outcome: 'The Split Sheet\'s third-party rights section allowed the team to document each contributor\'s institutional obligations clearly before publication. The NOODL Licence was applied to the resulting dataset, which became one of the early reference implementations of the framework.',
        quote: 'Being consulted during drafting meant we could see our own use case reflected in the final tool.',
        tag: 'Text & NLP',
    },
    {
        id: 'cs8',
        name: 'Institutional AI Lab',
        location: 'United States',
        role: 'AI Research Lab',
        audience: 'Researcher',
        tools: ['NOODL Licence', 'Dictionary'],
        problem: 'A US-based AI lab wanted to use a Yoruba speech dataset released under NOODL. As a Section 1(d)(ii) recipient outside a Developing Country, they needed to understand what "sharing of value or benefits" meant in practice — and whether a one-time payment or an ongoing contribution was expected.',
        outcome: 'The Dataset Provider had specified a benefit-sharing condition requiring the lab to fund a three-day language technology training session for Nigerian university students. The lab fulfilled this before publishing results using the dataset. The case is now cited in the NOODL Framework\'s guidance notes as an example of good-faith compliance.',
        tag: 'Speech & Audio',
    },
    {
        id: 'cs9',
        name: 'Mpho',
        location: 'South Africa',
        role: 'Data Curator, Mafoko Project',
        audience: 'Dataset Creator',
        tools: ['NOODL Licence', 'Split Sheet'],
        problem: 'Mpho was curating the Mafoko multilingual terminologies dataset — a foundational resource for South African NLP across eleven official languages. The dataset drew on contributions from dozens of linguists and terminologists across multiple institutions, and the team needed a licence that recognised all contributors equitably.',
        outcome: 'Mafoko was released under the NOODL Framework (August 2025), becoming one of the framework\'s landmark adoptions. The Split Sheet documented all contributors before publication, and the NOODL Licence ensured that any commercial use of the terminologies would require acknowledgement and benefit sharing with the contributor community.',
        tag: 'Multilingual & Terminology',
    },
];

const audiences: Audience[] = ['All', 'Dataset Creator', 'Researcher', 'Community', 'Policymaker'];

const audienceMeta: Record<Exclude<Audience, 'All'>, { color: string; bg: string; border: string }> = {
    'Dataset Creator': { color: '#065F46', bg: '#D1FAE5', border: '#6EE7B7' },
    'Researcher':      { color: '#1D4ED8', bg: '#DBEAFE', border: '#93C5FD' },
    'Community':       { color: '#9D174D', bg: '#FCE7F3', border: '#F9A8D4' },
    'Policymaker':     { color: '#5B21B6', bg: '#EDE9FE', border: '#C4B5FD' },
};

const toolMeta: Record<Tool, { icon: React.ReactNode; color: string }> = {
    'NOODL Licence':    { icon: <FileText className="w-3 h-3" />, color: '#268181' },
    'Split Sheet':      { icon: <Users className="w-3 h-3" />, color: '#29D4AB' },
    'Dictionary':       { icon: <BookOpen className="w-3 h-3" />, color: '#355E5E' },
    'Resource Library': { icon: <Search className="w-3 h-3" />, color: '#006F6F' },
};

function StudyCard({ study }: { study: CaseStudy }) {
    const [expanded, setExpanded] = useState(false);
    const am = audienceMeta[study.audience];

    return (
        <div
            className="rounded-2xl border bg-white flex flex-col overflow-hidden transition-all hover:shadow-lg"
            style={{ borderColor: '#E2ECEC' }}
        >
            {/* Colour accent bar */}
            <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, #268181, #29D4AB)` }} />

            <div className="p-6 flex flex-col flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold" style={{ color: '#355E5E', fontSize: '1.05rem' }}>{study.name}</span>
                            <span className="text-sm" style={{ color: '#9CA3AF' }}>· {study.location}</span>
                        </div>
                        <p className="text-xs" style={{ color: '#718096' }}>{study.role}</p>
                    </div>
                    <span
                        className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: am.bg, color: am.color }}
                    >
            {study.audience}
          </span>
                </div>

                {/* Tag */}
                {study.tag && (
                    <span className="self-start mb-3 px-2.5 py-0.5 rounded-full text-xs" style={{ backgroundColor: '#F0FAF9', color: '#268181', border: '1px solid #D0E8E8' }}>
            {study.tag}
          </span>
                )}

                {/* Problem */}
                <div className="mb-3">
                    <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#9CA3AF' }}>The challenge</p>
                    <p className="text-sm" style={{ color: '#4A6363', lineHeight: 1.65 }}>
                        {expanded ? study.problem : study.problem.slice(0, 160) + (study.problem.length > 160 ? '…' : '')}
                    </p>
                </div>

                {/* Outcome — visible on expand */}
                {expanded && (
                    <>
                        <div className="mb-3">
                            <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#9CA3AF' }}>What happened</p>
                            <p className="text-sm" style={{ color: '#4A6363', lineHeight: 1.65 }}>{study.outcome}</p>
                        </div>
                        {study.quote && (
                            <blockquote className="rounded-xl p-4 mb-3 border-l-4 italic text-sm" style={{ backgroundColor: '#F0FAF9', borderColor: '#29D4AB', color: '#355E5E' }}>
                                "{study.quote}"
                            </blockquote>
                        )}
                    </>
                )}

                {/* Tools used */}
                <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t" style={{ borderColor: '#F0F4F4' }}>
                    {study.tools.map(tool => (
                        <span
                            key={tool}
                            className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
                            style={{ backgroundColor: '#F8FAFA', color: toolMeta[tool].color, border: '1px solid #E2ECEC' }}
                        >
              {toolMeta[tool].icon}
                            {tool}
            </span>
                    ))}
                    <button
                        onClick={() => setExpanded(e => !e)}
                        className="ml-auto text-xs font-semibold transition-colors"
                        style={{ color: '#268181' }}
                    >
                        {expanded ? 'Read less ↑' : 'Read more ↓'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export function InPractice() {
    const [activeAudience, setActiveAudience] = useState<Audience>('All');

    const filtered = activeAudience === 'All'
        ? studies
        : studies.filter(s => s.audience === activeAudience);

    const counts: Record<Audience, number> = {
        All: studies.length,
        'Dataset Creator': studies.filter(s => s.audience === 'Dataset Creator').length,
        'Researcher':      studies.filter(s => s.audience === 'Researcher').length,
        'Community':       studies.filter(s => s.audience === 'Community').length,
        'Policymaker':     studies.filter(s => s.audience === 'Policymaker').length,
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F8FAFA' }}>
            {/* Hero */}
            <div className="relative overflow-hidden py-24" style={{ backgroundColor: '#1A2E2E' }}>
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="ipGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1.5" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#ipGrid)" />
                    </svg>
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
                    <nav className="flex items-center gap-2 text-white/60 text-sm mb-6">
                        <Link to="/noodl-framework" className="hover:text-white transition-colors">NOODL Framework</Link>
                        <span>›</span>
                        <span className="text-white">In Practice</span>
                    </nav>
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle, #F9A826 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
                    <div className="flex items-center gap-3 mb-5">
                        <div className="h-px w-10" style={{ backgroundColor: '#F9A826' }} />
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F9A826' }}>NOODL Framework</span>
                    </div>
                    <h1 className="text-white mb-4 font-extrabold" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                        In Practice
                    </h1>
                    <p className="text-white/85 max-w-2xl" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                        How the NOODL Framework gets used — real stories from dataset creators, researchers, communities, and policymakers across Africa and beyond.
                    </p>

                    {/* Audience counts */}
                    <div className="flex flex-wrap gap-3 mt-6">
                        {(Object.entries(audienceMeta) as [Exclude<Audience, 'All'>, typeof audienceMeta[keyof typeof audienceMeta]][]).map(([aud, meta]) => (
                            <span
                                key={aud}
                                className="px-3 py-1.5 rounded-full text-xs font-semibold"
                                style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}
                            >
                {aud} ({counts[aud]})
              </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filter bar */}
            <div className="sticky top-[80px] z-30 border-b shadow-sm" style={{ backgroundColor: 'white', borderColor: '#E2ECEC' }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="flex items-center gap-2 py-3 overflow-x-auto">
                        {audiences.map(aud => {
                            const isActive = activeAudience === aud;
                            const meta = aud !== 'All' ? audienceMeta[aud] : null;
                            return (
                                <button
                                    key={aud}
                                    onClick={() => setActiveAudience(aud)}
                                    className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                                    style={{
                                        backgroundColor: isActive ? '#F9A826' : '#F0F4F4',
                                        color: isActive ? '#1A2E2E' : '#4A6363',
                                        border: '1px solid transparent',
                                    }}
                                >
                                    {aud}
                                    <span className="ml-1.5 opacity-60">({counts[aud]})</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Cards grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
                {/* Results count */}
                <p className="text-sm mb-6" style={{ color: '#9CA3AF' }}>
                    Showing {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
                    {activeAudience !== 'All' ? ` · ${activeAudience}` : ''}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map(study => (
                        <StudyCard key={study.id} study={study} />
                    ))}
                </div>

                {/* Share your story CTA */}
                <div className="mt-14 rounded-2xl overflow-hidden border" style={{ borderColor: '#D0E8E8' }}>
                    <div className="p-8 md:flex items-center justify-between gap-8" style={{ background: 'linear-gradient(135deg, #F0FAF9 0%, white 100%)' }}>
                        <div>
                            <h3 className="mb-2" style={{ color: '#355E5E', fontSize: '1.15rem', fontWeight: 700 }}>
                                Have a story to share?
                            </h3>
                            <p className="text-sm max-w-lg" style={{ color: '#718096', lineHeight: 1.7 }}>
                                We're collecting experiences from communities, researchers, and dataset creators across Africa. If you've used the NOODL Framework — or if you've faced the kinds of challenges it was built to address — we'd like to hear from you.
                            </p>
                        </div>
                        <div className="mt-5 md:mt-0 flex flex-col sm:flex-row gap-3 flex-shrink-0">
                            <Link
                                to="/get-involved"
                                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105 shadow-md whitespace-nowrap"
                                style={{ background: 'linear-gradient(135deg, #268181 0%, #29D4AB 100%)' }}
                            >
                                Share your story →
                            </Link>
                            <Link
                                to="/noodl-framework"
                                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border transition-all hover:shadow-sm whitespace-nowrap"
                                style={{ borderColor: '#268181', color: '#268181', backgroundColor: 'white' }}
                            >
                                Back to Framework
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Related links */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'NOODL Licence', desc: 'Read the Nwulite Obodo License', to: '/nwulite-obodo-license' },
                        { label: 'Split Sheet', desc: 'Document your contributors', to: '/noodl-framework/split-sheet' },
                        { label: 'Resource Library', desc: 'Papers, briefs, and videos', to: '/noodl-framework/resources' },
                    ].map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="flex items-center justify-between px-5 py-4 rounded-xl border bg-white transition-all hover:shadow-sm"
                            style={{ borderColor: '#E2ECEC' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#268181'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E2ECEC'; }}
                        >
                            <div>
                                <p className="text-sm font-semibold" style={{ color: '#268181' }}>{link.label}</p>
                                <p className="text-xs" style={{ color: '#718096' }}>{link.desc}</p>
                            </div>
                            <span style={{ color: '#29D4AB' }}>→</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
