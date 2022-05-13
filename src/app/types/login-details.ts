import { CardOptions } from "./card";

export class LoginDetails{
    name: string = '';
    password: string = '';
}


export const fieldsSettings: Array<CardOptions> = [
    {id: 'name', label: 'Name', validation: ['required']},
    {id: 'password', label: 'Password', validation: ['required']}
]