import { Transition, Ng2StateDeclaration } from 'ui-router-ng2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService, PaginationUtil } from 'ng-jhipster';

import { BankAccountComponent } from './bank-account.component';
import { BankAccountDetailComponent } from './bank-account-detail.component';
import { BankAccountDialogComponent } from './bank-account-dialog.component';
import { BankAccountDeleteDialogComponent } from './bank-account-delete-dialog.component';
import { BankAccount } from './bank-account.model';
import { BankAccountService } from './bank-account.service';

export const bankAccountState: Ng2StateDeclaration = {
    name: 'bank-account',
    parent: 'entity',
    url: '/bank-account',
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsterApp.bankAccount.home.title'
    },
    views: {
        'content@': { component: BankAccountComponent }
    },
    resolve: [
        {
            token: 'translate',
            deps: [JhiLanguageService],
            resolveFn: (languageService: JhiLanguageService) => languageService.setLocations(['bankAccount'])
        }
    ]
};

export const bankAccountDetailState: Ng2StateDeclaration = {
    name: 'bank-account-detail',
    parent: 'entity',
    url: '/bank-account/:id',
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsterApp.bankAccount.detail.title'
    },
    views: {
        'content@': { component: BankAccountDetailComponent }
    },
    resolve: [
        {
            token: 'translate',
            deps: [JhiLanguageService],
            resolveFn: (languageService: JhiLanguageService) => languageService.setLocations(['bankAccount'])
        },
        {
            token: 'previousState',
            deps: [Transition],
            resolveFn: (trans: Transition) => {
                // TODO this needs to be tested
                const stateParams = trans.params();
                const stateService = trans.router.stateService;
                const currentStateData = {
                    name: stateService.current.name || 'bank-account',
                    params: stateParams,
                    url: stateService.href(stateService.current.name, stateParams)
                };
                return currentStateData;
            }
        }
    ]
};

export const bankAccountNewState: Ng2StateDeclaration = {
    name: 'bank-account.new',
    url: '/new',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        const modalRef  = modalService.open(BankAccountDialogComponent, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bankAccount = new BankAccount();
        modalRef.result.then((result) => {
            console.log(`Closed with: ${result}`);
            $state.go('bank-account', null, { reload: 'bank-account' });
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
            $state.go('bank-account');
        });
    }
};

export const bankAccountEditState: Ng2StateDeclaration = {
    name: 'bank-account.edit',
    url: '/{id}/edit',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        let bankAccountService: BankAccountService = trans.injector().get(BankAccountService);
        let id = trans.params()['id'];
        bankAccountService.find(id).subscribe(bankAccount => {
            // TODO Find a better way to format dates so that it works with NgbDatePicker
            const modalRef  = modalService.open(BankAccountDialogComponent, { size: 'lg', backdrop: 'static'});
            modalRef.componentInstance.bankAccount = bankAccount;
            modalRef.result.then((result) => {
                console.log(`Closed with: ${result}`);
                $state.go('bank-account', null, { reload: 'bank-account' });
            }, (reason) => {
                console.log(`Dismissed ${reason}`);
                $state.go('^');
            });
        });
    }
};

export const bankAccountDeleteState: Ng2StateDeclaration = {
    name: 'bank-account.delete',
    url: '/{id}/delete',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        let bankAccountService: BankAccountService = trans.injector().get(BankAccountService);
        let id = trans.params()['id'];
        bankAccountService.find(id).subscribe(bankAccount => {
            const modalRef  = modalService.open(BankAccountDeleteDialogComponent, { size: 'md'});
            modalRef.componentInstance.bankAccount = bankAccount;
            modalRef.result.then((result) => {
                console.log(`Closed with: ${result}`);
                $state.go('bank-account', null, { reload: 'bank-account' });
            }, (reason) => {
                console.log(`Dismissed ${reason}`);
                $state.go('^');
            });
        });
    }
};
