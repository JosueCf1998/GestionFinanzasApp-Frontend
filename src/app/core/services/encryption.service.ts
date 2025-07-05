import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class EncryptionService {
  /*
  private secretKey: string = '$#Gre1410';
  private clave = CryptoJS.enc.Utf8.parse("ClaveSecreta32Bytes_123456789012"); // 32 bytes
  private iv = CryptoJS.enc.Utf8.parse("VectorInicial16B"); // 16 bytes

  encrypt(data: string): string {
    const encryptedData = CryptoJS.AES.encrypt(data, this.clave,
    { iv: this.iv }).toString();
    return encryptedData;
  }

  decrypt(encryptedData: string): string {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, this.secretKey).toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  */
  encrypt(data: string): string {
    const encryptedData = AesEncryptor.encrypt("Datos confidenciales", "TuClaveSuperSecreta@2024");
    return encryptedData;
  }
}

class AesEncryptor {
  private static readonly KEY_SIZE = 256;
  private static readonly ITERATIONS = 10000;
  private static readonly SALT_SIZE = 128 / 8;
  private static readonly IV_SIZE = 128 / 8;

  private static getKeyAndIV(password: string, salt: CryptoJS.lib.WordArray) {
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: this.KEY_SIZE / 32,
      iterations: this.ITERATIONS,
      hasher: CryptoJS.algo.SHA256
    });
    const iv = CryptoJS.lib.WordArray.random(this.IV_SIZE);
    return { key, iv };
  }

  public static encrypt(data: string, password: string): string {
    try {
      const salt = CryptoJS.lib.WordArray.random(this.SALT_SIZE);
      const { key, iv } = this.getKeyAndIV(password, salt);
      
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
}