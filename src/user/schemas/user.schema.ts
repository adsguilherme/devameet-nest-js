// Mapear nossa tabela com o nosso objeto do Nest.

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true }) // Devemos usar o decorator prop para transformar em um propriedade do schema
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop() // Avatar não é required.
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
