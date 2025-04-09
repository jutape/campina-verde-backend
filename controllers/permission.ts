import { In } from "typeorm"
import { Permission } from "../db/entities/Permission.js"
import { Role } from "../db/entities/Role.js"
import { NSPermission } from "../types/permission.js"

const creatPermission = async (payload: NSPermission.Item) => {
  // Verifica se já existe uma permissão com o mesmo nome
  if (!payload.name) {
    throw new Error("Permission name cannot be null or empty");
  }

  const existingPermission = await Permission.findOne({ where: { name: payload.name } });
  if (existingPermission) {
    throw new Error(`Permission with name '${payload.name}' already exists`);
  }

  const newPermission = Permission.create(payload);
  return newPermission.save();
};

export {creatPermission}