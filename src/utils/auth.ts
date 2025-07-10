// User storage key
const USERS_KEY = 'expenseTrackerUsers';

export const registerUser = (username: string, password: string): boolean => {
  const users = getUsersFromStorage();
  if (users.find((u) => u.username === username)) {
    return false; // Username already exists
  }
  users.push({ username, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
};

export const authenticateUser = (username: string, password: string): boolean => {
  const users = getUsersFromStorage();
  return users.some((u) => u.username === username && u.password === password);
};

export const getUsersFromStorage = (): { username: string; password: string }[] => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getUserFromStorage = (): { username: string; isAuthenticated: boolean } | null => {
  const stored = localStorage.getItem('expenseTrackerUser');
  return stored ? JSON.parse(stored) : null;
};

export const saveUserToStorage = (user: { username: string; isAuthenticated: boolean }): void => {
  localStorage.setItem('expenseTrackerUser', JSON.stringify(user));
};

export const clearUserFromStorage = (): void => {
  localStorage.removeItem('expenseTrackerUser');
};