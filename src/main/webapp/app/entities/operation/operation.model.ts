

import {
    BankAccount,
    Label,
    } from '../';

export class Operation {
    constructor(
        public id?: number,
        public date?: any,
        public description?: string,
        public amount?: number,
        public bankAccount?: BankAccount,
        public label?: Label,
    ) { }
}
