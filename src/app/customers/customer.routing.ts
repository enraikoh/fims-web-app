/**
 * Copyright 2017 The Mifos Initiative.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Routes} from '@angular/router';
import {CustomerComponent} from './customer.component';
import {CreateCustomerFormComponent} from './form/create/create.form.component';
import {CustomerDetailComponent} from './detail/customer.detail.component';
import {EditCustomerFormComponent} from './form/edit/edit.form.component';
import {CustomerActivityComponent} from './detail/activity/activity.component';
import {CustomerStatusComponent} from './detail/status/status.component';
import {CustomerIndexComponent} from './detail/customer.index.component';
import {CustomerTaskFormComponent} from './detail/status/form/customer-task.form.component';
import {CustomerExistsGuard} from './customer-exists.guard';
import {CustomerPortraitComponent} from './detail/portrait/portrait.component';
import {CustomerIdentityCardListComponent} from './detail/identityCard/identity-card.list.component';
import {CreateCustomerIdentificationCardFormComponent} from './detail/identityCard/form/create.form.component';
import {CustomerIdentityCardDetailComponent} from './detail/identityCard/identity-card.detail.component';
import {EditCustomerIdentificationCardFormComponent} from './detail/identityCard/form/edit.form.component';
import {CustomerIdentityCardIndexComponent} from './detail/identityCard/identity-card.index.component';
import {IdentityCardExistsGuard} from './detail/identityCard/identity-card-exists.guard';

export const CustomerRoutes: Routes = [
  {
    path: '', component: CustomerComponent, data: {title: 'Manage Customers', hasPermission: { id: 'customer_customers', accessLevel: 'READ' }}
  },
  {
    path: 'create',
    component: CreateCustomerFormComponent,
    data: {title: 'Create Customer', hasPermission: { id: 'customer_customers', accessLevel: 'CHANGE' }}
  },
  {
    path: 'detail/:id/edit',
    component: EditCustomerFormComponent,
    data: {title: 'Edit Customer', hasPermission: { id: 'customer_customers', accessLevel: 'CHANGE' }},
    canActivate: [ CustomerExistsGuard ]
  },
  {
    path: 'detail/:id',
    component: CustomerIndexComponent,
    data: {
      hasPermission: { id: 'customer_customers', accessLevel: 'READ' }
    },
    canActivate: [ CustomerExistsGuard ],
    children: [
      {
        path: '',
        component: CustomerDetailComponent,
        data: {title: 'View Customer'}
      },
      {
        path: 'tasks',
        component: CustomerStatusComponent,
        data: {title: 'Manage Customer Tasks'},
      },
      {
        path: 'tasks/create',
        component: CustomerTaskFormComponent
      },
      {
        path: 'activities',
        component: CustomerActivityComponent,
        data: {title: 'Manage Customer Tasks'}
      },
      {
        path: 'portrait',
        component: CustomerPortraitComponent,
        data: {
          title: 'Upload portrait',
          hasPermission: { id: 'customer_customers', accessLevel: 'CHANGE' }
        }
      },
      {
        path: 'identifications',
        component: CustomerIdentityCardListComponent,
        data: {
          title: 'Manage Identification Cards',
        }
      },
      {
        path: 'identifications/create',
        component: CreateCustomerIdentificationCardFormComponent,
        data: {
          title: 'Create Identification Card',
          hasPermission: { id: 'customer_customers', accessLevel: 'CHANGE' }
        },
      },
      {
        path: 'identifications/detail/:number',
        component: CustomerIdentityCardIndexComponent,
        canActivate: [ IdentityCardExistsGuard ],
        children: [
          {
            path: '',
            component: CustomerIdentityCardDetailComponent,
            data: {
              title: 'Identification Card',
            }
          },
          {
            path: 'edit',
            component: EditCustomerIdentificationCardFormComponent,
            data: {
              title: 'Edit Identification Card',
              hasPermission: {id: 'customer_customers', accessLevel: 'CHANGE'}
            },
          }
        ]
      },
      {path: 'loans', loadChildren: './cases/case.module#CaseModule'},
    ]
  }
];
