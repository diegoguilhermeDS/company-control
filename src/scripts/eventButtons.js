import { createDepartment, deleteDepartment, deleteUser, editDepartment, editUser, login, pathInforUser, register } from "./api.js"
import { setLocalStorage } from "./LocalStorage.js"
import { createModalBase } from "./modal.js"

export function eventButtonDesabled(type) {
    const form = document.querySelector("form")
    const elements = [...form.elements]
    const button = elements.find((elem) => elem.tagName == "BUTTON")

    elements.forEach(elem => {
        if (elem.tagName == "INPUT") {
            elem.addEventListener("keydown", () => {
                if (type == 'login') {
                    if (elements[0].value !== "" && elements[1].value !== '') {
                        button.disabled = false
                    }
                } else if (type == 'register') {
                    if (elements[0].value !== "" && elements[1].value !== '' && elements[2].value !== '') {
                        button.disabled = false
                    }
                } 
            })
        }
    })

    eventSubmit(form, elements, type)
}

function eventSubmit(form, elements, type) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        let btn = elements.find((elem) => elem.tagName == "BUTTON")

        const body = {}

        elements.forEach((element) => {
            if (element.tagName == "INPUT" && element.value !== "") {
                body[element.id] = element.value
            } else if (element.tagName == "SELECT" && element.value !== '0') {
                body[element.id] = element.value
            }

            if (element.tagName == "INPUT") {
                element.value = ''
            } else {
                element.value = '0'
                element.classList.add("select-selected")
            }
        })

        btn.innerHTML = `
        <img class="icon-search" src="/src/assets/img/spinner.png" alt="icone de procura">
        `
        
        if (type == 'login') {
            await login(body, btn)
        } else if (type == 'register') {
            await register(body, btn)
        } else if (type == 'edit') {
            pathInforUser(body)
        }
    })
}


export function eventLogout() {
    const btnLogout = document.querySelector("#btn-logout")

    btnLogout.addEventListener("click", () => {
        setLocalStorage("@loginUser: token", [])

        location.replace("/src/pages/home/index.html")
    })
}

export function eventEdit() {
    const btnEdit = document.querySelector(".button-edit")

    btnEdit.addEventListener("click", () => {
        createModalBase("edit")
        eventButtonDesabled("edit")
    })
}

export function eventCloseModal() {
    const btnClose = document.querySelector(".button-close")

    btnClose.addEventListener("click", () => {
        const containerModal = document.querySelector(".container-modal")

        containerModal.remove()
    })
}


export function eventSubmitModalCreate(btn) {
    btn.addEventListener("click", (e) => {
        e.preventDefault()

        const form = document.querySelector(".form-create-modal")
        const elements = [...form.elements]

        const body = {}

        elements.forEach((tag) => {
            if (tag.tagName == "INPUT" && tag.value !== "") {
                body[tag.id] = tag.value
            } else if (tag.tagName == "SELECT" && tag.value !== '0') {
                body[tag.id] = elements[2].options[elements[2].selectedIndex].id
            }

            if (tag.tagName == "INPUT") {
                tag.value = ''
            } else {
                tag.value = '0'
                tag.classList.add("select-selected")
            }
        })

        createDepartment(body)
    })
}


export function eventSubmitEditModal(btn, uuid) {
    btn.addEventListener("click", () => {
        const body = {}

        const textDescription = document.querySelector(".textarea-edit")

        body[textDescription.id] = textDescription.value
        
        editDepartment(body, uuid)
    })
}


export function eventSubmitDeleteModal(btn, uuid) {
    btn.addEventListener("click", () => {
        deleteDepartment(uuid)
    })
}


export function eventSubmitEditUser(btn, selectModality, selectLevel, uuid){

    let textModality = selectModality.options[selectModality.selectedIndex].text 
    let textLevel = selectLevel.options[selectLevel.selectedIndex].text
    
    selectLevel.addEventListener("change", () => {
        if (selectLevel.value !== 0 || selectModality.value !==0) {
            btn.disabled = false

            textModality =  selectModality.options[selectModality.selectedIndex].text 
            textLevel = selectLevel.options[selectLevel.selectedIndex].text
        }
    })

    selectModality.addEventListener("change", () => {
        if (selectLevel.value !== 0 || selectModality.value !==0) {
            btn.disabled = false
            
            textModality =  selectModality.options[selectModality.selectedIndex].text 
            textLevel = selectLevel.options[selectLevel.selectedIndex].text 
        }
    })

    btn.addEventListener("click", () => {
        const body = {}
        
        if (selectLevel.value != 0) {
            body[selectLevel.id] = textLevel
        }
        if (selectModality.value != 0) {
            body[selectModality.id] = textModality
        }

        
        editUser(body, uuid)
    })
}

export function eventSubmitDeleteModalUser(btn, uuid) {
    btn.addEventListener("click", () => {
        deleteUser(uuid)
    })
}