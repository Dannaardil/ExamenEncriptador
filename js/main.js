class EncryptorComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
          
               <style>
            @import url(variables.css);
         
            :host {
                display: block;
                width: 100%;
                height: 100%;
            }
                  :host {
                    display: block;
                    width: 100%;
                }
                

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            ::-webkit-scrollbar-track {
                background-color: var(--bg-secondary);
                border-radius: 3px;
            }

            ::-webkit-scrollbar {
                width: 10px;
            }

            ::-webkit-scrollbar-thumb {
                background-color: var(--bg-prymary);
                border-radius: 3px;
                border: none;
                cursor: pointer;
            }

            form {
                display: flex;
                width: 100%;
                margin-top: 110px;
                flex-direction: column;
                justify-content: space-between;
                margin-right: 2rem;
            }

            textarea {
                resize: none;
                color: var(--color-secondary);
                font-family: "Inter_28pt-Regular";
                font-size: 32px;
                border: none;
                outline: none;
                background: transparent;
            }

            textarea::placeholder {
                color: var(--color-secondary);
            }

            .form-input__condition {
                display: flex;
                flex-direction: column;
            }

            .form-input__message {
                display: flex;
                gap: 8px;
                margin-bottom: 16px;
            }

            small {
                color: var(--color-tertiary);
                font-family: "Inter_18pt-Regular";
                font-size: 12px;
            }

            .form-input__button {
                display: flex;
                justify-content: space-between;
                gap: 24px;
            }

            input[type="submit"],
            button {
                width: 100%;
                height: 67px;
                border: none;
                outline: none;
                border-radius: 24px;
                font-family: "Inter_18pt-Regular";
                font-size: 16px;
                cursor: pointer;
                border: 1px solid var(--bg-prymary);
            }

            input[type="submit"]:first-of-type {
                background: var(--bg-button-prymary);
                color: var(--color-prymary);
            }

            input[type="submit"]:last-of-type {
                background: var(--bg-button-secondary);
                color: var(--color-secondary);
            }

            button {
                background: transparent;
            }

            .form-output, .form-output__message {
                background: var(--bg-quarter);
                display: none;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                border-radius: 32px;
                padding: 32px;
                box-shadow: 0px 24px 32px -8px var(--bg-secondary);
            }

            .form-output__message {
                justify-content: space-between;
            }

            .form-output img {
                margin-bottom: 32px;
            }

            .form-output h1 {
                font-size: 24px;
                text-align: center;
                margin-bottom: 5px;
                font-family: "Inter_24pt-Bold";
            }

            .form-output p {
                font-family: "Inter_18pt-Regular";
                font-size: 16px;
                text-align: center;
            }

            .form-output__message p {
                color: var(--color-tertiary);
                font-family: "Inter_24pt-Regular";
                font-size: 24px;
                word-wrap: break-word;
                width: 100%;
                height: 100%;
                overflow-y: auto;
                margin-bottom: 15px;
            }

            .active {
                display: flex;
            }

            @media (max-width: 500px) {
                .form-input__button {
                    flex-direction: column;
                }

                .form-output__message p {
                    height: 432px;
                }
            }
        </style>
           
            <form id="myForm">
                <textarea name="chain" class="entrada-texto" cols="30" rows="10" placeholder="Ingrese el texto aquí"></textarea>
                <div class="form-input__condition">
                    <div class="form-input__message">
                        <img src="storage/img/exclamation-circle-fill.png"> <small>Solo letras minúsculas y sin acentos</small>
                    </div>
                    <div class="form-input__button">
                        <input type="submit" data-accion="encrypt" value="Encriptar">
                        <input type="submit" data-accion="decrypt" value="Desencriptar">
                    </div>
                </div>
            </form>
            <div class="form-output active">
                <img src="storage/img/Muñeco.png">
                <h1>Ningún mensaje fue encontrado</h1>
                <p>Ingresa el texto que desees encriptar o desencriptar.</p>
            </div>
            <div class="form-output__message">
                <p></p>
                <button id="copy">Copiar</button>
            </div>
        `;
    }

    setupEventListeners() {
        const form = this.shadowRoot.querySelector('#myForm');
        const formOutput = this.shadowRoot.querySelector('.form-output');
        const formOutputMessage = this.shadowRoot.querySelector('.form-output__message');
        const outputParagraph = this.shadowRoot.querySelector('.form-output__message p');
        const btnCopy = this.shadowRoot.querySelector('#copy');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.submitter.dataset.accion;
            const data = Object.fromEntries(new FormData(e.target));

            if (btn === "encrypt") {
                formOutput.classList.remove("active");
                formOutputMessage.classList.add("active");
                outputParagraph.textContent = this.encrypt(data);
            } else if (btn === "decrypt") {
                formOutput.classList.remove("active");
                formOutputMessage.classList.add("active");
                outputParagraph.textContent = this.decrypt(data);
            }
        });

        btnCopy.addEventListener('click', () => {
            navigator.clipboard.writeText(outputParagraph.textContent)
                .then(() => {
                    outputParagraph.textContent = "";
                    formOutputMessage.classList.remove("active");
                    formOutput.classList.add("active");
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
    }

    encrypt(object) {
        let word = object.chain.split(" ");
        let conversion = word.map((value) => {
            value = value.split('');
            return value.map((character) => {
                if (character === "e") return "enter";
                else if (character === "i") return "imes";
                else if (character === "a") return "ai";
                else if (character === "o") return "ober";
                else if (character === "u") return "ufat";
                else return character;
            }).join("");
        }).join(" ");
        return conversion;
    }

    decrypt(object) {
        let word = object.chain;
        word = word.replace(/enter/g, "e");
        word = word.replace(/imes/g, "i");
        word = word.replace(/ai/g, "a");
        word = word.replace(/ober/g, "o");
        word = word.replace(/ufat/g, "u");
        return word;
    }
}

customElements.define('encryptor-component', EncryptorComponent);