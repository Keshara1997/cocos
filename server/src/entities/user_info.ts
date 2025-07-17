import "reflect-metadata";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user_info')
export class UserInfo {

    @PrimaryColumn('int', {
        name: 'user_id',
        nullable: false,
        generated: true
    })
    userId!: number;

    @Column('varchar', {
        name: 'user_name',
        nullable: false,
        unique: true
    })
    userName!: string;

    @Column('varchar', {
        name: 'password',
        nullable: false
    })
    password!: string;

    @Column('varchar', {
        name: 'name',
        nullable: false
    })
    name!: string;

    @Column('varchar', {
        name: 'user_head_url',
        nullable: true
    })
    userHeadUrl?: string;

    @Column('int', {
        name: 'user_room_cards',
        nullable: false,
        default: 0
    })
    userRoomCards!: number;

    @Column('int', {
        name: 'room_id',
        nullable: false,
        default: 0
    })
    roomId!: number;

    @Column('datetime', {
        name: 'created_at',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt!: Date;

}