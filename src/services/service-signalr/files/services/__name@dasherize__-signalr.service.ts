import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { first } from 'rxjs/operators';
import { BiaSignalRService } from 'src/app/core/bia-core/services/bia-signalr.service';
import { Feature<%= classify(pluralName) %>Actions } from '../store/<%= dasherize(pluralName) %>-actions';
import { getLastLazyLoadEvent } from '../store/<%= dasherize(name) %>.state';
import { LazyLoadEvent } from 'primeng/api';
import { AuthService } from 'src/app/core/bia-core/services/auth.service';
import { TargetedFeature } from 'src/app/shared/bia-shared/model/signalR';
import { TeamTypeId } from 'src/app/shared/constants';

/**
 * Service managing SignalR events for hangfire jobs.
 * To use it:
 * - Add a parameter of this type in the constructor of your component (for dependency injection)
 * - Call the 'initialize()' method on it, so that dependency injection is truly performed
 */
@Injectable({
    providedIn: 'root'
})
export class <%= classify(pluralName) %>SignalRService {
  private targetedFeature: TargetedFeature;

  /**
   * Constructor.
   * @param store the store.
   * @param signalRService the service managing the SignalR connection.
   */
  constructor(private store: Store<AppState>, private signalRService: BiaSignalRService, private authService: AuthService) {
  }

  /**
   * Initialize SignalR communication.
   * Note: this method has been created so that we have to call one method on this class, otherwise dependency injection is not working.
   */
  initialize() {
    console.log('%c [<%= classify(pluralName) %>] Register SignalR : refresh-<%= dasherize(pluralName) %>', 'color: purple; font-weight: bold');
    this.signalRService.addMethod('refresh-<%= dasherize(pluralName) %>', () => {
      this.store.select(getLastLazyLoadEvent).pipe(first()).subscribe(
        (event) => {
          console.log('%c [<%= classify(pluralName) %>] RefreshSuccess', 'color: green; font-weight: bold');
          this.store.dispatch(Feature<%= classify(pluralName) %>Actions.loadAllByPost({ event: <LazyLoadEvent>event }));
        }
      );
    });
    this.targetedFeature = {parentKey: this.authService.getCurrentTeamId(TeamTypeId.Site).toString() , featureName : 'planes'};
    this.signalRService.joinGroup(this.targetedFeature);
  }

  destroy() {
    console.log('%c [<%= classify(pluralName) %>] Unregister SignalR : refresh-<%= dasherize(pluralName) %>', 'color: purple; font-weight: bold');
    this.signalRService.removeMethod('refresh-<%= dasherize(pluralName) %>');
    this.signalRService.leaveGroup(this.targetedFeature);
  }
}