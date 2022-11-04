import { getAllCompanies } from "./api.js"

async function eventSelectModal(select) {
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
        }

        select.addEventListener("change", () => {
            let companyTextCurrency = select.options[select.selectedIndex].text
    
            if (companyTextCurrency == "Selecionar Empresa") {
                select.style.color = "var(--color-grey-400)";
            } else {
                select.style.color = "var(--color-grey-100)";
            }
        })
}


export {
    eventSelectModal
}