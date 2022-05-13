import { CardOptions } from "./card";

export class Address{
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export class Geo{
    lat: string;
    lng: string;
}

export class Company{
    name: string;
    catchPhrase: string;
    bs: string;
}

export class PersonDetails{
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export class Person{
    name: string = '';
    username: string = '';
    email: string = '';
    street: string = '';
    suite: string = '';
    city: string = '';
    zipcode: string = '';
    lat: string = '';
    lng: string = '';
    phone: string = '';
    website: string = '';
    companyName: string = '';
    catchPhrase: string = '';
    bs: string = '';
}

export const tableSettings: Array<CardOptions> = [
    {id: 'id', label: 'Id', validation: []},
    {id: 'name', label: 'Name', validation: []},
    {id: 'username', label: 'Username', validation: []},
    {id: 'email', label: 'Email', validation: []},
]


export const fieldsSettings: Array<CardOptions> = [
    {id: 'id', label: 'Id', validation: [], disabled: true},
    {id: 'name', label: 'Name', validation: ['required']},
    {id: 'username', label: 'Username', validation: ['required']},
    {id: 'email', label: 'Email', validation: ['required', 'email']},
    {id: 'street', part: 'address', label: 'Street', validation: []},
    {id: 'suite', part: 'address', label: 'Suite', validation: []},
    {id: 'city', part: 'address', label: 'City', validation: []},
    {id: 'zipcode', part: 'address', label: 'Zipcode', validation: []},
    {id: 'lat', part: 'address', subpart: 'geo', label: 'Latitude', validation: []},
    {id: 'lng', part: 'address', subpart: 'geo', label: 'Longitude', validation: []},
    {id: 'phone', label: 'Phone', validation: []},
    {id: 'website', label: 'Website', validation: []},
    {id: 'companyName', part: 'company', label: 'Company name', validation: []},
    {id: 'catchPhrase', part: 'company', label: 'Catch Phrase', validation: []},
    {id: 'bs', part: 'company', label: 'BS', validation: []},
]

export class SearchParams{
    pageIndex: number;
    pageSize: number;
}

export interface PagedResponse{
    personList: Array<PersonDetails>;
    totalElements: number;
}