

import {
    Operation,
    } from '../';

export class Label {
    constructor(
        public id?: number,
        public label?: string,
        public operation?: Operation,
    ) { }
}
