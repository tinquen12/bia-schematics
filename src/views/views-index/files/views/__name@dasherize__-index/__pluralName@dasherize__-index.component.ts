import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAll<%= classify(pluralName) %>, get<%= classify(pluralName) %>TotalCount, get<%= classify(name) %>LoadingGetAll } from '<%= stateRelativePath %>';
import { Feature<%= classify(pluralName) %>Actions } from '<%= actionRelativePath %>';
import { Observable, Subscription } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import { <%= classify(name) %> } from '<%= modelRelativePath %>';
import { BiaTableComponent } from 'src/app/shared/bia-shared/components/table/bia-table/bia-table.component';
import {
  BiaListConfig,
  PrimeTableColumn,
  PropType,
  PrimeNGFiltering
} from 'src/app/shared/bia-shared/components/table/bia-table/bia-table-config';
import { AppState } from 'src/app/store/state';
import { DEFAULT_PAGE_SIZE } from 'src/app/shared/constants';
import { AuthService } from 'src/app/core/bia-core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { <%= classify(name) %>Das } from '../../services/<%= dasherize(name) %>-das.service';
import * as FileSaver from 'file-saver';
import { TranslateService } from '@ngx-translate/core';
import { BiaTranslationService } from 'src/app/core/bia-core/services/bia-translation.service';
import { Permission } from 'src/app/shared/permission';
import { KeyValuePair } from 'src/app/shared/bia-shared/model/key-value-pair';
import { <%= classify(pluralName) %>SignalRService } from '../../services/<%= dasherize(name) %>-signalr.service';
import { loadAllView } from 'src/app/shared/bia-shared/features/view/store/views-actions';
import { <%= classify(name) %>OptionsService } from '../../services/<%= dasherize(name) %>-options.service';
import { PagingFilterFormatDto } from 'src/app/shared/bia-shared/model/paging-filter-format';
import { <%= classify(name) %>TableComponent } from 'src/app/features/<%= dasherize(pluralName) %>/components/<%= dasherize(name) %>-table/<%= dasherize(name) %>-table.component';
import { useCalcMode, useSignalR, useView } from '../../<%= dasherize(name) %>.constants';

@Component({
  selector: 'app-<%= dasherize(pluralName) %>-index',
  templateUrl: './<%= dasherize(pluralName) %>-index.component.html',
  styleUrls: ['./<%= dasherize(pluralName) %>-index.component.scss']
})
export class <%= classify(pluralName) %>IndexComponent implements OnInit, OnDestroy {
  useCalcMode = useCalcMode;
  useSignalR = useSignalR;
  useView = useView;
  useRefreshAtLanguageChange = <%= useCalcMode %>;

  @HostBinding('class.bia-flex') flex = true;
  @ViewChild(BiaTableComponent, { static: false }) biaTableComponent: BiaTableComponent;
  @ViewChild(<%= classify(name) %>TableComponent, { static: false }) <%= dasherize(name) %>TableComponent: <%= classify(name) %>TableComponent;
  private get <%= dasherize(name) %>ListComponent() {
    if (this.biaTableComponent !== undefined) {
      return this.biaTableComponent;
    }
    return this.<%= dasherize(name) %>TableComponent;
  }

  private sub = new Subscription();
  showColSearch = false;
  globalSearchValue = '';
  defaultPageSize = DEFAULT_PAGE_SIZE;
  pageSize = this.defaultPageSize;
  totalRecords: number;
  <%= dasherize(pluralName) %>$: Observable<<%= classify(name) %>[]>;
  selected<%= classify(pluralName) %>: <%= classify(name) %>[];
  totalCount$: Observable<number>;
  loading$: Observable<boolean>;
  canEdit = false;
  canDelete = false;
  canAdd = false;
  tableConfiguration: BiaListConfig;
  columns: KeyValuePair[];
  displayedColumns: KeyValuePair[];
  viewPreference: string;
  popupTitle: string;
  tableStateKey = this.useView ? '<%= dasherize(pluralName) %>Grid' : undefined;
  parentIds: string[];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private <%= dasherize(name) %>Das: <%= classify(name) %>Das,
    private translateService: TranslateService,
    private biaTranslationService: BiaTranslationService,
    private <%= dasherize(pluralName) %>SignalRService: <%= classify(pluralName) %>SignalRService,
    public <%= dasherize(name) %>OptionsService: <%= classify(name) %>OptionsService,
  ) {
  }

  ngOnInit() {
    this.parentIds = [];
    this.sub = new Subscription();

    this.initTableConfiguration();
    this.setPermissions();
    this.<%= dasherize(pluralName) %>$ = this.store.select(getAll<%= classify(pluralName) %>);
    this.totalCount$ = this.store.select(get<%= classify(pluralName) %>TotalCount);
    this.loading$ = this.store.select(get<%= classify(name) %>LoadingGetAll);
    this.OnDisplay();
    if (this.useCalcMode) {
      this.sub.add(
        this.biaTranslationService.currentCulture$.subscribe(event => {
            this.<%= dasherize(name) %>OptionsService.loadAllOptions();
        })
      );
    }
    if (this.useRefreshAtLanguageChange) {
      // Reload data if language change.
      let isinit = true;
      this.sub.add(
        this.biaTranslationService.currentCulture$.subscribe(event => {
            if (isinit) {
              isinit = false;
            } else {
              this.onLoadLazy(this.<%= dasherize(name) %>ListComponent.getLazyLoadMetadata());
            }
          })
      );
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.OnHide();
  }

  OnDisplay() {
    if (this.useView) {
      this.store.dispatch(loadAllView());
    }


    if (this.useSignalR) {
      this.<%= dasherize(pluralName) %>SignalRService.initialize();
    }
  }

  OnHide() {
    if (this.useSignalR) {
      this.<%= dasherize(pluralName) %>SignalRService.destroy();
    }
  }

  onCreate() {
    if (!this.useCalcMode) {
      this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
    }
  }

  onEdit(<%= dasherize(name) %>Id: number) {
    if (!this.useCalcMode) {
      this.router.navigate(['../' + <%= dasherize(name) %>Id + '/edit'], { relativeTo: this.activatedRoute });
    }
  }

  onSave(<%= dasherize(name) %>: <%= classify(name) %>) {
    if (this.useCalcMode) {
      if (<%= dasherize(name) %>?.id) {
        if (this.canEdit) {
          this.store.dispatch(Feature<%= classify(pluralName) %>Actions.update({ <%= dasherize(name) %>: <%= dasherize(name) %> }));
        }
      } else {
        if (this.canAdd) {
          this.store.dispatch(Feature<%= classify(pluralName) %>Actions.create({ <%= dasherize(name) %>: <%= dasherize(name) %> }));
        }
      }
    }
  }

  onDelete() {
    if (this.selected<%= classify(name) %>s && this.canDelete) {
      this.store.dispatch(Feature<%= classify(pluralName) %>Actions.multiRemove({ ids: this.selected<%= classify(pluralName) %>.map((x) => x.id) }));
    }
  }

  onSelectedElementsChanged(<%= dasherize(name) %>s: <%= classify(name) %>[]) {
    this.selected<%= classify(pluralName) %> = <%= dasherize(pluralName) %>;
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
  }

  onLoadLazy(lazyLoadEvent: LazyLoadEvent) {
    const pagingAndFilter: PagingFilterFormatDto = { parentIds: this.parentIds, ...lazyLoadEvent };
    this.store.dispatch(Feature<%= classify(pluralName) %>Actions.loadAllByPost({ event: pagingAndFilter }));
  }

  searchGlobalChanged(value: string) {
    this.globalSearchValue = value;
  }

  displayedColumnsChanged(values: KeyValuePair[]) {
    this.displayedColumns = values;
  }

  onToggleSearch() {
    this.showColSearch = !this.showColSearch;
  }

  onViewChange(viewPreference: string) {
    this.viewPreference = viewPreference;
  }

  onExportCSV() {
    const columns: { [key: string]: string } = {};
    this.columns.map((x) => (columns[x.value.split('.')[1]] = this.translateService.instant(x.value)));
    const columnsAndFilter: PagingFilterFormatDto = {
      parentIds: this.parentIds, columns: columns, ...this.<%= dasherize(name) %>ListComponent.getLazyLoadMetadata()
    };
    this.<%= dasherize(name) %>Das.getFile(columnsAndFilter).subscribe((data) => {
      FileSaver.saveAs(data, this.translateService.instant('app.<%= dasherize(pluralName) %>') + '.csv');
    });
  }

  private setPermissions() {
    this.canEdit = this.authService.hasPermission(Permission.<%= classify(name) %>_Update);
    this.canDelete = this.authService.hasPermission(Permission.<%= classify(name) %>_Delete);
    this.canAdd = this.authService.hasPermission(Permission.<%= classify(name) %>_Create);
  }

  private initTableConfiguration() {
    this.biaTranslationService.currentCultureDateFormat$.subscribe((dateFormat) => {
      this.tableConfiguration = {
        columns: [
          <% for (var property of properties) { %>
            <% if (property.type === "string") {%>new PrimeTableColumn('<%= property.name %>', '<%= `${dasherize(name)}.${property.name}` %>'),<% } %>
            <% if (property.type === "boolean") {%>Object.assign(new PrimeTableColumn('<%= property.name %>', '<%= `${dasherize(name)}.${property.name}` %>'), { isSearchable: false, isSortable: false, type: PropType.Boolean}),<% } %>
            <% if (property.type === "integer") {%>Object.assign(new PrimeTableColumn('<%= property.name %>', '<%= `${dasherize(name)}.${property.name}` %>'), { type: PropType.Number, filterMode: PrimeNGFiltering.Equals}),<% } %>
          <% } %>
        ]
      };

      this.columns = this.tableConfiguration.columns.map((col) => <KeyValuePair>{ key: col.field, value: col.header });
      this.displayedColumns = [...this.columns];
    });
  }
}
