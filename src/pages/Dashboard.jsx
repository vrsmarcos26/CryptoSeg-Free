import React, { useState } from 'react';
import * as Crypto from '../utils/cryptoUtils';

export default function Dashboard() {
  const [algoritmo, setAlgoritmo] = useState('cesar');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  
  // Senha comum (AES, Vigenère)
  const [senha, setSenha] = useState('');

  // Chaves RSA
  const [chavePublicaGerada, setChavePublicaGerada] = useState('');
  const [chavePrivadaGerada, setChavePrivadaGerada] = useState('');
  const [chaveRsaInput, setChaveRsaInput] = useState('');

  const titulos = {
    cesar: "Cifra de César",
    base64: "Base64",
    vigenere: "Cifra de Vigenère",
    aes: "AES (Simétrica)",
    rsa: "RSA (Assimétrica)",
    sha256: "Hash (SHA-256)",
    md5: "MD5",
    sha1: "SHA-1",
    sha512: "SHA-512",
    binario: "Binário",
    hex: "Hexadecimal"
  };

  const handleCriptografar = async () => {
    if (!inputText) return;
    let res = "";
    switch (algoritmo) {
      case 'cesar': res = Crypto.criptografarCesar(inputText); break;
      case 'vigenere': res = Crypto.criptografarVigenere(inputText, senha); break;
      case 'base64': res = btoa(inputText); break;
      case 'binario': res = Crypto.textoParaBinario(inputText); break;
      case 'hex': res = Crypto.textoParaHexadecimal(inputText); break;
      case 'md5': res = Crypto.gerarMD5(inputText); break;
      case 'sha1': res = Crypto.gerarSHA1(inputText); break;
      case 'sha256': res = Crypto.gerarSHA256(inputText); break;
      case 'sha512': res = Crypto.gerarSHA512(inputText); break;
      case 'aes': res = await Crypto.criptografarAES(inputText, senha); break;
      case 'rsa': 
        if (!chaveRsaInput) res = "Chave pública necessária no campo abaixo.";
        else res = await Crypto.criptografarRSA(inputText, chaveRsaInput);
        break;
      default: res = "Algoritmo não configurado.";
    }
    setOutputText(res);
  };

  const handleDescriptografar = async () => {
    if (!inputText) return;
    let res = "";
    switch (algoritmo) {
      case 'cesar': res = Crypto.descriptografarCesar(inputText); break;
      case 'vigenere': res = Crypto.descriptografarVigenere(inputText, senha); break;
      case 'base64': 
        try { res = atob(inputText); } catch { res = "Base64 Inválido"; } break;
      case 'binario': res = Crypto.binarioParaTexto(inputText); break;
      case 'hex': res = Crypto.hexadecimalParaTexto(inputText); break;
      case 'aes': res = await Crypto.descriptografarAES(inputText, senha); break;
      case 'rsa': 
        if (!chaveRsaInput) res = "Chave privada necessária no campo abaixo.";
        else res = await Crypto.descriptografarRSA(inputText, chaveRsaInput);
        break;
      case 'md5':
      case 'sha1':
      case 'sha256':
      case 'sha512': res = "Hashes são irreversíveis."; break;
      default: res = "Algoritmo não configurado.";
    }
    setOutputText(res);
  };

  const handleGerarRSA = async () => {
    const chaves = await Crypto.gerarChavesRSA();
    setChavePublicaGerada(chaves.publica);
    setChavePrivadaGerada(chaves.privada);
  };

  const precisaSenha = ['aes', 'vigenere'].includes(algoritmo);
  const isRsa = algoritmo === 'rsa';

  return (
    <main className="container">
      <h1>{titulos[algoritmo]}</h1>
      
      <div className="crypto-box">
        <textarea 
          placeholder="Digite seu texto..." 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        
        <textarea 
          placeholder="Resultado..." 
          value={outputText}
          readOnly
        ></textarea>
        
        {precisaSenha && (
          <input 
            type="text" 
            placeholder="Digite uma senha ou palavra-chave..." 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        )}
      </div>
    
      <div className="button-group">
        <button onClick={handleCriptografar}>Criptografar</button>
        <button onClick={handleDescriptografar}>Descriptografar</button>
      </div>

      {isRsa && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div className="button-group">
            <button onClick={handleGerarRSA}>Gerar Par de Chaves RSA</button>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <label style={{ display: 'block', color: '#feb32b', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Chave Pública (Para Criptografar):
            </label>
            <textarea 
              value={chavePublicaGerada} 
              readOnly 
              style={{ height: '80px' }} 
              placeholder="Gere as chaves para visualizar..."
            />
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <label style={{ display: 'block', color: '#feb32b', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Chave Privada (Para Descriptografar):
            </label>
            <textarea 
              value={chavePrivadaGerada} 
              readOnly 
              style={{ height: '80px' }} 
              placeholder="Gere as chaves para visualizar..."
            />
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <label style={{ display: 'block', color: '#feb32b', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Chave para uso (Cole a Pública ou Privada aqui):
            </label>
            <textarea 
              value={chaveRsaInput}
              onChange={(e) => setChaveRsaInput(e.target.value)}
              style={{ height: '80px' }} 
              placeholder="Cole aqui a chave para uso..."
            />
          </div>
        </div>
      )}

      <div className="algoritmos-menu">
        {Object.keys(titulos).map((key) => (
          <button 
            key={key} 
            className={algoritmo === key ? 'active' : ''}
            onClick={() => { 
              setAlgoritmo(key); 
              setOutputText(''); 
            }}
          >
            {titulos[key]}
          </button>
        ))}
      </div>
    </main>
  );
}