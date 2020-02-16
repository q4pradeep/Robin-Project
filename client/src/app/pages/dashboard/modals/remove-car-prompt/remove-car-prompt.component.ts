import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-remove-car-prompt',
  templateUrl: './remove-car-prompt.component.html',
  styleUrls: ['./remove-car-prompt.component.scss'],
})
export class RemoveCarPromptComponent implements OnInit {
  constructor(protected ref: NbDialogRef<RemoveCarPromptComponent>) {}

  cancel() {
    this.ref.close('');
  }

  submit() {
    this.ref.close('delete');
  }

  ngOnInit(): void {
  }
}
