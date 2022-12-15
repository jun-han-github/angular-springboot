import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-with-fieldset',
  templateUrl: './input-with-fieldset.component.html',
  styleUrls: ['./input-with-fieldset.component.css']
})
export class InputWithFieldsetComponent implements OnInit {
  @Input() title?: string;
  @Input() type = 'text';
  @Input() logo?: string;
  @Input() name?: string;
  @Input() credit?: number;

  constructor() { }

  ngOnInit(): void {
  }

  doSomething(value: string) {
    console.log(value);
  }



}
