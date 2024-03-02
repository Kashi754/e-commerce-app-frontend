export async function getApi(url, rejectWithValue) {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    if (rejectWithValue) {
      return rejectWithValue(error);
    } else {
      const err = new Error(error.message);
      err.status = response.status;
      throw err;
    }
  }
  const data = await response.json();
  return data;
}

export async function postApi(url, body, rejectWithValue) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    if (rejectWithValue) {
      return rejectWithValue(error);
    } else {
      const err = new Error(error.message);
      err.status = response.status;
      throw err;
    }
  }
  const data = await response.json();
  return data;
}

export async function postFormApi(url, formData, rejectWithValue) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    if (rejectWithValue) {
      return rejectWithValue(error);
    } else {
      const err = new Error(error.message);
      err.status = response.status;
      throw err;
    }
  }
  const data = await response.json();
  return data;
}

export async function putApi(url, body, rejectWithValue) {
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    if (rejectWithValue) {
      return rejectWithValue(error);
    } else {
      const err = new Error(error.message);
      err.status = response.status;
      throw err;
    }
  }
  const data = await response.json();
  return data;
}

export async function putFormApi(url, formData, rejectWithValue) {
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    if (rejectWithValue) {
      return rejectWithValue(error);
    } else {
      const err = new Error(error.message);
      err.status = response.status;
      throw err;
    }
  }
  const data = await response.json();
  return data;
}

export async function patchApi(url, body, rejectWithValue) {
  const response = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    if (rejectWithValue) {
      return rejectWithValue(error);
    } else {
      const err = new Error(error.message);
      err.status = response.status;
      throw err;
    }
  }
  const data = await response.json();
  return { data };
}

export async function deleteApi(url, rejectWithValue) {
  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    if (rejectWithValue) {
      return rejectWithValue(error);
    } else {
      const err = new Error(error.message);
      err.status = response.status;
      throw err;
    }
  }
  const data = await response.json();
  return data;
}
