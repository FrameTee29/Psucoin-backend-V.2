import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from './entity/users.entity';
import { CreateUserDto, CreateUserDetailDto } from './dto/create-user.dto';
import * as soap from 'soap';
import * as bcrypt from 'bcrypt';
import Axios from 'axios';
import { createWriteStream } from 'fs';
import { Profile } from 'src/profile/entity/profile.entity';
var sha256 = require('sha256')

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_REPOSITORY') private user: typeof User) { }


    // async findAll(): Promise<User[]> {
    //     const user = await this.user.findAll<User>();
    //     return user;
    // }

    async findAll(): Promise<User[]> {
        const user = await this.user.findAll({include:[Profile]});
        return user;
    }

    async getUserBySid(sid: string) {
        const found = await this.user.findByPk(sid);
        if (!found) {
            return 0;
        }
        return found;
    }

    async getBySid(sid: string) {
        const found = await this.user.findAll({
            include:[Profile],
            where: {
                sid: sid
            }
        });
        return found;
    }

    async getPasswordBysid(sid: string) {
        const found = await this.user.findAll({
            attributes: ['password'],
            where: {
                sid: sid
            }
        });
        if (!found) {
            return 0;
        }
        
        return found[0].toJSON();
    }

    async  loginPSUPassport(psuPassport, password) {
        const PSU_URL = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';
        return new Promise((resolve, reject) => {
            soap.createClient(PSU_URL, (err, client) => {
                if (err) return reject(err);

                let user = {
                    username: psuPassport,
                    password: password
                }

                client.GetStaffDetails(user, (err, response) => {
                    if (err) return reject(err);
                    else
                        return resolve(response.GetStaffDetailsResult.string);
                })
            })
        })
    }

    async siginIn(CreateUserDto: CreateUserDto) {
        const result = await this.loginPSUPassport(CreateUserDto.username, CreateUserDto.password);
        const profile = new User();
        if (result[0] == '') {
            return "Password Incorrect";
        }
        else {
            profile.sid = result[0];
            profile.password = await sha256(CreateUserDto.password);
            profile.firstname = result[1];
            profile.lastname = result[2];
            profile.cid = result[3];
            const checkusername = await this.getUserBySid(result[0]);
            if (checkusername) {
                return checkusername;
            }
            else {
                return this.user.create(profile.toJSON())
            }
        }

    }

}

