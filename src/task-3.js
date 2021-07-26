// Напишите функцию getSeries(url1, url2) которая принимает на вход два url. Вначале она вызывает с помощью getJSON первый url.
//  Если запрос выполнился удачно, то вызывается второй url.

// Функция возвращает промис, который разрешится с массивом из обоих полученных значений.
// Например, если первый вызов вернул "article content", а второй "comments", то результат должен выглядеть как
//  ["article content", "comments"].

// Кроме того, если первый вызов получит отказ, промис должен быть отклонен со значением Error("First fetch failed"),
// если второй - отклонен со значением Error("Second fetch failed").

import { getJSON } from "./task-1.js";

export default function getSeries(url1, url2) {
  return Promise.all([
    getJSON(url1).catch(() => Promise.reject(new Error("First fetch failed"))),
    getJSON(url2).catch(() => Promise.reject(new Error("Second fetch failed"))),
  ]);
}
