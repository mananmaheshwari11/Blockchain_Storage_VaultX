import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import Tesseract from "tesseract.js"; // ✅ OCR for text extraction
import { fetchCertificate } from "./ContractProvider";

// ✅ Set PDF.js worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// Convert PDF to images
export const convertPDFToImages = async (pdfBuffer) => {
    const loadingTask = pdfjsLib.getDocument({ data: pdfBuffer });
    const pdf = await loadingTask.promise;
    let images = [];

    for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const scale = 2;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: context, viewport }).promise;

        images.push(canvas.toDataURL("image/png")); // Convert to PNG base64
    }
    return images;
};

// ✅ OCR Function: Extracts text from images using Tesseract.js
const extractTextFromImage = async (image) => {
    const { data } = await Tesseract.recognize(image, "eng");
    return data.text;
};

// AI-based Image Similarity using MobileNet
const loadModel = async () => await mobilenet.load();
export const compareImagesAI = async (image1, image2) => {
    const model = await loadModel();
    
    const img1 = tf.browser.fromPixels(await loadImage(image1));
    const img2 = tf.browser.fromPixels(await loadImage(image2));

    const features1 = await model.infer(img1, true);
    const features2 = await model.infer(img2, true);

    const similarity = tf.losses.cosineDistance(features1, features2, 0).dataSync();
    
    return 1 - similarity;
};

// ✅ NLP-based text similarity (Cosine Similarity)
const textSimilarity = (text1, text2) => {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);

    const set1 = new Set(words1);
    const set2 = new Set(words2);
    const intersection = [...set1].filter(word => set2.has(word)).length;
    
    return intersection / Math.sqrt(set1.size * set2.size);
};

// Load image as an HTML Image element
const loadImage = async (imageSrc) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => resolve(img);
    });
};

// ✅ Enhanced Certificate Validation
export const ValidateAsset = async (cid, userFile) => {
    try {
        const orgBuffer = await fetchCertificate(cid);
        if (!orgBuffer) {
            return { valid: false, message: "Invalid credentials to validate file" };
        }

        const orgPdf = await convertPDFToImages(orgBuffer);
        const userBuffer = await userFile.arrayBuffer();
        const userImages = await convertPDFToImages(userBuffer);

        if (orgPdf.length !== userImages.length) {
            return { valid: false, message: "Page count mismatch in PDF verification!" };
        }

        let similarity = 0;
        let textSimilarityScore = 0;

        for (let i = 0; i < orgPdf.length; i++) {
            // ✅ Compare images using AI
            similarity += await compareImagesAI(orgPdf[i], userImages[i]);

            // ✅ Extract text and compare
            const text1 = await extractTextFromImage(orgPdf[i]);
            const text2 = await extractTextFromImage(userImages[i]);
            textSimilarityScore += textSimilarity(text1, text2);
        }

        const avgImageSimilarity = similarity / orgPdf.length;
        const avgTextSimilarity = textSimilarityScore / orgPdf.length;
        
        // ✅ Decide validity based on image & text similarity
        const isValid = avgImageSimilarity > 0.8 && avgTextSimilarity > 0.9;

        return { 
            valid: isValid, 
            imageSimilarity: avgImageSimilarity,
            textSimilarity: avgTextSimilarity,
            message: isValid ? "✅ Certificate Valid" : "❌ Certificate Modified!" 
        };
    } catch (error) {
        console.error("Validation failed:", error);
        return { valid: false, error: "Validation process failed" };
    }
};
