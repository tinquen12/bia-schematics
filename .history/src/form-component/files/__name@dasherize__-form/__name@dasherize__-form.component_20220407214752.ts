import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/bia-core/services/auth.service';
import { BiaOptionService } from 'src/app/core/bia-core/services/bia-option.service';
import { TeamTypeId } from 'src/app/shared/constants';
import { <%= classify(name) %> } from ''<%= modelRelativePath %>'';

@Component({
  selector: 'app-<%= dasherize(name) %>-form',
  templateUrl: './<%= dasherize(name) %>-form.component.html',
  styleUrls: ['./<%= dasherize(name) %>-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class <%= classify(name) %>FormComponent implements OnChanges {
  @Input() <%= dasherize(name) %>: <%= classify(name) %> = <<%= classify(name) %>>{};

  @Output() save = new EventEmitter<<%= classify(name) %>>();
  @Output() cancel = new EventEmitter();

  form: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private authService: AuthService) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.<%= dasherize(name) %>) {
      this.form.reset();
      if (this.<%= dasherize(name) %>) {
        this.form.patchValue({ ...this.<%= dasherize(name) %> });
      }
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: [this.plane.id],
      msn: [this.plane.msn, Validators.required],
      isActive: [this.plane.isActive],
      lastFlightDate: [this.plane.lastFlightDate],
      deliveryDate: [this.plane.deliveryDate],
      syncTime: [this.plane.syncTime],
      capacity: [this.plane.capacity, Validators.required],
      connectingAirports: [this.plane.connectingAirports],
      planeType: [this.plane.planeType?.id],
    });

  }

  onCancel() {
    this.form.reset();
    this.cancel.next();
  }

  onSubmit() {
    if (this.form.valid) {
      const <%= dasherize(name) %>: <%= dasherize(name) %> = <<%= classify(name) %>>this.form.value;

      // force the parent key => siteId from authService or other Id from 'parent'Service
      <%= dasherize(name) %>.siteId = this.authService.getCurrentTeamId(TeamTypeId.Site),
      this.save.emit(plane);
      this.form.reset();
    }
  }
}
