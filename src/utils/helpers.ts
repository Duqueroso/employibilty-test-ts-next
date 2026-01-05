type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export function isAlive(status: CharacterStatus): boolean {
  return status === 'Alive';
}

// Usuario hardcodeado para validación
const VALID_USER = {
  email: 'rick@sanchez.com',
  password: 'wubba123'
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export function validateUser(credentials: LoginCredentials): boolean {
  return credentials.email === VALID_USER.email && 
         credentials.password === VALID_USER.password;
}
