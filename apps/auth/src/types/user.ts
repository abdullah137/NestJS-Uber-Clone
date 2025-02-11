import { Exclude } from 'class-transformer';

export class User {
  id: string;
  email: string | null;
  @Exclude({ toPlainOnly: true })
  password?: string;
  phone: string;
  fullName: string;
  isActivated: boolean;
  profile?: string;
  verificationLink: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
