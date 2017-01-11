import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { BankAccount } from './bank-account.model';
import { BankAccountService } from './bank-account.service';

import {
    Operation,
    } from '../';

import { User } from '../../admin/';


import {
    OperationService,
    } from '../';

import { UserService } from '../../admin/';

// TODO replace ng-file-upload dependency by an ng2 depedency
@Component({
    selector: 'jhi-bank-account-dialog',
    templateUrl: './bank-account-dialog.component.html'
})
export class BankAccountDialogComponent implements OnInit {

    bankAccount: BankAccount;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    operations: Operation[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private bankAccountService: BankAccountService,
        private userService: UserService,
        private operationService: OperationService,
        private eventManager: EventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
        this.operationService.query().subscribe(
            (res: Response) => { this.operations = res.json(); }, (res: Response) => this.onError(res.json()));
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.bankAccount.id !== undefined) {
            this.bankAccountService.update(this.bankAccount)
                .subscribe((res: Response) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.bankAccountService.create(this.bankAccount)
                .subscribe((res: Response) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result) {
        this.eventManager.broadcast({ name: 'bankAccountListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
    
    trackUserById(index: number, item: User) {
        return item.id;
    }
    
    trackOperationById(index: number, item: Operation) {
        return item.id;
    }

}
