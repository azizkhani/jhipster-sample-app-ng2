import { Transition, Ng2StateDeclaration } from 'ui-router-ng2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService, PaginationUtil } from 'ng-jhipster';

import { OperationComponent } from './operation.component';
import { OperationDetailComponent } from './operation-detail.component';
import { OperationDialogComponent } from './operation-dialog.component';
import { OperationDeleteDialogComponent } from './operation-delete-dialog.component';
import { Operation } from './operation.model';
import { OperationService } from './operation.service';

export const operationState: Ng2StateDeclaration = {
    name: 'operation',
    parent: 'entity',
    url: '/operation',
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsterApp.operation.home.title'
    },
    views: {
        'content@': { component: OperationComponent }
    },
    resolve: [
        {
            token: 'translate',
            deps: [JhiLanguageService],
            resolveFn: (languageService: JhiLanguageService) => languageService.setLocations(['operation'])
        }
    ]
};

export const operationDetailState: Ng2StateDeclaration = {
    name: 'operation-detail',
    parent: 'entity',
    url: '/operation/:id',
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsterApp.operation.detail.title'
    },
    views: {
        'content@': { component: OperationDetailComponent }
    },
    resolve: [
        {
            token: 'translate',
            deps: [JhiLanguageService],
            resolveFn: (languageService: JhiLanguageService) => languageService.setLocations(['operation'])
        },
        {
            token: 'previousState',
            deps: [Transition],
            resolveFn: (trans: Transition) => {
                // TODO this needs to be tested
                const stateParams = trans.params();
                const stateService = trans.router.stateService;
                const currentStateData = {
                    name: stateService.current.name || 'operation',
                    params: stateParams,
                    url: stateService.href(stateService.current.name, stateParams)
                };
                return currentStateData;
            }
        }
    ]
};

export const operationNewState: Ng2StateDeclaration = {
    name: 'operation.new',
    url: '/new',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        const modalRef  = modalService.open(OperationDialogComponent, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.operation = new Operation();
        modalRef.result.then((result) => {
            console.log(`Closed with: ${result}`);
            $state.go('operation', null, { reload: 'operation' });
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
            $state.go('operation');
        });
    }
};

export const operationEditState: Ng2StateDeclaration = {
    name: 'operation.edit',
    url: '/{id}/edit',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        let operationService: OperationService = trans.injector().get(OperationService);
        let id = trans.params()['id'];
        operationService.find(id).subscribe(operation => {
            // TODO Find a better way to format dates so that it works with NgbDatePicker
            if (operation.date) {
                operation.date = {
                     year: operation.date.getFullYear(),
                     month: operation.date.getMonth() + 1,
                     day: operation.date.getDate()
                };
            }
            const modalRef  = modalService.open(OperationDialogComponent, { size: 'lg', backdrop: 'static'});
            modalRef.componentInstance.operation = operation;
            modalRef.result.then((result) => {
                console.log(`Closed with: ${result}`);
                $state.go('operation', null, { reload: 'operation' });
            }, (reason) => {
                console.log(`Dismissed ${reason}`);
                $state.go('^');
            });
        });
    }
};

export const operationDeleteState: Ng2StateDeclaration = {
    name: 'operation.delete',
    url: '/{id}/delete',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        let operationService: OperationService = trans.injector().get(OperationService);
        let id = trans.params()['id'];
        operationService.find(id).subscribe(operation => {
            const modalRef  = modalService.open(OperationDeleteDialogComponent, { size: 'md'});
            modalRef.componentInstance.operation = operation;
            modalRef.result.then((result) => {
                console.log(`Closed with: ${result}`);
                $state.go('operation', null, { reload: 'operation' });
            }, (reason) => {
                console.log(`Dismissed ${reason}`);
                $state.go('^');
            });
        });
    }
};
