import {Link} from "react-router";
import {BookOpen, Library, Users,} from "lucide-react";
import noodllogo from '../../imports/NOODL License logo/NOODL black.png';


export function NOODLFramework() {
  return (
      <div className="w-full">
        {/* Header */}
        <section
            className="relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8"
            style={{ backgroundColor: "#1A2E2E" }}
        >
          <div className="absolute inset-0 opacity-10">
            <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                    id="hexPattern"
                    x="0"
                    y="0"
                    width="80"
                    height="80"
                    patternUnits="userSpaceOnUse"
                >
                  <polygon
                      points="40,15 55,25 55,45 40,55 25,45 25,25"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                  />
                </pattern>
              </defs>
              <rect
                  width="100%"
                  height="100%"
                  fill="url(#hexPattern)"
              />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle, #F9A826 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ backgroundColor: '#F9A826' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F9A826' }}>The Framework</span>
            </div>
            <h1 className="font-extrabold text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              The NOODL Framework
            </h1>
            <p className="text-xl max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
              How the NOODL framework works
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: "#2F4F4F" }}
            >
              The Licensing African Datasets project helps people
              share African datasets openly and equitably. The
              NOODL Framework brings together the tools to do it:
              the{" "}
              <Link
                  to="/nwulite-obodo-license"
                  className="font-semibold underline hover:opacity-70"
                  style={{ color: "#268181" }}
              >
                NOODL Licence
              </Link>
              , the{" "}
              <Link
                  to="/noodl-framework/split-sheet"
                  className="font-semibold underline hover:opacity-70"
                  style={{ color: "#268181" }}
              >
                African Dataset Creation Split Sheet
              </Link>
              , the{" "}
              <Link
                  to="/noodl-framework/dictionary"
                  className="font-semibold underline hover:opacity-70"
                  style={{ color: "#268181" }}
              >
                Equitable Licensing Dictionary
              </Link>{" "}
              that explains the licence's provisions and the
              language of equitable data licensing in plain terms,
              and a growing{" "}
              <Link
                  to="/noodl-framework/resources"
                  className="font-semibold underline hover:opacity-70"
                  style={{ color: "#268181" }}
              >
                Resource Library
              </Link>
              . Together they help everyone who creates,
              contributes, uses, or governs African data share it
              in ways that keep value with the communities it
              comes from.
            </p>
          </div>
        </section>

        {/* Tool Tiles */}
        <section
            className="py-16 px-4 sm:px-6 lg:px-8"
            style={{ backgroundColor: "#F8F9FA" }}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tile 1 - NOODL Licence */}
              <div
                  className="group border-2 rounded-2xl p-8 bg-white hover:shadow-2xl transition-all transform hover:-translate-y-2 relative overflow-hidden"
                  style={{ borderColor: "#268181" }}
              >
                <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5 transform translate-x-16 -translate-y-16"
                    style={{ backgroundColor: "#268181" }}
                ></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{
                          background:
                              "linear-gradient(135deg, #268181 0%, #006F6F 100%)",
                        }}
                    >
                      <img src={noodllogo} alt={"NOODL License"}/>
                    </div>
                    <h3
                        className="text-2xl font-bold"
                        style={{ color: "#355E5E" }}
                    >
                      NOODL Licence
                    </h3>
                  </div>
                  <h4
                      className="text-lg font-semibold mb-3"
                      style={{ color: "#2F4F4F" }}
                  >
                    Open sharing, on equitable terms
                  </h4>
                  <p
                      className="mb-4"
                      style={{ color: "#2F4F4F" }}
                  >
                    The NOODL Licence lets you share African
                    datasets openly while securing a fair return
                    for the communities behind them. It treats
                    different users differently, so openness stays
                    equitable.
                  </p>
                  <div className="flex gap-3">
                    <Link
                        to="/nwulite-obodo-license"
                        className="text-sm font-semibold underline hover:opacity-70"
                        style={{ color: "#268181" }}
                    >
                      View the licence →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tile 2 - Split Sheet */}
              <div
                  className="group border-2 rounded-2xl p-8 bg-white hover:shadow-2xl transition-all transform hover:-translate-y-2 relative overflow-hidden"
                  style={{ borderColor: "#268181" }}
              >
                <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5 transform translate-x-16 -translate-y-16"
                    style={{ backgroundColor: "#29D4AB" }}
                ></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{
                          background:
                              "linear-gradient(135deg, #29D4AB 0%, #268181 100%)",
                        }}
                    >
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3
                        className="text-2xl font-bold"
                        style={{ color: "#355E5E" }}
                    >
                      Split Sheet
                    </h3>
                  </div>
                  <h4
                      className="text-lg font-semibold mb-3"
                      style={{ color: "#2F4F4F" }}
                  >
                    Credit for everyone who contributes
                  </h4>
                  <p
                      className="mb-4"
                      style={{ color: "#2F4F4F" }}
                  >
                    The Split Sheet records each collaborator's
                    part in creating a dataset, so recognition and
                    any benefit, is shared fairly from the start.
                  </p>
                  <div className="flex gap-3">
                    <Link
                        to="/noodl-framework/split-sheet"
                        className="text-sm font-semibold underline hover:opacity-70"
                        style={{ color: "#268181" }}
                    >
                      Download the Split Sheet →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tile 3 - Dictionary */}
              <div
                  className="group border-2 rounded-2xl p-8 bg-white hover:shadow-2xl transition-all transform hover:-translate-y-2 relative overflow-hidden"
                  style={{ borderColor: "#268181" }}
              >
                <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5 transform translate-x-16 -translate-y-16"
                    style={{ backgroundColor: "#355E5E" }}
                ></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{
                          background:
                              "linear-gradient(135deg, #355E5E 0%, #268181 100%)",
                        }}
                    >
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h3
                        className="text-2xl font-bold"
                        style={{ color: "#355E5E" }}
                    >
                      Equitable Dictionary
                    </h3>
                  </div>
                  <h4
                      className="text-lg font-semibold mb-3"
                      style={{ color: "#2F4F4F" }}
                  >
                    Equitable data licensing in plain terms
                  </h4>
                  <p
                      className="mb-4"
                      style={{ color: "#2F4F4F" }}
                  >
                    Plain-language definitions of the NOODL
                    License's terms and the wider vocabulary of
                    equitable data sharing.
                  </p>
                  <div className="flex gap-3">
                    <Link
                        to="/noodl-framework/dictionary"
                        className="text-sm font-semibold underline hover:opacity-70"
                        style={{ color: "#268181" }}
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tile 4 - Resource Library */}
              <div
                  className="group border-2 rounded-2xl p-8 bg-white hover:shadow-2xl transition-all transform hover:-translate-y-2 relative overflow-hidden"
                  style={{ borderColor: "#268181" }}
              >
                <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5 transform translate-x-16 -translate-y-16"
                    style={{ backgroundColor: "#006F6F" }}
                ></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{
                          background:
                              "linear-gradient(135deg, #006F6F 0%, #29D4AB 100%)",
                        }}
                    >
                      <Library className="w-8 h-8 text-white" />
                    </div>
                    <h3
                        className="text-2xl font-bold"
                        style={{ color: "#355E5E" }}
                    >
                      Resource Library
                    </h3>
                  </div>
                  <h4
                      className="text-lg font-semibold mb-3"
                      style={{ color: "#2F4F4F" }}
                  >
                    Guidance as the framework grows
                  </h4>
                  <p
                      className="mb-4"
                      style={{ color: "#2F4F4F" }}
                  >
                    A growing collection of explainers, briefs,
                    reports, publications and videos to help you
                    share and use African datasets with
                    confidence. New resources are added as
                    communities tell us what they need.
                  </p>
                  <div className="flex gap-3">
                    <Link
                        to="/noodl-framework/resources"
                        className="text-sm font-semibold underline hover:opacity-70"
                        style={{ color: "#268181" }}
                    >
                      Browse resources →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* In Practice Section */}
        <section
            id="in-practice"
            className="py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="container mx-auto max-w-6xl">
            <h2
                className="text-3xl font-bold mb-8"
                style={{ color: "#355E5E" }}
            >
              In Practice
            </h2>
            <p
                className="text-lg mb-8"
                style={{ color: "#2F4F4F" }}
            >
              How these resources get used
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Case Study Card 1 */}
              <div
                  className="group border-2 rounded-2xl p-6 bg-white hover:shadow-xl transition-all transform hover:-translate-y-2 relative overflow-hidden"
                  style={{ borderColor: "#268181" }}
              >
                <div
                    className="absolute top-0 left-0 w-2 h-full"
                    style={{
                      background:
                          "linear-gradient(180deg, #29D4AB 0%, #268181 100%)",
                    }}
                ></div>
                <div className="pl-4">
                  <div
                      className="text-xs font-bold uppercase tracking-wide mb-2"
                      style={{ color: "#29D4AB" }}
                  >
                    Case Study
                  </div>
                  <h4
                      className="text-lg font-bold mb-3"
                      style={{ color: "#355E5E" }}
                  >
                    Dataset Creator Story
                  </h4>
                  <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#2F4F4F" }}
                  >
                    A researcher creating an Igbo speech dataset
                    wanted to share it openly but ensure their
                    community benefited. Using the NOODL License
                    and Split Sheet, they documented all
                    contributors and set clear benefit-sharing
                    terms for commercial users.
                  </p>
                </div>
              </div>

              {/* Case Study Card 2 */}
              <div
                  className="group border-2 rounded-2xl p-6 bg-white hover:shadow-xl transition-all transform hover:-translate-y-2 relative overflow-hidden"
                  style={{ borderColor: "#268181" }}
              >
                <div
                    className="absolute top-0 left-0 w-2 h-full"
                    style={{
                      background:
                          "linear-gradient(180deg, #268181 0%, #006F6F 100%)",
                    }}
                ></div>
                <div className="pl-4">
                  <div
                      className="text-xs font-bold uppercase tracking-wide mb-2"
                      style={{ color: "#268181" }}
                  >
                    Case Study
                  </div>
                  <h4
                      className="text-lg font-bold mb-3"
                      style={{ color: "#355E5E" }}
                  >
                    Researcher Experience
                  </h4>
                  <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#2F4F4F" }}
                  >
                    An AI lab needed clarity on using a
                    NOODL-licensed Yoruba dataset. The Equitable
                    Licensing Dictionary helped them understand
                    their obligations, and they successfully
                    complied by contributing training resources
                    back to the source community.
                  </p>
                </div>
              </div>

              {/* Case Study Card 3 */}
              <div
                  className="group border-2 rounded-2xl p-6 bg-white hover:shadow-xl transition-all transform hover:-translate-y-2 relative overflow-hidden"
                  style={{ borderColor: "#268181" }}
              >
                <div
                    className="absolute top-0 left-0 w-2 h-full"
                    style={{
                      background:
                          "linear-gradient(180deg, #355E5E 0%, #268181 100%)",
                    }}
                ></div>
                <div className="pl-4">
                  <div
                      className="text-xs font-bold uppercase tracking-wide mb-2"
                      style={{ color: "#355E5E" }}
                  >
                    Case Study
                  </div>
                  <h4
                      className="text-lg font-bold mb-3"
                      style={{ color: "#355E5E" }}
                  >
                    Community Impact
                  </h4>
                  <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#2F4F4F" }}
                  >
                    A language community saw their data being used
                    without recognition. After learning about
                    NOODL through the resource library, they
                    relicensed their dataset, ensuring future
                    users would acknowledge their contributions
                    and provide equitable returns.
                  </p>
                </div>
              </div>
            </div>

            <Link
                to="/noodl-framework/in-practice"
                className="inline-block px-8 py-4 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-xl"
                style={{
                  background:
                      "linear-gradient(135deg, #F9A826 0%, #E19111 100%)",
                  color: "#1A2E2E",
                }}
            >
              See all case studies →
            </Link>
          </div>
        </section>

        {/* Video Section */}
        <section
            className="py-16 px-4 sm:px-6 lg:px-8"
            style={{ backgroundColor: "#F8F9FA" }}
        >
          <div className="container mx-auto max-w-4xl">
            <h2
                className="text-3xl font-bold mb-8 text-center"
                style={{ color: "#355E5E" }}
            >
              NOODL How-To Video
            </h2>
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
              <iframe
                  src="https://www.youtube-nocookie.com/embed/placeholder"
                  title="NOODL License How-To Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm" style={{ color: "#2F4F4F" }}>
                Captions available on YouTube
              </p>
            </div>
          </div>
        </section>
      </div>
  );
}