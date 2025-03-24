const BASE_URL = "https://blog-backend-fk4s.onrender.com/api";

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(url, { 
    ...options,
    headers,
    credentials: options.credentials || "include"
  });

  if (res.status === 401) {
    console.error("Unauthorized: Token expired or invalid");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login"; 
    return;
  }

  // For login/register we need to allow non-ok responses to be handled by the caller
  if (url.includes('/auth/login') || url.includes('/auth/register')) {
    return res;
  }

  if (!res.ok) {
    try {
      const errorData = await res.json();
      throw new Error(errorData.error || "Request failed");
    } catch (e) {
      throw new Error("Request failed");
    }
  }

  return res.json();
};

export const login = async (username, password) => {
  const res = await fetchWithAuth(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Incorrect username or password");

  const data = await res.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const register = async (username, email, password, confirmPassword) => {
  const res = await fetchWithAuth(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
      confirmPassword,
      role: "USER", // Changed to USER to match first file
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.errors) {
      const error = new Error("Validation error");
      error.response = { data };
      throw error;
    }
    throw new Error(data.error || "Registration failed");
  }

  return data;
};

export const fetchPosts = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    return fetchWithAuth(`${BASE_URL}/posts`, { method: "GET" });
  } else {
    return fetchWithAuth(`${BASE_URL}/public/posts`, { 
      method: "GET",
      credentials: "omit" // No need for credentials for public endpoints
    });
  }
};

export const fetchPostById = async (postId) => {
  const token = localStorage.getItem("token");
  if (token) {
    return fetchWithAuth(`${BASE_URL}/posts/${postId}`, { method: "GET" });
  } else {
    return fetchWithAuth(`${BASE_URL}/public/posts/${postId}`, { 
      method: "GET",
      credentials: "omit"
    });
  }
};

export const createPost = async (title, content, published) => {
  return fetchWithAuth(`${BASE_URL}/posts`, {
    method: "POST",
    body: JSON.stringify({ title, content, published }),
  });
};

export const editPost = async (id, title, content, published) => {
  return fetchWithAuth(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content, published }),
  });
};

export const updatePostStatus = async (id, published) => {
  return fetchWithAuth(`${BASE_URL}/posts/${id}/publish`, {
    method: "PATCH",
    body: JSON.stringify({ published }),
  });
};

export const deletePost = async (id) => {
  return fetchWithAuth(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });
};

export const fetchComments = async (postId) => {
  const token = localStorage.getItem("token");
  if (token) {
    return fetchWithAuth(`${BASE_URL}/public/posts/${postId}/comments`, { method: "GET" });
  } else {
    return fetchWithAuth(`${BASE_URL}/comments/${postId}`, { 
      method: "GET",
      credentials: "omit"
    });
  }
};

export const createComment = async (postId, content) => {
  return fetchWithAuth(`${BASE_URL}/comments/${postId}`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};

export const editComment = async (id, content) => {
  return fetchWithAuth(`${BASE_URL}/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({ content }),
  });
};

export const deleteComment = async (id) => {
  return fetchWithAuth(`${BASE_URL}/comments/${id}`, {
    method: "DELETE",
  });
};

export const logout = async () => {
  try {
    await fetchWithAuth(`${BASE_URL}/auth/logout`, {
      method: "POST",
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};