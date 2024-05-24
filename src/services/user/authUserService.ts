import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  senha: string;
}

class AuthUserService {
  async execute({ email, senha }: AuthRequest) {
    // console.log(email);

    // return{ok:true}

    const user = await prismaClient.usuario.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Usuário ou senha incorretos!");
    }

    const senhaMatch = await compare(senha, user.senha);

    if (!senhaMatch) {
      throw new Error("Usuário ou senha incorretos!");
    }

    const token = sign(
      {
        nome: user.name,
        usuario: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
  );

    return { 
      id: user.id,
      nome: user.name,
      email: user.email,
      token: token
     };
  }
}

export { AuthUserService };
