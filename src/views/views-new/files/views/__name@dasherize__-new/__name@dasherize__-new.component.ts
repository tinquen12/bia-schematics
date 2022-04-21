import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Feature<%= classify(name) %>sActions } from '<%= actionRelativePath %>';
import { <%= classify(name) %> } from '<%= modelRelativePath %>';
import { AppState } from 'src/app/store/state';
import { <%= classify(name) %>OptionsService } from '<%= optionsServiceRelativePath %>';
import { ActivatedRoute, Router } from '@angular/router';
import { BiaTranslationService } from 'src/app/core/bia-core/services/bia-translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-<%= dasherize(name) %>-new',
  templateUrl: './<%= dasherize(name) %>-new.component.html',
  styleUrls: ['./<%= dasherize(name) %>-new.component.scss']
})
export class <%= classify(name) %>NewComponent implements OnInit, OnDestroy  {
  private sub = new Subscription();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public <%= dasherize(name) %>OptionsService: <%= classify(name) %>OptionsService,
    private biaTranslationService: BiaTranslationService,

  ) {}

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

  onSubmitted(<%= dasherize(name) %>ToCreate: <%= classify(name) %>) {
    this.store.dispatch(Feature<%= classify(pluralName) %>Actions.create({ <%= dasherize(name) %>: <%= dasherize(name) %>ToCreate }));
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onCancelled() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
