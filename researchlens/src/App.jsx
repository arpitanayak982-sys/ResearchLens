//import './App.css'
import { useState } from 'react'
import './App.css'
    
function App() {

  const [selectedFile, setSelectedFile] = useState(null)

  function handleFileChange(event) {
    const file = event.target.files[0]

    if (!file) return

    const isPdf = file.type === "application/pdf" ||
                  file.name.toLowerCase().endsWith(".pdf")

    if (!isPdf) {
      alert("Please select a PDF file!")
      setSelectedFile(null)
      event.target.value = ""
      return
    }

    setSelectedFile(file)
  }

  return (


    <>
      <nav>
        <h2>ResearchLens</h2>

        <div>
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>
          <button>Get Started</button>
        </div>
      </nav>

      <main>
        <h1>Understand Research Papers Smarter.</h1>

        <p>
          Upload, explore and understand research papers
          with the power of Artificial Intelligence.
        </p>

        <button>Explore Research</button>
      </main>
      <section className="features" id="features">
  <h2>What You Can Do With ResearchLens</h2>

  <div className="feature-container">

    <div className="feature-card">
      <h3>📄 Paper Summarization</h3>
      <p>Generate simple summaries of lengthy research papers.</p>
    </div>

    <div className="feature-card">
      <h3>💬 AI Research Chat</h3>
      <p>Ask questions and get answers from your research papers.</p>
    </div>

    <div className="feature-card">
      <h3>🔍 Research Analysis</h3>
      <p>Understand research methods, findings and limitations.</p>
    </div>

  </div>
</section>
<section className="upload-section" id="upload">

  <h2>Upload Your Research Paper</h2>

  <p>Upload a PDF and start exploring your research paper.</p>

  <div className="upload-box">

    <h3>📄 Select Your PDF</h3>

    <input
  type="file"
  accept=".pdf,.jpg,.jpeg,.png"
  onChange={handleFileChange}
/>

{selectedFile && (
  <p>Selected File: {selectedFile.name}</p>
)}

<p>Only PDF files are supported.</p>
  </div>

</section>

    </>
  )
}

export default App