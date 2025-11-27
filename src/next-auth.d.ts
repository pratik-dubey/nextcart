// since predefined User interface in next-auth in which under callbacks  and in where in user of jwt , the user is using User interface of next auth which only have id, name, and password by default so we have to add role: string also so that ts does not give error

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
}

export {};
