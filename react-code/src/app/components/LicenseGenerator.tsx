import { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

export function LicenseGenerator() {
  const [activeTab, setActiveTab] = useState<'plain' | 'rich'>('plain');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [benefitOpen, setBenefitOpen] = useState(false);

  const [formData, setFormData] = useState({
    datasetTitle: '',
    datasetLink: '',
    communityNames: '',
    communityLink: '',
    creatorNames: '',
    creatorLink: '',
    creationDate: '',
    benefitRequired: '',
    contactInfo: '',
    benefitLink: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const licenseText = "This dataset is licensed under the Nwulite Obodo Open Data License. View the license at this link: https://licensingafricandatasets.com/nwulite-obodo-license";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(licenseText);
    alert('License text copied to clipboard!');
  };

  return (
      <div className="w-full">
        {/* Use the License Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: '#355E5E' }}>
            Use the License
          </h2>
          <p className="text-sm mb-4" style={{ color: '#2F4F4F' }}>
            Include the benefit or value you require in exchange for the use of your dataset. Copy the license text or rich text below into the information.
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mb-3 border-b" style={{ borderColor: '#268181' }}>
            <button
                onClick={() => setActiveTab('plain')}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'plain' ? 'border-b-2' : ''}`}
                style={{
                  color: activeTab === 'plain' ? '#355E5E' : '#2F4F4F',
                  borderColor: activeTab === 'plain' ? '#268181' : 'transparent'
                }}
            >
              Plain Text
            </button>
            <button
                onClick={() => setActiveTab('rich')}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'rich' ? 'border-b-2' : ''}`}
                style={{
                  color: activeTab === 'rich' ? '#355E5E' : '#2F4F4F',
                  borderColor: activeTab === 'rich' ? '#268181' : 'transparent'
                }}
            >
              Rich Text
            </button>
          </div>

          {/* License Text Area */}
          <div className="mb-3">
            {activeTab === 'plain' ? (
                <div className="p-3 rounded text-sm" style={{ backgroundColor: '#F8F9FA', color: '#2F4F4F' }}>
                  {licenseText}
                </div>
            ) : (
                <div className="p-3 rounded text-sm" style={{ backgroundColor: '#F8F9FA' }}>
                  This dataset is licensed under the <a href="https://licensingafricandatasets.com/nwulite-obodo-license" className="underline" style={{ color: '#268181' }}>Nwulite Obodo Open Data License</a>.
                </div>
            )}
          </div>

          {/* Copy Button */}
          <button
              onClick={copyToClipboard}
              className="px-6 py-2 text-white font-semibold rounded-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: '#268181' }}
          >
            Copy Text
          </button>
        </div>

        {/* Dataset Details Accordion */}
        <div className="border-t pt-6" style={{ borderColor: '#268181' }}>
          <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="flex items-center justify-between w-full text-left mb-4"
          >
            <h3 className="text-lg font-bold" style={{ color: '#355E5E' }}>
              Dataset Details
            </h3>
            {detailsOpen ? (
                <ChevronUp className="w-5 h-5" style={{ color: '#268181' }} />
            ) : (
                <ChevronDown className="w-5 h-5" style={{ color: '#268181' }} />
            )}
          </button>

          {detailsOpen && (
              <>
                <p className="text-xs mb-4" style={{ color: '#2F4F4F' }}>
                  Provide additional details about the dataset.
                </p>

                <div className="space-y-4">
                  {/* Title of Dataset */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: '#2F4F4F' }}>
                        TITLE OF DATASET
                      </label>
                      <input
                          type="text"
                          name="datasetTitle"
                          value={formData.datasetTitle}
                          onChange={handleChange}
                          placeholder="Title of your dataset"
                          className="w-full px-3 py-2 text-sm border rounded"
                          style={{ borderColor: '#268181', backgroundColor: '#F8F9FA' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: '#2F4F4F' }}>
                        LINK TO DATASET
                      </label>
                      <input
                          type="url"
                          name="datasetLink"
                          value={formData.datasetLink}
                          onChange={handleChange}
                          placeholder="https://example.com/example_data.csv"
                          className="w-full px-3 py-2 text-sm border rounded"
                          style={{ borderColor: '#268181', backgroundColor: '#F8F9FA' }}
                      />
                    </div>
                  </div>

                  {/* Community Names */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: '#2F4F4F' }}>
                        NAME(S) OF COMMUNITY INVOLVED IN DATASET CREATION
                      </label>
                      <input
                          type="text"
                          name="communityNames"
                          value={formData.communityNames}
                          onChange={handleChange}
                          placeholder="Community involved"
                          className="w-full px-3 py-2 text-sm border rounded"
                          style={{ borderColor: '#268181', backgroundColor: '#F8F9FA' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: '#2F4F4F' }}>
                        LINK TO COMMUNITY DETAILS OR WEBSITE
                      </label>
                      <input
                          type="url"
                          name="communityLink"
                          value={formData.communityLink}
                          onChange={handleChange}
                          placeholder="https://example.com/example_data.csv"
                          className="w-full px-3 py-2 text-sm border rounded"
                          style={{ borderColor: '#268181', backgroundColor: '#F8F9FA' }}
                      />
                    </div>
                  </div>

                  {/* Creator Names */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: '#2F4F4F' }}>
                        NAME(S) OF DATASET CREATOR(S)
                      </label>
                      <input
                          type="text"
                          name="creatorNames"
                          value={formData.creatorNames}
                          onChange={handleChange}
                          placeholder="Creator name"
                          className="w-full px-3 py-2 text-sm border rounded"
                          style={{ borderColor: '#268181', backgroundColor: '#F8F9FA' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: '#2F4F4F' }}>
                        LINK TO WEBSITE OF DATASET CREATOR(S)
                      </label>
                      <input
                          type="url"
                          name="creatorLink"
                          value={formData.creatorLink}
                          onChange={handleChange}
                          placeholder="https://example.com/creator"
                          className="w-full px-3 py-2 text-sm border rounded"
                          style={{ borderColor: '#268181', backgroundColor: '#F8F9FA' }}
                      />
                    </div>
                  </div>

                  {/* Creation Date */}
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: '#2F4F4F' }}>
                      MONTH AND YEAR OF DATASET CREATION
                    </label>
                    <input
                        type="text"
                        name="creationDate"
                        value={formData.creationDate}
                        onChange={handleChange}
                        placeholder="January 2020"
                        className="w-full px-3 py-2 text-sm border rounded"
                        style={{ borderColor: '#268181', backgroundColor: '#F8F9FA' }}
                    />
                  </div>
                </div>
              </>
          )}
        </div>

        {/* Details of Benefit Section */}
        <div className="border-t pt-6 mt-6" style={{ borderColor: '#268181' }}>
          <button
              onClick={() => setBenefitOpen(!benefitOpen)}
              className="flex items-center justify-between w-full text-left mb-4"
          >
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold" style={{ color: '#355E5E' }}>
                Details of benefit or value desired
              </h3>
              <Info className="w-4 h-4" style={{ color: '#268181' }} />
            </div>
            {benefitOpen ? (
                <ChevronUp className="w-5 h-5" style={{ color: '#268181' }} />
            ) : (
                <ChevronDown className="w-5 h-5" style={{ color: '#268181' }} />
            )}
          </button>

          {benefitOpen && (
              <>
                <p className="text-xs mb-4" style={{ color: '#2F4F4F' }}>
                  For guidance on determining benefits, you can click{' '}
                  <a href="#" className="underline" style={{ color: '#268181' }}>here</a>.
                </p>

                <div className="space-y-4">
                  {/* Required Benefit */}
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: '#2F4F4F' }}>
                      REQUIRED BENEFIT OR VALUE FROM DATASET USERS (DATASET USERS FROM DEVELOPING COUNTRIES ARE REQUIRED TO PAY(USE)
                    </label>
                    <textarea
                        name="benefitRequired"
                        value={formData.benefitRequired}
                        onChange={handleChange}
                        placeholder="eg. access to research insights gained from using this dataset with the creators"
                        rows={3}
                        className="w-full px-3 py-2 text-sm border rounded"
                        style={{ borderColor: '#268181', backgroundColor: '#F8F9FA' }}
                    />
                  </div>

                  {/* Contact Information */}
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: '#2F4F4F' }}>
                      CONTACT INFORMATION TO RECEIVE BENEFIT OR VALUE (EMAIL ADDRESS AND/OR TELEPHONE NUMBER)
                    </label>
                    <input
                        type="text"
                        name="contactInfo"
                        value={formData.contactInfo}
                        onChange={handleChange}
                        placeholder="eg. cellphone: +27 12 345 6789, email: name@example.com"
                        className="w-full px-3 py-2 text-sm border rounded"
                        style={{ borderColor: '#268181', backgroundColor: '#F8F9FA' }}
                    />
                  </div>

                  {/* Link to Facilitate Receipt */}
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: '#2F4F4F' }}>
                      LINK TO FACILITATE RECEIPT OF BENEFIT OR VALUE
                    </label>
                    <input
                        type="url"
                        name="benefitLink"
                        value={formData.benefitLink}
                        onChange={handleChange}
                        placeholder="https://example.com/donate-to-us"
                        className="w-full px-3 py-2 text-sm border rounded"
                        style={{ borderColor: '#268181', backgroundColor: '#F8F9FA' }}
                    />
                  </div>
                </div>
              </>
          )}
        </div>
      </div>
  );
}
