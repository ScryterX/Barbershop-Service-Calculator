// eslint-disable-next-line no-unused-vars
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user?: {
      id: string;
      role?: string; // Adicione esta linha
    } & DefaultSession["user"];
  }

  // eslint-disable-next-line no-unused-vars
  interface User {
    id: string;
    user_role?: string; // Adicione esta linha
  }
}
