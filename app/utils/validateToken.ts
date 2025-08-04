import jwt from "jsonwebtoken";

const validateToken = (token: string) => {
  jwt.verify(token, process.env.NEXTAUTH_SECRET as string, function (err) {
    if (err) {
      if (err.name === "TokenExpiredError") {
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
      validated: true,
      message: "Success",
    };
  });
};

export default validateToken;
