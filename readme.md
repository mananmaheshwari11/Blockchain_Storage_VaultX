# Blockchain based MERN Project - VaultX

VaultX is a **high-security, blockchain-powered storage solution** that ensures **military-grade safety** for sensitive files. It uses a **two-way authentication storage system**, integrating **decentralized storage (Lighthouse), blockchain security, and a central database** to provide unmatched reliability and integrity.

---

## 🚀 How VaultX Works

### 1️⃣ **Two-Way Authentication Storage**
VaultX employs a **dual-layer security mechanism** to ensure **maximum safety** for stored data:
- **Step 1: Decentralized Storage with Lighthouse**  
  - The uploaded file is stored in **Lighthouse** (a decentralized storage network).
  - Lighthouse returns a **Content Identifier (CID)**, which acts as a unique fingerprint of the file.

- **Step 2: Blockchain Security**  
  - The **CID, along with user email and file hash**, is stored on the blockchain as a unique block.
  - This ensures immutability and prevents unauthorized modifications.

- **Step 3: Centralized Database Storage**  
  - The unique block containing the **CID, email, and hash** is stored in the **VaultX database**.
  - This allows **fast retrieval and enhanced user experience**, ensuring that even if the blockchain is slow, users can quickly access their data.

This **hybrid approach** ensures that files are **permanently stored, tamper-proof, and accessible only by authorized users.**

---

## 🔒 Security & Military-Grade Safety

VaultX is built with security as a top priority. Here’s how it ensures **maximum data safety**:

✅ **Decentralization** – Eliminates single points of failure by leveraging blockchain and Lighthouse storage.  
✅ **Immutability** – Once stored, data cannot be altered or deleted from the blockchain.  
✅ **End-to-End Encryption** – Ensures that files and metadata are encrypted before storage.  
✅ **Zero Trust Model** – Requires both blockchain verification and database validation before file retrieval.  
✅ **Military-Grade Protection** – Uses cryptographic hashing and blockchain consensus to prevent data tampering.  

---

## 🔐 Security of Endpoints & Frontend

VaultX follows **strict security protocols** to safeguard both backend endpoints and frontend authentication:

🔹 **Secure API Endpoints**  
- Endpoints are protected using **JWT authentication**.
- Only **verified requests** are allowed to access user data.
- Requests are validated against blockchain records to prevent unauthorized access.

🔹 **Frontend Protection**  
- **Context API** manages authentication and access control.
- Users must be logged in to view stored files.
- **MetaMask authentication** ensures transactions are signed securely before blockchain interactions.

---

## 🏗️ MetaMask Integration

VaultX uses **MetaMask** for blockchain transactions. Here’s how it works:

🔹 **User Authentication** – MetaMask connects users to the Ethereum network securely.  
🔹 **Transaction Signing** – Every blockchain transaction (storing CID, verifying user data) requires the user’s signature via MetaMask.  
🔹 **Secure Payments (If Needed)** – VaultX can integrate payment functionality for premium storage plans.  

MetaMask ensures that all blockchain interactions are **user-verified, secure, and immutable**.

---

## 🌟 Key Features of VaultX

✅ **Hybrid Storage Approach** – Combines **blockchain, decentralized storage, and a central database** for ultimate security and efficiency.  
✅ **Tamper-Proof Data** – Once stored on the blockchain, data cannot be modified.  
✅ **Military-Grade Encryption** – Secure hashing and encryption protect sensitive data.  
✅ **Seamless User Experience** – Easy-to-use frontend with **React & Material UI**.  
✅ **MetaMask Authentication** – Secure access control using blockchain wallets.  
✅ **Fast & Reliable Access** – Data retrieval is quick due to a hybrid storage system.  
✅ **Scalable & Future-Proof** – Designed to support growing data needs with decentralized storage.  

---

## 🚀 Running VaultX

### Development Mode
To run the app in development mode:
```sh
npm run dev
```
This will start both the **frontend and backend** concurrently for development.

### Production Mode
For production, run:
```sh
npm start
```
This will launch the **fully integrated VaultX application**.

---

## 🔗 Conclusion
VaultX is a **cutting-edge, blockchain-powered storage solution** designed for **security, reliability, and ease of use**. Whether you're storing sensitive business documents or personal files, VaultX ensures your data remains **safe, immutable, and always accessible**.

🔹 **Store securely. Retrieve easily. Stay protected with VaultX!** 🚀

## Credentials 

Create a .env after clone in the root directory as same as index.js and give three credentials in it 
- MONGO_URL(mongodb database connection string)
- PORT (port on which application runs, other than 5173)
- JWT_SECRET anything you want to give 

In the ContractProvider.jsx change the api key of lighthouse storage 
If you redploy the contract change contract_address and contract ABI in Contract.jsx

For more details on the frontend read the readme.md of certificate
https://vaultx-hvfv.onrender.com you can find application on this site 
ensure metamask extension is installed in the browser on which the site is rendered 
