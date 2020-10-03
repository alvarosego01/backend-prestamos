import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/services.index';
import { UsersModelsModule } from '../users/models/usersModels.module';

@Module({
  imports:[UsersModelsModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
