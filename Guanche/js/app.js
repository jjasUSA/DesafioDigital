let btn = document.querySelector(".btn");
let item = document.querySelector(".box");

btn.addEventListener('click', (e) => {
    item.classList.toggle('animate');
    item.addEventListener('animationend', animationEndCallback);
});

let animationEndCallback = (e) => {
    item.removeEventListener('animationend', animationEndCallback);
    item.classList.remove('animate');
}