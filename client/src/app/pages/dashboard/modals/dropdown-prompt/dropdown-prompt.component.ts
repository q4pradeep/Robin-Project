import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'dropdown-prompt.component.html',
  styleUrls: ['dropdown-prompt.component.scss'],
})
export class DropdownPromptComponent {

  constructor(protected ref: NbDialogRef<DropdownPromptComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }
}
