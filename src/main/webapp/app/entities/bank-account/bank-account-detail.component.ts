import { Component, OnInit } from '@angular/core';
import { Transition } from 'ui-router-ng2';

import { BankAccount } from './bank-account.model';
import { BankAccountService } from './bank-account.service';

@Component({
    selector: 'jhi-bank-account-detail',
    templateUrl: './bank-account-detail.component.html'
})
export class BankAccountDetailComponent implements OnInit {

    bankAccount: BankAccount;

    constructor(private bankAccountService: BankAccountService, private trans: Transition) { }

    ngOnInit() {
        this.load(this.trans.params()['id']);
    }

    load (id) {
        this.bankAccountService.find(id).subscribe(bankAccount => {
            this.bankAccount = bankAccount;
        });
    }

}
