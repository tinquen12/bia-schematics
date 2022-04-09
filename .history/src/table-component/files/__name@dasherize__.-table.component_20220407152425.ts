import {Component, OnChanges} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {TranslateService} from '@ngx-translate/core'
import {AuthService} from 'src/app/core/bia-core/services/auth.service'
import {BiaMessageService} from 'src/app/core/bia-core/services/bia-message.service'
import {BiaCalcTableComponent} from 'src/app/shared/bia-shared/components/table/bia-calc-table/bia-calc-table.component'
import {TeamTypeId} from 'src/app/shared/constants'
import {Plane} from '<%= modelRelativePath %>'

@Component({
  selector: 'app-plane-table',
  templateUrl:
    '../../../../shared/bia-shared/components/table/bia-calc-table/bia-calc-table.component.html',
  styleUrls: [
    '../../../../shared/bia-shared/components/table/bia-calc-table/bia-calc-table.component.scss',
  ],
})
export class <%= classify(`${name}TableComponent`) %>
  extends BiaCalcTableComponent
  implements OnChanges
{
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public biaMessageService: BiaMessageService,
    public translateService: TranslateService,
  ) {
    super(formBuilder, authService, biaMessageService, translateService)
  }

  public initForm() {
    this.form = this.formBuilder.group({
      <% for (const key of Object.keys(properties)) { %>
      [`${key}`]: [this.element.<%= key %>],
      <% } %>
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const plane: Plane = <Plane>this.form.value

      // force the parent key => siteId from authService or other Id from 'parent'Service
      <% if (isNested) { %>
      (plane.siteId = this.authService.getCurrentTeamId(TeamTypeId.Site))
      <% } %>
      this.save.emit(plane)
      this.form.reset()
    }
  }
}
