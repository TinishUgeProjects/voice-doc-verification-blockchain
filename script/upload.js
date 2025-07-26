// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCP-SX4O0ENh1pzqqyLHPSpyjXynDjxI3s",
    authDomain: "docverify-ca74e.firebaseapp.com",
    projectId: "docverify-ca74e",
    storageBucket: "docverify-ca74e.appspot.com",
    messagingSenderId: "624109621209",
    appId: "1:624109621209:web:aa46ff4317297326ee93c8"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.firestore();
const supportedFormats = ['application/pdf'];

const fileInput = document.querySelector('.custom-file-container__custom-file__custom-file-input');

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!supportedFormats.includes(file.type)) {
        alert('File format not supported. Please upload a PDF file.');
        return;
    }

    const storageRef = storage.ref(`uploads/${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
    }, (error) => {
        console.error('Error uploading file:', error);
    }, () => {
        console.log('File uploaded successfully!');
        extractPDFText(file);
    });
}


function extractPDFText(file, uploadButton) {
    const reader = new FileReader();

    reader.onload = function (event) {
        const typedarray = new Uint8Array(event.target.result);

        pdfjsLib.getDocument(typedarray).promise.then(function (pdf) {
            const maxPages = pdf.numPages;
            let finalText = '';

            const extractPageText = (page) => {
                return page.getTextContent().then(function (textContent) {
                    for (const item of textContent.items) {
                        finalText += item.str + ' ';
                    }
                    return Promise.resolve();
                });
            };

            const getPageTextPromises = [];
            for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
                getPageTextPromises.push(pdf.getPage(pageNum).then(extractPageText));
            }

            Promise.all(getPageTextPromises)
                .then(function () {
                    const blob = new Blob([finalText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'extracted_text.txt';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);

                    const verificationMessage = document.getElementById('verificationMessage');
                    if (verificationMessage) {
                        verificationMessage.style.display = 'block';
                    }
                    if (uploadButton) {
                        uploadButton.innerText = 'Extracted.';
                    }
                    window.location.href = 'main.html';
                })
                .catch(function (error) {
                    console.error('Error during PDF text extraction:', error);
                });
        }).catch(function (error) {
            console.error('Error during PDF loading:', error);
        });
    };

    reader.readAsArrayBuffer(file);
}





function displayGreenText() {
    const afterUploadSection = document.querySelector('.afterupload');
    const greenText = document.createElement('p');
    greenText.textContent = 'THIS RESULT IS SUCCESSFULLY MATCHED WITH PASSBASE API VERIFICATION, THE DOCUMENT IS VERIFIED.';
    greenText.style.color = 'green';
    afterUploadSection.appendChild(greenText);
}

function navigateToMain() {
    console.log('Navigate to the main page');
    window.location.href = 'main.html';
}

function cancelAction() {
    console.log('Cancel button clicked');
    navigateToMain();
}


function uploadAction() {
    console.log('Upload button clicked');
    const file = document.querySelector('.custom-file-container__custom-file__custom-file-input').files[0];
    if (file) {
        if (file.type === 'application/pdf') {
            const uploadButton = document.querySelector('.btn-primary');
            uploadButton.innerText = 'Extracting...';
            extractPDFText(file, uploadButton);
        } else {
            alert('File format not supported. Please upload a PDF file.');
        }
    } else {
        alert('Please select a file to upload.');
    }
}

const uploadArea = document.querySelector('.upload-area');
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', handleFileUpload);

document.addEventListener('DOMContentLoaded', function () {
    const cancelButton = document.querySelector('.btn-secondary');
    const uploadButton = document.querySelector('.btn-primary');
    const closeButton = document.querySelector('.btn-close');

    cancelButton.addEventListener('click', cancelAction);
    uploadButton.addEventListener('click', uploadAction);
    
    closeButton.addEventListener('click', () => {
        console.log('Close button clicked');
    });
});
