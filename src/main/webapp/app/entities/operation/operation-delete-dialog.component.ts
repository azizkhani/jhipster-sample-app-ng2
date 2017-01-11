import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Operation } from './operation.model';
import { OperationService } from './operation.service';

@Component({
    selector: 'jhi-operation-delete-dialog',
    templateUrl: './operation-delete-dialog.component.html'
})
export class OperationDeleteDialogComponent {

    operation: Operation;

    constructor(
        private operationService: OperationService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {}

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.operationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({ name: 'operationListModification', content: 'Deleted an operation'});
            this.activeModal.dismiss(true);
        });
    }
}
