import express from "express";
import AppointmentController from "../controller/scheduleController";;

const scheduleRouter = express.Router();

scheduleRouter.post('/appointments', AppointmentController.createAppointment);
scheduleRouter.get('/appointments', AppointmentController.getAllAppointments);
scheduleRouter.get('/appointments/:id', AppointmentController.getAppointmentById);
scheduleRouter.put('/appointments/:id', AppointmentController.updateAppointment);
scheduleRouter.delete('/appointments/:id', AppointmentController.deleteAppointment);


export default scheduleRouter;