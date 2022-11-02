import { setLocalStorage } from "./LocalStorage.js"

const baseUrl = "http://localhost:6278/"


async function getAllSector() {
    try {
        const response = await fetch(`${baseUrl}sectors`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const request = await response.json()
        if (response.ok) {
            return request
    
        } else {
            alert("algo deu errado com a requisição")
        }

    } catch (err) {
        alert("algo deu errado")
    }
}


async function getAllCompanies(sector = '') {
    try {
        const response = await fetch(`${baseUrl}companies/${sector}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const request = await response.json()
        if (response.ok) {
            return request
    
        } else {
            alert("algo deu errado com a requisição")
        }

    } catch (err) {
        alert("algo deu errado")
    }
}


async function login(body) {
    try {
        const request = await fetch(`${baseUrl}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const response = await request.json()

        if (request.ok) {
            console.log(response)
            setLocalStorage("@loginUser: token", response.token)
            
        } else {
            console.log(response)
        }
        
    } catch (err) {
        alert(err)
    }
}


export {
    getAllSector,
    getAllCompanies,
    login
}