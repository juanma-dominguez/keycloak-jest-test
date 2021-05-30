export interface UserDomainModel {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  enabled: boolean;
  deleted: boolean;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}
export type NewUserDomainModel = Pick<UserDomainModel, 'id' | 'email' | 'firstName' | 'lastName'>;
export type UserProfileDomainModel = Pick<UserDomainModel, 'id' | 'email' | 'firstName' | 'lastName'>;
