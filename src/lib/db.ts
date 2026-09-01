import bcrypt from "bcryptjs";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

// In-memory mock database
// In a real application, this would be a database like PostgreSQL or MongoDB
const users: User[] = [];

export async function createUser(email: string, password: string, name: string): Promise<User> {
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    password: hashedPassword,
    name,
  };

  users.push(newUser);
  return newUser;
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  return users.find((u) => u.email === email);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}