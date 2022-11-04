import { getAllDepartment } from "./api.js"
import { eventCloseModal, eventSubmitDeleteModal, eventSubmitEditModal, eventSubmitModalCreate } from "./eventButtons.js"
import { eventSelectModal } from "./eventSelect.js"

export async function createModalBase(type, uuidCard='', ) {
    const body = document.querySelector("body")

    const containerModal = document.createElement("div")
    containerModal.classList.add("container-modal")

    const modal = document.createElement("div")
    modal.classList.add("modal")

    let depFind = ''
    if (uuidCard !== '') {
        let dep = await getAllDepartment()
        depFind = dep.find((d) => d.uuid == uuidCard)
    }

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
    } else if (type == 'create') {
        let btnCreate = document.createElement("button")
        btnCreate.classList.add("button-base", "button-brand-1")
        btnCreate.innerText = "Criar o departamento"

        let select = document.createElement("select")
        select.classList.add("font-5-semibold")
        select.id = "company_uuid"
        select.setAttribute("name", "select-modal")
        select.innerHTML = `
            <option value="0">Selecionar Empresa</option>
        `

        modal.innerHTML = `
            <button class="button-close"><img src="/src/assets/img/Vector (4).png" alt="icon close"></button>
            <h2 class="font-2-bold">Criar Departamento</h2>
            <form class="form-create-modal">
                <input class="input-base" type="text" name="name" id="name" placeholder="Nome do departamento">
                <input class="input-base" type="text" name="email" id="description" placeholder="Descrição">
            </form>
        `

        
        modal.children[2].append(select, btnCreate)

        eventSelectModal(select)
        eventSubmitModalCreate(btnCreate)      
    } else if (type == 'edit-admin') {
        let btnCreate = document.createElement("button")
        btnCreate.classList.add("button-base", "button-brand-1")
        btnCreate.innerText = "Salvar alterações"

        modal.innerHTML = `
            <button class="button-close"><img src="/src/assets/img/Vector (4).png" alt="icon close"></button>
            <h2 class="font-2-bold">Editar Departamento</h2>
            <textarea name="description" id="description" cols="30" rows="10" class="textarea-edit" placeholder="Descrição">${depFind.description}</textarea>
        `

        modal.appendChild(btnCreate)

        eventSubmitEditModal(btnCreate, depFind.uuid)
    } else if (type == 'delete') {
        let btnCreate = document.createElement("button")
        btnCreate.classList.add("button-base", "button-brand-1")
        btnCreate.innerText = "Confirmar"

        modal.innerHTML = `
            <button class="button-close"><img src="/src/assets/img/Vector (4).png" alt="icon close"></button>
            <h2 class="font-2-bold">Realmente deseja deletar o Despartamento ${depFind.name} e demitir seus funcionários?</h2>
        `

        modal.appendChild(btnCreate)
        modal.classList.add("modal-delete")

        eventSubmitDeleteModal(btnCreate, depFind.uuid)
    }
    
    
    containerModal.append(modal)
    body.appendChild(containerModal)

    eventCloseModal()
}