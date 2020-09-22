import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../../config/config.module';

import { Configuration } from '../../Config/config.keys';
import { ConfigService } from '../../Config';

import { AuthService, SetUserMenuService } from './services/authServices.index';
// import { ModelsModule } from '../users/models/models.module';


@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    // ModelsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Configuration.JWT_SECRET),
          signOptions: {
            expiresIn: 3600,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SetUserMenuService],
  exports: [JwtStrategy, PassportModule],
})

export class AuthModule {}
