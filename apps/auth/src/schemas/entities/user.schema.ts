import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EntityDocumentHelper } from 'libs/utils/document-entity-helper';
import { Role } from 'libs/utils/enums';
import { now, HydratedDocument } from 'mongoose';

export type UserSchemaDocument = HydratedDocument<UserSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class UserSchemaClass extends EntityDocumentHelper {
  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Boolean, default: false })
  isActivated: boolean;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, enum: Role, default: Role.USER, required: true })
  role: string;

  @Prop({ type: String, required: true })
  verificationLink: string;

  @Prop({ type: String, unique: true, required: true, lowercase: true })
  email: string;

  @Prop({
    type: String,
    default:
      'https://res.cloudinary.com/dzljyt3y1/image/upload/v1733748612/m5dciwudcttikkm3rgpg.jpg',
  })
  profile: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);

UserSchema.index({ email: 1 });
