import { Injectable } from '@nestjs/common';
import { getRepository, Brackets } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import {verifyPassword} from "./helper/utilities";
import {issueJwtToken} from "./helper/jwtutility";
const Bcrypt = require('bcrypt');

@Injectable()
export class UserService {
    public async createUserService(user_body, request,  response): Promise<any> {
        const user_repo = getRepository(UserEntity);
        const hashed_password: any = await Bcrypt.hash(user_body.password, 10)
        const data = {
            name: user_body.name,
            email: user_body.email,
            password: hashed_password,
            type: user_body.type
        };

        const user_obj = user_repo.create(data);
        user_repo
            .createQueryBuilder('user')
            .where('user.email = :email', { email: data.email })
            .getOne()
            .then((user_exists) => {
                if (user_exists) {
                    return response.status(400).send({
                        data: null,
                        message: 'User already exist.',
                    });
                } else {
                    user_repo
                        .save(user_obj)
                        .then(() => {
                            response.status(201).send({
                                data: null,
                                message: 'User created successfully.',
                            });
                        })
                        .catch((err) => {
                            response.status(500).send({
                                data: null,
                                message: 'Error user not created',
                            });
                        });
                }
            })
            .catch((err) => {
                response.status(500).send({
                    data: null,
                    message: 'Error while fetching user.',
                });
            });
    }
    public async loginUserService(user_body, request,  response): Promise<any> {
        const user_repo = getRepository(UserEntity);

        user_repo
            .createQueryBuilder('user')
            .where('user.email = :email', { email: user_body.email })
            .getOne()
            .then((user) => {
                if (user) {
                    const userPassword = user.password
                    verifyPassword(user_body.password, user.password) .then(async (pass) => {
                        if (pass) {
                            const token = await issueJwtToken(user);
                            response.status(200).send({
                                data: {
                                    ...user,
                                    password: undefined,
                                    token,
                                },
                                message: 'User has been logged in successfully.',
                            });
                        } else {
                            response.status(401).send({
                                data: null,
                                message: 'The email and password entered are not valid.',
                            });
                        }
                    })
                        .catch(() => {
                            response.status(401).send({
                                data: null,
                                message: 'The email and password entered are not valid.',
                            });
                        });
                } else {
                            response.status(500).send({
                                data: null,
                                message: 'user not found or ',
                            });

                }
            })
            .catch((err) => {
                response.status(500).send({
                    data: null,
                    message: 'Error while fetching user.',
                });
            });
    }
}


