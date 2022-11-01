import eventShowMenu from "../../scripts/showMenu.js";

eventShowMenu()

let select = document.querySelector("select")
select.classList.add("select-selected")

select.addEventListener("change", () => {
    if (select.value != 0) {
        select.classList.remove("select-selected")
    } else if (select.value == 0) {
        select.classList.add("select-selected")
    }
})