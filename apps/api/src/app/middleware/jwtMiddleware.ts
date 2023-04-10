import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}
    use(req: any, res: any, next: (error?: any) => void) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.slice(7, authHeader.length);
            try {
                const decoded = this.jwtService.verify(token);
                req.user = decoded;
            } catch (error) {
                throw new Error('Invalid token.');
            }
        }
        next();
    }
    
}