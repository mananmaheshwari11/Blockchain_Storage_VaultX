import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// ✅ Fix: Dynamically Import PDF.js to Avoid Vite Issues
const loadPDFJS = async () => {
    const pdfjs = await import("pdfjs-dist/build/pdf");
    pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.mjs", import.meta.url).href;
    return pdfjs;
};

// ✅ Function to Fetch Base64 Images
const getBase64Image = async (imagePath) => {
    try {
        const response = await fetch(`${window.location.origin}${imagePath}`);
        if (!response.ok) throw new Error(`Failed to load image: ${imagePath}`);

        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => resolve(reader.result);
        });
    } catch (error) {
        console.error("Error loading image:", error);
        return null;
    }
};

// ✅ Convert PDF to Image Preview
const getPDFPreviewImage = async (pdfBuffer) => {
    try {
        const pdfjsLib = await loadPDFJS();
        const uint8Array = new Uint8Array(pdfBuffer);
        const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const scale = 2;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: context, viewport }).promise;

        return canvas.toDataURL("image/png"); // Convert first page to PNG
    } catch (error) {
        console.error("Error converting PDF to image:", error);
        return null;
    }
};

// ✅ Main Report Generation Function
export const GenerateReport = async ({
    orgName,
    email,
    dob,
    entityType,
    certBuffer, // PDF in ArrayBuffer format
    textSim,
    structureSim,
    isValid,
    timestamp,
}) => {
    const doc = new jsPDF();

    try {
        // ✅ Load Base64 Images
        const vaultxLogo = await getBase64Image("/logo_2.webp");
        const verifySign = await getBase64Image("/sign.png");

        // ✅ Convert PDF to Image Preview
        const certPreview = await getPDFPreviewImage(certBuffer);

        // ✅ Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("Validation by VaultX", 105, 30, null, null, "center");

        // ✅ Add VaultX Logo
        if (vaultxLogo) doc.addImage(vaultxLogo, "WEBP", 15, 15, 30, 30);

        // ✅ Organization & User Details
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Organization Name: ${orgName}`, 20, 50);
        doc.text(`Email: ${email}`, 20, 60);
        doc.text(`Date of Birth: ${dob}`, 20, 70);
        doc.text(`Entity Type: ${entityType}`, 20, 80);

        // ✅ Add Certificate Preview (If Available)
        if (certPreview) doc.addImage(certPreview, "PNG", 150, 50, 30, 30);

        // ✅ Similarity Scores Table
        autoTable(doc, {
            startY: 90,
            head: [["Metric", "Score"]],
            body: [
                ["Text Similarity", `${(textSim * 100).toFixed(2)}%`],
                ["Structure Similarity", `${(structureSim * 100).toFixed(2)}%`],
            ],
            theme: "grid",
        });

        // ✅ Approval Status
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(isValid ? "green" : "red");
        doc.text(`Validation Status: ${isValid ? "Approved" : "Rejected"}`, 20, 120, null, null, "left");

        // ✅ Remarks
        doc.setFontSize(12);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(0, 0, 0);
        const remark = isValid
            ? "The following certificate's structure, signature, and digital identifier match with the genuine one."
            : "The entity has been modified, manipulated, or pirated.\nPlease provide the original entity with the same size.";
        doc.text(remark, 20, 125, { maxWidth: 170 });

        // ✅ Digital Signature Section
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("Digitally Signed by VaultX Trusted Partners", 145, 195, null, null, "center");

        // ✅ Add Verification Signature (PNG)
        if (verifySign) doc.addImage(verifySign, "PNG", 130, 160, 30, 30);

        // ✅ Timestamp
        doc.setFontSize(10);
        doc.text(`Generated on: ${timestamp}`, 20, 200);

        // ✅ Download PDF
        doc.save(`Validation_Report_${entityType}.pdf`);
    } catch (error) {
        console.error("Error generating report:", error);
    }
};
