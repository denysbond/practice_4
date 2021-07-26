export default function showDialog(dialogEl) {
  $(dialogEl).modal("show");

  return new Promise(function (resolve, reject) {
    dialogEl.addEventListener("click", (e) => {
      let target = e.target;
      if (target.classList.contains("yes")) {
        return resolve();
      } else if (target.classList.contains("no")) {
        return reject();
      }
    });
  });
}
