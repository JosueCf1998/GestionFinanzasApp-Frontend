import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class EncryptionService {

  private readonly secretKey = "TuClaveSuperSecreta@2024";

  encrypt(data: string): string {
    return AesEncryptor.encrypt(data, this.secretKey);
  }

  decrypt(encryptedData: string): string {
    return AesEncryptor.decrypt(encryptedData, this.secretKey);
  }
}

class AesEncryptor {
  private static readonly KEY_SIZE = 256;
  private static readonly ITERATIONS = 10000;
  private static readonly SALT_SIZE = 128 / 8;
  private static readonly IV_SIZE = 128 / 8;

  private static getKeyAndIV(password: string, salt: CryptoJS.lib.WordArray, iv?: CryptoJS.lib.WordArray) {
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: this.KEY_SIZE / 32,
      iterations: this.ITERATIONS,
      hasher: CryptoJS.algo.SHA256
    });
    return { key, iv };
  }

  public static encrypt(data: string, password: string): string {
    try {
      const salt = CryptoJS.lib.WordArray.random(this.SALT_SIZE);
      const iv = CryptoJS.lib.WordArray.random(this.IV_SIZE);
      const { key } = this.getKeyAndIV(password, salt, iv);

      const encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
      });

      // Formato: salt (Base64) + iv (Base64) + ciphertext (Base64)
      return salt.toString(CryptoJS.enc.Base64) +
             iv.toString(CryptoJS.enc.Base64) +
             encrypted.toString();
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  public static decrypt(encryptedData: string, password: string): string {
    try {
      // Extraer salt, iv y ciphertext del string
      const saltB64 = encryptedData.substr(0, 24);
      const ivB64 = encryptedData.substr(24, 24);
      const ciphertext = encryptedData.substr(48);

      const salt = CryptoJS.enc.Base64.parse(saltB64);
      const iv = CryptoJS.enc.Base64.parse(ivB64);
      const { key } = this.getKeyAndIV(password, salt, iv);

      const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
      });

      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  }
}