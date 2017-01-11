import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';
import { StateService } from 'ui-router-ng2';

import { Operation } from './operation.model';
import { OperationService } from './operation.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-operation',
    templateUrl: './operation.component.html'
})
export class OperationComponent implements OnInit {
    operations: Operation[];
    currentAccount: any;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;

    constructor(
        private operationService: OperationService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private parseLinks: ParseLinks,
        private principal: Principal
    ) {
        this.operations = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll () {
        this.operationService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: Response) => this.onSuccess(res.json(), res.headers),
            (res: Response) => this.onError(res.json())
        );
    }

    reset () {
        this.page = 0;
        this.operations = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.operations.push(data[i]);
        }
    }

    registerChangeInOperations() {
        this.eventManager.subscribe('operationListModification', (response) => {
            this.reset();
        });
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOperations();
    }

    trackId (index: number, item: Operation) {
        return item.id;
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    sort () {
        let result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
}
