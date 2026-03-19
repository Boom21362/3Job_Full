'use server'
import { redirect } from "next/navigation";

export async function registerAction(formData: FormData) {

  const name = formData.get("name");
  const tel = formData.get("tel");
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch("https://3-job-back-end.vercel.app/api/v1/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      telephone_number: tel,
      email,
      password,
      role: "user"
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Backend Error:", errorData.message);
    return { error: errorData.message || "Registration failed" };
  }

  redirect("/auth/signin");
}