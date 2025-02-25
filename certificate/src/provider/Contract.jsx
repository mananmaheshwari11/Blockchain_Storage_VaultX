import { Contract } from "ethers";
import { BrowserProvider } from "ethers"

const contract_address="0x18dd9d63aef3ed821ce3733e3ca673d87f30a0d9"

const Contract_ABI=[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "uniqueHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "fileHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "CertificateCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_fileHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "createCertificateBlock",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_uniqueHash",
				"type": "bytes32"
			}
		],
		"name": "getCertificate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


const provider= new BrowserProvider(window.ethereum);
const signer=await provider.getSigner()
const contract=new Contract(contract_address,Contract_ABI,signer)

export default contract;
