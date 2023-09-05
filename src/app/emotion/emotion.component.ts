import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { questions } from '../globals/questions';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { SuccessComponent } from '../success/success.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-emotion',
  templateUrl: './emotion.component.html',
  styleUrls: ['./emotion.component.css'],
})
export class EmotionComponent {
  constructor(
    private _snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
  ) {}

  public user_name = localStorage.getItem('em_user_name');
  public questions: any = [];
  public currentQuestion: any = {};
  public currentQuestionIndex: any = 0;
  selectedAnswer: string | undefined;
  public answerChecked: any = false;
  public loader: any = true;
  ngOnInit() {
    this.onLoad();
  }
  public screenWidth: any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }
  logOut() {
    localStorage.removeItem('em_user_name');
    localStorage.removeItem('answeredQuestions');
    localStorage.removeItem('repeatedQuestions');
    this.router.navigate(['/login']);
  }

  onLoad() {
    this.loader = true;
    setTimeout(() => {
      localStorage.removeItem('answeredQuestions');
      localStorage.removeItem('repeatedQuestions');

      // this.questions = this.shuffleArray(questions).slice(0, 10);
      this.questions = questions.slice(0, 3);

      this.currentQuestionIndex = 0;
      this.setCurrentQuestion(this.questions[this.currentQuestionIndex]);
      this.loader = false;
    }, 1000);
  }

  setCurrentQuestion(data: any) {
    this.currentQuestion = data;
    this.currentQuestion.options = this.shuffleArray(
      this.currentQuestion.options
    );

    let q_no = data.q_no;
    let index = this.questions.findIndex((x: any) => x.q_no == q_no);
    if (this.currentQuestion.imageUrl === '') {
      if (
        this.currentQuestion.answer == 'Happy' ||
        this.currentQuestion.answer == 'Excited'
      ) {
        const randomIndex = Math.floor(Math.random() * 11) + 1;
        this.currentQuestion.imageUrl = `assets/category1/${randomIndex}.jpeg`;
        this.questions[index].imageUrl = this.currentQuestion.imageUrl;
      }
      if (this.currentQuestion.answer == 'Sad') {
        const randomIndex = Math.floor(Math.random() * 8) + 1;
        this.currentQuestion.imageUrl = `assets/category2/${randomIndex}.jpeg`;
        this.questions[index].imageUrl = this.currentQuestion.imageUrl;
      }
      if (
        this.currentQuestion.answer == 'Confused' ||
        this.currentQuestion.answer == 'Frustrated'
      ) {
        const randomIndex = Math.floor(Math.random() * 6) + 1;
        this.currentQuestion.imageUrl = `assets/category3/${randomIndex}.jpeg`;
        this.questions[index].imageUrl = this.currentQuestion.imageUrl;
      }
      if (this.currentQuestion.answer == 'Surprised') {
        const randomIndex = Math.floor(Math.random() * 1) + 1;
        this.currentQuestion.imageUrl = `assets/category4/${randomIndex}.jpeg`;
        this.questions[index].imageUrl = this.currentQuestion.imageUrl;
      }
    }

    this.currentQuestion.selectedAnswer = undefined;
    this.selectedAnswer = undefined;
    this.answerChecked = false;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.questions[this.currentQuestionIndex].selectedAnswer = undefined;
      this.setCurrentQuestion(this.questions[this.currentQuestionIndex]);
    }
  }

  selectedAnswerChanged(answer: string, questionIndex: number) {
    this.answerChecked = true;
    this.questions[questionIndex].selectedAnswer = answer;
    this.selectedAnswer = answer;

    if (
      this.questions[questionIndex].selectedAnswer ==
      this.questions[questionIndex].answer
    ) {
      this._snackBar.open('🎉🎊🎉🎊🎉🎊🎉🎊🎉👍👍..', '', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 2000,
      });
      this.playSuccessSound();
    } else {
      this._snackBar.open('😓😓😓😓😔😔😓😓😓😔😓..', '', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 2000,
      });
      this.playErrorSound();
      this.storeRepeatedQuestion(this.questions[questionIndex]);
    }

    // setTimeout(() => {
    //   this.answerChecked = true;
    // }, 1000);
    let cIndex: any = this.currentQuestionIndex + 1;
    if (cIndex == this.questions.length) {
      let dialogRef: any;

      dialogRef = this.dialog.open(SuccessComponent, {
        width: '80%',
        maxHeight: '50vh',
        panelClass: 'custom-dialog-class',
      });

      dialogRef.afterClosed().subscribe((dialogResult: any) => {
        this.onLoad();
      });
    } else {
      setTimeout(() => {
        this.nextQuestion();
      }, 3000);
    }
  }

  storeRepeatedQuestion(question: any) {
    const newQuestion = { ...question }; // Create a copy of the question object
    newQuestion.q_no = this.questions.length + 1; // Ensure uniqueness
    newQuestion.selectedAnswer = undefined;
    this.questions = [...this.questions, newQuestion];
  }
  playSuccessSound() {
    const audio = document.getElementById('audioPlayer1') as HTMLAudioElement;
    if (audio) {
      audio.currentTime = 0; // Restart playback from the beginning
      audio.play();
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; // Reset the audio time for next playback
      }, 3000); //
    }
  }

  playErrorSound() {
    const audio = document.getElementById('audioPlayer2') as HTMLAudioElement;
    if (audio) {
      audio.currentTime = 0; // Restart playback from the beginning
      audio.play();
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; // Reset the audio time for next playback
      }, 3000); //
    }
  }

  shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
