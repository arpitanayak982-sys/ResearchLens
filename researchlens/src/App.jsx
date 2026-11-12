import { useState } from 'react'
import './App.css'

function App() {

  const [selectedFile, setSelectedFile] = useState(null)

  function handleFileChange(event) {
    const file = event.target.files[0]

    if (!file) return

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")

    if (!isPdf) {
      alert("Please upload a PDF file!")
      setSelectedFile(null)
      event.target.value = ""
      return
    }

    setSelectedFile(file)
  }

  return (
    <>

      {/* NAVBAR */}

      <nav>
        <h2>ResearchLens</h2>

        <div>
          <a href="#">Home</a>
          <a href="#features">Features</a>
          <a href="#upload">Upload Paper</a>
          <a href="#about">About</a>
          <button onClick={() => document.getElementById('upload').scrollIntoView({ behavior: 'smooth' })}>
            Get Started
          </button>
        </div>
      </nav>


      {/* HERO SECTION */}

      <main>

        <span className="hero-tag">AI-Powered Research Intelligence</span>

        <h1>
          Understand Research Papers
          <span> Smarter.</span>
        </h1>

        <p>
          Upload, explore and understand research papers
          with the power of Artificial Intelligence.
          Discover insights beyond traditional reading.
        </p>

        <button onClick={() => document.getElementById('upload').scrollIntoView({ behavior: 'smooth' })}>
          Explore Research →
        </button>

      </main>


      {/* FEATURES SECTION */}

      <section className="features" id="features">

        <h2>What You Can Do With ResearchLens</h2>

        <p className="features-subtitle">
          Go beyond reading research papers. Discover, analyze
          and connect research with AI.
        </p>

        <div className="feature-container">

          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Smart Paper Summarization</h3>
            <p>
              Generate structured summaries covering research
              objectives, methodology and findings.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Evidence-Based AI Chat</h3>
            <p>
              Ask questions and receive AI answers supported by
              research paper content and page references.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Research Gap Detection</h3>
            <p>
              Identify potential unexplored research areas and
              opportunities for future studies.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Multi-Paper Comparison</h3>
            <p>
              Compare research findings, approaches and
              methodologies across multiple papers.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧪</div>
            <h3>Research Methodology Analyzer</h3>
            <p>
              Understand research techniques, datasets,
              experiments and evaluation methods.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h3>Contradiction Detection</h3>
            <p>
              Discover conflicting findings between research
              papers with supporting evidence.
            </p>
          </div>

          <div className="empty-card"></div>


    

          <div className="feature-card">
            <div className="feature-icon">🕸️</div>
            <h3>Research Knowledge Map</h3>
            <p>
              Connect related concepts and discover relationships
              across uploaded research papers.
            </p>
          </div>

        </div>

      </section>


      {/* PDF UPLOAD SECTION */}

      <section className="upload-section" id="upload">

        <h2>Upload Your Research Paper</h2>

        <p>
          Upload a PDF and start exploring your research paper
          with Artificial Intelligence.
        </p>

        <div className="upload-box">

          <div className="upload-icon">📄</div>

          <h3>Select Your Research Paper</h3>

          <p className="upload-description">
            Choose a PDF file from your device.
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />

          {selectedFile && (
            <p className="selected-file">
              Selected File: {selectedFile.name}
            </p>
          )}

          <p className="upload-note">
            Only PDF files are supported.
          </p>

        </div>

      </section>


      {/* ABOUT SECTION */}

      <section className="about-section" id="about">

        <h2>About ResearchLens</h2>

        <p>
          ResearchLens is an AI-powered research intelligence
          platform designed to help students and researchers
          understand, analyze and discover insights from
          academic research papers.
        </p>

      </section>


      {/* FOOTER */}

      <footer>
        <h2>ResearchLens</h2>
        <p>Making Research Smarter with Artificial Intelligence.</p>
        <p>© 2026 ResearchLens. All Rights Reserved.</p>
      </footer>

    </>
  )
}

export default App