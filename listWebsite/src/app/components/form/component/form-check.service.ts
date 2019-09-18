import { Injectable } from '@angular/core';
import { ToolFunctionService } from 'src/app/_service/tool-function.service';
@Injectable({
  providedIn: 'root'
})
export class FormCheckService {
  public isFoucs = false;
  public isValue = false;

  constructor(
    private toolFunction: ToolFunctionService
  ) { }


  onFoucs(){
    return true;
  }
  onBlur(){
    return false;
  }
  checkVal(event){
    if (event) {
      let val = event.value;
      let result;
      if (val.length === 0) {
        result = false;
      }
      else if (val.length > 0) {
        result = true;
      }
      return result;
    }
  }
}
