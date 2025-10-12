import { baseUrl } from "./config";

export const getProblems = () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(`${baseUrl}/problems/`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);

      return result;
    })
    .catch((error) => console.error(error));
};

export const getProblemsDetails = (slug) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYyNjk0MTQ4LCJpYXQiOjE3NjAxMDIxNDgsImp0aSI6IjhmNTEwOGFhZjQzNjQ5ODJhNGE0NGM5MmQ0MTdiZWUwIiwidXNlcl9pZCI6M30.WO_IXoo-p54AuG6Vp8mlh5vwUj9PJI7QBFRgT-36QKA"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(`${baseUrl}/problems/${slug}/`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);
      return result;
    })
    .catch((error) => console.error(error));
};


export const getMasala = (id) => {
   if (!id) return null;
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYyODg1NzM5LCJpYXQiOjE3NjAyOTM3MzksImp0aSI6IjQ5YWM1ZTk5YmExOTQzMmNhN2EwNWI1ZjVlNzI1YTQwIiwidXNlcl9pZCI6NX0.Er81eqIFVcBJIGer064NVv7Joa9Ju0kk2n5Jzd3-lN4"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(`${baseUrl}/submissions/template/${id}/`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);
      return result;
    })
    .catch((error) => console.error(error));
};
