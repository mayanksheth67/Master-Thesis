
const text = 'Write a sparql query for all users from "Germany" who speak "Latin"';
const fetch = require("node-fetch");
export function generateText(text, callback) {
  const url = "https://api.deepai.org/api/text-generator";
  const payload = {
    'text': text
  };
  const headers = {
    'api-key': '24afa8ea-3019-49fd-b0d9-d6059848da40'
  };

  fetch(url, {
    method: 'POST',
    body: new URLSearchParams(payload),
    headers: headers
  })
    .then(response => response.json())
    .then(data => {
      const output = data['output'];
      callback(output);
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}