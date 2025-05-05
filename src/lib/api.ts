const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
}

export async function get<T = unknown>(path: string): Promise<T> {
  const token = getToken();
  console.log("Using token:", token); // <-- log this

  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API Error Response:", errorText);
    throw new Error("API request failed");
  }

  return res.json();
}

export async function post<TRequest, TResponse>(path: string, body: TRequest): Promise<TResponse> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("API request failed");
  return res.json();
}

export async function put<TRequest, TResponse>(path: string, body: TRequest): Promise<TResponse> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("PUT Error:", errorText);
    throw new Error("PUT request failed");
  }

  return res.json();
}

export async function destroy(path: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("DELETE Error:", errorText);
    throw new Error("DELETE request failed");
  }

  return res.ok;
}
