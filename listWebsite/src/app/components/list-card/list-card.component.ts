import { Component, OnInit, Input } from '@angular/core';
import { ListCard } from './list-card.type';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {
  @Input() data: Array<ListCard> = null;
  public copyModalShow = false;
  public copyModalAn = false;
  private copyClick = false;
  constructor(
    private _clipboardService: ClipboardService
  ) { }
  transsformDate(date: string) {
    return date.match(/(.*)T/)[1];
  }
  controlCopyModal(){
    this.copyModalShow = true;
    setTimeout(() => {
      this.copyModalAn = true;
      setTimeout(() => {
        this.copyModalAn = false;
        setTimeout(() => {
          this.copyClick = false;
          this.copyModalAn = false;
          this.copyModalShow = false;
        }, 2010);
      }, 1010);
    }, 10);
  }
  copyLink(text: string) {
    if (!this.copyClick) {
      this.copyClick = true;
      this._clipboardService.copyFromContent(text);
      this.controlCopyModal();
    }
  }

  ngOnInit() {
  }

}
