import { Document } from "mongooose";

export namespace UserTypes {
  export interface UserSchema extends Document {
    name?: string;
    email: string;
    emailUnsubscribed?: boolean;
  }

  export interface CreateUserPayload {
    name?: string;
    email: string;
    emailUnsubscribed?: boolean;
  }
}
