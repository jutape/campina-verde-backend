import { Event } from "../db/entities/Event.js";

const getAllEvents = async () => {
  return Event.find();
};

const getEventByDate = async (date: string) => {
  return Event.findOne({ where: { date } });
};

const createEvent = async (payload: Partial<Event>) => {
  const event = Event.create(payload);
  return event.save();
};

const updateEvent = async (date: string, payload: Partial<Event>) => {
  const event = await Event.findOne({ where: { date } });
  if (event) {
    Object.assign(event, payload);
    return event.save();
  }
  throw new Error("Event not found");
};

const deleteEvent = async (date: string) => {
  const event = await Event.findOne({ where: { date } });
  if (event) {
    await Event.remove(event);
    return { success: true, message: "Event successfully deleted" };
  }
  throw new Error("Event not found");
};

export { getAllEvents, getEventByDate, createEvent, updateEvent, deleteEvent };
