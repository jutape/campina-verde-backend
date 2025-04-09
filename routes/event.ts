import express from "express";
import { authenticate } from "../middlewares/auth/authenticate.js";
import { authorize } from "../middlewares/auth/authorize.js";
import { getAllEvents, getEventByDate, createEvent, updateEvent, deleteEvent } from "../controllers/event.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await getAllEvents();
    res.json({ events });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/date/:date", authenticate, async (req, res) => {
  try {
    const event = await getEventByDate(req.params.date);
    if (event) {
      res.json({ event });
    } else {
      res.status(404).send("Event not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", authenticate, authorize("CREATE_event"), async (req, res) => {
  try {
    const event = await createEvent(req.body);
    res.status(201).json({ event });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/date/:date", authenticate, authorize("EDIT_event"), async (req, res) => {
  try {
    const event = await updateEvent(req.params.date, req.body);
    res.json({ event });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/date/:date", authenticate, authorize("DELETE_event"), async (req, res) => {
  try {
    const result = await deleteEvent(req.params.date);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
