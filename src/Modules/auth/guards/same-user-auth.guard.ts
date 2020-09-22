import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SameUserAuthGuard implements CanActivate {


  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const request = context.switchToHttp().getRequest();
    const { user } = request; //<- se obtiene el deshasheo del token

    // se compara si el id del dueño del token es el mismo del id pasado por params
    console.log('los reqs', request.params.id);



    return true;
  }
}
