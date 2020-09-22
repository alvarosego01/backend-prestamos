import { Injectable } from '@nestjs/common';

import * as  Moment from "moment-timezone";
const dateMoment = Moment().tz("America/Montevideo");
dateMoment.locale('es');


@Injectable()
export class DateProcessService {



    setDate(){

        return dateMoment.format('dddd,LL,h:mm A').split(',');

    }


}
