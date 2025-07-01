import "reflect-metadata";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user_info')
export class UserInfo {

    @PrimaryColumn('int', {
        name: 'user_id',
        nullable: false
    })
    userId!: number;

    @Column('varchar', {
        name: 'User_name',
        nullable: false
    })
    userName!: string;

    @Column('varchar', {
        name: 'user_head_url',
    })
    userHeadUrl!: string;

    @Column('int', {
        name: 'user_room_cards',
        nullable: false
    })
    userRoomCards!: number;

    @Column('int', {
        name: 'room_id',
        nullable: false,
        default: 0
    })
    roomId!: number;

}