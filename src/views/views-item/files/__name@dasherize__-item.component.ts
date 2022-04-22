import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getCurrent<%= classify(name) %>} from '<%= stateRelativePath %>';
import { <%= classify(name) %> } from '<%= modelRelativePath %>';
import { AppState } from 'src/app/store/state';
import { ActivatedRoute } from '@angular/router';
import { <%= classify(name) %>Service } from '<%= globalServiceRelativePath %>';
import { BiaClassicLayoutService } from 'src/app/shared/bia-shared/components/layout/classic-layout/bia-classic-layout.service';
import { first } from 'rxjs/operators';
import { BiaTranslationService } from 'src/app/core/bia-core/services/bia-translation.service';

@Component({
  templateUrl: './<%= dasherize(name) %>-item.component.html',
  styleUrls: ['./<%= dasherize(name) %>-item.component.scss']
})
export class <%= classify(name) %>ItemComponent implements OnInit, OnDestroy {
  <%= dasherize(name) %>$: Observable<<%= classify(name) %>>;
  private sub = new Subscription();

  constructor(private store: Store<AppState>,
    private route: ActivatedRoute,
    public <%= dasherize(name) %>Service: <%= classify(name) %>Service,
    private layoutService: BiaClassicLayoutService,
    private biaTranslationService: BiaTranslationService,
  ) { }

  ngOnInit() {
    this.sub.add(
      this.biaTranslationService.currentCulture$.subscribe(event => {
        this.<%= dasherize(name) %>Service.current<%= classify(name) %>Id = this.route.snapshot.params.<%= dasherize(name) %>Id;
      })
    );
    this.sub.add
      (
        this.store.select(getCurrent<%= classify(name) %>).subscribe((<%= dasherize(name) %>) => {
          if (<%= dasherize(name) %>?.id) {
            this.route.data.pipe(first()).subscribe(routeData => {
              routeData['breadcrumb'] = <%= dasherize(name) %>.id;
            });
            this.layoutService.refreshBreadcrumb();
          }
        })
      );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
