import { User } from '../../types/user';
import { UserSchemaClass } from '../entities/user.schema';

export class UserMapper {
  static toDomain(raw: UserSchemaClass): User {
    const domainEntity = new User();
    domainEntity.id = raw._id.toString();
    domainEntity.email = raw.email;
    domainEntity.password = raw.password;
    domainEntity.fullName = raw.fullName;
    domainEntity.phone = raw.phone;
    domainEntity.profile = raw.profile;
    domainEntity.role = raw.role;
    domainEntity.verificationLink = raw.verificationLink;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.profile = raw.profile;
    domainEntity.isActivated = raw.isActivated;
    return domainEntity;
  }

  static toPersistence(domainEntity: User): UserSchemaClass {
    const persistenceSchema = new UserSchemaClass();
    if (domainEntity.id && typeof domainEntity.id === 'string') {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.email = domainEntity.email;
    persistenceSchema.password = domainEntity.password;
    persistenceSchema.fullName = domainEntity.fullName;
    persistenceSchema.phone = domainEntity.phone;
    persistenceSchema.isActivated = domainEntity.isActivated;
    persistenceSchema.profile = domainEntity.profile;
    persistenceSchema.verificationLink = domainEntity.verificationLink;
    persistenceSchema.profile = domainEntity.profile;
    persistenceSchema.role = domainEntity.role;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    persistenceSchema.deletedAt = domainEntity.deletedAt;
    return persistenceSchema;
  }
}
