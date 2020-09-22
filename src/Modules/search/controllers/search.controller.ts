import { Controller, Get } from "@nestjs/common";
import { UsersService } from "src/Modules/users/services/services.index";

@Controller("search")
export class SearchController {
  constructor(private _userService: UsersService) {}

  @Get()
  getHello(): string {
    return this._userService.pruebaRuta("search");
  }
}
