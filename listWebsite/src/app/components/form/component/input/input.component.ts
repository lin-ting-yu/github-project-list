import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormCheckService } from '../form-check.service';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() placeholder = 'placeholder';
  @Input() type = 'text';
  @Input() value = '';
  @Output() onKeydownEnter = new EventEmitter();
  public isFoucs = false;
  public isValue = false;


  constructor(
    private formCheck: FormCheckService
  ) { }

  onFoucs(){
    this.isFoucs = this.formCheck.onFoucs();
  }
  onBlur(event){
    this.value = event.target.value;
    this.isFoucs = this.formCheck.onBlur();
    this.isValue = this.formCheck.checkVal(event.target);
  }
  onKeydownEnterEvent(event) {
    this.value = event.target.value;
    this.onKeydownEnter.emit(this);
    return false;
  }
  ngOnInit() {
    if (this.value.trim() !== '') {
      this.isValue = true;
    }
  }

}
