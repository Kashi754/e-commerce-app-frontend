export async function getApi(url) {
  try {
    const response = await fetch(url);
    if(!response.ok) {
        const error = await response.json()
        const message = `STATUS ${response.status}\nAn error has occured: ${error.message}`;
        throw new Error(message);
    }
    const data = await response.json();
    return data;
  } catch (err){
    err.message=`STATUS 500\nAn error has occured: ${err.message}`
    throw err;
  }
}

export async function postApi(url, body) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    if(!response.ok) {
      const error = await response.json()
      const message = `STATUS ${response.status}\nAn error has occured: ${error.message}`;
      throw new Error(message);
    }
    const data = await response.json();
    return data;
  } catch(err) {
    err.message=`STATUS 500\nAn error has occured: ${err.message}`
    throw err;
  }
}

export async function putApi(url, body) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    if(!response.ok) {
      const error = await response.json();
      const message = `STATUS ${response.status}\nAn error has occured: ${error.message}`;
      throw new Error(message);
    }
    const data = await response.json();
    return data;
  } catch(err) {
    err.message=`STATUS 500\nAn error has occured: ${err.message}`;
    throw err;
  }
}

export async function deleteApi(url) {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    })

    if(!response.ok) {
      const error = await response.json();
      const message = `STATUS ${response.status}\nAn error has occured: ${error.message}`;
      throw new Error(message);
    }
  } catch(err) {
    err.message=`STATUS 500\nAn error has occured: ${err.message}`;
    throw err;
  }
}