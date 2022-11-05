import { getAllCompanies } from "./api.js"
import { professional_level_list, kind_of_work } from "./data.js"

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


function eventSelectInforUserEdit(selectLevel, selectModality) {
    professional_level_list.forEach((lvl, index) => {
        let opt = document.createElement("option")
        opt.setAttribute("value", index + 1)
        opt.innerText = lvl

        selectLevel.appendChild(opt)
    })

    kind_of_work.forEach((kind, index) => {
        let opt = document.createElement("option")
        opt.setAttribute("value", index + 1)
        opt.innerText = kind

        selectModality.appendChild(opt)
    })


    if (selectLevel.options[selectLevel.selectedIndex].text == "Selecionar nível profissional") {
        selectLevel.style.color = "var(--color-grey-400)";
    }

    if (selectModality.options[selectModality.selectedIndex].text == "Selecionar modalidade de trabalho") {
        selectModality.style.color = "var(--color-grey-400)";
    }

    selectLevel.addEventListener("change", () => {
        let companyTextCurrency = selectLevel.options[selectLevel.selectedIndex].text

        if (companyTextCurrency == "Selecionar nível profissional") {
            selectLevel.style.color = "var(--color-grey-400)";
        } else {
            selectLevel.style.color = "var(--color-grey-100)";
        }
    })

    selectModality.addEventListener("change", () => {
        let companyTextCurrency = selectModality.options[selectModality.selectedIndex].text

        if (companyTextCurrency == "Selecionar modalidade de trabalho") {
            selectModality.style.color = "var(--color-grey-400)";
        } else {
            selectModality.style.color = "var(--color-grey-100)";
        }
    })
}


export {
    eventSelectModal,
    eventSelectInforUserEdit
}