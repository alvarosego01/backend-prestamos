import { Injectable } from '@nestjs/common';

import { rolesMenu , subRolesMenu} from 'src/Modules/role/rolesMenu/rolesMenu.index';


@Injectable()
export class SetUserMenuService {


    setMenu(role, subRole = null): any{

        console.log('el rol', role);

        const menu = [];

        menu.push({
            sessionBaseUrl: rolesMenu.sessionBaseUrl
        })

        menu.push({
            general: rolesMenu.GENERAL
        });

        menu.push({
            role: rolesMenu[role]
        })

        if(subRole != null){

            menu.push({
                subRole: subRolesMenu[subRole]
            })

        }


        return menu;



    }

}
