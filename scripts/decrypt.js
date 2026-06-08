#!/usr/bin/env node
const CryptoJS = require('crypto-js');

const SECRET_KEY = 'TuClaveSuperSecreta@2024';
const KEY_SIZE = 256;
const ITERATIONS = 10000;
const SALT_SIZE = 128 / 8; // 16 bytes
const IV_SIZE = 128 / 8; // 16 bytes

function getKey(password, salt) {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: KEY_SIZE / 32,
    iterations: ITERATIONS,
    hasher: CryptoJS.algo.SHA256,
  });
}

function decrypt(encryptedData, password) {
  if (!encryptedData || encryptedData.length <= 48) {
    throw new Error('Encrypted string too short');
  }

  // salt and iv were concatenated as Base64 strings of 16 bytes each => 24 chars each
  const saltB64 = encryptedData.substr(0, 24);
  const ivB64 = encryptedData.substr(24, 24);
  const ciphertext = encryptedData.substr(48);

  const salt = CryptoJS.enc.Base64.parse(saltB64);
  const iv = CryptoJS.enc.Base64.parse(ivB64);
  const key = getKey(password, salt);

  const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  const plain = decrypted.toString(CryptoJS.enc.Utf8);
  if (!plain) throw new Error('Failed to decrypt or empty result');
  return plain;
}

function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Uso: node scripts/decrypt.js "<encriptado>"');
    process.exit(1);
  }

  try {
    const result = decrypt(arg, SECRET_KEY);
    console.log(result);
  } catch (err) {
    console.error('Error al desencriptar:', err.message || err);
    process.exit(2);
  }
}

if (require.main === module) main();
