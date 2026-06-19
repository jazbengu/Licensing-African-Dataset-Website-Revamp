import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function About() {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [pressOpen, setPressOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#1A2E2E' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle, #F9A826 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ backgroundColor: '#F9A826' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F9A826' }}>About the Project</span>
          </div>
          <h1 className="font-extrabold text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Building frameworks for equitable African data.
          </h1>
          <p className="text-xl max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Read about our rationale and history. Follow news about our project.
          </p>
        </div>
      </section>

      {/* Body sections */}
      <div style={{ backgroundColor: '#F5F5F5' }}>
        {[
          { bg: 'white', eyebrow: 'What We Do', heading: 'What we do', body: <p className="text-lg leading-relaxed" style={{ color: '#4A6363' }}>Licensing African Datasets project builds the legal tools that let African datasets be shared openly and equitably. We started from a hard truth: openness alone does not guarantee equity. In a landscape where well-resourced companies can freely extract open data to train powerful models, unconditional openness can deepen the very power asymmetries it claims to dissolve: the researchers, communities, and organisations closest to the data give it away for free, then often have to pay to use the tools built on top of it. Our work tackles the practical and intellectual questions that follow: What does a fair exchange for a dataset actually look like? How do you recognise the many people who create a dataset rather than a single licensor? And how do you write all of this into a licence that ordinary creators can read, trust, and use?</p> },
          { bg: '#F5F5F5', eyebrow: 'Our Conviction', heading: 'What guides us, and how to follow along', body: <p className="text-lg leading-relaxed" style={{ color: '#4A6363' }}>We are guided by a simple conviction: that open sharing of African datasets should raise the community, not extract from it and by the principle that different people and contexts may need to be treated differently to reach an equitable outcome. Everything we make is practical, plain-language, and built with the communities it serves rather than for them. You can follow the work through the <Link to="/noodl-framework" className="font-semibold underline hover:opacity-70" style={{ color: '#268181' }}>NOODL Framework</Link>, our <Link to="/noodl-framework/resources" className="font-semibold underline hover:opacity-70" style={{ color: '#268181' }}>resource library</Link>, and the History and Press sections below.</p> },
          { bg: 'white', eyebrow: 'The Lab', heading: 'Part of the Data Science Law Lab', body: <p className="text-lg leading-relaxed" style={{ color: '#4A6363' }}>Licensing African Datasets is one of several projects of the Data Science Law Lab, led by Chijioke Okorie. The Data Science Law Lab is a research group and experimental space developing legal and policy tools and approaches that support data science and technological innovation across Africa. <a href="https://datasciencelawlab.africa" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:opacity-70" style={{ color: '#268181' }}>See the lab and its other projects ↗</a></p> },
          { bg: '#F5F5F5', eyebrow: 'Method', heading: 'Our principles and method', body: <p className="text-lg leading-relaxed" style={{ color: '#4A6363' }}>Licensing African Datasets is built through participatory research: we develop our tools in the open, test drafts with the African AI/NLP community, and revise them in response to the people who use them. The <Link to="/noodl-framework/split-sheet" className="font-semibold underline hover:opacity-70" style={{ color: '#268181' }}>Dataset Creator Split Sheet</Link> exists so that everyone who contributes to a dataset can document and be credited for their work. The <Link to="/nwulite-obodo-license" className="font-semibold underline hover:opacity-70" style={{ color: '#268181' }}>NOODL License</Link> is built around equitable benefit-sharing, asking recipients from better-resourced contexts to return value to the source community and dataset creators.</p> },
          { bg: 'white', eyebrow: 'Collaboration', heading: 'A collaboration, not a solo effort', body: <p className="text-lg leading-relaxed" style={{ color: '#4A6363' }}>We work as a collaboration with research groups, institutions, funders, and dataset communities who share our questions. The NOODL Licence was drafted by Professor Chijioke Okorie with Dr Melissa Omino (CIPIT, Kenya) in collaboration and consultation with members of the Data Science Law Lab and the Data Science for Social Impact group at the University of Pretoria, and refined through feedback from across the African AI ecosystem. Funding was provided through a grant from the Mozilla Foundation's Data Futures Lab and a research gift from Meta to the University of Pretoria.</p> },
          { bg: '#F5F5F5', eyebrow: 'The Licence', heading: 'About the NOODL Licence', body: <p className="text-lg leading-relaxed" style={{ color: '#4A6363' }}>Nwulite Obodo is Igbo for raising, reviving, and building up the community. The licence was named by Chijioke Okorie in her mother tongue, Igbo — a deliberate choice to give an African licence a truly African name, and to carry in that name the belief that sharing African datasets should build the community it comes from. The Nwulite Obodo Open Data License (NOODL) offers a way to share African datasets that is open for all and yet equitable for the source community whoever they are.</p> },
        ].map(({ bg, eyebrow, heading, body }) => (
            <section key={heading} className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: bg }}>
              <div className="container mx-auto max-w-5xl">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#F9A826' }}>{eyebrow}</p>
                <h2 className="font-extrabold mb-6" style={{ color: '#1A2E2E', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>{heading}</h2>
                {body}
              </div>
            </section>
        ))}
      </div>

      {/* History Dropdown */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: 'rgba(249,168,38,0.3)', backgroundColor: 'white' }}>
        <div className="container mx-auto max-w-5xl">
          <button
              onClick={() => setHistoryOpen(!historyOpen)}
              className="w-full flex items-center justify-between py-4 text-left"
          >
            <h2 className="font-extrabold" style={{ color: '#1A2E2E', fontSize: '1.6rem' }}>History</h2>
            {historyOpen ? (
                <ChevronUp className="w-6 h-6" style={{ color: '#F9A826' }} />
            ) : (
                <ChevronDown className="w-6 h-6" style={{ color: '#F9A826' }} />
            )}
          </button>

          {historyOpen && (
              <div className="mt-6 space-y-6">
                <p className="text-lg leading-relaxed" style={{ color: '#2F4F4F' }}>
                  Licensing African Datasets began with a recognition that the way datasets are shared matters as much as whether they are shared at all. African researchers were creating, annotating, and labelling the datasets that make African-language AI possible and then releasing them under standard open licences that let others, often far better resourced, build and sell commercial tools back to the same communities. There was no one-size-fits-all licence that could treat different users differently while keeping data genuinely open. Out of that gap came the Nwulite Obodo Open Data License (NOODL), and out of the licence came a wider framework.
                </p>
                <p className="text-lg leading-relaxed font-semibold" style={{ color: '#355E5E' }}>
                  The milestones below trace that path.
                </p>

                <div className="space-y-4">
                  <div className="pl-6 border-l-2" style={{ borderColor: '#F9A826' }}>
                    <p className="font-extrabold mb-1" style={{ color: '#F9A826' }}>2022: The seed is planted</p>
                    <p style={{ color: '#2F4F4F' }}>
                      At Future Africa in Pretoria, Chijioke Okorie and Vukosi Marivate discuss how African datasets are shared under standard open licences, while planning the University of Pretoria leg of the Right to Research in Africa conference.
                    </p>
                  </div>

                  <div className="pl-6 border-l-2" style={{ borderColor: '#F9A826' }}>
                    <p className="font-extrabold mb-1" style={{ color: '#F9A826' }}>2023: Right to Research in Africa conference</p>
                    <p style={{ color: '#2F4F4F' }}>
                      Hosted at UP's Hatfield campus, the conference centres questions of whether copyright and fair dealing can support African researchers accessing materials for NLP and AI; questions that shape LAD's thinking.
                    </p>
                  </div>

                  <div className="pl-6 border-l-2" style={{ borderColor: '#F9A826' }}>
                    <p className="font-extrabold mb-1" style={{ color: '#F9A826' }}>2023: A proposal takes shape</p>
                    <p style={{ color: '#2F4F4F' }}>
                      Following Mozilla's Data Futures Lab call for proposals, Chijioke Okorie under the auspices of Data Science Law Lab and with Vukosi Marivate and Melissa Omino drafts a proposal to create an alternative open licence for sharing African datasets.
                    </p>
                  </div>

                  <div className="pl-6 border-l-2" style={{ borderColor: '#F9A826' }}>
                    <p className="font-extrabold mb-1" style={{ color: '#F9A826' }}>2024: The legal groundwork is laid</p>
                    <p style={{ color: '#2F4F4F' }}>
                      Chijioke and Vukosi publish How African NLP Experts Are Navigating the Challenges of Copyright, Innovation, and Access (Carnegie Endowment, 30 April 2024), setting out the project's core argument that openness must be adapted to context and community agency.
                    </p>
                  </div>

                  <div className="pl-6 border-l-2" style={{ borderColor: '#F9A826' }}>
                    <p className="font-extrabold mb-1" style={{ color: '#F9A826' }}>2024: Funded, and work begins</p>
                    <p style={{ color: '#2F4F4F' }}>
                      With a grant from Mozilla's Data Futures Lab and a research gift from Meta to the University of Pretoria, work begins in June; Chijioke presents the idea at the Data Futures Lab Speaker Series.
                    </p>
                  </div>

                  <div className="pl-6 border-l-2" style={{ borderColor: '#F9A826' }}>
                    <p className="font-extrabold mb-1" style={{ color: '#F9A826' }}>2024: First NOODL draft</p>
                    <p style={{ color: '#2F4F4F' }}>
                      A first draft of the licence is shared with the African NLP community including Lelapa AI, Data Science for Social Impact, the KenCorpus team, and the Lacuna Fund steering committee through an open feedback process.
                    </p>
                  </div>

                  <div className="pl-6 border-l-2" style={{ borderColor: '#F9A826' }}>
                    <p className="font-extrabold mb-1" style={{ color: '#F9A826' }}>2024: Launched at Deep Learning Indaba</p>
                    <p style={{ color: '#2F4F4F' }}>
                      The Nwulite Obodo Open Data Licence (NOODL) is launched, anchored by the Empowering African Voices in AI workshop co-organised by Data Science Law Lab and CIPIT at the Deep Learning Indaba in Dakar, Senegal (6 September 2024).
                    </p>
                  </div>

                  <div className="pl-6 border-l-2" style={{ borderColor: '#F9A826' }}>
                    <p className="font-extrabold mb-1" style={{ color: '#F9A826' }}>2024: MozFest Zambia and beyond</p>
                    <p style={{ color: '#2F4F4F' }}>
                      Chijioke is invited by Mozilla and pitches the licence at MozFest Zambia where the NOODL acronym is coined and NOODL is featured in MIT Technology Review (November 2024).
                    </p>
                  </div>

                  <div className="pl-6 border-l-2" style={{ borderColor: '#F9A826' }}>
                    <p className="font-extrabold mb-1" style={{ color: '#F9A826' }}>2025: From licence to tooling</p>
                    <p style={{ color: '#2F4F4F' }}>
                      Data Science Law Lab releases a tool to make the NOODL License easy to apply, and presents the work at the Hundzula Retreat 2025; the same year, the Esethu Licence is published, citing NOODL as an inspiration.
                    </p>
                  </div>

                  <div className="pl-6 border-l-2" style={{ borderColor: '#F9A826' }}>
                    <p className="font-extrabold mb-1" style={{ color: '#F9A826' }}>2025: Recognised by the Law Schools Global League</p>
                    <p style={{ color: '#2F4F4F' }}>
                      The NOODL research paper receives the Law Schools Global League (LSGL) Research Award 2025.
                    </p>
                  </div>

                  <div className="pl-6 border-l-2" style={{ borderColor: '#F9A826' }}>
                    <p className="font-extrabold mb-1" style={{ color: '#F9A826' }}>2026: The NOODL Framework</p>
                    <p style={{ color: '#2F4F4F' }}>
                      The project moves beyond the licence to a broader framework of resources for context-sensitive, equitable data sharing.
                    </p>
                  </div>

                  <div className="pl-6 border-l-2" style={{ borderColor: '#F9A826' }}>
                    <p className="font-extrabold mb-1" style={{ color: '#F9A826' }}>2026: African Languages for AI Caucus</p>
                    <p style={{ color: '#2F4F4F' }}>
                      Convened by Chijioke Okorie following a panel discussion, the caucus brings together language-data practitioners, researchers, and cultural institutions to pool what they need and what they can offer, and to pursue focused collaborative mini-projects; its secretariat is hosted at the Data Science Law Lab.
                    </p>
                  </div>

                  <div className="pl-6 border-l-2" style={{ borderColor: '#F9A826' }}>
                    <p className="font-extrabold mb-1" style={{ color: '#F9A826' }}>2026: Adoption on Mozilla Data Collective</p>
                    <p style={{ color: '#2F4F4F' }}>
                      43 datasets are released under NOODL-1.0 on the Mozilla Data Collective platform with more NOODL-backed releases hopefully on the way…
                    </p>
                  </div>
                </div>
              </div>
          )}
        </div>
      </section>

      {/* Press Dropdown */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: 'rgba(249,168,38,0.3)', backgroundColor: '#F5F5F5' }}>
        <div className="container mx-auto max-w-5xl">
          <button
              onClick={() => setPressOpen(!pressOpen)}
              className="w-full flex items-center justify-between py-4 text-left"
          >
            <h2 className="font-extrabold" style={{ color: '#1A2E2E', fontSize: '1.6rem' }}>Press</h2>
            {pressOpen ? (
                <ChevronUp className="w-6 h-6" style={{ color: '#F9A826' }} />
            ) : (
                <ChevronDown className="w-6 h-6" style={{ color: '#F9A826' }} />
            )}
          </button>

          {pressOpen && (
              <div className="mt-6 space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#355E5E' }}>Featured news</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-4">
                      <span className="font-extrabold whitespace-nowrap" style={{ color: '#F9A826' }}>01 May 2026</span>
                      <a href="#" className="underline hover:opacity-70" style={{ color: '#2F4F4F' }}>
                        "Licensing as a Barrier to the Usability of African Language Datasets," Lanfrica Blog.
                      </a>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-extrabold whitespace-nowrap" style={{ color: '#F9A826' }}>28 Apr 2026</span>
                      <a href="#" className="underline hover:opacity-70" style={{ color: '#2F4F4F' }}>
                        "How Open Licensing is Changing with AI: The NOODL License," Mozilla Data Collective (by Alek Tarkowski).
                      </a>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-extrabold whitespace-nowrap" style={{ color: '#F9A826' }}>21 Apr 2026</span>
                      <a href="#" className="underline hover:opacity-70" style={{ color: '#2F4F4F' }}>
                        "NOODL. An experiment in equitable data licensing: promise and limits," Open Future (report; commissioned by the Mozilla Foundation, supported by GIZ).
                      </a>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-extrabold whitespace-nowrap" style={{ color: '#F9A826' }}>18 Feb 2026</span>
                      <a href="#" className="underline hover:opacity-70" style={{ color: '#2F4F4F' }}>
                        "CC Licenses, Data Governance, and the African Context: Conversations and Perspectives," Creative Commons.
                      </a>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-extrabold whitespace-nowrap" style={{ color: '#F9A826' }}>17 Aug 2025</span>
                      <a href="#" className="underline hover:opacity-70" style={{ color: '#2F4F4F' }}>
                        "Ethical Sourcing of African Language Data: Lanfrica and the NOODL Licence," Centre on Knowledge Governance.
                      </a>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-extrabold whitespace-nowrap" style={{ color: '#F9A826' }}>15 Nov 2024</span>
                      <a href="#" className="underline hover:opacity-70" style={{ color: '#2F4F4F' }}>
                        "How this grassroots effort could make AI voices more diverse," MIT Technology Review.
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#355E5E' }}>Mentions in other research and projects</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-4">
                      <span className="font-extrabold whitespace-nowrap" style={{ color: '#F9A826' }}>Aug 2025</span>
                      <span style={{ color: '#2F4F4F' }}>
                      "Mafoko: Structuring and Building Open Multilingual Terminologies for South African NLP," (arXiv) the foundational Mafoko terminology dataset is released under the NOODL framework.
                    </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-extrabold whitespace-nowrap" style={{ color: '#F9A826' }}>Feb 2025</span>
                      <span style={{ color: '#2F4F4F' }}>
                      "The Esethu Framework: Reimagining Sustainable Dataset Governance and Curation for Low-Resource Languages," Rajab et al. (arXiv), cites NOODL as an inspiration.
                    </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#355E5E' }}>Press releases</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="underline hover:opacity-70" style={{ color: '#268181' }}>
                        The NOODL Licence: Made for sharing African datasets equitably, Data Science Law Lab
                      </a>
                    </li>
                    <li>
                      <a href="#" className="underline hover:opacity-70" style={{ color: '#268181' }}>
                        It's the NOODL License — awesome and amazingly geeky! (the NOODL story), Chijioke Okorie
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
          )}
        </div>
      </section>
    </div>
  );
}
