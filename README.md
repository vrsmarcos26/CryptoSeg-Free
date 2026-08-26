<div align="center">
  <h1>
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Locked%20with%20Key.png" alt="Cadeado com Chave" width="45" height="45" />
    CryptoSeg - Plataforma de Criptografia
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Key.png" alt="Chave" width="45" height="45" />
  </h1>
</div>

<p align="center">
  <img alt="Linguagem Principal" src="https://img.shields.io/github/languages/top/vrsmarcos26/CryptoSeg-Free?style=for-the-badge&color=61DAFB">
  <img alt="Licença" src="https://img.shields.io/github/license/vrsmarcos26/CryptoSeg-Free?style=for-the-badge&color=blue">
</p>

<p align="center">
  Uma plataforma web 100% <i>client-side</i> para criptografia. O projeto une design moderno e segurança de ponta, processando todos os algoritmos criptográficos diretamente no navegador do usuário, garantindo privacidade total.
</p>

<p align="center">
  <a href="#-visão-geral">Visão Geral</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-tecnologias-utilizadas">Tecnologias</a> •
  <a href="#-arquitetura-e-segurança">Arquitetura</a> •
  <a href="#-como-executar-localmente">Como Executar</a>
</p>

---

### ✨ Visão Geral

O **CryptoSeg** oferece um ambiente intuitivo e seguro para a utilização de diversos algoritmos criptográficos. O grande diferencial desta versão é sua arquitetura Serverless: não há backend, não há banco de dados e não há necessidade de cadastro. O acesso é livre e gratuito.

---

### 🚀 Funcionalidades

-   **Cifras Clássicas:** Cifra de César e Cifra de Vigenère.
-   **Cifras Simétricas Modernas:** AES (Advanced Encryption Standard).
-   **Cifras Assimétricas:** RSA, com geração de par de chaves pública e privada diretamente na máquina do usuário.
-   **Algoritmos de Hash:** MD5, SHA-1, SHA-256 e SHA-512.
-   **Esquemas de Codificação:** Base64, Binário e Hexadecimal.

---

### 🛠️ Tecnologias Utilizadas

O projeto foi construído como uma Single Page Application (SPA), utilizando um ecossistema moderno focado em performance:

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
</p>

---

### 🏗️ Arquitetura e Segurança (Zero-Knowledge)

A plataforma foi projetada para oferecer **privacidade absoluta**. Todo o processamento criptográfico, geração de chaves RSA e cálculos de Hash utilizam a `Web Crypto API` e o pacote `crypto-js` executados exclusivamente no lado do cliente (navegador). 

Isso significa que **nenhum texto claro, cifra ou senha é transmitido pela rede**. O código hospedado no GitHub Pages apenas serve os arquivos estáticos para o seu dispositivo.

---

### ⚙️ Como Executar Localmente

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento. Você precisará do **Node.js** instalado.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/vrsmarcos26/CryptoSeg-Free.git](https://github.com/vrsmarcos26/CryptoSeg-Free.git)
    cd CryptoSeg-Free
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível localmente (geralmente em `http://localhost:5173`).

---

### 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

<hr>

<p align="center">
  Desenvolvido por <b>Marcos Vinícius</b>
</p>