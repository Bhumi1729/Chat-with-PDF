import express, { Request, Response } from 'express';
import multer from 'multer';
import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import pdf from 'pdf-parse';
import cors from 'cors'; // Added CORS support
import "dotenv";
dotenv.config();
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());


const anthropic = new Anthropic({
  apiKey: "",
});

app.post('/upload', upload.single('pdf'), async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for missing file or question
    if (!req.file || !req.body.question) {
      res.status(400).json({ error: 'Missing PDF file or question' });
      return;
    }

    // Read PDF content
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(dataBuffer);  // Ensure async handling here
    const pdfText = pdfData.text;

    if (!pdfText) {
      res.status(400).json({ error: 'No text extracted from the PDF' });
      return;
    }

    // Create a prompt based on the PDF content
    const prompt = `Based on the following PDF content:\n\n${pdfText}\n\nPlease answer the question: ${req.body.question}`;

    // Call Anthropic API
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    // Send response back to the client
    res.json({ answer: response.content });
    
  } catch (err) {
    console.error('Error occurred:', err);
    // Handle error during file read, PDF parsing, or API call
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  } finally {
    // Clean up the uploaded file after processing to save disk space
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
