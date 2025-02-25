import contract from "./Contract";
import lighthouse from "@lighthouse-web3/sdk"

// uploading certificate to blockchain
export const uploadCertificate=async(email,pdfHash)=>{
    try {
        const tx=await contract.createCertificateBlock(pdfHash,email)
        await tx.wait()
        return tx;
    } catch (error) {
        console.log("Error in upload transaction",error)
        return null;
    }
}
// getting Certificate from blockchain
export const getCertificate=async(blockaddress)=>{
    try {
        const tx=await contract.getCertificate(blockaddress);
        return tx;
    } catch (error) {
        console.log("Error in get transaction",error);
        return null;
    }
}
// uploading certificate to lighthouse
const apiKey="d5f7e6d3.0748777fdc5a4c23b01cd21b81b82053";
export const uploadFile=async(file)=>{
    try {
    if(!file){
        console.log("No File to upload");
        return null;
    }   
    const uploadResponse=await lighthouse.upload([file],apiKey);
    return uploadResponse;
    } catch (error) {
        console.log(error)
        return null;
    }
}
//retrieve file from lighthouse 
export const downloadFile = async (cid) => {
    try {
      const url = `https://gateway.lighthouse.storage/ipfs/${cid}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${cid}c.pdf`; // Change extension based on file type
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download the file:', error);
    }
  };

export const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        return accounts;
      } catch (error) {
        console.error('MetaMask connection error:', error);
      }
    } else {
      alert('Please install MetaMask to continue');
    }
  }