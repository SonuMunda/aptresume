import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

const getUserFromToken = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as JwtPayload;
    return decoded.userId;
  } catch (error) {
    if (error) {
      return null;
    }
  }
};

export default getUserFromToken;
