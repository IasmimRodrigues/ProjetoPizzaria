import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string;
}

class CreateCategoryService {
    async execute({name}:CategoryRequest) {
        if(name==='') {
            throw new Error('Nome inválido')
        }

        const category = await prismaClient.categoria.create(
            {
                data: {
                    nome:name,
                },
                select: {
                    id: true,
                    nome: true,
                }
            }
        )

        return category;
    }
}

export {CreateCategoryService}