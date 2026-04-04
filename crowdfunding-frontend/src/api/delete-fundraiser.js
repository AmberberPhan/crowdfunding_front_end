async function deleteFundraiser(fundraiserId) {
  const token = window.localStorage.getItem("token");
  const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}/`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    const fallbackError = "Error deleting fundraiser";

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage =
      data?.detail ||
      data?.non_field_errors?.[0] ||
      fallbackError;

    throw new Error(errorMessage);
  }
}

export default deleteFundraiser;
