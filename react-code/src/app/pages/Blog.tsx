import { useState } from 'react';
import { Rss, ArrowLeft } from 'lucide-react';

type Tag = 'all' | 'Dataset Creator' | 'Researcher' | 'Community' | 'Policymaker' | 'News' | 'Updates' | 'Stories from the field';

interface Post {
    id: number;
    title: string;
    lead: string;
    tags: Exclude<Tag, 'all'>[];
    date: string;
    author: string;
    thumbnail: string | null;
    body: React.ReactNode;
}

const tagColors: Record<Exclude<Tag, 'all'>, { bg: string; text: string }> = {
    'Dataset Creator':       { bg: '#D1FAE5', text: '#065F46' },
    'Researcher':            { bg: '#DBEAFE', text: '#1D4ED8' },
    'Community':             { bg: '#FCE7F3', text: '#9D174D' },
    'Policymaker':           { bg: '#EDE9FE', text: '#5B21B6' },
    'News':                  { bg: '#FEF3C7', text: '#B45309' },
    'Updates':               { bg: '#F0FAF9', text: '#268181' },
    'Stories from the field':{ bg: '#FFF7ED', text: '#C2410C' },
};

const posts: Post[] = [
    {
        id: 1,
        title: 'Getting Started with the NOODL Framework',
        lead: 'Learn how to use the NOODL License and accompanying tools to share your African datasets equitably.',
        tags: ['Dataset Creator', 'Updates'],
        date: '2026-06-01',
        author: 'Data Science Law Lab',
        thumbnail: null,
        body: (
            <div className="space-y-5" style={{ color: '#2F4F4F', lineHeight: 1.8 }}>
                <p>
                    The NOODL Framework was built around a simple conviction: that sharing African datasets openly should raise the communities those datasets come from — not extract from them. If you are creating or releasing an African dataset for the first time, this post walks you through the three tools the framework gives you and how to use them together.
                </p>
                <h3 style={{ color: '#355E5E', fontWeight: 700, fontSize: '1.1rem' }}>Start with the Split Sheet</h3>
                <p>
                    Before you apply a licence, document who created the dataset. The <a href="/noodl-framework/split-sheet" style={{ color: '#268181' }} className="underline">African Dataset Creation Split Sheet</a> is a simple, signed record of every contributor — their legal name, their role (content creator, translator, data curator, language technologist, or data evaluator), and the share of the dataset they hold. Fill it in while contributions are still fresh. Once it is signed by everyone, keep it alongside your dataset record so it travels with the data.
                </p>
                <p>
                    The Split Sheet matters because it makes the people behind a dataset visible. Too often, datasets are attributed to a single custodial institution while the linguists, community members, and annotators who did the actual work go unacknowledged. The Split Sheet changes that.
                </p>
                <h3 style={{ color: '#355E5E', fontWeight: 700, fontSize: '1.1rem' }}>Apply the NOODL Licence</h3>
                <p>
                    The <a href="/nwulite-obodo-license" style={{ color: '#268181' }} className="underline">Nwulite Obodo Open Data License (NOODL)</a> lets you share your dataset openly while setting fair terms for what you get in return. It sorts users into two groups: those based in Developing Countries (Section 1(d)(i)) and everyone else (Section 1(d)(ii)). The licence applies open terms to the first group and asks the second group to provide a benefit or value you specify — a training session, a contribution to a community fund, or whatever makes sense for your context.
                </p>
                <p>
                    When you apply the licence, use the generator on the <a href="/nwulite-obodo-license" style={{ color: '#268181' }} className="underline">View License page</a> to fill in your dataset details and benefit requirements. Then include the generated notice prominently in your README, dataset card, and any publication that uses the data.
                </p>
                <h3 style={{ color: '#355E5E', fontWeight: 700, fontSize: '1.1rem' }}>Point people to the Dictionary</h3>
                <p>
                    If users of your dataset have questions about what the licence requires of them — what counts as Adapted Material, how the ShareAlike condition works, or what a Developing Country is — point them to the <a href="/noodl-framework/dictionary" style={{ color: '#268181' }} className="underline">Equitable Licensing Dictionary</a>. It gives plain-language explanations of every key term in the licence.
                </p>
                <h3 style={{ color: '#355E5E', fontWeight: 700, fontSize: '1.1rem' }}>Questions?</h3>
                <p>
                    If you are unsure whether the NOODL Framework is right for your dataset, or if you need guidance on applying it, <a href="/get-involved" style={{ color: '#268181' }} className="underline">get in touch</a>. We offer consultations for institutions and research groups working through these questions for the first time.
                </p>
            </div>
        ),
    },
    {
        id: 2,
        title: 'Community Voices: The Impact of Equitable Licensing',
        lead: 'Stories from African language communities about how NOODL is changing the way they share their data.',
        tags: ['Community', 'Stories from the field'],
        date: '2026-05-28',
        author: 'Chijioke Okorie',
        thumbnail: null,
        body: (
            <div className="space-y-5" style={{ color: '#2F4F4F', lineHeight: 1.8 }}>
                <p>
                    When we started building NOODL, we knew the licence had to be tested against real use cases — not hypothetical ones. Over the past two years, we have spoken to community data stewards, researchers, and language technologists across the continent about the specific moments where standard open licensing failed them. What follows are three of those stories.
                </p>
                <h3 style={{ color: '#355E5E', fontWeight: 700, fontSize: '1.1rem' }}>"We didn't know we had options"</h3>
                <p>
                    A language community in West Africa had contributed hundreds of hours of recorded speech to a dataset held by a European university. The dataset was released under a standard CC BY licence. When a technology company later built a voice assistant on the data, the community received no acknowledgement and no return. By the time they heard about NOODL through our resource library, the original release could not be undone — but the community worked with the university to release a new version under NOODL-1.0, with a Split Sheet completed retrospectively and a benefit-sharing clause applied to future commercial use.
                </p>
                <p>
                    "We didn't know we had options," one community representative told us. "The framework gave us language and tools to ask for what was fair."
                </p>
                <h3 style={{ color: '#355E5E', fontWeight: 700, fontSize: '1.1rem' }}>Recognition, not just access</h3>
                <p>
                    A graduate student in East Africa told us that his main concern when publishing his thesis dataset was not money — it was credit. Eight community volunteers had spent weeks transcribing audio recordings for his Dholuo text corpus. Under a standard CC BY licence, the only attribution required was to the dataset as a whole, typically cited in the name of the university. The Split Sheet gave him a way to name every contributor individually, with their role and share documented. All eight are now listed on the published dataset card on Mozilla Data Collective.
                </p>
                <h3 style={{ color: '#355E5E', fontWeight: 700, fontSize: '1.1rem' }}>What equitable looks like in practice</h3>
                <p>
                    A US-based AI lab using a Yoruba speech corpus released under NOODL fulfilled their Section 3.3 benefit-sharing obligation by funding a three-day language technology training session for students at a Nigerian university. The Dataset Provider had specified this as their desired benefit when applying the licence. The case is now included in the NOODL Framework's guidance notes as an example of what good-faith compliance looks like.
                </p>
                <p>
                    These stories are not exceptional. They are becoming the baseline expectation in communities that have seen what unconditional openness looks like in practice. If you have a story to share, <a href="/get-involved" style={{ color: '#268181' }} className="underline">we want to hear it</a>.
                </p>
            </div>
        ),
    },
    {
        id: 3,
        title: 'Policy Brief: Implementing NOODL in Institutional Settings',
        lead: 'Guidance for universities and research institutions on adopting the NOODL Framework for data governance.',
        tags: ['Policymaker', 'News'],
        date: '2026-05-15',
        author: 'Data Science Law Lab',
        thumbnail: null,
        body: (
            <div className="space-y-5" style={{ color: '#2F4F4F', lineHeight: 1.8 }}>
                <p>
                    Universities and research institutions across Africa are increasingly creating and custodying datasets of significant value — language corpora, health records, environmental sensor data, and more. This post sets out practical steps for institutions considering the NOODL Framework as part of their data governance approach.
                </p>
                <h3 style={{ color: '#355E5E', fontWeight: 700, fontSize: '1.1rem' }}>Why institutions need context-sensitive licensing</h3>
                <p>
                    Standard open licences were designed with a different set of assumptions: that the primary risk is excessive restriction, and that openness is always the correct default. In many research contexts that remains true. But for African datasets — particularly those involving community contributors, indigenous knowledge, or data generated through participatory research — unconditional openness can transfer value away from the people closest to the data.
                </p>
                <p>
                    The NOODL Framework does not ask institutions to choose between openness and protection. It asks them to be specific about what openness means in their context, and to build that specificity into their licence terms from the start.
                </p>
                <h3 style={{ color: '#355E5E', fontWeight: 700, fontSize: '1.1rem' }}>Step 1: Adopt a Split Sheet policy</h3>
                <p>
                    Before any dataset under your institution's custody is published, require that a completed and signed Split Sheet is on file. This is not a legal formality — it is the foundational document that makes benefit sharing possible. An institution that cannot name who contributed to a dataset cannot fairly distribute the returns from that dataset.
                </p>
                <p>
                    Build the Split Sheet requirement into your research data management policy. Link it to your ethics review process so that datasets involving community contributors are automatically flagged for Split Sheet completion before publication.
                </p>
                <h3 style={{ color: '#355E5E', fontWeight: 700, fontSize: '1.1rem' }}>Step 2: Adopt NOODL as a default licence option</h3>
                <p>
                    Add the Nwulite Obodo Open Data License to the list of licences available to researchers publishing datasets through your institution's data repository. Train research support staff to explain the difference between NOODL and standard CC licences — specifically, when NOODL is more appropriate.
                </p>
                <p>
                    NOODL is most appropriate when: the dataset was created with community contributions; the dataset has commercial applications; or the institution wants to ensure that benefits flow back to contributors over time. CC BY or CC0 remain appropriate for datasets without these features.
                </p>
                <h3 style={{ color: '#355E5E', fontWeight: 700, fontSize: '1.1rem' }}>Step 3: Request a consultation</h3>
                <p>
                    We offer consultations for institutions working through these questions. If your institution is developing or revising a research data policy and you want to understand how the NOODL Framework fits in, <a href="/get-involved" style={{ color: '#268181' }} className="underline">get in touch</a>. We also work with ministries and government agencies setting national AI data strategy — the framework has already informed one national government's draft data-sharing recommendations.
                </p>
            </div>
        ),
    },
];

function PostDetail({ post, onBack }: { post: Post; onBack: () => void }) {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F8FAFA' }}>
            {/* Top bar */}
            <div className="border-b py-4 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'white', borderColor: '#E2ECEC' }}>
                <div className="container mx-auto max-w-3xl">
                    <nav className="flex items-center gap-2 text-sm mb-3" style={{ color: '#718096' }}>
                        <button onClick={onBack} className="hover:underline" style={{ color: '#268181' }}>LAD Updates</button>
                        <span>›</span>
                        <span style={{ color: '#2F4F4F' }} className="truncate max-w-xs">{post.title}</span>
                    </nav>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-70"
                        style={{ color: '#268181' }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to all posts
                    </button>
                </div>
            </div>

            {/* Article */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-12">
                <article className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#E2ECEC' }}>
                    {/* Article header */}
                    <div className="px-8 pt-8 pb-6 border-b" style={{ borderColor: '#E2ECEC', background: 'linear-gradient(135deg, #F0FAF9 0%, white 100%)' }}>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                                    style={{ backgroundColor: tagColors[tag].bg, color: tagColors[tag].text }}
                                >
                  {tag}
                </span>
                            ))}
                        </div>

                        <h1 className="mb-4" style={{ color: '#355E5E', fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.25 }}>
                            {post.title}
                        </h1>

                        <p className="mb-4" style={{ color: '#4A6363', fontSize: '1.05rem', lineHeight: 1.65 }}>
                            {post.lead}
                        </p>

                        <div className="flex items-center gap-3 text-sm" style={{ color: '#9CA3AF' }}>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#268181' }}>
                                {post.author.charAt(0)}
                            </div>
                            <span style={{ color: '#355E5E', fontWeight: 600 }}>{post.author}</span>
                            <span>·</span>
                            <time>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="px-8 py-8">
                        {post.body}
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-5 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: '#E2ECEC', backgroundColor: '#F8FAFA' }}>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                                    style={{ backgroundColor: tagColors[tag].bg, color: tagColors[tag].text }}
                                >
                  {tag}
                </span>
                            ))}
                        </div>
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-70"
                            style={{ color: '#268181' }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to all posts
                        </button>
                    </div>
                </article>
            </div>
        </div>
    );
}

export function Blog() {
    const [selectedTag, setSelectedTag] = useState<Tag>('all');
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    const tags: Tag[] = [
        'all',
        'Dataset Creator',
        'Researcher',
        'Community',
        'Policymaker',
        'News',
        'Updates',
        'Stories from the field',
    ];

    const filteredPosts = selectedTag === 'all'
        ? posts
        : posts.filter(post => post.tags.includes(selectedTag as Exclude<Tag, 'all'>));

    if (selectedPost) {
        return (
            <PostDetail
                post={selectedPost}
                onBack={() => { setSelectedPost(null); window.scrollTo({ top: 0 }); }}
            />
        );
    }

    return (
        <div className="w-full">
            {/* Header */}
            <section className="relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#1A2E2E' }}>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle, #F9A826 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px w-10" style={{ backgroundColor: '#F9A826' }} />
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F9A826' }}>LAD Updates</span>
                    </div>
                    <h1 className="font-extrabold text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                        Thoughts, news &amp; updates.
                    </h1>
                    <p className="text-xl max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        On equitable data sharing, the NOODL Framework, and the work as it unfolds.
                    </p>
                </div>
            </section>

            {/* Tag Filter */}
            <section className="py-6 px-4 sm:px-6 lg:px-8 border-b sticky top-[80px] z-30" style={{ borderColor: '#E2ECEC', backgroundColor: 'white' }}>
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                                style={{
                                    backgroundColor: selectedTag === tag ? '#F9A826' : '#F0F4F4',
                                    color: selectedTag === tag ? '#1A2E2E' : '#4A6363',
                                }}
                            >
                                {tag === 'all' ? 'All' : tag}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Post list */}
            <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F8FAFA' }}>
                <div className="container mx-auto max-w-5xl">
                    <div className="space-y-6">
                        {filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="group border rounded-2xl bg-white overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                                style={{ borderColor: '#E2ECEC' }}
                                onClick={() => { setSelectedPost(post); window.scrollTo({ top: 0 }); }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#268181'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E2ECEC'; }}
                            >
                                {/* Accent bar */}
                                <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #F9A826, #E19111)' }} />

                                <div className="p-8">
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                                                style={{ backgroundColor: tagColors[tag].bg, color: tagColors[tag].text }}
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>

                                    <h2 className="mb-2 group-hover:opacity-80 transition-opacity" style={{ color: '#355E5E', fontSize: '1.3rem', fontWeight: 700, lineHeight: 1.3 }}>
                                        {post.title}
                                    </h2>

                                    <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>
                                        {post.author} · {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>

                                    <p className="mb-5 leading-relaxed" style={{ color: '#4A6363' }}>
                                        {post.lead}
                                    </p>

                                    <span
                                        className="inline-flex items-center gap-2 text-sm font-semibold"
                                        style={{ color: '#268181' }}
                                    >
                    Read post →
                  </span>
                                </div>
                            </article>
                        ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-16">
                            <p style={{ color: '#718096' }}>No posts found for this tag.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* RSS */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: '#E2ECEC' }}>
                <div className="container mx-auto max-w-5xl text-center">
                    <a
                        href="/rss.xml"
                        className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity"
                        style={{ color: '#268181' }}
                    >
                        <Rss className="w-4 h-4" />
                        Subscribe via RSS
                    </a>
                </div>
            </section>
        </div>
    );
}
