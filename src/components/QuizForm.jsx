import React from 'react';
import QuestionOption from './QuestionOption.jsx';

const QuizForm = (props) => {
  let options = props.answers.map((option, idx) => <QuestionOption handleChange={props.handleChange} id={idx} value={option} selectedAnswer={props.selectedAnswer} />);
  
  return(
    <div className="form-check text-left">
      <form onSubmit={props.handleSubmit}>
      {options}
        <button className="btn btn-primary btn-sm"
          style={{marginTop:'10px'}}
          type="submit"
          disabled={props.isSubmitButtonDisabled}>
          SUBMIT
        </button>
      </form>
  </div>
  );
}

export default QuizForm;