

import {
    Operation,
    } from '../';

import { User } from '../../admin/';

export class BankAccount {
    constructor(
        public id?: number,
        public name?: string,
        public balance?: number,
        public user?: User,
        public operation?: Operation,
    ) { }
}
