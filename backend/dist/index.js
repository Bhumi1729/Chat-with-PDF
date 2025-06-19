"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const fs = __importStar(require("fs"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const cors_1 = __importDefault(require("cors")); // Added CORS support
require("dotenv/config");
const app = (0, express_1.default)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // Middleware to parse JSON bodies
const anthropic = new sdk_1.default({
    apiKey: process.env.ANTHROPIC_API_KEY, // Ensure this is set in your environment variables
});
app.post('/upload', upload.single('pdf'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check for missing file or question
        if (!req.file || !req.body.question) {
            res.status(400).json({ error: 'Missing PDF file or question' });
            return;
        }
        // Read PDF content
        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = yield (0, pdf_parse_1.default)(dataBuffer); // Ensure async handling here
        const pdfText = pdfData.text;
        if (!pdfText) {
            res.status(400).json({ error: 'No text extracted from the PDF' });
            return;
        }
        // Create a prompt based on the PDF content
        const prompt = `Based on the following PDF content:\n\n${pdfText}\n\nPlease answer the question: ${req.body.question}`;
        // Call Anthropic API
        const response = yield anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            messages: [{ role: 'user', content: prompt }],
        });
        // Send response back to the client
        res.json({ answer: response.content });
    }
    catch (err) {
        console.error('Error occurred:', err);
        // Handle error during file read, PDF parsing, or API call
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
    finally {
        // Clean up the uploaded file after processing to save disk space
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        }
    }
}));
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
