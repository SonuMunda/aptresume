import jwt from "jsonwebtoken";

const generateToken = (userId: string, email: string, rememberMe: boolean) => {
  const token = jwt.sign(
    {
      userId,
      email,
      rememberMe,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: rememberMe ? "30d" : "1h",
    }
  );
  return token;
};

export default generateToken;
