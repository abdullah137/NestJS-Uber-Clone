import { Injectable } from '@nestjs/common';
import { UserSchemaClass } from '../entities/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserMapper } from '../mappers/user.mapper';
import { Model, UpdateQuery } from 'mongoose';
import { UserRepository } from '../user.repository';
import { User } from '../../types/user';
import { NullableType } from 'libs/utils/types/nullable.type';
import { Role } from 'libs/utils/enums';

@Injectable()
export class UsersDocumentRepository implements UserRepository {
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<UserSchemaClass>,
  ) {}

  async findUsers(): Promise<User[]> {
    const userObjects = await this.usersModel.find({ role: Role.USER });
    return userObjects.map((userObject) => UserMapper.toDomain(userObject));
  }

  async findByVerificationLink(link: string): Promise<NullableType<User>> {
    const userObject = await this.usersModel.findOne({
      verificationLink: link,
    });
    return userObject ? UserMapper.toDomain(userObject) : null;
  }

  async create(data: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(data);
    const createdUser = new this.usersModel(persistenceModel);
    const userObject = await createdUser.save();
    return UserMapper.toDomain(userObject);
  }

  async findById(id: User['id']): Promise<NullableType<User>> {
    const userObject = await this.usersModel.findOne({ _id: id }).lean();
    return userObject ? UserMapper.toDomain(userObject) : null;
  }

  async findByIds(ids: User['id'][]): Promise<User[]> {
    const userObjects = await this.usersModel.find({ _id: { $in: ids } });
    return userObjects.map((userObject) => UserMapper.toDomain(userObject));
  }

  async findByEmail(email: User['email']): Promise<NullableType<User>> {
    if (!email) return null;

    const userObject = await this.usersModel.findOne({ email }).lean();
    return userObject ? UserMapper.toDomain(userObject) : null;
  }

  async update(id: User['id'], payload: Partial<User>) {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const user = await this.usersModel.findOne(filter).lean();

    if (!user) {
      return null;
    }

    const userObject = await this.usersModel.findOneAndUpdate(
      filter,
      {
        $set: UserMapper.toPersistence({
          ...UserMapper.toDomain(user),
          ...clonedPayload,
        }),
      },
      { new: true },
    );

    return userObject;
  }

  async countByEmail(email: string): Promise<number> {
    const count = await this.usersModel.countDocuments({ email });
    return count;
  }

  async remove(id: User['id']): Promise<void> {
    await this.usersModel.deleteOne({
      _id: id.toString(),
    });
  }

  async updateUsingMongoose(
    id: User['id'],
    payload: Partial<User> | UpdateQuery<User>,
  ) {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const user = await this.usersModel.findOne(filter).lean();

    if (!user) {
      return null;
    }

    const userObject = await this.usersModel.findOneAndUpdate(filter, payload, {
      new: true,
    });

    return userObject;
  }
}
