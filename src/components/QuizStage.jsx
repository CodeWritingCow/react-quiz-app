import React from 'react';
import QuizQuestion from './QuizQuestion.jsx';
import QuizForm from './QuizForm.jsx';

const QuizStage = (props) => {
  let {question, answers} = props.loadQuestion();

  return(
    <div>
      <div className="jumbotron">
        <QuizQuestion text={question}/>
        <QuizForm handleChange={props.handleChange}
          handleSubmit={props.handleSubmit}
          answers={answers}
          selectedAnswer={props.selectedAnswer}
          isSubmitButtonDisabled={props.isSubmitButtonDisabled}/>
      </div>
      <button className="btn btn-primary btn-sm"
        onClick={() => props.handleClick('intro')}
        style={{marginRight: '5px'}}>
        RESTART QUIZ
      </button>
      <button className="btn btn-danger btn-sm"
        onClick={() => props.handleClick('success')}>
        QUIT
      </button>
    </div>
  );
}

export default QuizStage;