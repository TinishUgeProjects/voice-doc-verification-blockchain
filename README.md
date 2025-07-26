# 🎙️ Secure Document Verification System with Blockchain Integration

This project combines **voice-based biometric authentication** with **blockchain technology** to verify document legitimacy securely and immutably. It was developed to address issues like document forgery, unauthorized access, and lack of traceability.

## 📌 Project Title (as in Resume)
**Secure Document Verification System with Blockchain Integration**

## 🧠 Original Project Title
**Voice-Based Document Verification System**

---

## 🚀 Features

- 🎤 **Voice Authentication**  
  Identifies and verifies users based on voiceprints using MFCC and speaker recognition algorithms.

- 🔗 **Blockchain Integration**  
  Logs verified document hashes and voiceprint signatures to an Ethereum smart contract for immutable traceability.

- 🧾 **Document Hash Validation**  
  Documents are never stored — only their SHA-256 hash and metadata are used for secure, tamper-proof checks.

- 🔒 **Decentralized and Privacy-Preserving**  
  Ensures verification integrity without storing any sensitive files or raw voice data.

---

## 🛠️ Tech Stack

| Component         | Technology              |
|------------------|--------------------------|
| Voice Processing | Python, librosa, sklearn |
| Backend API      | Flask / FastAPI          |
| Smart Contract   | Solidity, Web3.py        |
| Blockchain       | Ethereum (Ganache/Testnet)|
| Hashing          | SHA256                   |
| Frontend (opt.)  | HTML/CSS/JS              |

---

## 🧪 How It Works

1. 🎙️ **User speaks** a specific phrase — the voice is recorded and features are extracted.
2. 📄 **User uploads document** — its hash is generated.
3. ✅ **System verifies** voice identity and document validity.
4. ⛓️ **Verification result** is logged on Ethereum smart contract with:
   - Voiceprint signature
   - Document hash
   - Timestamp

---

## ⚙️ Future Enhancements

- Use Whisper ASR to verify spoken passphrases
- IPFS integration to store document metadata off-chain
- GUI interface for non-technical users

---

## 👨‍💻 Authors

- **Tinish (Instrumentation & Control Engineer)**
