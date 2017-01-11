import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';
import { StateService } from 'ui-router-ng2';

import { BankAccount } from './bank-account.model';
import { BankAccountService } from './bank-account.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-bank-account',
    templateUrl: './bank-account.component.html'
})
export class BankAccountComponent implements OnInit {
    bankAccounts: BankAccount[];
    currentAccount: any;
    searchQuery: any;

    constructor(
        private bankAccountService: BankAccountService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.bankAccountService.query().subscribe(
            (res: Response) => {
                this.bankAccounts = res.json();
                this.searchQuery = null;
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBankAccounts();
    }

    trackId (index: number, item: BankAccount) {
        return item.id;
    }

    registerChangeInBankAccounts() {
        this.eventManager.subscribe('bankAccountListModification', (response) => this.loadAll());
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
