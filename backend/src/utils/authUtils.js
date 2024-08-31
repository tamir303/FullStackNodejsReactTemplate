import { extractUserIdFromToken } from "./userUtils.js"

export const verifyTokenAndExtractId = (req) => {
    const token = req.cookies?.token;

    if (!token)
        throw new Error("No token found!")

    return extractUserIdFromToken(token)
}