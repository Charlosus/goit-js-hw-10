import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const delayInput = document.querySelector("input[name='delay']");
const button = document.querySelector("button")
const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const delay = delayInput.value;
    const state = form.elements.state.value
    createPromise(delay, state)
        .then((d) => fulfillAlert(`✅ Fulfilled promise in ${d}ms`))
        .catch((d) => rejectAlert(`❌ Rejected promise in ${d}ms`))
})

window.fulfillAlert = function(message) {
  iziToast.show({
    message: message,
    position: 'topRight',
    backgroundColor: "#5bf05e",
  });
};
window.rejectAlert = function(message) {
  iziToast.show({
    message: message,
    position: 'topLeft',
    messageColor: "#ffffff",
    backgroundColor: "#d15858",
  });
}
const createPromise = (delay, state) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            state === 'fulfilled' ? resolve(delay): reject(delay)
            }, delay)
    })
}