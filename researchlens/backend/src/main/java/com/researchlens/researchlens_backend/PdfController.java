package com.researchlens.researchlens_backend;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.jdbc.core.JdbcTemplate;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import java.io.StringReader;
import java.sql.PreparedStatement;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PdfController {

    private final JdbcTemplate jdbcTemplate;

    public PdfController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 1. UPLOAD PDF
    @PostMapping("/upload")
    public String upload(@RequestParam("file") MultipartFile file) {

        try {

            // Check empty file
            if (file.isEmpty()) {
                return "Error: Please select a file!";
            }

            // Check PDF extension
            String fileName = file.getOriginalFilename();

            if (fileName == null ||
                !fileName.toLowerCase().endsWith(".pdf")) {
                return "Error: Only PDF files are allowed!";
            }

            // Check file size (110 MB)
            if (file.getSize() > 110L * 1024 * 1024) {
                return "Error: File size must be less than 110 MB!";
            }

            // Read uploaded file
            byte[] pdfBytes = file.getBytes();

            // Validate actual PDF content and extract text
            String extractedText;

            try (PDDocument document = Loader.loadPDF(pdfBytes)) {

                PDFTextStripper pdfStripper = new PDFTextStripper();

                extractedText = pdfStripper.getText(document);

            } catch (Exception e) {
                return "Error: Invalid or corrupted PDF file!";
            }

            // Store PDF details in Oracle Database
            String sql = "INSERT INTO research_papers (file_name, extracted_text) VALUES (?, ?)";

            jdbcTemplate.update(connection -> {

                PreparedStatement ps = connection.prepareStatement(sql);

                ps.setString(1, fileName);

                ps.setCharacterStream(
                    2,
                    new StringReader(extractedText),
                    extractedText.length()
                );

                return ps;
            });

            return extractedText;

        } catch (Exception e) {

            e.printStackTrace();

            return "Error: " + e.getMessage();
        }
    }

    // 2. FETCH UPLOADED PAPERS
    @GetMapping("/papers")
    public List<Map<String, Object>> getPapers() {

        String sql = "SELECT id, file_name, uploaded_at FROM research_papers ORDER BY uploaded_at DESC";

        return jdbcTemplate.queryForList(sql);
    }
}