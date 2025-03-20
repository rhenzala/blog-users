const BASE_URL = "http://localhost:3000/api"; // Backend URL

export const login = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return await res.json();
};

export const register = async (username, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, role: "USER" }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return await res.json();
};

export const fetchPosts = async () => {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return await res.json();
};

export const logout = async () => {
  const res = await fetch(`${BASE_URL}/auth/logout`);
  if (!res.ok) throw new Error("Something went wrong");
  return await res.json();
}
