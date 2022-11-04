import { getAllCompanies, getAllDepartment, getAllSector, getInforUser } from "./api.js"

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
                    <button class="btn-base-menu"><img src="/src/assets/img/Vector (5).png" alt="icone visualizar"></button>
                    <button class="btn-base-menu"><img src="/src/assets/img/Vector (1).png" alt="icone editar"></button>
                    <button class="btn-base-menu"><img src="/src/assets/img/Vector (3).png" alt="icone deletar"></button>
                </nav>
                <button class="button-menu-department" id="show"><img src="/src/assets/img/Vector.png" alt=""></button>
            `
            listDepartment.appendChild(department)
        })
    } 
}


export {
    renderSectorOption,
    renderInforUser,
    renderSelectCompany
}