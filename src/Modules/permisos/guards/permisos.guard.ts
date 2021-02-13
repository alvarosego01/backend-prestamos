import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PermisoService } from '../services/permisos.service';

@Injectable()
export class PermisosGuard implements CanActivate 
{
 	constructor
 	(
 		private readonly _permisoService:PermisoService
 	)
 	{}

 	private async getPermisos(_id:string){ return await this._permisoService.getOnePermisoByUser(_id); }

  	canActivate(
  	  context: ExecutionContext,
  	): boolean  
  	{

  		const request = context.switchToHttp().getRequest();
    	const { user } = request;

    	console.log(this.getPermisos(user._id));
    	return true;
  	}
}
