import { getJSON } from "./task-1.js";

export default function getSequential(urls) {
  let result = [];
  return new Promise(function (resolve, reject) {
    urls.forEach((url) => {
      getJSON(url)
        .then((response) => {
          result.push(response);
          if (result.length === urls.length) {
            resolve(result);
          }
        })
        .catch(() => reject(new Error(`failed to fetch ${url}`)));
    });
  });
}
