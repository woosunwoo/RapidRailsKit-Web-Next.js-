const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
}

export async function get(path: string) {
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


export async function post(path: string, body: any) {
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

export async function put(path: string, body: any) {
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

export async function del(path: string) {
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
