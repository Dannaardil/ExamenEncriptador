# Encriptador - Text Encryption Web Component

## Description

Encriptador is a web application that allows users to encrypt and decrypt text using a custom algorithm. This project is built using Web Components, providing a modular and reusable solution for text encryption.

## Features

- Text encryption
- Text decryption
- Copy encrypted/decrypted text to clipboard
- Responsive design for desktop, tablet, and mobile devices

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Web Components

## Project Structure
encriptador/
│
├── css/
│   ├── style.css
│   └── variables.css
│
├── js/
│   └── encryptor-component.js
│
├── storage/
│   └── img/
│       ├── Logo.png
│       ├── Muñeco.png
│       └── exclamation-circle-fill.png
│
├── index.html
└── README.md

3. Open `index.html` in your preferred web browser.

## Usage

1. Enter the text you want to encrypt or decrypt in the provided textarea.
2. Click the "Encriptar" button to encrypt the text or "Desencriptar" to decrypt it.
3. The result will be displayed in the output area.
4. Use the "Copiar" button to copy the result to your clipboard.

## Encryption Algorithm

The encryption algorithm replaces vowels with specific strings:
- 'e' is replaced with 'enter'
- 'i' is replaced with 'imes'
- 'a' is replaced with 'ai'
- 'o' is replaced with 'ober'
- 'u' is replaced with 'ufat'

The decryption process reverses these replacements.

## Customization

You can customize the appearance of the component by modifying the CSS variables in the `variables.css` file.

## Browser Compatibility

This project uses modern web technologies and is compatible with the latest versions of major browsers that support Web Components.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- Logo and images provided by [Alura Latam](https://www.aluracursos.com/)
- Inspired by encryption challenges in programming courses