import { eventLogout } from "../../scripts/eventButtons.js";
import { renderSelectCompany } from "../../scripts/render.js";
import { eventShowMenu } from "../../scripts/showMenu.js";

eventShowMenu()
eventLogout()

await renderSelectCompany()


