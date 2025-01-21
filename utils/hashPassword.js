import bcrypt from 'bcrypt';

const saltRounds = parseInt(process.env.SALT_ROUND);

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error in hashPassword function:", error);
    throw error;
  }
};