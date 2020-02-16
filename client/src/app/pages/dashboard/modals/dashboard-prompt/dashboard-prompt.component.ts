import {Component, OnInit} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard-prompt',
  templateUrl: './dashboard-prompt.component.html',
  styleUrls: ['./dashboard-prompt.component.scss'],
})
export class DashboardPromptComponent implements OnInit {
  constructor(protected ref: NbDialogRef<DashboardPromptComponent>) {}
  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }

  ngOnInit(): void {
  }
}
