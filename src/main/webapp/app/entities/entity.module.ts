import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UIRouterModule } from 'ui-router-ng2';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { JhipsterSharedModule } from '../shared';
import {
    entityState,
    BankAccountService,
    BankAccountComponent,
    BankAccountDetailComponent,
    BankAccountDialogComponent,
    BankAccountDeleteDialogComponent,
    bankAccountState,
    bankAccountDetailState,
    bankAccountNewState,
    bankAccountEditState,
    bankAccountDeleteState,
    LabelService,
    LabelComponent,
    LabelDetailComponent,
    LabelDialogComponent,
    LabelDeleteDialogComponent,
    labelState,
    labelDetailState,
    labelNewState,
    labelEditState,
    labelDeleteState,
    OperationService,
    OperationComponent,
    OperationDetailComponent,
    OperationDialogComponent,
    OperationDeleteDialogComponent,
    operationState,
    operationDetailState,
    operationNewState,
    operationEditState,
    operationDeleteState,
    /* jhipster-needle-add-entity-to-module-import - JHipster will add entity classes here */
} from './';

let ENTITY_STATES = [
    entityState,
    bankAccountState,
    bankAccountNewState,
    bankAccountDetailState,
    bankAccountEditState,
    bankAccountDeleteState,
    labelState,
    labelNewState,
    labelDetailState,
    labelEditState,
    labelDeleteState,
    operationState,
    operationNewState,
    operationDetailState,
    operationEditState,
    operationDeleteState,
    /* jhipster-needle-add-entity-to-module-states - JHipster will add entity state vars here */
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        InfiniteScrollModule,
        UIRouterModule.forChild({ states: ENTITY_STATES })
    ],
    declarations: [
        BankAccountComponent,
        BankAccountDetailComponent,
        BankAccountDialogComponent,
        BankAccountDeleteDialogComponent,
        LabelComponent,
        LabelDetailComponent,
        LabelDialogComponent,
        LabelDeleteDialogComponent,
        OperationComponent,
        OperationDetailComponent,
        OperationDialogComponent,
        OperationDeleteDialogComponent,
        /* jhipster-needle-add-entity-to-module-declarations - JHipster will add entity component classes here */
    ],
    entryComponents: [
        BankAccountDialogComponent,
        BankAccountDeleteDialogComponent,
        LabelDialogComponent,
        LabelDeleteDialogComponent,
        OperationDialogComponent,
        OperationDeleteDialogComponent,
        /* jhipster-needle-add-entity-to-module-entryComponents - JHipster will add entity dialog classes here */
    ],
    providers: [
        BankAccountService,
        LabelService,
        OperationService,
        /* jhipster-needle-add-entity-to-module-providers - JHipster will add entity Service classes here */
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterEntityModule {}

