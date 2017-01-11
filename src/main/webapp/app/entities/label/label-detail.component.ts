import { Component, OnInit } from '@angular/core';
import { Transition } from 'ui-router-ng2';

import { Label } from './label.model';
import { LabelService } from './label.service';

@Component({
    selector: 'jhi-label-detail',
    templateUrl: './label-detail.component.html'
})
export class LabelDetailComponent implements OnInit {

    label: Label;

    constructor(private labelService: LabelService, private trans: Transition) { }

    ngOnInit() {
        this.load(this.trans.params()['id']);
    }

    load (id) {
        this.labelService.find(id).subscribe(label => {
            this.label = label;
        });
    }

}
