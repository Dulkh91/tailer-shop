import { ObjectId } from 'mongodb';

export interface CustomerList{
  _id: ObjectId;
  userId: string;
  name: string;
  createdAt: Date;
}

export interface Customer {
  _id: ObjectId;
  userId: string;
  name: string;
  phone: string;
  order: GarmentOrder[];
  createdAt: Date;
}

export interface GarmentOrder {
  type: 'Cloth' | 'Pant';   // garment type
  measurements: Cloth | Pant;
}

export interface CreateCustomer {
  name: string;
  phone: string;
  order: GarmentOrder[]
}


export type Cloth = {
  length: number; // សំរុង
  shoulder: number; // ស្មារ
  sleeve_length: number; // សំរុងដៃ
  arm_girth: number; // កំពួនដៃ
  chest: number; // ទ្រុង
  stomach: number; // ក្បាលពោះ
  hip: number; // ត្រកៀក
};

export type Pant = {
  length: number; // សំរុង
  waist: number; // ចង្កេះ
  hip: number; // ត្រកៀក
  bottom: number; // កូថ
  leg: number; // ជើង
};
