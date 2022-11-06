import { getAllCompanies, getAllDepartment, getAllSector, getAllUsers, getCoworkersDepartment, getDepartamentCompanyUser, getInforUser } from "./api.js"
import { createModalBase } from "./modal.js"
import { eventShowMenuCard } from "./showMenu.js"


async function renderSectorOption() {
    const select = document.getElementById("select-sector")

    let listSector = await getAllSector()

    listSector.forEach((sect, index) => {
        let opt = document.createElement("option")
        opt.setAttribute("value", index + 1)
        opt.id = sect.uuid
        opt.innerText = sect.description

        select.appendChild(opt)
    })
    if (select.options[select.selectedIndex].text == "Selecionar Setor") {
        renderCompaniesHomePage()
    }
    select.addEventListener("change", () => {
        let sectorTextCurrency = select.options[select.selectedIndex].text

        if (sectorTextCurrency == "Selecionar Setor") {
            renderCompaniesHomePage()
        } else {
            renderCompaniesHomePage(sectorTextCurrency)
        }
    })
}


async function renderCompaniesHomePage(sector = '') {
    const ul = document.querySelector(".list-companies")
    ul.innerHTML = ''

    let listApiCompanies = await getAllCompanies(sector)

    listApiCompanies.forEach((comp) => {
        const { uuid, name, opening_hours, sectors } = comp
        let li = document.createElement("li")
        li.classList.add("company")
        li.id = uuid

        li.innerHTML = `
            <h3 class="font-3-bold">${name}</h3>
            <div>
                <span class="font-4-regular">${opening_hours} horas</span>
                <span class="font-4-regular sector-btn">${sectors.description}</span>
            </div>
        `

        ul.appendChild(li)
    })
}


async function renderInforUser() {
    const user = await getInforUser()

    let containerInforUser = document.querySelector(".container-user-infor")

    containerInforUser.insertAdjacentHTML("beforeend", `
        <h2 class="font-3-semibold">${user.username}</h2>
        <ul class="list-infor">
            <li class="font-4-regular">Email: ${user.email}</li>
        </ul>
    `)

    if (user.kind_of_work !== null) {
        let list = document.querySelector(".list-infor")
        list.insertAdjacentHTML("beforeend", `<li class="font-4-regular">${user.kind_of_work}</li>`)
    } 

    if (user.professional_level !== null) {
        let list = document.querySelector(".list-infor")
        list.insertAdjacentHTML("beforeend", `<li class="font-4-regular">${user.professional_level}</li>`)
    }
}


async function renderCompanyUser() {
    const containterJob = document.getElementById("container-job")

    let user = await getInforUser()
    
    if (user.department_uuid !== null) {
        let company = await getDepartamentCompanyUser()
        let coworkers = await getCoworkersDepartment()
        
        let listCoWorkersApi = coworkers[0].users
         
        containterJob.classList.add("container-job-infor")

        let titleSection = document.createElement("h1")
        titleSection.classList.add("font-4-semibold")
        titleSection.innerText = `${company.name} - ${coworkers[0].name}`

        let listCoWorkers = document.createElement("ul")
        listCoWorkers.classList.add("list-co-workers")

        containterJob.append(titleSection, listCoWorkers)

        listCoWorkersApi.forEach((co) => {
            if (co.username !== user.username) {
                let coWorkersTag = document.createElement("li")
                coWorkersTag.classList.add("co-workers")
                
                coWorkersTag.innerHTML = `
                    <h3>${co.username}</h3>
                    <span>${co.professional_level == null ? "Ainda não definido" : co.professional_level}</span>
                `

                listCoWorkers.appendChild(coWorkersTag)
            }
        })

        if (listCoWorkersApi.length <= 1) {
            let h1 = document.createElement("h1")
            h1.innerText = "Essa empresa possui apenas você como funcionário"

            listCoWorkers.appendChild(h1)
            listCoWorkers.style.alignItems = "center"
            listCoWorkers.style.justifyContent = "center"
        }
    } else {
        containterJob.classList.add("container-empty")

        containterJob.insertAdjacentHTML("afterbegin", '<h1 class="font-3-semibold">Você ainda não foi contratado</h1>')
    }
}


async function renderSelectCompany() {
    const select = document.getElementById("select-company")
    
    const companies = await getAllCompanies()
    companies.forEach((comp, index) => {
        let opt = document.createElement("option")
        opt.setAttribute("value", index + 1)
        opt.id = comp.uuid
        opt.innerText = comp.name

        select.appendChild(opt)
    })
    
    if (select.options[select.selectedIndex].text == "Selecionar Empresa") {
        select.style.color = "var(--color-grey-400)";
        renderDepartmentAll()
    }

    select.addEventListener("change", () => {
        let companyTextCurrency = select.options[select.selectedIndex].text

        if (companyTextCurrency == "Selecionar Empresa") {
            select.style.color = "var(--color-grey-400)";
            renderDepartmentAll()
        } else {
            select.style.color = "var(--color-grey-100)";
            renderDepartmentAll(select.options[select.selectedIndex].id)
        }
    })
}

async function renderDepartmentAll(companySelected) {
    const listDepartment = document.querySelector(".list-department")
    listDepartment.innerHTML = ''

    let departments = await getAllDepartment(companySelected)

    if (departments == 0) {
        let textNotFoundCompanies = document.createElement("h1")
        textNotFoundCompanies.innerText = 'Nenhum Departamento cadastrado nesta Empresa.'
        textNotFoundCompanies.style.textAlign = "center";
        listDepartment.appendChild(textNotFoundCompanies)
        listDepartment.classList.add("list-department-empty")

    } else {
        listDepartment.classList.remove("list-department-empty")
        if (departments.length <= 3) {
            listDepartment.style.alignItems = "center";
        }
        departments.forEach((depar) => {
            const { uuid, name, description, companies } = depar
    
            let department = document.createElement("li")
            department.classList.add("department")
            department.id = uuid
    
            department.innerHTML = `
                <div class="infor-department">
                    <h3>${name}</h3>
                    <span>${description}</span>
                    <span>${companies.name}</span>
                </div>
                <nav class="nav-btns">
                    <button class="btn-base-menu" data-modal-control="visibility"><img src="../assets/img/Vector (5).png" alt="icone visualizar"></button>
                    <button class="btn-base-menu" data-modal-control="edit-admin"><img src="../assets/img/Vector (1).png" alt="icone editar"></button>
                    <button class="btn-base-menu" data-modal-control="delete"><img src="../assets/img/Vector (3).png" alt="icone deletar"></button>
                </nav>
                <button class="button-menu-department" id="show" data-menu-control="menu"><img src="../assets/img/Vector.png" alt=""></button>
            `
            listDepartment.appendChild(department)
        })
    } 

    await renderAllUsers()

    eventShowMenuCard()

    const btnsControlModal = document.querySelectorAll("[data-modal-control]")

    btnsControlModal.forEach((btn) => {
        btn.addEventListener("click", () => {
            let atribute = btn.getAttribute("data-modal-control")

            let uuid = btn.parentElement.parentElement.id

            createModalBase(atribute, uuid)
        })
    })
}


async function renderAllUsers() {
    const listUsersRegistered = document.querySelector(".list-user-registered")
    listUsersRegistered.innerHTML = ''

    const listAllUserApi = await getAllUsers()
    listAllUserApi.forEach(async (user) => {
        if (user.username !== "ADMIN") {
            const { uuid, username, professional_level, department_uuid
            } = user
    
            let prof = professional_level == null ? "Ainda não definido" : professional_level

            let allDepartment = await getAllDepartment()
            let department = department_uuid == null ? "Ainda não contratado" : allDepartment.find((dep) => {
                if(dep.uuid == department_uuid) {
                    return dep.companies
                }
            })

            let depName = department.companies !== undefined ? department.companies.name : department


            const userRegistered = document.createElement("li")
            userRegistered.classList.add("user-registered")
            userRegistered.id = uuid

            const nav = document.createElement("nav")
            nav.classList.add("nav-btns")

            const btnEdit = document.createElement("button")
            btnEdit.classList.add("btn-base-menu")
            btnEdit.setAttribute("data-modal-control", "edit-user")
            btnEdit.innerHTML = `<img src="../assets/img/Vector (1).png" alt="icone editar">`

            const btnDele = document.createElement("button")
            btnDele.classList.add("btn-base-menu")
            btnDele.setAttribute("data-modal-control", "delete-user")
            btnDele.innerHTML = `<img src="../assets/img/Vector (3).png" alt="icone deletar">`

            nav.append(btnEdit, btnDele)

            const btnMenuDep = document.createElement("button")
            btnMenuDep.classList.add("button-menu-department")
            btnMenuDep.id = "show"
            btnMenuDep.setAttribute("data-menu-control", "menu")
            btnMenuDep.innerHTML = `<img src="../assets/img/Vector.png" alt="icone menu">
            `
    
            userRegistered.innerHTML = `
            <div class="infor-user-registered">
                <h3>${username}</h3>
                <span>${prof}</span>
                <span>${depName}</span>
            </div>
            `

            userRegistered.append(nav, btnMenuDep)
            listUsersRegistered.appendChild(userRegistered)

            btnMenuDep.addEventListener("click", () => {
                btnMenuDep.parentElement.children[1].classList.toggle("nav-show")

            if (btnMenuDep.id == "show") {
                btnMenuDep.id = "close"
                btnMenuDep.children[0].src = "../assets/img/Vector (4).png"

            } else if (btnMenuDep.id == "close") {
                btnMenuDep.id = "show"
                btnMenuDep.children[0].src = "../assets/img/Vector.png"
            }
            })

            
            btnEdit.addEventListener("click", () => {
                let atribute = btnEdit.getAttribute("data-modal-control")

                let uuid = btnEdit.parentElement.parentElement.id

                createModalBase(atribute, '', uuid)
            }) 

            btnDele.addEventListener("click", () => {
                let atribute = btnDele.getAttribute("data-modal-control")

                let uuid = btnDele.parentElement.parentElement.id

                createModalBase(atribute, '', uuid)
            })
        }  
    })

    
}


export {
    renderSectorOption,
    renderInforUser,
    renderSelectCompany,
    renderCompanyUser
}