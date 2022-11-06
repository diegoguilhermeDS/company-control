const tooltip = (status, title, message='', link='') => {
    const body = document.querySelector("body")
    const modalInforByUser = document.createElement("div")
    modalInforByUser.classList.add("modal-communication")

    const containerMessage = document.createElement("div")
    containerMessage.classList.add("container-message")

    const text = document.createElement("span")
    text.classList.add("font-5-regular")

    if (status == "Sucesso!") {
        containerMessage.innerHTML = `
        <div class="circle circle-sucess">
            <img src="../assets/img/check.png" alt="Mensagem de ${status}">
        </div>
        <h3 class="font-4-semibold">${title}</h3>
        `
        modalInforByUser.append(containerMessage)

        if (message.length > 0) {
            if (link.length > 0) {
                text.innerHTML = `
                <span class="">${message} <a href="/src/pages/login/index.html" class="">${link}</a></span>
            `
            } else {
                text.innerHTML = `
                <span class="">${message}</span>
            `
            }

            modalInforByUser.append(text)
        }
        
    } else if (status == "Erro!") {
        containerMessage.innerHTML = `
        <div class="circle circle-fail">
            <img src="../assets/img/gross-dark-cross.png" alt="Mensagem de ${status}">
        </div>
        <h3 class="font-4-semibold">${title}</h3>
        `
        
        modalInforByUser.append(containerMessage)

        if (message.length > 0) {
            text.innerHTML = `
                <span class="">${message}</span>
            `

            modalInforByUser.append(text)
        }
    }

    
    body.appendChild(modalInforByUser)
}


export {
    tooltip
}