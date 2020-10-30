import 'dotenv/config';
import crypto from 'crypto';

const [algorithm, hex, iv, key, utf8] = [
  'aes-256-cbc',
  'hex',
  process.env.MY_IV,
  process.env.MY_SECRET_KEY,
  'utf-8',
];

const encrypt = message => {
  let cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(message, utf8, hex);
  encrypted += cipher.final(hex);

  return encrypted;
};

const decrypt = encrypted => {
  let decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encrypted, hex, utf8);
  decrypted += decipher.final(utf8);

  return decrypted;
};

export { encrypt, decrypt };
