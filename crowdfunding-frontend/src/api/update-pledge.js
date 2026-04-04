async function updatePledge(pledgeId, comment, anonymous) {
  const token = window.localStorage.getItem("token");
  const url = `${import.meta.env.VITE_API_URL}/pledges/${pledgeId}/`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      comment: comment,
      anonymous: anonymous,
    }),
  });

  if (!response.ok) {
    const fallbackError = "Error updating pledge";

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage =
      data?.detail ||
      data?.non_field_errors?.[0] ||
      data?.comment?.[0] ||
      fallbackError;

    throw new Error(errorMessage);
  }

  return await response.json();
}

export default updatePledge;