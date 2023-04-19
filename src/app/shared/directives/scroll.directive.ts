import { Directive, ElementRef, HostListener } from '@angular/core';
import { ScrollService } from '../services/scroll.service';

@Directive({
  selector: '[appScroll]',
})
export class ScrollDirective {
  private previousScrollPosition = 0;
  constructor(private scrollService: ScrollService) {}
  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (window.innerWidth < 1440) {
      const currentScrollPosition = event.target.scrollTop;
      if (currentScrollPosition > this.previousScrollPosition) {
        this.scrollService.setScroll(false);
      } else {
        this.scrollService.setScroll(true);
      }
      this.previousScrollPosition = currentScrollPosition;
    }
  }
}
