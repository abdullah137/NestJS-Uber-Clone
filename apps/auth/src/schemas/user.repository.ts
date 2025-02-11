import { DeepPartial } from 'libs/utils/types/deep-partial.type';
import { NullableType } from 'libs/utils/types/nullable.type';
import { UpdateQuery } from 'mongoose';
import { User } from '../types/user';

export abstract class UserRepository {
  abstract create(
    data: Omit<User, 'id' | 'role' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<User>;

  abstract findById(id: User['id']): Promise<NullableType<User>>;
  abstract findByVerificationLink(
    id: User['verificationLink'],
  ): Promise<NullableType<Omit<User, 'password'>>>;
  abstract findByIds(ids: User['id'][]): Promise<User[]>;
  abstract findByEmail(email: User['email']): Promise<NullableType<User>>;
  abstract findUsers(): Promise<User[]>;
  abstract update(
    id: User['id'],
    payload: DeepPartial<User>,
  ): Promise<Omit<User, 'password' | 'id' | 'createdAt'> | null>;

  abstract countByEmail(email: User['email']): Promise<number>;
  abstract remove(id: User['id']): Promise<void>;
  abstract updateUsingMongoose(
    id: User['id'],
    payload: DeepPartial<User> | UpdateQuery<User>,
  );
}
