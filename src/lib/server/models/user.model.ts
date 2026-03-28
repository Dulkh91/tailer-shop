import type { ObjectId } from 'mongodb';

export interface User{
  _id?: ObjectId;
  userName: string;
  fullName: string;
  password: string;
  createdAt: Date;
}

export interface JWTPayload {
  userId: string;
  userName: string;
  fullName: string
}