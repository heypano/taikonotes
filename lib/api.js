export const get = async (url) => {
  let result;
  try {
    const response = await fetch(url).then((r) => {
      if (r.status >= 400 && r.status < 600) {
        throw new Error("Bad response from server");
      }
      return r;
    });
    if (response) {
      result = response.json();
    }
  } catch (e) {
    result = e;
  }
  return result;
};

export const post = async (url, data) => {
  let result;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    }).then((r) => {
      if (r.status >= 400 && r.status < 600) {
        throw new Error("Bad response from server");
      }
      return r;
    });
    if (response) {
      result = response.json();
    }
  } catch (e) {
    result = e;
  }
  return result;
};
