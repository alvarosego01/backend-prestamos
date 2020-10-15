import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { AdminService, AdminLicService, AdminHistService } from './services/services.index';
import { UsersModelsModule } from '../users/models/usersModels.module';
import { AdminModelModule } from './models/adminModel.module';

@Module({
  imports:[UsersModelsModule, AdminModelModule],
  controllers: [AdminController],
  providers: [AdminService, AdminLicService, AdminHistService]
})
export class AdminModule {}
