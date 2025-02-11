import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { UsersDocumentRepository } from './repositories/user.repository';
import { UserSchema } from './entities/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [
    {
      provide: UserRepository,
      useClass: UsersDocumentRepository,
    },
  ],
  exports: [UserRepository],
})
export class DocumentUserPersistenceModule {}
