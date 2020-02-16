import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-remove-dropmenu-prompt',
  templateUrl: './remove-dropmenu-prompt.component.html',
  styleUrls: ['./remove-dropmenu-prompt.component.scss'],
})
export class RemoveDropmenuPromptComponent implements OnInit {

  constructor(protected ref: NbDialogRef<RemoveDropmenuPromptComponent>) {}

  cancel() {
    this.ref.close('');
  }

  submit() {
    this.ref.close('delete');
  }

  ngOnInit(): void {
  }
}
