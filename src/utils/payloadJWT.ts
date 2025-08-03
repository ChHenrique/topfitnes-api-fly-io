import { Role } from "@prisma/client";

export function payloadJWT(user: any, role: Role){
    const payload = {
        id: user.id,
        role,
        email: user.email,
        telefone: user.telefone,
        rememberMe: true
    };
    
    return payload
}