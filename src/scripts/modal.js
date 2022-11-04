import { eventCloseModal } from "./eventButtons.js"

export function createModalBase(type) {
    const body = document.querySelector("body")

    const containerModal = document.createElement("div")
    containerModal.classList.add("container-modal")

    const modal = document.createElement("div")
    modal.classList.add("modal")

    if (type == 'edit') {
        modal.innerHTML = `
            <button class="button-close"><img src="/src/assets/img/Vector (4).png" alt="icon close"></button>
            <h2 class="font-2-bold">Editar Perfil</h2>
            <form class="form-edit-modal">
                <input class="input-base" type="text" name="name" id="username" placeholder="Seu nome">
                <input class="input-base" type="email" name="email" id="email" placeholder="Seu e-mail">
                <input class="input-base" type="password" name="password" id="password" placeholder="Sua senha">
                <button type="submit" class="button-base button-brand-1" >Editar perfil</button>
            </form>
        `
    }


    containerModal.append(modal)
    body.appendChild(containerModal)

    eventCloseModal()
}