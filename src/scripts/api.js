import { getLocalStorage, setLocalStorage } from "./LocalStorage.js"
import checked from "./userChecker.js"
import { tooltip } from "./tooltip.js"


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
        tooltip("Erro!", "Algo deu errado")
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
        tooltip("Erro!", "Algo deu errado")
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
            tooltip("Erro!", "Algo deu errado")
        }

    } catch (err) {
        tooltip("Erro!", "Algo deu errado")
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
            tooltip("Sucesso!", "Login Efetuado com sucesso!", "Aguarde enquanto estamos redicecionando a página.")

            setLocalStorage("@loginUser: token", response.token)
            
            setTimeout(() => {
                checked()

            }, 3000)
        } else {
            let message = ''
            if (response.error === 'email invalid!') {
                message = 'Email inválido!'
            } else if (response.error === 'password invalid!') {
                message = 'Senha inválida!'
            }

            tooltip("Erro!", "Falha ao fazer login", `${message}`)
        }
        
        return response

    } catch (err) {
        tooltip("Erro!", "Algo deu errado")
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
        console.log(body)
        console.log(response)
        setTimeout(() => {
            btn.innerHTML = "Login"
            btn.disabled = true
        }, 1000)

        if (request.ok) {
            tooltip("Sucesso!", "Cadastro feito com sucesso!", "Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login:", "Acessar página de login")

            setTimeout(() => {
                location.replace("/src/pages/login/index.html")
            }, 3000)

        } else {
            console.log(response)
        }

        return response

    } catch (err) {
        tooltip("Erro!", "Algo deu errado")
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
        tooltip("Erro!", "Algo deu errado")
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

        if (request.ok) {
            tooltip("Sucesso!", "Alteração feita com sucesso.")

            setTimeout(() => {
                location.replace("/src/pages/DashBordUser/index.html")

            }, 3000)
        } 
        
        return response
    } catch (err) {
        tooltip("Erro!", "Algo deu errado")
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
        tooltip("Erro!", "Algo deu errado")
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
        tooltip("Erro!", "Algo deu errado")
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
        tooltip("Erro!", "Algo deu errado")
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
        tooltip("Erro!", "Algo deu errado")
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
            tooltip("Sucesso!", "Departamento criado com sucesso!")

            setTimeout(() => {
                const conatinerModal = document.querySelector(".container-modal")
    
                conatinerModal.remove()
                location.replace("/src/pages/DashBordAdmin/index.html")
            }, 3000)
        }

        return response

    } catch (err) {
        tooltip("Erro!", "Algo deu errado")
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
            tooltip("Sucesso!", "Alterações feita com sucesso!")

            setTimeout(() => {
                const conatinerModal = document.querySelector(".container-modal")
    
                conatinerModal.remove()
                location.replace("/src/pages/DashBordAdmin/index.html")
            }, 3000)
        }

        return response

    } catch (err) {
        tooltip("Erro!", "Algo deu errado")
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
            tooltip("Sucesso!", "Departamento Deletado com sucesso!")

            setTimeout(() => {
                const conatinerModal = document.querySelector(".container-modal")
    
                conatinerModal.remove()
                location.replace("/src/pages/DashBordAdmin/index.html")
            }, 3000)
        }

        return request

    } catch (err) {
        tooltip("Erro!", "Algo deu errado")
    }
}


export async function editUser(body, uuid) {
    try {
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
            tooltip("Sucesso!", "Alterações feitas com sucesso!")

            setTimeout(() => {
                const conatinerModal = document.querySelector(".container-modal")
    
                conatinerModal.remove()
                location.replace("/src/pages/DashBordAdmin/index.html")
            }, 3000)
        }

        return response

    } catch (err) {
        tooltip("Erro!", "Algo deu errado")
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
            tooltip("Sucesso!", "Usuário deletado com sucesso!")

            setTimeout(() => {
                const conatinerModal = document.querySelector(".container-modal")
    
                conatinerModal.remove()
                location.replace("/src/pages/DashBordAdmin/index.html")
            }, 3000)
        }

        return request

    } catch (err) {
        tooltip("Erro!", "Algo deu errado")
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
        tooltip("Erro!", "Algo deu errado")
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
        
        if (request.ok) {
            tooltip("Sucesso!", "Usuário contratado com sucesso!")

            setTimeout(() => {
                const conatinerModal = document.querySelector(".container-modal")
    
                conatinerModal.remove()
                location.replace("/src/pages/DashBordAdmin/index.html")
            }, 3000)
        }
        
        return response

    } catch (err) {
        tooltip("Erro!", "Algo deu errado")
    }
}


export async function userShutdown(uuid) {
    try {
        let token = getLocalStorage("@loginUser: token")
        const request =  await fetch(`${baseUrl}departments/dismiss/${uuid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        const response = await request.json()

        if (request.ok) {
            tooltip("Sucesso!", "Usuário desligado com sucesso!")

            setTimeout(() => {
                const conatinerModal = document.querySelector(".container-modal")
    
                conatinerModal.remove()
                location.replace("/src/pages/DashBordAdmin/index.html")
            }, 3000)
        }

        return response

    } catch (err) {
        tooltip("Erro!", "Algo deu errado")
    }
}