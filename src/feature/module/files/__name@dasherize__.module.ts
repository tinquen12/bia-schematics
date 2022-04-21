import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { <%= classify(pluralName) %>Effects } from '<%= effectsRelativePath %>';
import { reducers } from '<%= stateRelativePath %>';
import { <%= classify(name) %>FormComponent } from '<%= formRelativePath %>';
import { <%= classify(name) %>IndexComponent } from '<%= indexViewRelativePath %>';
import { SharedModule } from 'src/app/shared/shared.module';
import { <%= classify(name) %>NewComponent } from '<%= newViewRelativePath %>';
import { <%= classify(name) %>EditComponent } from '<%= editViewRelativePath %>';
import { Permission } from 'src/app/shared/permission';
import { PermissionGuard } from 'src/app/core/bia-core/guards/permission.guard';
import { <%= classify(name) %>ItemComponent } from '<%= itemViewRelativePath %>';
import { PopupLayoutComponent } from 'src/app/shared/bia-shared/components/layout/popup-layout/popup-layout.component';
import { FullPageLayoutComponent } from 'src/app/shared/bia-shared/components/layout/fullpage-layout/fullpage-layout.component';
import { <%= classify(name) %>TableComponent } from '<%= tableRelativePath %>';
import { storeKey, usePopup } from '<%= constantsRelativePath %>';

const ROUTES: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null,
      permission: Permission.<%= classify(name) %>_List_Access,
      InjectComponent: <%= classify(name) %>IndexComponent
    },
    component: FullPageLayoutComponent,
    canActivate: [PermissionGuard],
    // [Calc] : The children are not used in calc
    children: [
      {
        path: 'create',
        data: {
          breadcrumb: 'bia.add',
          canNavigate: false,
          permission: Permission.<%= classify(name) %>_Create,
          title: '<%= dasherize(name) %>.add',
          InjectComponent: <%= classify(name) %>NewComponent,
        },
        component: (usePopup) ? PopupLayoutComponent : FullPageLayoutComponent,
        canActivate: [PermissionGuard],
      },
      {
        path: ':id',
        data: {
          breadcrumb: '',
          canNavigate: true,
        },
        component: <%= classify(name) %>ItemComponent,
        canActivate: [PermissionGuard],
        children: [
          {
            path: 'edit',
            data: {
              breadcrumb: 'bia.edit',
              canNavigate: true,
              permission: Permission.<%= classify(name) %>_Update,
              title: '<%= dasherize(name) %>.edit',
              InjectComponent: <%= classify(name) %>EditComponent,
            },
            component: (usePopup) ? PopupLayoutComponent : FullPageLayoutComponent,
            canActivate: [PermissionGuard],
          },
          {
            path: '',
            redirectTo: 'edit'
          },
        ]
      },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    <%= classify(name) %>ItemComponent,
    <%= classify(name) %>IndexComponent,
    <% if (useCalcMode) { %>
    // [Calc] : NOT used for calc (3 lines).
    // it is possible to delete unsed commponent files (views/..-new + views/..-edit + components/...-form).
    <%= classify(name) %>FormComponent,
    <%= classify(name) %>NewComponent,
    <%= classify(name) %>EditComponent,
    <% } else { %>
    // [Calc] : Used only for calc it is possible to delete unsed commponent files (components/...-table)).
    <%= classify(name) %>TableComponent,
    <% } %>
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature(storeKey, reducers),
    EffectsModule.forFeature([<%= classify(pluralName) %>Effects]),
  ]
})

export class <%= classify(name) %>Module {
}

