import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import data from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {

  title: string = ""
  questions: any
  questionSelected: any
  answers: string[] = []
  answerSelected: string = ''

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = false

  ngOnInit() {

    if (data) {
      this.finished = false
      this.title = data.title

      this.questions = data.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }

  }

  playerChoose(alias:string) {
    this.answers.push(alias)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex += 1
    
    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    } else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true 
      this.answerSelected = data.results[finalAnswer as keyof typeof data.results]
    }
    console.log(this.answers)
  }

  async checkResult(answers:string[]) {
    const result = answers.reduce((previous,current,i,arr) => {
      if(arr.filter(item => item === previous).length > arr.filter(item => item === current).length) {
        return previous
      }else {
        return current
      }
    })
    return result
  }

}
