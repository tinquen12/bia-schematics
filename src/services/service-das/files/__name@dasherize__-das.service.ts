import { Injectable, Injector } from '@angular/core';
import { <%= classify(name) %> } from '<%= modelRelativePath %>';
import { AbstractDas } from 'src/app/core/bia-core/services/abstract-das.service';

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Das extends AbstractDas<<%= classify(name) %>> {
  constructor(injector: Injector) {
    super(injector, '<%= classify(pluralName) %>');
  }
}