import { Component, OnInit, Input } from '@angular/core';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {

  constructor() { }
  @Input() name: string;
  @Input() placeholder = '';
  @Input() form: any;
  @Input() type: string;
  @Input() errors: object;

  ngOnInit() {}

}
