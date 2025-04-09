import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { Role } from "./Role.js";

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async validateName() {
    if (!this.name) {
      throw new Error("Permission name cannot be null or empty");
    }

    const existingPermission = await Permission.findOne({ where: { name: this.name } });
    if (existingPermission && existingPermission.id !== this.id) {
      throw new Error(`Permission with name '${this.name}' already exists`);
    }
  }
}