import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [backendStatus, setBackendStatus] = useState("Connecting...")
  const [extractedText, setExtractedText] = useState("")
  const [uploading, setUploading] = useState(false)
  const [papers, setPapers] = useState([])

  // CHECK BACKEND & FETCH PAPERS
  useEffect(() => {
    fetch("http://localhost:8080/")
      .then(response => response.text())
      .then(data => setBackendStatus(data))
      .catch(() => setBackendStatus("Backend connection failed"))

    fetchPapers()
  }, [])

  // FETCH PAPERS FROM ORACLE
  async function fetchPapers() {
    try {
      const response = await fetch("http://localhost:8080/api/papers")

      if (!response.ok) {
        throw new Error("Failed to fetch papers")
      }

      const data = await response.json()
      setPapers(data)

    } catch (error) {
      console.log("Error fetching papers:", error)
    }
  }

  // SELECT FILE
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

    const maxSize = 110 * 1024 * 1024

    if (file.size > maxSize) {
      alert("File size must be less than 110 MB!")
      setSelectedFile(null)
      event.target.value = ""
      return
    }

    setSelectedFile(file)
    setExtractedText("")
  }

  // REMOVE SELECTED FILE
  function removeFile() {
    setSelectedFile(null)
    setExtractedText("")
    document.getElementById("pdf-upload").value = ""
  }

  // UPLOAD FILE TO BACKEND
  async function handleUpload() {
    if (!selectedFile) {
      alert("Please select a file first!")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedFile)

    setUploading(true)
    setExtractedText("")

    try {
      const response = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        body: formData
      })

      const data = await response.text()

      if (!response.ok) {
        throw new Error(data || "File upload failed!")
      }

      setExtractedText(data)

      // REFRESH UPLOADED PAPERS LIST
      await fetchPapers()

      setTimeout(() => {
        document.getElementById("extracted-text")?.scrollIntoView({
          behavior: "smooth"
        })
      }, 100)

    } catch (error) {
      alert(error.message || "File upload failed!")

    } finally {
      setUploading(false)
    }
  }

  // SCROLL TO UPLOAD SECTION
  function scrollToUpload() {
    document.getElementById('upload').scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <>
      <div className="backend-status">
        Backend: {backendStatus}
      </div>

      {/* NAVBAR */}
      <nav>
        <h2>ResearchLens</h2>

        <div>
          <a href="#">Home</a>
          <a href="#features">Features</a>
          <a href="#upload">Upload Paper</a>
          <a href="#about">About</a>

          <button onClick={scrollToUpload}>
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main>
        <span className="hero-tag">
          AI-Powered Research Intelligence
        </span>

        <h1>
          Understand Research Papers
          <span> Smarter.</span>
        </h1>

        <p>
          Upload, explore and understand research papers
          with the power of Artificial Intelligence.
          Discover insights beyond traditional reading.
        </p>

        <button onClick={scrollToUpload}>
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

      {/* FILE UPLOAD SECTION */}
      <section className="upload-section" id="upload">
        <h2>Upload Your Research Paper</h2>

        <p>
          Upload a file and start exploring your research paper
          with Artificial Intelligence.
        </p>

        <div className="upload-box">
          <div className="upload-icon">📄</div>

          <h3>Select Your Research Paper</h3>

          <p className="upload-description">
            Choose a file from your device.
          </p>

          <input
            id="pdf-upload"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
          />

          {selectedFile && (
            <div>
              <p className="selected-file">
                Selected File: {selectedFile.name}
              </p>

              <p>
                File Size: {
                  (selectedFile.size / (1024 * 1024)).toFixed(2)
                } MB
              </p>

              <button
                onClick={() => {
                  const pdfUrl = URL.createObjectURL(selectedFile)
                  window.open(pdfUrl, "_blank")
                }}
              >
                Preview File 👁
              </button>

              <button onClick={removeFile}>
                Remove File ✕
              </button>

              <button
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? "Extracting Text..." : "Upload File ↑"}
              </button>
            </div>
          )}

          <p className="upload-note">
            Only PDF files up to 110 MB are allowed.
          </p>
        </div>
      </section>

      {/* EXTRACTED TEXT SECTION */}
      {extractedText && (
        <section className="extracted-section" id="extracted-text">
          <h2>Extracted PDF Text</h2>

          <p>
            Your research paper text has been extracted successfully.
          </p>

          <div className="extracted-text-box">
            <pre>{extractedText}</pre>
          </div>
        </section>
      )}

      {/* PREVIOUSLY UPLOADED PAPERS */}
      <section className="papers-section">
        <h2>Previously Uploaded Research Papers</h2>

        <p>
          Your uploaded research papers are stored in Oracle Database.
        </p>

        <div className="papers-container">
          {papers.length === 0 ? (
            <p>No research papers uploaded yet.</p>
          ) : (
            papers.map((paper) => (
              <div className="paper-card" key={paper.ID}>
                <h3>
                  📄 {paper.FILE_NAME}
                </h3>

                <p>
                  Uploaded At: {
                    new Date(paper.UPLOADED_AT).toLocaleString()
                  }
                </p>
              </div>
            ))
          )}
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

        <p>
          Making Research Smarter with Artificial Intelligence.
        </p>

        <p>
          © 2026 ResearchLens. All Rights Reserved.
        </p>
      </footer>
    </>
  )
}

export default App