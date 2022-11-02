import { setLocalStorage } from "./LocalStorage.js"
import checked from "./userChecker.js"

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


async function checkUserTypeApi(token) {
    try {
        const request = await fetch(`${baseUrl}auth/validate_user`, {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        })

        if (request.ok) {
            const response = await request.json()

            return response

        }else {
            console.log(await request.json())
        }

    } catch (err) {
        console.log(err)
    }
}


async function login(body, btn) {
    try {
        const request = await fetch(`${baseUrl}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const response = await request.json()

        setTimeout(() => {
            btn.innerHTML = "Login"
            btn.disabled = true
        }, 1000)

        if (request.ok) {
            setLocalStorage("@loginUser: token", response.token)
            checked()
        } else {
            console.log(response)
        }
        
        return response

    } catch (err) {
        alert(err)
    }
}


async function register(body, btn) {
    try {
        const request = await fetch(`${baseUrl}auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const response = await  request.json()

        setTimeout(() => {
            btn.innerHTML = "Login"
            btn.disabled = true
        }, 1000)

        if (request.ok) {
            setTimeout(() => {
                location.replace("/src/pages/login/index.html")
            }, 1000)

        } else {
            console.log(response)
        }

        return response

    } catch (err) {
        alert(err)
    }
}


export {
    getAllSector,
    getAllCompanies,
    login,
    register,
    checkUserTypeApi,
}