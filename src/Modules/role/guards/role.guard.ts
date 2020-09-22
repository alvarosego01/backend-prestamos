import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    const roles: string[] = this._reflector.get<string[]>(
      'rol',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;


    // const hasRole = () => {
    //   // user.rol.some((role: string) => roles.includes(role));
    //   if(String(user.rol) === String(roles[0])){
    //     console.log('true');
    //     return true;
    //   }else{
    //     console.log('false');
    //     return false;
    //   }

    // }

    if((user) && (user.rol) && ( String(user.rol) === String(roles[0] ))){
      return true;
    }else{
      return false;
    }

    // const hasRole = () =>
    // user.rol.some((role: string) => roles.includes(role));
    // return user && user.rol && hasRole();


  }



}
