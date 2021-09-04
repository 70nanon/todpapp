import axios from 'axios';

const url = "https://todoapp.microcms.io/api/v1/tasks";
const apiKey = "f7c56759-963c-4bfe-971d-bccf2a334220";
const apiWhiteKey = "77d88407-5a2c-42f0-bcff-9e40f60a1ba6";

function ApiGet() {
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

export default ApiGet;
