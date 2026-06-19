import { useState } from 'react';
import { MessageSquare, Users, DollarSign, FileText } from 'lucide-react';

export function GetInvolved() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    involvement: '',
    message: '',
    consent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission would go here
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will be in touch soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
      <div className="w-full">
        {/* Header */}
        <section className="relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#1A2E2E' }}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle, #F9A826 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ backgroundColor: '#F9A826' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F9A826' }}>Join the Work</span>
            </div>
            <h1 className="font-extrabold text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Get Involved.
            </h1>
            <p className="text-xl max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
              There are many ways to be part of the work to make African data sharing more equitable. Whether you want to share your story, collaborate on research or policy, fund our work, or request a consultation, we'd be glad to hear from you.
            </p>
          </div>
        </section>

        {/* Four Ways */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="container mx-auto max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#F9A826' }}>Four Ways</p>
            <h2 className="font-extrabold mb-10" style={{ color: '#1A2E2E', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>How would you like to get involved?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
              {[
                { icon: <MessageSquare className="w-6 h-6" />, title: 'Share your story', body: "We're collecting the experiences of the communities, researchers, and creators behind African datasets. If you have a story about sharing, using, or building from this data, we'd like to hear it.", accent: '#F9A826' },
                { icon: <Users className="w-6 h-6" />, title: 'Collaborate on research or policy', body: 'We work with academic, civil-society, and policy partners to turn equitable data-sharing principles into practice. Get in touch to explore joint research, publications, or policy work.', accent: '#268181' },
                { icon: <DollarSign className="w-6 h-6" />, title: 'Fund our work', body: 'Funders and philanthropies make this work possible. Partner with us to expand the NOODL Framework and support equitable data sharing across Africa.', accent: '#29D4AB' },
                { icon: <FileText className="w-6 h-6" />, title: 'Request a consultation', body: 'Universities, ministries, and other institutions weighing NOODL can talk it through with us. Reach out for guidance on adopting, implementing, or using the licence and the wider NOODL Framework.', accent: '#E19111' },
              ].map(card => (
                  <div
                      key={card.title}
                      className="group rounded-2xl overflow-hidden bg-white border-2 transition-all hover:shadow-xl hover:-translate-y-1"
                      style={{ borderColor: '#E2ECEC' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = card.accent; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E2ECEC'; }}
                  >
                    <div className="h-1.5 w-full" style={{ backgroundColor: card.accent }} />
                    <div className="p-7">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${card.accent}18`, color: card.accent }}>
                        {card.icon}
                      </div>
                      <h3 className="font-extrabold mb-3" style={{ color: '#1A2E2E', fontSize: '1.05rem' }}>{card.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#4A6363' }}>{card.body}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#1A2E2E' }}>
          <div className="container mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#F9A826' }}>Contact</p>
            <h2 className="font-extrabold mb-8 text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.02em' }}>Tell us how you'd like to get involved</h2>
            <div className="rounded-2xl p-10 shadow-2xl" style={{ backgroundColor: 'white' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { id: 'name', label: 'Name', type: 'text', required: true },
                  { id: 'email', label: 'Email', type: 'email', required: true },
                  { id: 'organisation', label: 'Organisation (optional)', type: 'text', required: false },
                ].map(field => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#1A2E2E' }}>
                        {field.label}{field.required && ' *'}
                      </label>
                      <input type={field.type} id={field.id} name={field.id} required={field.required}
                             value={(formData as Record<string, string | boolean>)[field.id] as string}
                             onChange={handleChange}
                             className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors"
                             style={{ borderColor: '#E2ECEC', backgroundColor: '#F5F5F5' }}
                             onFocus={e => { e.target.style.borderColor = '#F9A826'; }}
                             onBlur={e => { e.target.style.borderColor = '#E2ECEC'; }}
                      />
                    </div>
                ))}
                <div>
                  <label htmlFor="involvement" className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#1A2E2E' }}>How would you like to get involved? *</label>
                  <select id="involvement" name="involvement" required value={formData.involvement} onChange={handleChange}
                          className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors"
                          style={{ borderColor: '#E2ECEC', backgroundColor: '#F5F5F5' }}>
                    <option value="">Select an option</option>
                    <option value="share-story">Share your story</option>
                    <option value="collaborate">Collaborate on research or policy</option>
                    <option value="fund">Fund our work</option>
                    <option value="consultation">Request a consultation</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#1A2E2E' }}>Tell us more *</label>
                  <textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={6}
                            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors resize-none"
                            style={{ borderColor: '#E2ECEC', backgroundColor: '#F5F5F5' }}
                            onFocus={e => { e.target.style.borderColor = '#F9A826'; }}
                            onBlur={e => { e.target.style.borderColor = '#E2ECEC'; }}
                  />
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: '#F5F5F5' }}>
                  <input type="checkbox" id="consent" name="consent" required checked={formData.consent} onChange={handleChange} className="mt-0.5 w-4 h-4 accent-amber-500" />
                  <label htmlFor="consent" className="text-sm leading-relaxed" style={{ color: '#4A6363' }}>
                    I consent to being contacted by the Data Science Law Lab regarding my inquiry. *
                  </label>
                </div>
                <button type="submit" className="w-full py-4 px-6 font-extrabold rounded-xl hover:scale-105 transition-all shadow-xl text-base"
                        style={{ background: 'linear-gradient(135deg, #F9A826 0%, #E19111 100%)', color: '#1A2E2E' }}>
                  Submit →
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
  );
}
