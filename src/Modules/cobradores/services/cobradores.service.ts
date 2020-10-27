import 
{
    Injectable
  
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import 
{ 
    DateProcessService, 
    ProcessDataService 
} from 'src/Classes/classes.index';

import 
{ 
    responseInterface ,
    _configPaginator, 
    _dataPaginator, 
    _argsPagination, 
    _argsFind, 
    _argsUpdate
} from 'src/Response/interfaces/interfaces.index';

@Injectable()
export class CobradorService
{
    private _Response:responseInterface;
}
