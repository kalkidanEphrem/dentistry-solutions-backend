import { Request, Response } from "express";
import {sql} from '@vercel/postgres'

class BlogController {
    async getAllBlogs(req: Request, res: Response) {
        try {
            const blogs = await sql `SELECT * FROM blogs`;
            res.status(200).json(blogs)
        } catch (error) {
              console.error(error)
              res.status(500).send('Internal Server Error')  
        }     
    }

    async getBlogById(req: Request, res: Response) {
        const {id} = req.params

        try {
            const blog = await sql `SELECT * FROM blogs WHERE id = ${id}`
            res.status(200).json(blog)
        } catch (error) {
            console.error(error)
            res.status(404).send('Blog not found')
        }
    }


    async createBlog(req: Request, res: Response) {
        const {title, discription, content, author } = req.body;

        try {
            const newBlog = await sql`INSERT INTO blogs (title, description, content, author) VALUES (${title}, ${discription}, ${content}, ${author}) RETURNING *`;
            res.status(201).json(newBlog);
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
    }

    async updateBlog(req: Request, res: Response) {
        const { id } = req.params;
        const { title, content } = req.body;
        try {
          const updatedBlog = await sql`UPDATE blogs SET title = $1, content = $2 WHERE id = $3 RETURNING *, (${title}, ${content}, ${id})`;
          res.status(200).json(updatedBlog)
        } catch (error) {
          console.error(error);
          res.status(404).send('Blog not found');
        }
      }
    
      async deleteBlog(req: Request, res: Response) {
        const { id } = req.params;
        try {
          await sql `DELETE FROM blogs WHERE id = $1', ${id}`;
          res.status(204).end();
        } catch (error) {
          console.error(error);
          res.status(404).send('Blog not found');
        }
      }


}

export default new BlogController();