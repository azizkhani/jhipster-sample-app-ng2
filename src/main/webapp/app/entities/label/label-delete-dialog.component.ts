import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Label } from './label.model';
import { LabelService } from './label.service';

@Component({
    selector: 'jhi-label-delete-dialog',
    templateUrl: './label-delete-dialog.component.html'
})
export class LabelDeleteDialogComponent {

    label: Label;

    constructor(
        private labelService: LabelService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {}

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.labelService.delete(id).subscribe(response => {
            this.eventManager.broadcast({ name: 'labelListModification', content: 'Deleted an label'});
            this.activeModal.dismiss(true);
        });
    }
}
