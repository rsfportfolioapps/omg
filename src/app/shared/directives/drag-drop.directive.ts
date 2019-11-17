import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective  {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.opacity') private opacity = '1';

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.opacity = '0.7';
  }
  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.opacity = '1';
  }
  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.opacity = '1';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }

}
