import { login } from "./api.js"

export function eventButtonDesabledLogin() {
    const form = document.querySelector("form")
    const elements = [...form.elements]
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

    eventLogin(form, elements)
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
        
        await login(body, elements[2])
    })
}


export function eventButtonDesabledRegister() {
    const form = document.querySelector("form")
    const elements = [...form.elements]
    const button = elements.find((elem) => elem.tagName == "BUTTON")

    elements.forEach(elem => {
        if (elem.tagName == "INPUT") {
            elem.addEventListener("keydown", () => {
                if (elements[0].value !== "" && elements[1].value !== '' && elements[2].value !== '') {
                    button.disabled = false
                }
            })
        }
    })
}