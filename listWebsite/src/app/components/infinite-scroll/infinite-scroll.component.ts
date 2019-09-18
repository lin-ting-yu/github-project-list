import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, Output, EventEmitter } from '@angular/core';
import { AnimationFrameService } from '../../_service/animation-frame.service';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit {
  @Input() stop = false;
  @Output() onBottom = new EventEmitter();
  @ViewChildren('infoScroll') infoScroll: QueryList<ElementRef>;
  private infoScrollDOM = null;
  public scrollTop = 0;
  public windowHeight = 0;
  public windowWidth = 0;
  constructor(
    private anFrame: AnimationFrameService
  ) { }

  setSize() {
    this.windowHeight = window.innerHeight;
    this.windowWidth  = window.innerWidth;
  }
  // 滑動到底實觸發
  onBottomEvent() {
    const infoScrollDOMPos = this.infoScrollDOM.getBoundingClientRect();
    const result = this.windowHeight - infoScrollDOMPos.bottom;
    if (result <= 0) { return; }
    this.onBottom.emit();
  }
  // 取得定位DOM
  getinfoScrollDOM() {
    this.infoScrollDOM = this.infoScroll.toArray()[0].nativeElement;
  }
  onScroll() {
    if (this.scrollTop !== window.pageYOffset ||
        document.body.scrollHeight - this.scrollTop - this.windowHeight < 10) {
      this.scrollTop = window.pageYOffset;
      if (this.stop) { return; }
      this.onBottomEvent();
    }
  }
  onResize() {
    if (this.windowHeight !== window.innerHeight ||
        this.windowWidth  !== window.innerWidth) {
        this.setSize();
      }
  }
  bindingFrame() {
    this.onScroll();
    this.onResize();
  }
  ngOnInit() {
    this.setSize();
    this.scrollTop = window.pageYOffset;
  }
  ngAfterViewInit(): void {
    this.getinfoScrollDOM();
    this.anFrame.bindingAniamtionFrame(() => this.onScroll());
  }
}
