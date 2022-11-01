function eventShowMenu() {
    const btnMenu = document.querySelector(".button-menu-icon")
    const formHomePage = document.querySelector(".nav-header")

    let img = btnMenu.children[0]

    btnMenu.addEventListener("click", () => {
        formHomePage.classList.toggle("nav-show")

        if (btnMenu.id == "show") {
            btnMenu.id = "close"
            img.src = "/src/assets/img/Vector (4).png"

        } else if(btnMenu.id == "close") {
            btnMenu.id = "show"
            img.src = "/src/assets/img/Vector.png"
        }
    })
}

export default eventShowMenu

