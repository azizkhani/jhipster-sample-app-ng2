import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Operation } from './operation.model';
import { OperationService } from './operation.service';

import {
    BankAccount,
    Label,
    } from '../';


import {
    BankAccountService,
    LabelService,
    } from '../';

// TODO replace ng-file-upload dependency by an ng2 depedency
@Component({
    selector: 'jhi-operation-dialog',
    templateUrl: './operation-dialog.component.html'
})
export class OperationDialogComponent implements OnInit {

    operation: Operation;
    authorities: any[];
    isSaving: boolean;

    bankaccounts: BankAccount[];

    labels: Label[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private operationService: OperationService,
        private bankAccountService: BankAccountService,
        private labelService: LabelService,
        private eventManager: EventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.bankAccountService.query().subscribe(
            (res: Response) => { this.bankaccounts = res.json(); }, (res: Response) => this.onError(res.json()));
        this.labelService.query().subscribe(
            (res: Response) => { this.labels = res.json(); }, (res: Response) => this.onError(res.json()));
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.operation.id !== undefined) {
            this.operationService.update(this.operation)
                .subscribe((res: Response) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.operationService.create(this.operation)
                .subscribe((res: Response) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result) {
        this.eventManager.broadcast({ name: 'operationListModification', content: 'OK'});
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
    
    trackBankAccountById(index: number, item: BankAccount) {
        return item.id;
    }
    
    trackLabelById(index: number, item: Label) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
