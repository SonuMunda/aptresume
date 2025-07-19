import bcrypt from "bcryptjs";
import prisma from "../prisma";

const authenticateUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password is incorrect");
  }

  if (!user.emailVerified) {
    return {
      unverified: true,
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export default authenticateUser;
