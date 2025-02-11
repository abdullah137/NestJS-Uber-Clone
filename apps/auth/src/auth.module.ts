import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import appConfig from 'libs/common/app.config';
import authConfig from 'libs/common/auth.config';
import { LoggerModule } from 'libs/common/logger/logger.module';
import { AuthenticationMiddleware } from 'libs/common/middlewares/authentication.middleware';
import RequestLoggerMiddleware from 'libs/common/middlewares/request-logger.middleware';
import { SecurityModule } from 'libs/common/security/security.module';
import { ValidatorModule } from 'libs/common/validators/validator.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import databaseConfig from './database/config/database.config';
import { MongooseConfigService } from './database/mongoose-config.service';

const infrastructureDatabaseModule = MongooseModule.forRootAsync({
  useClass: MongooseConfigService,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    LoggerModule,
    SecurityModule,
    ValidatorModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer
      .apply(AuthenticationMiddleware)
      .exclude(
        { path: '/auth/signin', method: RequestMethod.POST },
        { path: '/auth/signup', method: RequestMethod.POST },

        { path: '/auth/resend-link', method: RequestMethod.POST },
        { path: '/auth/forget-password', method: RequestMethod.POST },
        { path: '/auth/activate-reset-password', method: RequestMethod.PATCH },

        { path: '/welcome', method: RequestMethod.GET },
        { path: '/health-check', method: RequestMethod.GET },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
