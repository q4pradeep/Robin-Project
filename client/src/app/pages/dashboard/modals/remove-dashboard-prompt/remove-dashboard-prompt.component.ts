import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-remove-dashboard-prompt',
  templateUrl: './remove-dashboard-prompt.component.html',
  styleUrls: ['./remove-dashboard-prompt.component.scss'],
})
export class RemoveDashboardPromptComponent implements OnInit {
  constructor(protected ref: NbDialogRef<RemoveDashboardPromptComponent>) {}

  cancel() {
    this.ref.close('');
  }

  submit() {
    this.ref.close('delete');
  }

  ngOnInit(): void {
  }
}
