
const text = 'Write a sparql query for all users from "Germany" who speak "Latin" using prefix wsdbm';
//const fetch = require("node-fetch");
export function generateText(text) {
  const url = "https://api.deepai.org/api/text-generator";
  const payload = {
    'text': text
  };
  const headers = {
    'api-key': '24afa8ea-3019-49fd-b0d9-d6059848da40'
  };

  // Wrap the fetch operation with a Promise
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      body: new URLSearchParams(payload),
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        const output = data['output'];
        resolve(output); // Resolve the Promise with the output data
      })
      .catch(error => {
        console.error(error);
        reject(error); // Reject the Promise with the error
      });
  });
}