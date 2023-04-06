import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private allowedRole: string) {}

  canActivate(context: ExecutionContext): boolean {
    const host = context.switchToHttp(),
      request = host.getRequest();

    const user = request['user'];
    const allowed = this.isAllowed(user.role);

    if (!allowed) {
      throw new ForbiddenException();
    }

    return true;
  }

  isAllowed(userRole: string) {
    let allowed = false;

    if (this.allowedRole.includes(userRole)) {
        allowed = true;
    }

    return allowed
  }
}
