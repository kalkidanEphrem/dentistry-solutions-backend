import { Request, Response } from "express";
import {sql} from "@vercel/postgres";


class AppointmentController {
    async getAllAppointments(req: Request, res: Response) {
        try {
            const appointments = await sql`SELECT * FROM schedule`;
            res.status(200).json(appointments)
        } catch (error){
            console.error(error);
            res.status(500).send("Internal Server Error")
        }
    }

    async getAppointmentById(req: Request, res: Response) {
        const {id} = req.params;

        try {
            const appointment = await sql`SELECT * FROM schedule WHERE id = ${id}`;
            res.status(200).json(appointment)
        } catch (error) {
            console.error(error);
            res.status(404).send("Appointment not found")
        }
    }

    async createAppointment(req: Request, res: Response) {
        const { firstName, lastName, scheduleDate, scheduleTime, serviceId } = req.body;

        try{
            await sql`INSERT INTO appointments (first_name, last_name, service_id, schedule_date, schedule_time) VALUES (${firstName}, ${lastName}, ${scheduleDate}, ${scheduleTime}, ${serviceId})`;
            res.status(201).send("Appointment has been scheduled");
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async updateAppointment(req: Request, res: Response) {
        const {id} = req.params;
        const { firstName, lastName, service_id, scheduleDate, scheduleTime } = req.body;
        try {
          const result = await sql`
            'UPDATE appointments SET first_name = $1, last_name = $2, schedule_date = $3, schedule_time = $4, service_id = $5 WHERE id = $6 RETURNING *',
            (${firstName}, ${lastName},${service_id}, ${scheduleDate}, ${scheduleTime},  ${id})`
        
          if (result.rows.length === 0) {
            return res.status(404).send('Appointment not found');
          }
          res.status(200).send("Appointment was updated");
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      }
    
      async deleteAppointment(req: Request, res: Response) {
        const {id} = req.params;
        try {
          const result = await sql`('DELETE FROM appointments WHERE id = $1 RETURNING *', ${id})`;
          if (result.rows.length === 0) {
            return res.status(404).send('Appointment not found');
          }
          res.status(204).end();
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      }

    };

export default new AppointmentController();
