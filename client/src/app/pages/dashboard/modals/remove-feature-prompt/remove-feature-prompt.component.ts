import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-remove-feature-prompt',
  templateUrl: './remove-feature-prompt.component.html',
  styleUrls: ['./remove-feature-prompt.component.scss'],
})
export class RemoveFeaturePromptComponent implements OnInit {
  constructor(protected ref: NbDialogRef<RemoveFeaturePromptComponent>) {}

  cancel() {
    this.ref.close('');
  }

  submit() {
    this.ref.close('delete');
  }

  ngOnInit(): void {
  }
}
