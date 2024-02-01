import { Request, Response } from 'express';
import {sql} from '@vercel/postgres'


class AuthController {
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await sql `SELECT * FROM admin`;
            res.status(200).json(users)
        } catch (error) {
            console.error(error)
            res.status(500).send('Internal Server Error')
        }
    }

    async getUserId(req: Request, res: Response) {
        const {id} = req.params

        try{
            const  user = await sql`SELECT * FROM admin WHERE id = ${id}`
            res.status(200).json(user)
        } catch (error) {
            console.error(error)
            res.status(404).send('User not found')
        }
    }

    async creatUser(req: Request, res: Response) {
        const { name, email, password,  role} = req.body

        try {
            const newUser = await sql`INSERT INTO admin (name, email, password, role) VALUES (${name}, ${email}, ${password}, ${role}) `
            res.status(200).json(newUser)

        } catch (error) {
            console.error(error)
            res.status(505).send('Internal Server Error')
        }
    }

    async updateUser(req: Request, res: Response) {
        const {id} = req.params;
        const {name, email, password, role} = req.body;

        try {
            const updateUser = await sql`UPDATE admins SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *, (${name}, ${email}, ${password}, ${role}, ${id}) `
            res.status(201).json(updateUser)
        } catch (error) {
            console.error(error);
            res.status(404).send('User not found');
        }
    }

    async deleteUser(req: Request, res: Response) {
        const {id} = req.params;
        try {
            await sql`DELETE FROM admin WHERE id = $1, ${id}`
            res.status(204).end()
        } catch (error) {
            console.error(error);
            res.status(404).send('Blog not found')
        }
    }


}


export default new AuthController();