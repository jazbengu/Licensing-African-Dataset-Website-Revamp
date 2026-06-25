import { useRef } from 'react';
import { LicenseContent } from '../components/LicenseContent';

export function License() {
    const licenseRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <div
                id="license-content"
                ref={licenseRef}
                className="flex-1 min-w-0 bg-white rounded-2xl border p-8 lg:p-12"
            >
                <LicenseContent />
            </div>
        </div>
    );
}