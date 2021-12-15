import {
    Injectable,
    CanActivate,
    ExecutionContext,
    SetMetadata,
    Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from '../helper/jwtutility';
import { UserService } from '../user.service';

export const ROLES_KEY = 'roles';
export const Roles = (...roles) => SetMetadata(ROLES_KEY, roles);


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject(UserService) private readonly userService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        // const required_roles_array =
        //     requiredRoles.split(',')
        const request = context.switchToHttp().getRequest();
        const user_token = request.headers.authorization;
        if (user_token) {
            let resp = false;
            await verify(user_token, async (err, decoded) => {
                if (decoded) {
                    const user_id = decoded.id;
                    const userRoles = [];
                    const type = decoded.type
                    // @ts-ignore
                    if(requiredRoles.includes(type)) {
                        resp = true
                    } else {
                        resp = false
                    }

                }
                else{
                }
            });
            return resp;
        }

    }
}