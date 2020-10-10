import { Injectable } from '@nestjs/common';
import { responseInterface, _configPaginator, _argsPagination, _dataPaginator, _argsUpdate } from 'src/Response/interfaces/interfaces.index';
import { ProcessDataService, DateProcessService } from 'src/Classes/classes.index';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { responseChangeRoleDTO, RoleUserDto, LicenseDTO } from '../models/dto/dto.index';
import { License } from "../models/schemas.index";

@Injectable()
export class AdminLicService 
{
    constructor
    (
        @InjectModel(License.name) private _licenseModel:Model<License>,
        private _processData:ProcessDataService,
        private _dateService:DateProcessService,
        private _Response:responseInterface
    )
    {}

    async getLicense():Promise<responseInterface>
    {
        const parameters: _dataPaginator = { // <- paginate parameters

            page: 1 || _configPaginator.page,
            limit: 12 || _configPaginator.limit,
            customLabels: _configPaginator.customLabels,
            sort: { _id: -1 },

        }

        const args: _argsPagination = {

            findObject: {},
            options: parameters

        }

        await this._processData._findDB(this._licenseModel, args).then(r =>
        {
            this._Response = r;
        }, err =>
        {
            this._Response = err;
            // this._Response.message =
        });

        return this._Response;
    }

    async getUserLicense(id:string):Promise<responseInterface>
    {
        const parameters: _dataPaginator = { // <- paginate parameters

            page: 1 || _configPaginator.page,
            limit: 12 || _configPaginator.limit,
            customLabels: _configPaginator.customLabels,
            sort: { _id: -1 },

        }

        const args: _argsPagination = {

            findObject: {
                _id:id
            },
            options: parameters

        }

        await this._processData._findDB(this._licenseModel, args).then(r =>
        {
            this._Response = r;
        }, err =>
        {
            this._Response = err;
            // this._Response.message =
        });

        return this._Response;
    }

    async setLicense(license:LicenseDTO):Promise<responseInterface>
    {
        const data = new this._licenseModel(license);

        await this._processData._saveDB(data).then(r =>
        {
            this._Response = r;
        }, err =>
        {
            this._Response = null;
            this._Response.data = "Error en los parámetros"
        });

        return this._Response;
    }
}
