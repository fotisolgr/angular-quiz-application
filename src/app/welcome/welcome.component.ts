import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @ViewChild('user_name') userNameKey!: ElementRef

  constructor() { }

  ngOnInit(): void {
  }

  startQuiz(){
    localStorage.setItem("user_name", this.userNameKey.nativeElement.value);
  }

}
