import { getLocalStorage, setLocalStorage } from "./LocalStorage.js"
import checked from "./userChecker.js"

const baseUrl = "http://localhost:6278/"


export async function getAllSector() {
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


export async function getAllCompanies(sector = '') {
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


export async function checkUserTypeApi(token) {
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


export async function login(body, btn) {
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


export async function register(body, btn) {
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


export async function getInforUser() {
    try {
        let token = getLocalStorage("@loginUser: token")
        const request = await fetch(`${baseUrl}users/profile`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        })   

        const response = await request.json()

        return response
        
    } catch (err) {
        alert(err)
    }
}


export async function pathInforUser(body) {
    try {
        let token = getLocalStorage("@loginUser: token")

        const request = await fetch(`${baseUrl}users`, {
            method: "PATCH", 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        const response = await request.json()
        console.log(response)
        if (request.ok) {
            location.replace("/src/pages/DashBordUser/index.html")
            return response
        } else {
            return response
        }

    } catch (err) {
        alert(err)
    }
}


export async function getAllDepartment(uuid = ''){
    try {
        const token = getLocalStorage("@loginUser: token")
        const response = await fetch(`${baseUrl}departments/${uuid}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
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


export async function getAllUsers() {
    try {
        const token = getLocalStorage("@loginUser: token")
        const request = await fetch(`${baseUrl}users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        const response = await request.json()

        return response

    } catch (err) {
        alert(err)
    }
}


export async function getDepartamentCompanyUser() {
    try {
        let token = getLocalStorage("@loginUser: token")
        const request = await fetch(`${baseUrl}users/departments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        const response = await request.json()

        return response

    } catch (err){
        alert(err)
    }
}


export async function getCoworkersDepartment(){
    try {
        let token = getLocalStorage("@loginUser: token")
        const request = await fetch(`${baseUrl}users/departments/coworkers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        const response = await request.json()

        return response

    } catch (err){
        alert(err)
    }
}


export async function createDepartment(body) {
    try {
        let token = getLocalStorage("@loginUser: token")
        const request =  await fetch(`${baseUrl}departments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }, 
            body: JSON.stringify(body)
        })

        const response = await request.json()

        if (request.ok) {
            const conatinerModal = document.querySelector(".container-modal")

            conatinerModal.remove()
            location.replace("/src/pages/DashBordAdmin/index.html")
        }

        return response

    } catch (err) {
        alert(err)
    }
}


export async function editDepartment(body, uuid) {
    try {
        let token = getLocalStorage("@loginUser: token")
        const request =  await fetch(`${baseUrl}departments/${uuid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }, 
            body: JSON.stringify(body)
        })

        const response = await request.json()

        if (request.ok) {
            const conatinerModal = document.querySelector(".container-modal")

            conatinerModal.remove()
            location.replace("/src/pages/DashBordAdmin/index.html")
        }

        return response

    } catch (err) {
        alert(err)
    }
}


export async function deleteDepartment(uuid) {
    try {
        let token = getLocalStorage("@loginUser: token")
        const request =  await fetch(`${baseUrl}departments/${uuid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        if (request.ok) {
            const conatinerModal = document.querySelector(".container-modal")

            conatinerModal.remove()
            location.replace("/src/pages/DashBordAdmin/index.html")
        }

        return request

    } catch (err) {
        console.log(err)
    }
}


export async function editUser(body, uuid) {
    try {
        console.log(body)
        let token = getLocalStorage("@loginUser: token")
        const request =  await fetch(`${baseUrl}admin/update_user/${uuid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }, 
            body: JSON.stringify(body)
        })

        const response = await request.json()

        if (request.ok) {
            const conatinerModal = document.querySelector(".container-modal")

            conatinerModal.remove()
            location.replace("/src/pages/DashBordAdmin/index.html")
        }

        return response

    } catch (err) {
        alert(err)
    }
}


export async function deleteUser(uuid) {
    try {
        let token = getLocalStorage("@loginUser: token")
        const request =  await fetch(`${baseUrl}admin/delete_user/${uuid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        if (request.ok) {
            const conatinerModal = document.querySelector(".container-modal")

            conatinerModal.remove()
            location.replace("/src/pages/DashBordAdmin/index.html")
        }

        return request

    } catch (err) {
        console.log(err)
    }
}


export async function getUserNoCompany() {
    try {
        let token = getLocalStorage("@loginUser: token")
        const request = await fetch(`${baseUrl}admin/out_of_work`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        const response = await request.json()

        return response

    } catch (err){
        alert(err)
    }
}


export async function ToHireCompany(body) {
    try {
        let token = getLocalStorage("@loginUser: token")
        const request =  await fetch(`${baseUrl}departments/hire/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }, 
            body: JSON.stringify(body)
        })

        const response = await request.json()

        return response

    } catch (err) {
        alert(err)
    }
}