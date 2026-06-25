import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Play, FileText, BookOpen, Newspaper, Headphones, ExternalLink, Download } from 'lucide-react';

type Format = 'All' | 'Videos' | 'Summaries & Explainers' | 'Policy Briefs' | 'Reports' | 'Articles & Publications' | 'Audio Explainers';

interface Resource {
    id: string;
    format: Exclude<Format, 'All'>;
    title: string;
    description: string;
    date?: string;
    duration?: string;
    language?: string;
    author?: string;
    outlet?: string;
    link?: string;
    downloadable?: boolean;
    comingSoon?: boolean;
}

const API_BASE = import.meta.env.VITE_WP_API;

// ✅ Outside the component
function stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || '').trim();
}

// ✅ Outside the component
async function fetchResources(): Promise<Resource[]> {
    const res = await fetch(`${API_BASE}/lad_resource?per_page=100&orderby=title&order=asc`);
    if (!res.ok) throw new Error('Failed to fetch resources');
    const data = await res.json();
    return data.map((item: any): Resource => ({
        id: String(item.id),
        title: stripHtml(item.title?.rendered ?? ''),
        description: stripHtml(item.content?.rendered ?? ''),
        format: (item.meta?.format as Resource['format']) ?? 'Articles & Publications',
        date: item.meta?.date || undefined,
        duration: item.meta?.duration || undefined,
        language: item.meta?.language || undefined,
        author: item.meta?.author || undefined,
        outlet: item.meta?.outlet || undefined,
        link: item.meta?.link || undefined,
        downloadable: item.meta?.downloadable === '1' || item.meta?.downloadable === true,
        comingSoon: item.meta?.comingSoon === '1' || item.meta?.comingSoon === true,
    }));
}

// ✅ Outside the component
const formats: Format[] = [
    'All', 'Videos', 'Summaries & Explainers', 'Policy Briefs',
    'Reports', 'Articles & Publications', 'Audio Explainers',
];

// ✅ Outside the component
const formatMeta: Record<Exclude<Format, 'All'>, { icon: React.ReactNode; color: string; bg: string }> = {
    'Videos': { icon: <Play className="w-4 h-4" />, color: '#B45309', bg: '#FEF3C7' },
    'Summaries & Explainers': { icon: <FileText className="w-4 h-4" />, color: '#065F46', bg: '#D1FAE5' },
    'Policy Briefs': { icon: <Newspaper className="w-4 h-4" />, color: '#9D174D', bg: '#FCE7F3' },
    'Reports': { icon: <BookOpen className="w-4 h-4" />, color: '#1D4ED8', bg: '#DBEAFE' },
    'Articles & Publications': { icon: <FileText className="w-4 h-4" />, color: '#5B21B6', bg: '#EDE9FE' },
    'Audio Explainers': { icon: <Headphones className="w-4 h-4" />, color: '#0369A1', bg: '#E0F2FE' },
};

// ✅ Outside the component
function ResourceCard({ resource }: { resource: Resource }) {
    const meta = formatMeta[resource.format];
    if (!meta) return null;
    const isInternal = resource.link?.startsWith('/');

    const CardWrapper = ({ children }: { children: React.ReactNode }) => {
        if (resource.comingSoon || !resource.link) {
            return <div className="rounded-2xl border bg-white p-5 flex flex-col h-full" style={{ borderColor: '#E2ECEC' }}>{children}</div>;
        }
        if (isInternal) {
            return (
                <Link to={resource.link!} className="rounded-2xl border bg-white p-5 flex flex-col h-full transition-all hover:shadow-md block" style={{ borderColor: '#E2ECEC' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#268181'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E2ECEC'; }}>
                    {children}
                </Link>
            );
        }
        return (
            <a href={resource.link} target="_blank" rel="noopener noreferrer"
               className="rounded-2xl border bg-white p-5 flex flex-col h-full transition-all hover:shadow-md" style={{ borderColor: '#E2ECEC' }}
               onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#268181'; }}
               onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E2ECEC'; }}>
                {children}
            </a>
        );
    };

    return (
        <CardWrapper>
            <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: meta.bg, color: meta.color }}>
                    {meta.icon}{resource.format}
                </span>
                {resource.comingSoon && <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#F3F4F6', color: '#6B7280' }}>Coming soon</span>}
                {!resource.comingSoon && resource.link && !isInternal && <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#9CA3AF' }} />}
                {!resource.comingSoon && resource.downloadable && <Download className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#268181' }} />}
            </div>
            <h3 className="mb-2" style={{ color: '#355E5E', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.4 }}>{resource.title}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
                {resource.outlet && <span className="text-xs" style={{ color: '#268181' }}>{resource.outlet}</span>}
                {resource.outlet && resource.date && <span className="text-xs" style={{ color: '#D0E8E8' }}>·</span>}
                {resource.date && <span className="text-xs" style={{ color: '#9CA3AF' }}>{resource.date}</span>}
                {resource.author && !resource.outlet && <span className="text-xs" style={{ color: '#9CA3AF' }}>{resource.author}</span>}
                {resource.language && <><span className="text-xs" style={{ color: '#D0E8E8' }}>·</span><span className="text-xs" style={{ color: '#9CA3AF' }}>{resource.language}</span></>}
                {resource.duration && <><span className="text-xs" style={{ color: '#D0E8E8' }}>·</span><span className="text-xs" style={{ color: '#9CA3AF' }}>{resource.duration}</span></>}
            </div>
            <p className="text-sm flex-1" style={{ color: '#4A6363', lineHeight: 1.65 }}>{resource.description}</p>
            {!resource.comingSoon && resource.link && (
                <div className="mt-4 pt-3 border-t flex items-center gap-1 text-xs font-semibold" style={{ borderColor: '#F0F4F4', color: '#268181' }}>
                    {resource.downloadable ? <><Download className="w-3 h-3" /> Download</> : isInternal ? <>Read →</> : <><ExternalLink className="w-3 h-3" /> Open</>}
                </div>
            )}
            {resource.comingSoon && resource.link && (
                <div className="mt-4 pt-3 border-t" style={{ borderColor: '#F0F4F4' }}>
                    <Link to={resource.link} className="text-xs font-semibold" style={{ color: '#268181' }}>Get involved →</Link>
                </div>
            )}
        </CardWrapper>
    );
}

// ✅ Outside the component
function SectionGroup({ format, items }: { format: Exclude<Format, 'All'>; items: Resource[] }) {
    const meta = formatMeta[format];
    return (
        <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: meta.bg, color: meta.color }}>
                    {meta.icon}
                </div>
                <h2 style={{ color: '#355E5E', fontSize: '1.2rem', fontWeight: 700 }}>{format}</h2>
                <span className="text-sm" style={{ color: '#9CA3AF' }}>({items.length})</span>
                <div className="flex-1 h-px" style={{ backgroundColor: '#E2ECEC' }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(r => <ResourceCard key={r.id} resource={r} />)}
            </div>
        </section>
    );
}

// ✅ The component itself — clean and simple
export function Resources() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFormat, setActiveFormat] = useState<Format>('All');

    useEffect(() => {
        fetchResources()
            .then(setResources)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8FAFA' }}>
            <p style={{ color: '#718096' }}>Loading resources…</p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8FAFA' }}>
            <p style={{ color: '#B45309' }}>Couldn't load resources: {error}</p>
        </div>
    );

    const counts: Record<Format, number> = {
        All: resources.length,
        'Videos': resources.filter(r => r.format === 'Videos').length,
        'Summaries & Explainers': resources.filter(r => r.format === 'Summaries & Explainers').length,
        'Policy Briefs': resources.filter(r => r.format === 'Policy Briefs').length,
        'Reports': resources.filter(r => r.format === 'Reports').length,
        'Articles & Publications': resources.filter(r => r.format === 'Articles & Publications').length,
        'Audio Explainers': resources.filter(r => r.format === 'Audio Explainers').length,
    };

    const visibleFormats = activeFormat === 'All'
        ? (Object.keys(formatMeta) as Exclude<Format, 'All'>[])
        : [activeFormat as Exclude<Format, 'All'>];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F8FAFA' }}>
            {/* Hero */}
            <div className="relative overflow-hidden py-24" style={{ backgroundColor: '#1A2E2E' }}>
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="resGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1.5" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#resGrid)" />
                    </svg>
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
                    <nav className="flex items-center gap-2 text-white/60 text-sm mb-6">
                        <Link to="/noodl-framework" className="hover:text-white transition-colors">NOODL Framework</Link>
                        <span>›</span>
                        <span className="text-white">Resource Library</span>
                    </nav>
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle, #F9A826 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
                    <div className="flex items-center gap-3 mb-5">
                        <div className="h-px w-10" style={{ backgroundColor: '#F9A826' }} />
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F9A826' }}>NOODL Framework</span>
                    </div>
                    <h1 className="text-white mb-4 font-extrabold" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                        Resource Library
                    </h1>
                    <p className="text-white/85 max-w-2xl" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                        A growing collection of explainers, briefs, reports, publications, and videos to help you share and use African datasets with confidence. New resources are added as communities tell us what they need.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                        {(Object.entries(formatMeta) as [Exclude<Format, 'All'>, typeof formatMeta[keyof typeof formatMeta]][]).map(([fmt, meta]) => (
                            <span key={fmt} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20">
                                {meta.icon}{fmt} ({counts[fmt]})
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filter bar */}
            <div className="sticky top-[80px] z-30 border-b shadow-sm" style={{ backgroundColor: 'white', borderColor: '#E2ECEC' }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="flex items-center gap-2 py-3 overflow-x-auto">
                        {formats.map(fmt => {
                            const isActive = activeFormat === fmt;
                            return (
                                <button key={fmt} onClick={() => setActiveFormat(fmt)}
                                        className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                                        style={{ backgroundColor: isActive ? '#F9A826' : '#F0F4F4', color: isActive ? '#1A2E2E' : '#4A6363' }}>
                                    {fmt}{fmt !== 'All' && <span className="ml-1.5 opacity-60">({counts[fmt]})</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
                {visibleFormats.map(fmt => {
                    const items = resources.filter(r => r.format === fmt);
                    if (!items.length) return null;
                    return <SectionGroup key={fmt} format={fmt} items={items} />;
                })}

                {/* Contribute CTA */}
                <div className="rounded-2xl p-8 text-center border" style={{ background: 'linear-gradient(135deg, #F0FAF9 0%, white 100%)', borderColor: '#D0E8E8' }}>
                    <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #268181 0%, #29D4AB 100%)' }}>
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="mb-2" style={{ color: '#355E5E', fontSize: '1.1rem', fontWeight: 700 }}>Know a resource that belongs here?</h3>
                    <p className="text-sm max-w-md mx-auto mb-5" style={{ color: '#718096' }}>
                        The library grows as the community points us to what they need. If you've written, found, or know of a resource on equitable African data licensing, get in touch.
                    </p>
                    <Link to="/get-involved" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105 shadow-md"
                          style={{ background: 'linear-gradient(135deg, #268181 0%, #29D4AB 100%)' }}>
                        Suggest a resource →
                    </Link>
                </div>
            </div>
        </div>
    );
}