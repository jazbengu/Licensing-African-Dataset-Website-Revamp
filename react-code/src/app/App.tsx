import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import { WelcomePopup } from './components/WelcomePopup';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { NOODLFramework } from './pages/NOODLFramework';
import { Dictionary } from './pages/Dictionary';
import { ViewLicense } from './pages/ViewLicense';
import { Blog } from './pages/Blog';
import { GetInvolved } from './pages/GetInvolved';
import { SplitSheet } from './pages/split-sheet'
import { Resources } from './pages/Resources';
import {InPractice} from "./pages/In-Practice";
import { TermsOfService } from "./pages/terms";
import { License } from "./pages/license";
import { PrivacyPolicy } from "./pages/Privacy";




export default function App() {
  return (
    <BrowserRouter>
      <WelcomePopup />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/noodl-framework" element={<NOODLFramework />} />
          <Route path="/nwulite-obodo-license" element={<ViewLicense />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/noodl-framework/split-sheet" element={<SplitSheet />}/>
          <Route path="/noodl-framework/dictionary" element={<Dictionary />} />
          <Route path="/noodl-framework/resources" element={<Resources />} />
          <Route path="/noodl-framework/in-practice" element={<InPractice />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy"  element={<PrivacyPolicy />} />
          <Route path ="/license" element={<License />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}