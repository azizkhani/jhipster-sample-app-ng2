import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';
import { StateService } from 'ui-router-ng2';

import { Label } from './label.model';
import { LabelService } from './label.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-label',
    templateUrl: './label.component.html'
})
export class LabelComponent implements OnInit {
    labels: Label[];
    currentAccount: any;
    searchQuery: any;

    constructor(
        private labelService: LabelService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.labelService.query().subscribe(
            (res: Response) => {
                this.labels = res.json();
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
        this.registerChangeInLabels();
    }

    trackId (index: number, item: Label) {
        return item.id;
    }

    registerChangeInLabels() {
        this.eventManager.subscribe('labelListModification', (response) => this.loadAll());
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
