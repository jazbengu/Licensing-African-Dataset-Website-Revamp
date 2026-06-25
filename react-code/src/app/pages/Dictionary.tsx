import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';

interface DictionaryEntry {
    term: string;
    category: 'Legal' | 'Data Governance' | 'NOODL' | 'Technical' | 'Policy';
    definition: string;
    relatedTerms?: string[];
    example?: string;
}

const API_BASE = 'http://licensing-african-datasets-prototype.local/wp-json/wp/v2';

// Strip WP's wrapping <p> tags / HTML from the content field for a clean definition string
function stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || '').trim();
}

async function fetchDictionaryEntries(): Promise<DictionaryEntry[]> {
    const res = await fetch(`${API_BASE}/lad_term?per_page=100&orderby=title&order=asc`);
    if (!res.ok) throw new Error('Failed to fetch dictionary terms');
    const data = await res.json();

    return data.map((item: any): DictionaryEntry => ({
        term: stripHtml(item.title?.rendered ?? ''),
        category: (item.meta?.category as DictionaryEntry['category']) ?? 'Legal',
        definition: stripHtml(item.content?.rendered ?? ''),
        relatedTerms: Array.isArray(item.meta?.relatedTerms) ? item.meta.relatedTerms : [],
        example: item.meta?.example ?? undefined,
    }));
}

// Build a map: letter → entries
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function buildIndex(entries: DictionaryEntry[]) {
    const map: Record<string, DictionaryEntry[]> = {};
    for (const entry of entries) {
        if (!entry.term) continue;
        const letter = entry.term[0].toUpperCase();
        if (!map[letter]) map[letter] = [];
        map[letter].push(entry);
    }
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
    const [entries, setEntries] = useState<DictionaryEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selected, setSelected] = useState<DictionaryEntry | null>(null);
    const [activeLetterHighlight, setActiveLetterHighlight] = useState<string>('');
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    useEffect(() => {
        fetchDictionaryEntries()
            .then(setEntries)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const indexData = buildIndex(entries);
    const availableLetters = new Set(Object.keys(indexData));

    // Scroll spy: update highlighted letter based on scroll position
    useEffect(() => {
        if (selected || loading) return;
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
    }, [selected, loading]);

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
                allEntries={entries}
                onBack={() => setSelected(null)}
                onNavigate={(term) => setSelected(entries.find(e => e.term === term) ?? selected)}
            />
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8FAFA' }}>
                <p style={{ color: '#718096' }}>Loading dictionary…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8FAFA' }}>
                <p style={{ color: '#B45309' }}>Couldn't load the dictionary: {error}</p>
            </div>
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
                        <span className="text-white">Equitable Dictionary</span>
                    </nav>
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle, #F9A826 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
                    <div className="flex items-center gap-3 mb-5">
                        <div className="h-px w-10" style={{ backgroundColor: '#F9A826' }} />
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F9A826' }}>NOODL Framework</span>
                    </div>
                    <h1 className="text-white mb-3 font-extrabold" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                        Equitable Licensing Dictionary
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
                {entries.length === 0 && (
                    <p style={{ color: '#718096' }}>No dictionary terms have been added yet. Add some from the WordPress admin under "Dictionary Terms."</p>
                )}
                {alphabet.filter(l => availableLetters.has(l)).map(letter => (
                    <section
                        key={letter}
                        ref={el => { sectionRefs.current[letter] = el; }}
                        className="mb-10"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #268181 0%, #29D4AB 100%)' }}
                            >
                                <span className="text-white font-bold" style={{ fontSize: '1.25rem' }}>{letter}</span>
                            </div>
                            <div className="flex-1 h-px" style={{ backgroundColor: '#D0E8E8' }} />
                        </div>

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

function TermDetail({ entry, allEntries, onBack, onNavigate }: { entry: DictionaryEntry; allEntries: DictionaryEntry[]; onBack: () => void; onNavigate: (term: string) => void }) {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F8FAFA' }}>
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
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F0FAF9'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'white'; }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dictionary
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-12">
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: '#E2ECEC' }}>
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

                    <div className="px-8 py-6">
                        <p style={{ color: '#2F4F4F', lineHeight: 1.8, fontSize: '1.05rem' }}>
                            {entry.definition}
                        </p>
                    </div>

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

                    {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                        <div className="px-8 pb-8">
                            <h3 className="text-sm font-semibold mb-3" style={{ color: '#718096' }}>
                                RELATED TERMS
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {entry.relatedTerms.map(rt => {
                                    const exists = allEntries.find(e => e.term === rt);
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