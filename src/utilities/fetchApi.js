export async function getApi(url) {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include'
  });

  if(!response.ok) {
      const error = await response.json()
      throw error;
  }
  const data = await response.json();
  return data;
}

export async function postApi(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })

  if(!response.ok) {
    const error = await response.json()
    throw error;
  }
  const data = await response.json();
  return data;
}

export async function putApi(url, body) {
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })

  if(!response.ok) {
    const error = await response.json();
    throw error;
  }
  const data = await response.json();
  return data;
}

export async function deleteApi(url) {
  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'include'
  })

  if(!response.ok) {
    const error = await response.json();
    throw error
  }
  const data = await response.json();
  return data;
}