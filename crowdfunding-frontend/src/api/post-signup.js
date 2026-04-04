async function postSignup(username, email, password) {
  const url = `${import.meta.env.VITE_API_URL}/users/`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    const fallbackError = "Error creating account";

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage =
      data?.detail ||
      data?.non_field_errors?.[0] ||
      data?.username?.[0] ||
      data?.email?.[0] ||
      data?.password?.[0] ||
      fallbackError;

    throw new Error(errorMessage);
  }

  return await response.json();
}

export default postSignup;