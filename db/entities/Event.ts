import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', unique: true })
  date: string;

  @Column({ nullable: true })
  prayer: string;

  @Column({ nullable: true })
  sermonTheme: string;

  // Regular service fields
  @Column({ nullable: true })
  initialHymn: string;

  @Column({ nullable: true })
  initialHymnUrl: string;

  @Column({ nullable: true })
  standingHymn: string;

  @Column({ nullable: true })
  standingHymnUrl: string;

  @Column({ nullable: true })
  initialMusicalMessage: string;

  @Column({ nullable: true })
  initialMusicalMessageUrl: string;

  @Column({ nullable: true })
  initialMusicalMessagePerformer: string;

  @Column({ nullable: true })
  finalMusicalMessage: string;

  @Column({ nullable: true })
  finalMusicalMessageUrl: string;

  @Column({ nullable: true })
  finalMusicalMessagePerformer: string;

  @Column({ nullable: true })
  finalHymn: string;

  @Column({ nullable: true })
  finalHymnUrl: string;

  // Sabbath School specific fields
  @Column({ nullable: true })
  sabbathSchoolHymn: string;

  @Column({ nullable: true })
  sabbathSchoolHymnUrl: string;

  @Column({ nullable: true })
  sabbathSchoolAdultTeacher: string;

  @Column({ nullable: true })
  sabbathSchoolYouthTeacher: string;

  @Column({ nullable: true })
  sabbathSchoolMusicalMessage: string;

  @Column({ nullable: true })
  sabbathSchoolMusicalMessageUrl: string;

  @Column({ nullable: true })
  sabbathSchoolMusicalMessagePerformer: string;

  // Divine Service specific fields
  @Column({ nullable: true })
  divineServiceHymn: string;

  @Column({ nullable: true })
  divineServiceHymnUrl: string;

  @Column({ nullable: true })
  preacherHymn: string;

  @Column({ nullable: true })
  preacherHymnUrl: string;

  @Column({ nullable: true })
  divineServiceInitialMusicalMessage: string;

  @Column({ nullable: true })
  divineServiceInitialMusicalMessageUrl: string;

  @Column({ nullable: true })
  divineServiceInitialMusicalMessagePerformer: string;

  @Column({ nullable: true })
  divineServiceFinalMusicalMessage: string;

  @Column({ nullable: true })
  divineServiceFinalMusicalMessageUrl: string;

  @Column({ nullable: true })
  divineServiceFinalMusicalMessagePerformer: string;

  @Column({ nullable: true })
  divineServiceFinalHymn: string;

  @Column({ nullable: true })
  divineServiceFinalHymnUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
