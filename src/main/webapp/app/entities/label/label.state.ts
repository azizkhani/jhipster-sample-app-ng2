import { Transition, Ng2StateDeclaration } from 'ui-router-ng2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService, PaginationUtil } from 'ng-jhipster';

import { LabelComponent } from './label.component';
import { LabelDetailComponent } from './label-detail.component';
import { LabelDialogComponent } from './label-dialog.component';
import { LabelDeleteDialogComponent } from './label-delete-dialog.component';
import { Label } from './label.model';
import { LabelService } from './label.service';

export const labelState: Ng2StateDeclaration = {
    name: 'label',
    parent: 'entity',
    url: '/label',
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsterApp.label.home.title'
    },
    views: {
        'content@': { component: LabelComponent }
    },
    resolve: [
        {
            token: 'translate',
            deps: [JhiLanguageService],
            resolveFn: (languageService: JhiLanguageService) => languageService.setLocations(['label'])
        }
    ]
};

export const labelDetailState: Ng2StateDeclaration = {
    name: 'label-detail',
    parent: 'entity',
    url: '/label/:id',
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsterApp.label.detail.title'
    },
    views: {
        'content@': { component: LabelDetailComponent }
    },
    resolve: [
        {
            token: 'translate',
            deps: [JhiLanguageService],
            resolveFn: (languageService: JhiLanguageService) => languageService.setLocations(['label'])
        },
        {
            token: 'previousState',
            deps: [Transition],
            resolveFn: (trans: Transition) => {
                // TODO this needs to be tested
                const stateParams = trans.params();
                const stateService = trans.router.stateService;
                const currentStateData = {
                    name: stateService.current.name || 'label',
                    params: stateParams,
                    url: stateService.href(stateService.current.name, stateParams)
                };
                return currentStateData;
            }
        }
    ]
};

export const labelNewState: Ng2StateDeclaration = {
    name: 'label.new',
    url: '/new',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        const modalRef  = modalService.open(LabelDialogComponent, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.label = new Label();
        modalRef.result.then((result) => {
            console.log(`Closed with: ${result}`);
            $state.go('label', null, { reload: 'label' });
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
            $state.go('label');
        });
    }
};

export const labelEditState: Ng2StateDeclaration = {
    name: 'label.edit',
    url: '/{id}/edit',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        let labelService: LabelService = trans.injector().get(LabelService);
        let id = trans.params()['id'];
        labelService.find(id).subscribe(label => {
            // TODO Find a better way to format dates so that it works with NgbDatePicker
            const modalRef  = modalService.open(LabelDialogComponent, { size: 'lg', backdrop: 'static'});
            modalRef.componentInstance.label = label;
            modalRef.result.then((result) => {
                console.log(`Closed with: ${result}`);
                $state.go('label', null, { reload: 'label' });
            }, (reason) => {
                console.log(`Dismissed ${reason}`);
                $state.go('^');
            });
        });
    }
};

export const labelDeleteState: Ng2StateDeclaration = {
    name: 'label.delete',
    url: '/{id}/delete',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        let labelService: LabelService = trans.injector().get(LabelService);
        let id = trans.params()['id'];
        labelService.find(id).subscribe(label => {
            const modalRef  = modalService.open(LabelDeleteDialogComponent, { size: 'md'});
            modalRef.componentInstance.label = label;
            modalRef.result.then((result) => {
                console.log(`Closed with: ${result}`);
                $state.go('label', null, { reload: 'label' });
            }, (reason) => {
                console.log(`Dismissed ${reason}`);
                $state.go('^');
            });
        });
    }
};
