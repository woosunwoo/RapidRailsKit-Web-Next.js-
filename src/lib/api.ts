const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
}

export async function get(path: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("API request failed");
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
