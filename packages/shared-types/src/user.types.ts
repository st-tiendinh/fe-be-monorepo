/**
 * User interface
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User role enum
 */
export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

/**
 * Auth credentials
 */
export interface AuthCredentials {
  email: string;
  password: string;
}

/**
 * Auth response
 */
export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}
