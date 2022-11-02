import { checkUserTypeApi } from "./api.js";
import { getLocalStorage } from "./LocalStorage.js";

async function checked() {
    let token = getLocalStorage("@loginUser: token")

    let resp = await checkUserTypeApi(token)
    
    if (resp.is_admin === true) {
        location.replace("/src/pages/DashBordAdmin/index.html")
    } else {
        location.replace("/src/pages/DashBordUser/index.html")
    }
}


export default checked