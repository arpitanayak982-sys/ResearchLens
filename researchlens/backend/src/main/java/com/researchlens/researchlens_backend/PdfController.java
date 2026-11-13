package com.researchlens.researchlens_backend;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PdfController {

    @PostMapping("/upload")
    public String uploadPdf(@RequestParam("file") MultipartFile file)
            throws IOException {

        if (file.isEmpty()) {
            return "Please select a PDF file!";
        }

        return "PDF received successfully: " + file.getOriginalFilename();
    }
}
