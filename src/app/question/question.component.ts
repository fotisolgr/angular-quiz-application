import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public userName: String="";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 30;
  correctAnswer: number = 0;
  wrongAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;

  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem("user_name")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    return this.questionService.getQuestionJson()
    .subscribe(res => this.questionList = res.questions);
  }

  nextQuestion(){
    return this.currentQuestion++;
  }

  previousQuestion(){
    return this.currentQuestion--;
  }

  answer(questionNumber: number, option: any){

    if(questionNumber === this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }

    if(option.correct){
      this.points = this.points + 10;
      this.correctAnswer = this.correctAnswer + 1;
      setTimeout(() => {  
        this.currentQuestion = this.currentQuestion + 1;
        this.resetCounter();
        this.getProgressPercentage();
      }, 200);
    } else {
      setTimeout(() => {
        this.currentQuestion = this.currentQuestion + 1;
        this.wrongAnswer = this.wrongAnswer + 1;
        this.resetCounter();
        this.getProgressPercentage();
      }, 200);
    }
  }

  startCounter(){
    this.interval$ = interval(1000)
    .subscribe(val => {
      this.counter = this.counter - 1;
      if(this.counter === 0){
        this.counter = 30;
        this.currentQuestion = this.currentQuestion + 1;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 300000);

  }

  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }

  resetCounter(){
    this.stopCounter();
    this.counter=30;
    this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.currentQuestion=0;
    this.progress = "0";
  }

  getProgressPercentage(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();

    return this.progress;
  }
}
