import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Feature<%= classify(pluralName) %>Actions } from '<%= actionRelativePath %>';
import { Subscription } from 'rxjs';
import { <%= classify(name) %> } from '<%= modelRelativePath %>';
import { AppState } from 'src/app/store/state';
import { <%= classify(name) %>Service } from '<%= globalServiceRelativePath %>';
import { ActivatedRoute, Router } from '@angular/router';
import { <%= classify(name) %>OptionsService } from '<%= optionsServiceRelativePath %>';
import { BiaTranslationService } from 'src/app/core/bia-core/services/bia-translation.service';

@Component({
  selector: 'app-<%= dasherize(name) %>-edit',
  templateUrl: './<%= dasherize(name) %>-edit.component.html',
  styleUrls: ['./<%= dasherize(name) %>-edit.component.scss']
})
export class <%= classify(name) %>EditComponent implements OnInit, OnDestroy {
  @Output() displayChange = new EventEmitter<boolean>();
  private sub = new Subscription();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public <%= dasherize(name) %>OptionsService: <%= classify(name) %>OptionsService,
    public <%= dasherize(name) %>Service: <%= classify(name) %>Service,
    private biaTranslationService: BiaTranslationService,
  ) { }

  ngOnInit() {
    this.sub.add(
      this.biaTranslationService.currentCulture$.subscribe(event => {
          this.<%= dasherize(name) %>OptionsService.loadAllOptions();
      })
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmitted(<%= dasherize(name) %>ToUpdate: <%= classify(name) %>) {
    this.store.dispatch(Feature<%= classify(pluralName) %>Actions.update({ <%= dasherize(name) %>: <%= dasherize(name) %>ToUpdate }));
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  onCancelled() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }
}
