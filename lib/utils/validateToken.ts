import jwt from "jsonwebtoken";

const validateToken = (token: string) => {
  try {
    jwt.verify(token, process.env.NEXTAUTH_SECRET as string);
    return {
      validated: true,
      message: "Success",
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        return {
          validated: false,
          message: "Token Expired",
        };
      } else {
        return {
          validated: false,
          message: "Invalid Token",
        };
      }
    }
    return {
      validated: false,
      message: "Token Error",
    };
  }
};

export default validateToken;
