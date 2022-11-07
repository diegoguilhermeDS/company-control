import { eventButtonDesabled } from "../../scripts/eventButtons.js";
import { eventShowMenu } from "../../scripts/showMenu.js";

eventShowMenu()

let select = document.querySelector("select")
select.classList.add("select-selected")

select.addEventListener("change", () => {
    if (select.value != 0) {
        select.classList.remove("select-selected")
        select.classList.add("font-5-bold", "brand-2")
    } else if (select.value == 0) {
        select.classList.remove("font-5-bold", "brand-2")
        select.classList.add("select-selected")
    }
})

eventButtonDesabled("register")