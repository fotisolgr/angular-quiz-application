import { Directive, ElementRef, Input, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input() isCorrect : Boolean = false;

  constructor(private elementReference : ElementRef, private render : Renderer2) { }

    @HostListener('click') answer(){
      if(this.isCorrect){
        this.render.setStyle(this.elementReference.nativeElement, 'background', 'green');
        this.render.setStyle(this.elementReference.nativeElement, 'color', '#fff');
        this.render.setStyle(this.elementReference.nativeElement, 'border', '2px solid grey');
      } else {
        this.render.setStyle(this.elementReference.nativeElement, 'background', 'red');
        this.render.setStyle(this.elementReference.nativeElement, 'color', '#fff');
        this.render.setStyle(this.elementReference.nativeElement, 'border', '2px solid grey');
      }
    }
  

}
