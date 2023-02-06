//console.log("env=========================", process.env.NEXT_PUBLIC_APP_HEROKU)
//const {NEXT_PUBLIC_APP_HEROKU} = process.env;

const API_URL = process.env.NEXT_PUBLIC_APP_HEROKU || "http://localhost:1337";
export const callApi = async ({path, method = 'GET', body, jsonContentType = true}) => {
  const token = localStorage.getItem('token')
  const getContentType = () => {
    if (jsonContentType) {
      return {"content-type": "application/json"}
    }
    return {}
  }
  const getHeaders = () => {
    if (token) {
      return {
        ...getContentType(),
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    } else {
      return getContentType()
    }
  }

  const response = await fetch(`${API_URL}/api${path}?populate=*`, {
    method,
    headers: getHeaders(),
    credentials: "include",
    body: jsonContentType ? JSON.stringify(body): body,
  })
  const data = await response.json();

  return data;
}


export const callApis = async ({path, method = 'GET'}) => {
  
  const response = await fetch(`${API_URL}/api${path}?populate=*`, {
    method,
  })
  const data = await response.json();

  return data;
}
