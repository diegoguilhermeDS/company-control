function eventShowMenu() {
    const btnMenu = document.querySelector(".button-menu")
    const formHomePage = document.querySelector(".form-header")

    let img = btnMenu.children[0]

    btnMenu.addEventListener("click", () => {
        if (btnMenu.id == "show") {
            formHomePage.classList.toggle("form-show")
            formHomePage.style.animation = "0.7s showMenu ease"
            
            setTimeout(() => {
                img.src = "/src/assets/img/Vector (4).png"
                btnMenu.id = "close"
            }, 500)

        } else if(btnMenu.id == "close") {
            formHomePage.style.animation = "0.7s closeMenu ease"

            setTimeout(() => {
                formHomePage.classList.toggle("form-show")
                img.src = "/src/assets/img/Vector.png"
                btnMenu.id = "show"
                formHomePage.style.animation = "none"
            },400)
        }
    })
}

export default eventShowMenu

