const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Encryption logic
function encrypt(text) {
    return text.split(" ").map(word => {
        return word.split('').map(character => {
            switch (character) {
                case "e": return "enter";
                case "i": return "imes";
                case "a": return "ai";
                case "o": return "ober";
                case "u": return "ufat";
                default: return character;
            }
        }).join('');
    }).join(' ');
}

// Decryption logic
function decrypt(text) {
    return text.replace(/enter/g, "e")
               .replace(/imes/g, "i")
               .replace(/ai/g, "a")
               .replace(/ober/g, "o")
               .replace(/ufat/g, "u");
}

// Route to handle encryption
app.post('/encrypt', (req, res) => {
    const { text } = req.body;
    const encryptedText = encrypt(text);
    res.json({ result: encryptedText });
});

// Route to handle decryption
app.post('/decrypt', (req, res) => {
    const { text } = req.body;
    const decryptedText = decrypt(text);
    res.json({ result: decryptedText });
});

// Serve the index.html file on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
