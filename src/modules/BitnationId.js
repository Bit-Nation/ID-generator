import secretkeyEncryption from 'secretkey-encryption'; // https://github.com/magician11/secretkey-encryption
import tweetnacl from 'tweetnacl'; // https://github.com/dchest/tweetnacl-js
import tweetnaclUtil from 'tweetnacl-util'; // https://github.com/dchest/tweetnacl-util-js

class BitnationId {

  // return a JSON string of the data we wish to sign later.
  getCertData(userData) {
    return {
      name: userData.name,
      dateOfBirth: userData.dob,
      height: userData.height,
      witness1: userData.witness1,
      witness2: userData.witness2
    };
  }

  generateKeypair() {
    return tweetnacl.sign.keyPair();
  }

  // Take the userData and sign it with the keypair supplied, and return a signture.
  signUserData(userData, secretKey) {
    return tweetnacl.sign.detached(this.objToUint8Array(userData), secretKey);
  }

  encryptSecretKey(secretKey, password) {
    return new Promise((resolve, reject) => {
      secretkeyEncryption.encryptSecretKey(password, secretKey)
      .then((encryptedSecretKeyBundle) => {
        resolve(encryptedSecretKeyBundle);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  // take an object, stringify it and then decode it into a Uint8Array
  objToUint8Array(obj) {
    return tweetnaclUtil.decodeUTF8(JSON.stringify(obj));
  }

  // verify the signed data with the public key
  verifySignature(userData, signature, publicKey) {
    return tweetnacl.sign.detached.verify(this.objToUint8Array(userData), signature, publicKey);
  }

  // check that if we decrypt the encryptedSecretKey, that it matches the generated secretKey
  checkEncryptedSecretKey(encryptedSecretKeyBundle, secretKey, password) {
    return new Promise((resolve, reject) => {
      secretkeyEncryption.decryptEncryptedSecretKey(password, encryptedSecretKeyBundle)
      .then((decryptedSecretKey) => {
        resolve(this.checkArrayEquality(decryptedSecretKey, secretKey));
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  // convert a Uint8Array to a Base64 string
  toBase64(uint8Array) {
    return tweetnaclUtil.encodeBase64(uint8Array);
  }

  // check to see whether two arrays are identical
  checkArrayEquality(array1, array2) {
    return array1.length === array2.length && array1.every((element, index) =>
    element === array2[index]
  );
}
}

export default new BitnationId();
