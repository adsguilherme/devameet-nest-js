// eslint-disable-next-line prettier/prettier
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/ispublic.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // O que seria esse reflector ?
  // Esse contrutor terá como parâmetro de entrada reflector do tipo reflector.
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canAnctivate = super.canActivate(context);

    if (typeof canAnctivate === 'boolean') {
      return canAnctivate;
    }

    const canActivatePromisse = canAnctivate as Promise<boolean>;

    return canActivatePromisse.catch((error) => {
      if (error && error.message) {
        throw new UnauthorizedException(error.message);
      }

      throw new UnauthorizedException();
    });
  }
}
