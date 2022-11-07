import { getAllDepartment, getAllUsers, userShutdown } from "./api.js"
import { eventButtonDesabled, eventCloseModal, eventSubmitDeleteModal, eventSubmitDeleteModalUser, eventSubmitEditModal, eventSubmitEditUser, eventSubmitModalCreate, eventSubmitToHire } from "./eventButtons.js"
import { eventSelectInforUserEdit, eventSelectModal, eventSelectUserNoCompany } from "./eventSelect.js"



export async function createModalBase(type, uuidCard='', uuidUser = '') {

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

    let userFind = ''
    let users = await getAllUsers()
    
    if (uuidUser !== '') {
        userFind = users.find((u) => u.uuid == uuidUser)
    }

    let currentDepartmentUsers = ''
    if (depFind !== '') {
        currentDepartmentUsers = users.filter((user) => user.department_uuid == depFind.uuid)
    }

    
    if (type == 'edit') {
        const form = document.createElement("form")
        form.classList.add("form-edit-modal")
        form.innerHTML = `
            <input class="input-base" type="text" name="name" id="username" placeholder="Seu nome">
            <input class="input-base" type="email" name="email" id="email" placeholder="Seu e-mail">
            <input class="input-base" type="password" name="password" id="password" placeholder="Sua senha">
            <button type="submit" class="button-base button-brand-1" >Editar perfil</button>
        `

        modal.innerHTML = `
            <button class="button-close"><img src="../../assets/img/Vector (4).png" alt="icon close"></button>
            <h2 class="font-2-bold brand-2">Editar Perfil</h2>
        ` 
        modal.appendChild(form)

        eventButtonDesabled("edit", form)
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
            <button class="button-close"><img src="../../assets/img/Vector (4).png" alt="icon close"></button>
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
            <button class="button-close"><img src="../../assets/img/Vector (4).png" alt="icon close"></button>
            <h2 class="font-2-bold">Editar Departamento</h2>
            <textarea name="description" id="description" cols="30" rows="10" class="textarea-edit" placeholder="Descrição">${depFind.description}</textarea>
        `

        modal.appendChild(btnCreate)

        eventSubmitEditModal(btnCreate, depFind.uuid)
    } else if (type == 'delete') {
        let btnCreate = document.createElement("button")
        btnCreate.classList.add("button-base", "button-sucess")
        btnCreate.innerText = "Confirmar"

        modal.innerHTML = `
            <button class="button-close"><img src="../../assets/img/Vector (4).png" alt="icon close"></button>
            <h2 class="font-2-bold">Realmente deseja deletar o Despartamento ${depFind.name} e demitir seus funcionários?</h2>
        `

        modal.appendChild(btnCreate)
        modal.classList.add("modal-delete")

        eventSubmitDeleteModal(btnCreate, depFind.uuid)
    } else if (type == 'edit-user') {
        containerModal.classList.add("modal-h")

        modal.innerHTML = `
            <button class="button-close"><img src="../../assets/img/Vector (4).png" alt="icon close"></button>
            <h2 class="font-2-bold">Editar Usuário</h2>
        `

        let selectLevel = document.createElement("select")
        selectLevel.classList.add("font-5-semibold")
        selectLevel.id = "professional_level"
        selectLevel.setAttribute("name", "select-modal")
        selectLevel.innerHTML = `
            <option value="0">Selecionar nível profissional</option>
        `
        let selectModality = document.createElement("select")
        selectModality.classList.add("font-5-semibold")
        selectModality.id = "kindofwork"
        selectModality.setAttribute("name", "select-modal")
        selectModality.innerHTML = `
            
            <option value="0">Selecionar modalidade de trabalho </option>
        `

        let btnSave = document.createElement("button")
        btnSave.classList.add("button-base", "button-brand-1")
        btnSave.innerText = "Editar"
        btnSave.disabled = true

        modal.append(selectModality, selectLevel, btnSave)

        eventSelectInforUserEdit(selectLevel, selectModality)
        eventSubmitEditUser(btnSave, selectModality, selectLevel, uuidUser)
    } else if (type == 'delete-user') {
        containerModal.classList.add("modal-h", "modal-top")

        let btnCreate = document.createElement("button")
        btnCreate.classList.add("button-base", "button-sucess")
        btnCreate.innerText = "Deletar"

        modal.innerHTML = `
            <button class="button-close"><img src="../../assets/img/Vector (4).png" alt="icon close"></button>
            <h2 class="font-2-bold">Realmente deseja remover o usuário ${userFind.username}?</h2>
        `

        modal.appendChild(btnCreate)
        modal.classList.add("modal-delete")
        
        eventSubmitDeleteModalUser(btnCreate, uuidUser)
    } else if (type == 'visibility') {
        modal.innerHTML = `
            <button class="button-close"><img src="../../assets/img/Vector (4).png" alt="icon close"></button>
        `
        modal.classList.add("modal-visibility")

        let nameDep = document.createElement("h1")
        nameDep.innerText = `${depFind.name}`
        nameDep.classList.add("font-1-bold", "brand-2")

        let headerModal = document.createElement("header")
        headerModal.innerHTML = `
            <div class="container-company-infor">
                <h3 class="font-4-semibold grey-2">${depFind.description}</h3>
                <span class="font-4-regular grey-3">${depFind.companies.name}</span>
            </div>
        `

        let divSelect = document.createElement("div")
        divSelect.classList.add("div-select")

        let select = document.createElement("select")
        select.classList.add("font-5-regular")
        select.id = "company_uuid"
        select.setAttribute("name", "select-modal")
        select.innerHTML = `
            <option value="0">Selecionar Usuário</option>
        `

        let btnAdd = document.createElement("button")
        btnAdd.innerText = "Contratar"
        btnAdd.classList.add("button-base", "button-sucess", "button-visibility", "button-base-2")

        let listUserDep = document.createElement("ul")
        listUserDep.classList.add("list-user-dep")
        
        currentDepartmentUsers.forEach((user) => {
            let userTag = document.createElement("li")
            userTag.classList.add("user-dep")
            userTag.id = user.uuid
            userTag.innerHTML = `
                <div>
                    <h2 class="font-4-semibold grey-2">${user.username}</h2>
                    <span class="grey-2">${user.professional_level !== null ? user.professional_level : "Ainda não definido"}</span>
                    <span class="grey-3">${depFind.companies.name}</span>
                </div>
            `

            let btnOff = document.createElement("button")
            btnOff.classList.add("button-base", "button-alert", "button-base-2")
            btnOff.id = "off"
            btnOff.innerText = "Desligar"

            userTag.appendChild(btnOff)

            listUserDep.appendChild(userTag)

            btnOff.addEventListener("click", () => {
                let id = btnOff.parentElement.id
                userShutdown(id)
            })
        })

        divSelect.append(select, btnAdd)
        headerModal.append(divSelect)
        modal.append(nameDep, headerModal, listUserDep)

        eventSelectUserNoCompany(select)
        eventSubmitToHire(btnAdd, depFind.uuid, select)
    }
    
    
    containerModal.append(modal)
    body.appendChild(containerModal)
    
    eventCloseModal()
}