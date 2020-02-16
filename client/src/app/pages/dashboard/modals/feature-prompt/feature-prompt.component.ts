import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-feature-prompt',
  templateUrl: './feature-prompt.component.html',
  styleUrls: ['./feature-prompt.component.scss'],
})
export class FeaturePromptComponent implements OnInit {
  constructor(protected ref: NbDialogRef<FeaturePromptComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }

  ngOnInit(): void {
  }
}

