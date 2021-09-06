import axios from 'axios';

const url = "https://todoapp.microcms.io/api/v1/tasks";
const apiKey = "f7c56759-963c-4bfe-971d-bccf2a334220";
const apiWriteKey = "77d88407-5a2c-42f0-bcff-9e40f60a1ba6";

export function ApiGet() {
  axios.get(url, {
    headers: {
      "X-API-KEY": apiKey
    }
  })
  .then(res => (res.data.contents))
  .catch((e) => {
    if (e.response !== undefined) {
      // e.response.dataはanyになる
      return [{ id: null, title: null, comment: null}]
    }
  });
}

export const fetchData = () => {
  const result = axios.get(url, {
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json" 
    },
    params: {
      "orders": "displayOrder"
    }
  })
  .then(res => (res.data.contents))
  .catch((e) => {
    if (e.response !== undefined) {
      return [{ id: null, title: null, comment: null}]
    }
  });

  return result
}

export const postData = (index:number, title:string) => {
  // const current_url = [url, id].join('/');
  const result = axios.post(url, {
    "displayOrder": index + 1,
    "title": title
  }, {
    headers: {
      "X-WRITE-API-KEY": apiWriteKey
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((e) => {
    if (e.response !== undefined) {
      return [{ id: null, title: null, comment: null}]
    }
  });

  return result
}

export const patchData = (id:string, index:number) => {
  const current_url = [url, id].join('/');
  const result = axios.patch(current_url, {
    "displayOrder": index + 1
  }, {
    headers: {
      "X-WRITE-API-KEY": apiWriteKey
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((e) => {
    if (e.response !== undefined) {
      return [{ id: null, title: null, comment: null}]
    }
  });

  return result
}

export const deleteData = (id:string) => {
  const current_url = [url, id].join('/');
  const result = axios.delete(current_url, {
    headers: {
      "X-WRITE-API-KEY": apiWriteKey
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((e) => {
    if (e.response !== undefined) {
      return [{ id: null, title: null, comment: null}]
    }
  });

  return result
}

export default ApiGet;
