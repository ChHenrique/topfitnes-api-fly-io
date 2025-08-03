import { fastifyContextDTO } from "src/interfaces/fastifyContextDTO";
import { loginAdminSchema, LoginAdminSchemaDTO } from "src/schemas/adminSchema";
import { getUserByEmail, getUserByPhone } from "src/services/database/IUserRepository";
import { ServerError } from "src/services/serverError";
import bcrypt from 'bcrypt'
import { timeValidityJWT } from "src/utils/timeValidityJWT";
import { payloadJWT } from "src/utils/payloadJWT";
import jwt from "jsonwebtoken"
import { validateStudentPlan } from "src/services/planService";

export async function loginUserController(fastify: fastifyContextDTO){
    const body = fastify.req.body as LoginAdminSchemaDTO;
    let user;

    const parsedData = loginAdminSchema.safeParse(body);
    if (!parsedData.success) throw new ServerError("Informações inválidas");

    const { email, telefone, senha } = parsedData.data;

    if (email) user = await getUserByEmail(email);
    else if (telefone) user = await getUserByPhone(telefone);
    else throw new ServerError("Email ou telefone são obrigatórios");

    if (!user) throw new ServerError("Credencias inválidas", 404);

    const comparePassword = await bcrypt.compare(senha, user.senha);
    if (!comparePassword) throw new ServerError("Credencias inválidas");

    let expiresIn = 1000 * 60 * 60 * 24, isStudent = false
    if (user.role === "ALUNO"){
        if (!user.aluno?.data_validade_plano) throw new ServerError("Data de matricula inválida");
        validateStudentPlan(user.aluno.id);
        expiresIn = timeValidityJWT(user.aluno.data_validade_plano);
        isStudent = true
    };

    const payload = payloadJWT(user, user.role);
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: isStudent ? expiresIn : "60d"
    });
fastify.res.setCookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: expiresIn,
  path: "/",
}).send({message: `Login realizado com sucesso, userRole: ${user.role}`,
         userRole: user.role,
        })

    // fastify.res.setCookie("token", token, {
    //     httpOnly: true,  
    //     secure: false, // process.env.NODE_ENV === "production"
    //     sameSite: "lax",
    //     maxAge: 60 * 60 * 24 * 7,// expiresIn,
    //     path: '/',// isStudent ? "/student" : "/"
    // }).send({message: `Login realizado com sucesso, userRole: ${user.role}`,
    //     userRole: user.role,
    // });
}
