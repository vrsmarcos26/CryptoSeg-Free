import CryptoJS from 'crypto-js';

// ===== Cifra de César =====
export const criptografarCesar = (texto, deslocamento = 5) => {
  // Converte para número e garante que funcione mesmo se o número for maior que 26
  const shift = Number(deslocamento) % 26; 
  return texto.replace(/[a-z]/gi, letra => {
    const base = letra === letra.toUpperCase() ? 65 : 97;
    // Adicionamos +26 antes do módulo final para evitar resultados negativos no JavaScript
    return String.fromCharCode((((letra.charCodeAt(0) - base + shift) % 26) + 26) % 26 + base);
  });
};

export const descriptografarCesar = (texto, deslocamento = 5) => {
  const shift = Number(deslocamento) % 26;
  return texto.replace(/[a-z]/gi, letra => {
    const base = letra === letra.toUpperCase() ? 65 : 97;
    return String.fromCharCode((((letra.charCodeAt(0) - base - shift) % 26) + 26) % 26 + base);
  });
};

// ===== Vigenère =====
export const criptografarVigenere = (texto, chave) => {
  if(!chave) chave = "segredo";
  let r = "", j = 0;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (/[a-zA-Z]/.test(c)) {
      const base = c === c.toUpperCase() ? 65 : 97;
      const k = chave.charCodeAt(j % chave.length) - base;
      r += String.fromCharCode((c.charCodeAt(0) - base + k + 26) % 26 + base);
      j++;
    } else r += c;
  }
  return r;
};

export const descriptografarVigenere = (texto, chave) => {
  if(!chave) chave = "segredo";
  let r = "", j = 0;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (/[a-zA-Z]/.test(c)) {
      const base = c === c.toUpperCase() ? 65 : 97;
      const k = chave.charCodeAt(j % chave.length) - base;
      r += String.fromCharCode((c.charCodeAt(0) - base - k + 26) % 26 + base);
      j++;
    } else r += c;
  }
  return r;
};

// ===== Hashes (CryptoJS) =====
export const gerarMD5 = (texto) => CryptoJS.MD5(texto).toString(CryptoJS.enc.Hex);
export const gerarSHA1 = (texto) => CryptoJS.SHA1(texto).toString(CryptoJS.enc.Hex);
export const gerarSHA256 = (texto) => CryptoJS.SHA256(texto).toString(CryptoJS.enc.Hex);
export const gerarSHA512 = (texto) => CryptoJS.SHA512(texto).toString(CryptoJS.enc.Hex);

// ===== Conversões =====
export const textoParaBinario = (texto) => texto.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
export const binarioParaTexto = (bin) => bin.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
export const textoParaHexadecimal = (texto) => texto.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
export const hexadecimalParaTexto = (hex) => {
  let r = '';
  for (let i = 0; i < hex.length; i += 2) r += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return r;
};

// ===== AES (Web Crypto API) =====
export const criptografarAES = async (texto, senha) => {
  if(!senha) senha = "segredo";
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(senha.padEnd(16, "_")), { name: "AES-CBC" }, false, ["encrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const encrypted = await crypto.subtle.encrypt({ name: "AES-CBC", iv }, key, enc.encode(texto));
  return btoa(String.fromCharCode(...iv) + String.fromCharCode(...new Uint8Array(encrypted)));
};

export const descriptografarAES = async (texto, senha) => {
  if(!senha) senha = "segredo";
  try {
    const bin = atob(texto);
    const iv = new Uint8Array([...bin].slice(0, 16).map(c => c.charCodeAt(0)));
    const data = new Uint8Array([...bin].slice(16).map(c => c.charCodeAt(0)));
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(senha.padEnd(16, "_")), { name: "AES-CBC" }, false, ["decrypt"]);
    const decrypted = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
    return new TextDecoder().decode(decrypted);
  } catch {
    return "Erro ao descriptografar AES. Senha incorreta ou texto inválido.";
  }
};

// ===== RSA (Web Crypto API) =====
export const gerarChavesRSA = async () => {
  const rsaKeys = await crypto.subtle.generateKey(
    { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
    true,
    ["encrypt", "decrypt"]
  );
  const pubKey = await crypto.subtle.exportKey("spki", rsaKeys.publicKey);
  const privKey = await crypto.subtle.exportKey("pkcs8", rsaKeys.privateKey);
  
  return {
    publica: btoa(String.fromCharCode(...new Uint8Array(pubKey))),
    privada: btoa(String.fromCharCode(...new Uint8Array(privKey)))
  };
};

export const criptografarRSA = async (texto, chaveBase64) => {
  try {
    const binary = Uint8Array.from(atob(chaveBase64), c => c.charCodeAt(0));
    const key = await crypto.subtle.importKey("spki", binary, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"]);
    const cifrado = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, key, new TextEncoder().encode(texto));
    return btoa(String.fromCharCode(...new Uint8Array(cifrado)));
  } catch (e) {
    return "Erro: Chave pública inválida ou texto incorreto.";
  }
};

export const descriptografarRSA = async (texto, chaveBase64) => {
  try {
    const binary = Uint8Array.from(atob(chaveBase64), c => c.charCodeAt(0));
    const key = await crypto.subtle.importKey("pkcs8", binary, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["decrypt"]);
    const bin = Uint8Array.from(atob(texto), c => c.charCodeAt(0));
    const decifrado = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, key, bin);
    return new TextDecoder().decode(decifrado);
  } catch (e) {
    return "Erro ao descriptografar RSA. Chave privada inválida ou texto incorreto.";
  }
};
