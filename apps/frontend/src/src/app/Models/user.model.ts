import { Entity } from './entity.model';

export class User extends Entity {
    username : string = '';
    email : string = '';
    password : string = '';
    constructor(
        id : string,
        username : string,
        email : string,
        password : string,
    ) {
        super(id);
        this.username = username;
        this.email = email;
        this.password = password;
    }
}