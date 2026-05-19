import { safeStorage } from "electron";
import { getToken } from "./oauth";

let token = getToken();

(async () => {
    if (token) {
        const decryptedToken = await safeStorage.decryptString(token)
    }
})()

async function getDecryptedToken() {
    if (!token) {
        console.log('No token found')
        return null
    } else {
        try {
            const decryptedToken = await safeStorage.decryptString(token)
            console.log('Decrypted token:', decryptedToken)
            return decryptedToken
        } catch (error) {
            console.error('Failed to decrypt token:', error)
            return null
        }
    }
}

export { getDecryptedToken }
