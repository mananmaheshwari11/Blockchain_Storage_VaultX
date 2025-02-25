# VaultX Frontend

![VaultX Starting Frontpage](path/to/your/image.png)

VaultX is a secure and intuitive platform designed for managing sensitive data with ease. This repository contains the frontend code, built using **React+Vite**, and it interacts seamlessly with the VaultX backend to provide a smooth user experience.

---

## Features
- User authentication with **Signup & Login**
- Secure storage and management of sensitive data
- Forms for **entity creation, updates, and uploads**
- **Route protection** using **Context API**
- **Integration with smart contracts** for blockchain storage
- Modern UI with responsive design

---

## Pages & Functionalities

### 1️⃣ **Authentication** (Login & Signup)
- Users can **sign up** using their email and password.
- Organisation can **sign up** using their name, location, email and password.
- **Login** allows authenticated users to access the app.
- On successful login, an authentication token is stored in context.


### 2️⃣ **Dashboard**
- Displays all stored entities.
- Users can view, update, or delete their saved records.

### 3️⃣ **Entity**
- Organisations can **create new entities** securely.
- Each entity consists of a name, and organisation associated.

### 4️⃣ **Upload & Update Form**
- Allows organisations to **upload certificate into the blockchain and can update the block only**.
- For each upload **particular email-id,dob and type should be unique**.
-  **upload certificate keeping it temper proof forever**.
- Updates are validated before submission.

---

## 🔐 Route Protection
VaultX uses **Context API** (`AccessContext`,`AdminContext` and `AuthContext`)`[Context]` in `App.jsx` to manage authentication and access control.

### How It Works:
- **AuthContext** stores authentication state and handles login/logout.
- **AccessContext** ensures only authorized users can access protected routes.
- Unauthenticated users are **redirected to the login page** if they try to access secure pages.

Example route protection in `App.jsx`:
```jsx
<Route path="vault" element={<AccessContext/>}>
```

---

## 🏗️ Smart Contract Integration
VaultX leverages **Ethereum Smart Contracts** to securely store hashes of sensitive data on the blockchain. The frontend interacts with `contract.sol` using **Web3.js or Ethers.js**.

### **How Hashes are Stored on Blockchain**
1. When an entity is uploaded, the frontend generates a **Keccak hash** of the data.
2. The hash is sent to the **VaultX Smart Contract** deployed on Ethereum.
3. The smart contract stores the hash securely in an immutable ledger.
4. The transaction hash is returned to the frontend for future verification.

### **Providers in contract.sol**
- The frontend connects to the Ethereum network using **MetaMask or Infura**.
- `ethers.providers.Web3Provider(window.ethereum)` is used to establish the connection.
- Transactions are signed using the user's Ethereum wallet before storing the hash.

Example of interaction with the smart contract:
```javascript
const contract = new ethers.Contract(contractAddress, contractABI, signer);
await contract.storeHash(dataHash);
```

---

## 🚀 Getting Started

### Installation
```sh
npm install
```

### Run the Frontend
```sh
npm run dev
```
This will start the development server at `http://localhost:5173/`.

---

### 📌 Notes
- Ensure the backend is running before accessing protected routes for getting access.
- Update the proxy in vite.config.js if working in production server.[](/readme_plugin.jpg)
- Ensure the Ethereum wallet is connected when interacting with smart contracts.

🔹 Happy coding with **VaultX!** 🚀


