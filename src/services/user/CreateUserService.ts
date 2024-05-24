import { PrismaClient } from "@prisma/client"; //objeto do framework - converte função js para sql
import prismaClient from "../../prisma";
import {hash} from "bcryptjs";


interface UserRequest{
    name: string
    email: string
    senha: string
}

class CreateUserService {
    async execute({name, email, senha}:UserRequest) {

        if(!email) {
            throw new Error("E-mail não enviado!");
        }
        const UserAlreadyExists = await prismaClient.usuario.findFirst({
            where:{
                email:email
            }
        })

        if(UserAlreadyExists) {
            throw new Error("E-mail já cadastrado!");
        }

        const senhaHash = await hash(senha, 8);

        const user = await prismaClient.usuario.create({
            data:{
                name: name,
                email: email, 
                senha: senhaHash,
            },
            select:{
                id:true,
                name:true,
                email:true,
            }
        })
        return user;
        
        // return {ok:true}
    }
}

export {CreateUserService}