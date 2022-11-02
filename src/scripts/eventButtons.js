import { login } from "./api.js"

export function eventButtonDesabled() {
    const formLogin = document.querySelector("form")
    const elements = [...formLogin.elements]
    const buttonLogin = elements[2]

    elements.forEach(elem => {
        if (elem.tagName == "INPUT") {
            elem.addEventListener("keydown", () => {
                if (elements[0].value !== "" && elements[1].value !== '') {
                    buttonLogin.disabled = false
                }
            })
        }
    })

    eventLogin(formLogin, elements)
}

function eventLogin(form, elements) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const body = {}

        elements.forEach((element) => {
            if (element.tagName == "INPUT" && element.value !== "") {
                body[element.id] = element.value
            }

            element.value = ''
        })

        
        elements[2].innerHTML = `
        <img class="icon-search" src="/src/assets/img/spinner.png" alt="icone de procura">
        `
        setTimeout(() => {
            elements[2].innerHTML = "Login"
            elements[2].disabled = true
        }, 3000)
        
        await login(body)
    })
}