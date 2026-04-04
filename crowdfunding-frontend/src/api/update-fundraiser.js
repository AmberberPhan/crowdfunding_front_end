async function updateFundraiser(
  fundraiserId,
  title,
  description,
  image,
  goal,
  isOpen
) {
  const token = window.localStorage.getItem("token");
  const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}/`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      title: title,
      description: description,
      image: image,
      goal: Number(goal),
      is_open: isOpen,
    }),
  });

  if (!response.ok) {
    const fallbackError = "Error updating fundraiser";

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage =
      data?.detail ||
      data?.non_field_errors?.[0] ||
      data?.title?.[0] ||
      data?.description?.[0] ||
      data?.goal?.[0] ||
      fallbackError;

    throw new Error(errorMessage);
  }

  return await response.json();
}

export default updateFundraiser;