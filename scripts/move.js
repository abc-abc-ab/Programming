((d, t)=>{
    d.head.insertAdjacentHTML("beforeend", `<style></style>`);
    const div = d.querySelector("div"),
    style = d.querySelector("style");

    style.textContent = `div{
    transform: translate(45deg)
}`;
})(document, window)