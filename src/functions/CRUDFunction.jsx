const url = process.env.REACT_APP_URL;
const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");
export const getFunction = async (endp) => {
  try {
    const response = token ? await fetch(url + endp, { headers: { Authorization: "Bearer " + token } }) : await fetch(url + endp);
    if (response.ok) {
      return await response.json();
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
};

export const postFunction = async (endp, data) => {
  try {
    const response = await fetch(url + endp, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      return response.status === 400 ? await response.text() : await response.text();
    }
  } catch (error) {
    console.log(error);
  }
};

export const putFunction = async (endp, data) => {
  try {
    const response = await fetch(url + endp, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      return response.status === 400 ? await response.json() : await response.text();
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteFunction = async (endp) => {
  try {
    const response = await fetch(url + endp, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.log(await response.text());
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
