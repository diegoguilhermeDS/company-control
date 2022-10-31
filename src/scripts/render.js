import { getAllCompanies, getAllSector } from "./api.js"

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
    
    renderCompaniesHomePage()
}


async function renderCompaniesHomePage() {
    const ul = document.querySelector(".list-companies")

    let listApiCompanies = await getAllCompanies()

    listApiCompanies.forEach((comp) => {
        console.log(comp)
        const { uuid, name, opening_hours, sectors } = comp
        let li = document.createElement("li")
        li.classList.add("company")
        li.id = uuid

        li.innerHTML = `
            <h3 class="font-3-bold">${name}</h3>
            <span class="font-4-regular">${opening_hours} horas</span>
            <span class="font-4-regular sector-btn">${sectors.description}</span>
        `

        ul.appendChild(li)
    })
}


export {
    renderSectorOption,
}