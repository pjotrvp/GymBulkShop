export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: string;
    reviews: string[];
    orders: string[];
}