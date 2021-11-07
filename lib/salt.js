import bcrypt from "bcrypt";

export const generateSalt = (saltRounds) =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (saltError, salt) => {
      if (saltError) {
        reject(saltError);
      } else {
        resolve(salt);
      }
    });
  });

export const generateHash = async (password) => {
  const salt = await generateSalt(10);
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (hashError, hash) => {
      if (hashError) {
        reject(hashError);
      } else {
        resolve(hash);
      }
    });
  });
};
