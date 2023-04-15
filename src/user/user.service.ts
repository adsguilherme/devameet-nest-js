import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from './dtos/register.dto';
import * as CryptoJS from 'crypto-js';
import { updateUserDto } from './dtos/updateuser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // create recebe o dto.
  async create(dto: RegisterDto) {
    // eslint-disable-next-line prettier/prettier
    dto.password = CryptoJS.AES.encrypt(dto.password, process.env.USER_CYPHER_SECRET_KEY).toString()

    const createdUser = new this.userModel(dto);
    await createdUser.save(); // save é uma promisse.
  }

  // Recebo um email e devolvo com uma promisse se tem ou não algo com esse email.
  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.userModel.findOne({ email });

    if (result) {
      return true;
    }
    return false;
  }

  // eslint-disable-next-line prettier/prettier
  async getUserByLoginPassword(email: string, password: string) : Promise<UserDocument | null>{ // Promisse que volta UserDocument ou nulo 
    const user = (await this.userModel.findOne({ email })) as UserDocument;

    if (user) {
      // eslint-disable-next-line prettier/prettier
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.USER_CYPHER_SECRET_KEY,); // Aqui está devolvendo a senha descriptografada, porém ela ainda está em bytes. 
      const savedPassword = bytes.toString(CryptoJS.enc.Utf8);

      // Se a senha do usuário que foi passada no payload é igual com a senha que está salva no banco, devolve o usuário.
      if (password === savedPassword) {
        return user;
      }
    }
    return null;
  }

  // Criando serviço para trazer usuário por id
  async getUserById(id: string) {
    return await this.userModel.findById(id);
  }

  // Criando serviço de update
  // id e dto são parâmetros de entrada
  async updateUser(id: string, dto: updateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, dto);
  }
}
