import { Component, OnInit } from '@angular/core';
import { Transition } from 'ui-router-ng2';

import { Operation } from './operation.model';
import { OperationService } from './operation.service';

@Component({
    selector: 'jhi-operation-detail',
    templateUrl: './operation-detail.component.html'
})
export class OperationDetailComponent implements OnInit {

    operation: Operation;

    constructor(private operationService: OperationService, private trans: Transition) { }

    ngOnInit() {
        this.load(this.trans.params()['id']);
    }

    load (id) {
        this.operationService.find(id).subscribe(operation => {
            this.operation = operation;
        });
    }

}
