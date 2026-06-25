import { Link } from 'react-router';
import { Download, FileText, Users, AlertCircle } from 'lucide-react';
import html2pdf from "html2pdf.js";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const whatItCovers = [
    {
        label: 'The dataset itself',
        detail: 'its name, creation date(s), description, and where it was created.',
    },
    {
        label: 'The project lead',
        detail: 'name, institutional affiliation, and contact details.',
    },
    {
        label: 'Whether the dataset draws on an existing one',
        detail: 'by collection, collation, or modification — and that source\'s details.',
    },
    {
        label: 'Each contributor',
        detail: 'legal name, affiliation, contact, and their role: content creator, translator, data curator, language technologist, or data evaluator.',
    },
    {
        label: 'Each contributor\'s percentage share',
        detail: 'with all shares adding up to 100%.',
    },
    {
        label: 'Whether a third party has any say over a contributor\'s work',
        detail: 'and that party\'s details.',
    },
    {
        label: 'Each contributor\'s signature.',
        detail: '',
    },
];

function FieldRow({ label, span2 }: { label: string; span2?: boolean }) {
    return (
        <div className={`flex flex-col gap-1 ${span2 ? 'col-span-2' : ''}`}>
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#718096' }}>{label}</span>
            <div className="border-b-2 h-8 w-full" style={{ borderColor: '#D0E8E8' }} />
        </div>
    );
}

function PreviewSection({ number, title, color, children }: {
    number: string;
    title: string;
    color: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border overflow-hidden mb-5" style={{ borderColor: '#E2ECEC' }}>
            <div className="flex items-center gap-3 px-6 py-4" style={{ background: color }}>
                <span className="text-white font-bold text-sm bg-white/20 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">{number}</span>
                <span className="font-semibold text-white">{title}</span>
            </div>
            <div className="px-6 py-5 bg-white">{children}</div>
        </div>
    );
}

function generateDownloadHTML(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>African Dataset Creation Split Sheet — NOODL Framework</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; color: #2F4F4F; background: white; font-size: 11pt; line-height: 1.6; }
  .cover { background: linear-gradient(135deg, #355E5E 0%, #268181 60%, #29D4AB 100%); color: white; padding: 48px 48px 40px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .cover h1 { font-size: 1.8rem; font-weight: 700; margin-bottom: 6px; }
  .cover .sub { font-size: 1rem; opacity: 0.85; margin-bottom: 20px; }
  .cover .meta { font-size: 0.8rem; opacity: 0.7; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 14px; }
  .content { padding: 28px 48px; max-width: 860px; }
  .intro-box { background: #F0FAF9; border-left: 4px solid #29D4AB; padding: 12px 16px; margin-bottom: 28px; border-radius: 4px; font-size: 0.88rem; color: #355E5E; }
  h2.section-head { font-size: 0.85rem; font-weight: 700; color: white; padding: 8px 14px; margin: 28px 0 16px; border-radius: 5px; text-transform: uppercase; letter-spacing: 0.05em; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .s1 { background: linear-gradient(90deg, #268181, #355E5E); }
  .s2 { background: linear-gradient(90deg, #29D4AB, #268181); }
  .s3 { background: linear-gradient(90deg, #355E5E, #006F6F); }
  .s4 { background: linear-gradient(90deg, #006F6F, #268181); }
  .s5 { background: linear-gradient(90deg, #268181, #29D4AB); }
  .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 28px; margin-bottom: 12px; }
  .field { display: flex; flex-direction: column; gap: 3px; }
  .field.span2 { grid-column: span 2; }
  .field label { font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #718096; }
  .field .line { border-bottom: 1.5px solid #B0CCCC; height: 26px; }
  .note { background: #F0FAF9; border: 1px solid #D0E8E8; border-radius: 5px; padding: 10px 14px; margin-top: 12px; font-size: 0.8rem; color: #355E5E; }
  .note.warning { background: #FEF3C7; border-color: #F59E0B44; color: #92400E; }
  table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.8rem; }
  th { background: #F0FAF9; color: #355E5E; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; padding: 7px 8px; text-align: left; border: 1px solid #D0E8E8; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  td { padding: 14px 8px 5px; border: 1px solid #E2ECEC; vertical-align: bottom; }
  td .line { border-bottom: 1px solid #B0CCCC; }
  .sig-block { border: 1px solid #E2ECEC; border-radius: 6px; padding: 14px 16px; margin-bottom: 14px; }
  .sig-block .label { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #268181; margin-bottom: 12px; }
  .footer { margin-top: 36px; padding: 12px 16px; background: #F0FAF9; border-radius: 5px; border: 1px solid #D0E8E8; font-size: 0.72rem; color: #355E5E; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  @media print { body { font-size: 9.5pt; } }
</style>
</head>
<body>

<div class="cover">
  <h1>African Dataset Creation Split Sheet</h1>
  <div class="sub">NOODL Framework — Navigating Open and Obligatory Data Licensing</div>
  <div class="meta">
    Version 1.0 &nbsp;·&nbsp; Issued by the Data Science Law Lab &nbsp;·&nbsp; licensingafricandatasets.com<br/>
    This document may be reproduced freely provided this footer is retained.
  </div>
</div>

<div class="content">

  <div class="intro-box">
    A split sheet is a simple, signed record of who helped create something and what share each person holds.
    The African Dataset Creation Split Sheet applies that idea to datasets: it lets dataset creators, project leads,
    and contributors agree in writing on who did what before the dataset is shared. It pairs with the NOODL License:
    the Split Sheet documents the people behind a dataset, while the Licence sets the terms on which it goes out into the world.
  </div>

  <!-- SECTION 1: The Dataset -->
  <h2 class="section-head s1">1. The Dataset</h2>
  <div class="field-grid">
    <div class="field span2"><label>Dataset Name / Title</label><div class="line"></div></div>
    <div class="field"><label>Creation Date(s)</label><div class="line"></div></div>
    <div class="field"><label>Where it was created (institution / location)</label><div class="line"></div></div>
    <div class="field span2"><label>Description</label><div class="line"></div><div class="line" style="margin-top:10px;"></div></div>
  </div>

  <!-- SECTION 2: Project Lead -->
  <h2 class="section-head s2">2. Project Lead</h2>
  <div class="field-grid">
    <div class="field"><label>Full Legal Name</label><div class="line"></div></div>
    <div class="field"><label>Institutional Affiliation</label><div class="line"></div></div>
    <div class="field"><label>Email Address</label><div class="line"></div></div>
    <div class="field"><label>Phone / Other Contact</label><div class="line"></div></div>
  </div>

  <!-- SECTION 3: Existing Dataset Source -->
  <h2 class="section-head s3">3. Existing Dataset (if applicable)</h2>
  <p style="font-size:0.82rem;color:#718096;margin-bottom:12px;">
    Complete this section only if this dataset was created by collecting from, collating, or modifying an existing dataset.
  </p>
  <div class="field-grid">
    <div class="field span2">
      <label>Does this dataset draw on an existing dataset?</label>
      <div style="display:flex;gap:20px;margin-top:8px;font-size:0.85rem;">
        <span>☐ &nbsp;Yes — by collection</span>
        <span>☐ &nbsp;Yes — by collation</span>
        <span>☐ &nbsp;Yes — by modification</span>
        <span>☐ &nbsp;No</span>
      </div>
    </div>
    <div class="field span2"><label>Source Dataset Name</label><div class="line"></div></div>
    <div class="field span2"><label>Source Dataset URL / DOI / Reference</label><div class="line"></div></div>
    <div class="field span2"><label>Source License</label><div class="line"></div></div>
  </div>

  <!-- SECTION 4: Contributors -->
  <h2 class="section-head s4">4. Contributors</h2>
  <p style="font-size:0.82rem;color:#718096;margin-bottom:12px;">
    Record every contributor. Roles: <strong>Content Creator · Translator · Data Curator · Language Technologist · Data Evaluator</strong>.
    All percentage shares must total 100%.
  </p>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Full Legal Name</th>
        <th>Affiliation</th>
        <th>Contact (Email)</th>
        <th>Role</th>
        <th>Share (%)</th>
      </tr>
    </thead>
    <tbody>
      ${[1,2,3,4,5,6].map(i => `
      <tr>
        <td style="text-align:center;color:#718096;font-size:0.75rem;">${i}</td>
        <td><div class="line"></div></td>
        <td><div class="line"></div></td>
        <td><div class="line"></div></td>
        <td><div class="line"></div></td>
        <td><div class="line"></div></td>
      </tr>`).join('')}
      <tr style="background:#F8FAFA;">
        <td colspan="5" style="text-align:right;font-size:0.75rem;font-weight:700;color:#355E5E;padding:8px;">TOTAL</td>
        <td style="text-align:center;font-size:0.85rem;font-weight:700;color:#268181;">100%</td>
      </tr>
    </tbody>
  </table>

  <!-- SECTION 4B: Third Party -->
  <h2 class="section-head s4" style="margin-top:20px;">4b. Third-Party Rights</h2>
  <p style="font-size:0.82rem;color:#718096;margin-bottom:12px;">
    For each contributor whose work may be subject to a third party's authority (e.g. an employer, funder, or institution), record that party's details below.
  </p>
  <div class="field-grid">
    <div class="field"><label>Contributor Name (from Section 4)</label><div class="line"></div></div>
    <div class="field"><label>Third Party Name / Organisation</label><div class="line"></div></div>
    <div class="field"><label>Nature of Third Party's Interest</label><div class="line"></div></div>
    <div class="field"><label>Third Party Contact</label><div class="line"></div></div>
    <div class="field"><label>Contributor Name (from Section 4)</label><div class="line"></div></div>
    <div class="field"><label>Third Party Name / Organisation</label><div class="line"></div></div>
    <div class="field"><label>Nature of Third Party's Interest</label><div class="line"></div></div>
    <div class="field"><label>Third Party Contact</label><div class="line"></div></div>
  </div>

  <!-- SECTION 5: Signatures -->
  <h2 class="section-head s5">5. Signatures</h2>
  <p style="font-size:0.82rem;color:#718096;margin-bottom:14px;">
    Each contributor must sign below to confirm they have read and agreed to the terms recorded in this Split Sheet.
    Electronic signatures are accepted. Append additional signature sheets where needed, referencing the Dataset Name from Section 1.
  </p>
  ${[1,2,3,4].map(i => `
  <div class="sig-block">
    <div class="label">Contributor ${i}</div>
    <div class="field-grid">
      <div class="field"><label>Full Legal Name</label><div class="line"></div></div>
      <div class="field"><label>Role</label><div class="line"></div></div>
      <div class="field"><label>Signature</label><div class="line" style="margin-top:20px;"></div></div>
      <div class="field"><label>Date (DD/MM/YYYY)</label><div class="line"></div></div>
    </div>
  </div>`).join('')}

  <div class="footer">
    <strong>NOODL Split Sheet v1.0</strong> &nbsp;·&nbsp;
    Issued by the Data Science Law Lab &nbsp;·&nbsp;
    <a href="https://licensingafricandatasets.com" style="color:#268181;">licensingafricandatasets.com</a> &nbsp;·&nbsp;
    This document may be reproduced freely provided this footer is retained.
  </div>

</div>
</body>
</html>`;
}

export function SplitSheet() {
    const handleDownloadHTML = () => {
        const html = generateDownloadHTML();
        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'NOODL-Split-Sheet-v1.0.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDownloadPDF = () => {
        const html = generateDownloadHTML();

        const container = document.createElement("div");
        container.innerHTML = html;
        document.body.appendChild(container);

        const opt = {
            margin: 0,
            filename: "NOODL-Split-Sheet-v1.0.pdf",
            image: { type: "jpeg" as const, quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const},
        };

        html2pdf().set(opt).from(container).save().then(() => {
            document.body.removeChild(container);
        });
    };
    const handleDownloadDOCX = async () => {
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "African Dataset Creation Split Sheet",
                                    bold: true,
                                    size: 32,
                                }),
                            ],
                        }),

                        new Paragraph("NOODL Framework — Navigating Open and Obligatory Data Licensing"),
                        new Paragraph(""),

                        new Paragraph("1. The Dataset"),
                        new Paragraph("Dataset Name / Title: ____________________"),
                        new Paragraph("Creation Date(s): ____________________"),
                        new Paragraph("Description: ____________________"),

                        new Paragraph(""),

                        new Paragraph("2. Project Lead"),
                        new Paragraph("Full Legal Name: ____________________"),
                        new Paragraph("Email Address: ____________________"),

                        new Paragraph(""),

                        new Paragraph("3. Contributors"),
                        new Paragraph("Each contributor must be recorded with role + percentage share (total = 100%)."),

                        new Paragraph(""),

                        new Paragraph("4. Signatures"),
                        new Paragraph("Signature: ____________________"),
                    ],
                },
            ],
        });

        const blob = await Packer.toBlob(doc);

        saveAs(blob, "NOODL-Split-Sheet-v1.0.docx");
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F8FAFA' }}>
            {/* Hero */}
            <div className="relative overflow-hidden py-24" style={{ backgroundColor: '#1A2E2E' }}>
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="ssGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1.5" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#ssGrid)" />
                    </svg>
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <nav className="flex items-center gap-2 text-white/60 text-sm mb-6">
                        <Link to="/noodl-framework" className="hover:text-white transition-colors">NOODL Framework</Link>
                        <span>›</span>
                        <span className="text-white">Split Sheet</span>
                    </nav>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-white/70 text-sm font-semibold uppercase tracking-wide">NOODL Framework Tool</span>
                            </div>
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle, #F9A826 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
                            <div className="flex items-center gap-3 mb-5">
                                <div className="h-px w-10" style={{ backgroundColor: '#F9A826' }} />
                                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F9A826' }}>NOODL Framework Tool</span>
                            </div>
                            <h1 className="text-white mb-4 font-extrabold" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                                African Dataset Creation<br />Split Sheet
                            </h1>
                            <p className="text-white/85 max-w-xl" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                                A split sheet is a simple, signed record of who helped create something and what share each person holds. The African Dataset Creation Split Sheet applies that idea to datasets: it lets dataset creators, project leads, and contributors agree in writing on who did what before the dataset is shared.
                            </p>
                            <p className="text-white/70 max-w-xl mt-3" style={{ fontSize: '0.95rem' }}>
                                It pairs with the NOODL License: the Split Sheet documents the people behind a dataset, while the Licence sets the terms on which it goes out into the world.
                            </p>
                        </div>

                        {/* Download card */}
                        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/25 flex-shrink-0 lg:min-w-72">
                            <div className="flex items-center gap-2 mb-1">
                                <FileText className="w-5 h-5 text-white" />
                                <span className="text-white font-semibold">Download the Split Sheet</span>
                            </div>
                            <p className="text-white/60 text-xs mb-5">Fill in, sign, and keep alongside your dataset record.</p>

                            {/* DOCX — primary */}
                            <div className="mb-3">
                                <button
                                    onClick={handleDownloadDOCX}
                                    className="w-full flex items-center justify-between gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-lg"
                                    style={{ background: 'linear-gradient(135deg, #F9A826 0%, #E19111 100%)', color: '#1A2E2E' }}
                                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Split Sheet (.docx)
                  </span>
                                    <span className="text-xs font-normal opacity-70">DOCX · ~120 KB</span>
                                </button>
                                <p className="text-white/50 text-xs mt-1 px-1">Primary format — editable and signable</p>
                            </div>

                            {/* PDF — mirror */}
                            <div>
                                <button
                                    onClick={handleDownloadPDF}
                                    className="w-full flex items-center justify-between gap-2 px-5 py-3 rounded-xl font-bold text-sm border border-white/30 transition-all hover:bg-white/10"
                                    style={{ backgroundColor: 'transparent', color: 'white' }}
                                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Split Sheet (.pdf)
                  </span>
                                    <span className="text-xs font-normal opacity-70">PDF · ~180 KB</span>
                                </button>
                                <p className="text-white/50 text-xs mt-1 px-1">Mirror format — for accessibility &amp; non-Word users</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Placeholder notice */}
            <div className="border-b" style={{ backgroundColor: '#FFFBEB', borderColor: '#F59E0B44' }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 max-w-4xl flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#D97706' }} />
                    <p className="text-sm" style={{ color: '#92400E' }}>
                        <strong>Note for site editors:</strong> The final .docx and .pdf files are to be supplied by Chijioke Okorie and linked at <code className="text-xs bg-amber-100 px-1 rounded">/noodl-framework/split-sheet/download.docx</code> and <code className="text-xs bg-amber-100 px-1 rounded">download.pdf</code>. The download buttons currently serve a print-ready HTML preview.
                    </p>
                </div>
            </div>

            {/* Body */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: What it covers + How to use it */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* What it covers */}
                        <div className="rounded-2xl border bg-white p-6" style={{ borderColor: '#E2ECEC' }}>
                            <h2 className="mb-4" style={{ color: '#355E5E', fontSize: '1rem', fontWeight: 700 }}>What the Split Sheet asks you to record</h2>
                            <ul className="space-y-3">
                                {whatItCovers.map((item, i) => (
                                    <li key={i} className="flex gap-3">
                    <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                        style={{ backgroundColor: '#268181' }}
                    >
                      {i + 1}
                    </span>
                                        <span className="text-sm" style={{ color: '#2F4F4F', lineHeight: 1.6 }}>
                      <strong>{item.label}</strong>{item.detail ? ` ${item.detail}` : ''}
                    </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* How to use it */}
                        <div className="rounded-2xl p-6" style={{ backgroundColor: '#F0FAF9', border: '1px solid #D0E8E8' }}>
                            <h2 className="mb-3" style={{ color: '#355E5E', fontSize: '1rem', fontWeight: 700 }}>How to use it</h2>
                            <p className="text-sm" style={{ color: '#2F4F4F', lineHeight: 1.7 }}>
                                Fill in the Split Sheet at the point of dataset creation, while contributions are still fresh, and have every named contributor sign it. Keep the signed sheet alongside your dataset record so it travels with the dataset.
                            </p>
                            <p className="text-sm mt-3" style={{ color: '#2F4F4F', lineHeight: 1.7 }}>
                                It then informs how the Dataset Provider sets Section 3.3 benefit allocation under the NOODL License, and how credit carries through into any Adapted Material.{' '}
                                <Link to="/noodl-framework/dictionary" className="underline hover:opacity-70" style={{ color: '#268181' }}>
                                    See the Dictionary for these terms →
                                </Link>
                            </p>
                        </div>

                        {/* Related links */}
                        <div className="space-y-2">
                            {[
                                { label: 'NOODL Framework', desc: 'Framework overview', to: '/noodl-framework' },
                                { label: 'View License', desc: 'Read the Nwulite Obodo License', to: '/nwulite-obodo-license' },
                                { label: 'Dictionary', desc: 'Plain-language term definitions', to: '/noodl-framework/dictionary' },
                            ].map(link => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="flex items-center justify-between px-4 py-3 rounded-xl border bg-white transition-all hover:shadow-sm"
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

                    {/* Right: Document preview */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 style={{ color: '#355E5E', fontSize: '1.2rem', fontWeight: 700 }}>Document Preview</h2>
                                <p className="text-sm mt-0.5" style={{ color: '#718096' }}>Read the full template below before downloading.</p>
                            </div>
                            <button
                                onClick={handleDownloadPDF}
                                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105 shadow-sm"
                                style={{ background: 'linear-gradient(135deg, #268181 0%, #29D4AB 100%)' }}
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                        </div>

                        {/* Section 1: The Dataset */}
                        <PreviewSection number="1" title="The Dataset" color="linear-gradient(90deg,#268181,#355E5E)">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                <FieldRow label="Dataset Name / Title" span2 />
                                <FieldRow label="Creation Date(s)" />
                                <FieldRow label="Where it was created (institution / location)" />
                                <FieldRow label="Description" span2 />
                            </div>
                        </PreviewSection>

                        {/* Section 2: Project Lead */}
                        <PreviewSection number="2" title="Project Lead" color="linear-gradient(90deg,#29D4AB,#268181)">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                <FieldRow label="Full Legal Name" />
                                <FieldRow label="Institutional Affiliation" />
                                <FieldRow label="Email Address" />
                                <FieldRow label="Phone / Other Contact" />
                            </div>
                        </PreviewSection>

                        {/* Section 3: Existing Dataset */}
                        <PreviewSection number="3" title="Existing Dataset (if applicable)" color="linear-gradient(90deg,#355E5E,#006F6F)">
                            <p className="text-sm mb-4" style={{ color: '#718096' }}>
                                Complete only if this dataset was created by collecting from, collating, or modifying an existing dataset.
                            </p>
                            <div className="mb-4">
                                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#718096' }}>Does this dataset draw on an existing dataset?</span>
                                <div className="flex flex-wrap gap-4 mt-2">
                                    {['Yes — by collection', 'Yes — by collation', 'Yes — by modification', 'No'].map(opt => (
                                        <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#2F4F4F' }}>
                                            <span className="w-4 h-4 rounded border flex-shrink-0" style={{ borderColor: '#D0E8E8' }} />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                <FieldRow label="Source Dataset Name" span2 />
                                <FieldRow label="Source Dataset URL / DOI / Reference" span2 />
                                <FieldRow label="Source License" span2 />
                            </div>
                        </PreviewSection>

                        {/* Section 4: Contributors */}
                        <PreviewSection number="4" title="Contributors" color="linear-gradient(90deg,#006F6F,#268181)">
                            <p className="text-sm mb-4" style={{ color: '#718096' }}>
                                Record every contributor. Roles: <strong style={{ color: '#355E5E' }}>Content Creator · Translator · Data Curator · Language Technologist · Data Evaluator</strong>. All shares must total 100%.
                            </p>
                            <div className="overflow-x-auto rounded-xl border" style={{ borderColor: '#E2ECEC' }}>
                                <table className="w-full text-sm">
                                    <thead>
                                    <tr style={{ backgroundColor: '#F0FAF9' }}>
                                        {['#', 'Full Legal Name', 'Affiliation', 'Contact (Email)', 'Role', 'Share (%)'].map(h => (
                                            <th key={h} className="px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wide" style={{ color: '#355E5E' }}>{h}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <tr key={i} className="border-t" style={{ borderColor: '#E2ECEC' }}>
                                            <td className="px-3 py-3 text-xs text-center" style={{ color: '#718096' }}>{i}</td>
                                            {[...Array(5)].map((_, j) => (
                                                <td key={j} className="px-3 py-3">
                                                    <div className="border-b h-5 w-full" style={{ borderColor: '#D0E8E8' }} />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    <tr className="border-t" style={{ borderColor: '#E2ECEC', backgroundColor: '#F8FAFA' }}>
                                        <td colSpan={5} className="px-3 py-2 text-right text-xs font-bold" style={{ color: '#355E5E' }}>TOTAL</td>
                                        <td className="px-3 py-2 text-center text-sm font-bold" style={{ color: '#268181' }}>100%</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* 4b Third-party rights */}
                            <div className="mt-5 pt-5 border-t" style={{ borderColor: '#E2ECEC' }}>
                                <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#268181' }}>4b — Third-Party Rights</p>
                                <p className="text-sm mb-4" style={{ color: '#718096' }}>
                                    For each contributor whose work may be subject to a third party's authority (employer, funder, institution), record that party's details.
                                </p>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                    <FieldRow label="Contributor Name" />
                                    <FieldRow label="Third Party Name / Organisation" />
                                    <FieldRow label="Nature of Third Party's Interest" />
                                    <FieldRow label="Third Party Contact" />
                                </div>
                            </div>
                        </PreviewSection>

                        {/* Section 5: Signatures */}
                        <PreviewSection number="5" title="Signatures" color="linear-gradient(90deg,#268181,#29D4AB)">
                            <p className="text-sm mb-5" style={{ color: '#718096' }}>
                                Each contributor must sign below. Electronic signatures are accepted. Append additional sheets where needed, referencing the Dataset Name from Section 1.
                            </p>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="mb-4 rounded-xl border p-4" style={{ borderColor: '#E2ECEC' }}>
                                    <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#268181' }}>Contributor {i}</p>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                        <FieldRow label="Full Legal Name" />
                                        <FieldRow label="Role" />
                                        <FieldRow label="Signature" />
                                        <FieldRow label="Date (DD/MM/YYYY)" />
                                    </div>
                                </div>
                            ))}
                        </PreviewSection>

                        {/* Bottom download CTA */}
                        <div className="rounded-2xl border p-6 text-center mt-2" style={{ backgroundColor: 'white', borderColor: '#E2ECEC' }}>
                            <p className="text-sm mb-4" style={{ color: '#718096' }}>
                                Download the editable file, fill it in with all contributors, have everyone sign, and keep it alongside your dataset.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={handleDownloadDOCX}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105 shadow-md"
                                    style={{ background: 'linear-gradient(135deg, #29D4AB 0%, #268181 100%)' }}
                                >
                                    <Download className="w-4 h-4" />
                                    Download (.docx)
                                </button>
                                <button
                                    onClick={handleDownloadPDF}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border transition-all hover:shadow-sm"
                                    style={{ borderColor: '#268181', color: '#268181', backgroundColor: 'white' }}
                                >
                                    <Download className="w-4 h-4" />
                                    Download (.pdf)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
