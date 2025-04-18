import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { Role } from "./entities/Role.js";
import { Permission } from "./entities/Permission.js";
import { Profile } from "./entities/Profile.js";
import { Event } from "./entities/Event.js";


const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST_NAME,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Role, Permission, Profile, Event],
  synchronize: true,
  logging: false,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

dataSource.initialize()
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1); // Encerra o processo em caso de falha
  });

export default dataSource;