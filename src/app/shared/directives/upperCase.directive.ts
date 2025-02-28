import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
  standalone: false,
})
export class UppercaseDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input')
  onInput() {
    const input = this.el.nativeElement as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }
}
