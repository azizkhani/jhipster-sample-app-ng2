import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { BankAccount } from './bank-account.model';
import { BankAccountService } from './bank-account.service';

@Component({
    selector: 'jhi-bank-account-delete-dialog',
    templateUrl: './bank-account-delete-dialog.component.html'
})
export class BankAccountDeleteDialogComponent {

    bankAccount: BankAccount;

    constructor(
        private bankAccountService: BankAccountService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {}

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.bankAccountService.delete(id).subscribe(response => {
            this.eventManager.broadcast({ name: 'bankAccountListModification', content: 'Deleted an bankAccount'});
            this.activeModal.dismiss(true);
        });
    }
}
