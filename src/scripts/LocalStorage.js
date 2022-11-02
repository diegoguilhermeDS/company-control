function setLocalStorage(type, data) {
    localStorage.setItem(`${type}`, JSON.stringify(data))
}

function getLocalStorage(type) {
    return JSON.parse(localStorage.getItem(`${type}`)) || []
}

export {
    setLocalStorage,
    getLocalStorage
}