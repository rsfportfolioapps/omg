import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appMaxLength]',
})
export class MaxLengthDirective  {

  @Input('appMaxLength')
  public maxLength: number;

  constructor() { }

  @HostListener('input', ['$event']) inputListener(event: Event) {
    const target = event.target as HTMLInputElement;
    const val = target.value;
    if (val.length >= this.maxLength) {
      target.value = val.slice(0, this.maxLength);
    }
  }
}
