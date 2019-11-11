import React from 'react';

const SuccessStage = (props) => {
  let text;
  if(props.submittedAnswers.length === 0) {
    text = <p>You did not answer any question</p>;
  } else {
    text = props.submittedAnswers.map((answer, idx) => <div className="text-left"><p>{idx + 1}) {props.questions[idx]}</p><p>Your Answer: <strong>{answer}</strong></p><hr/></div>);
  }
  
  return(
    <div>
      <div className="jumbotron">
        <h1 className="display-4">Results</h1>
        {text}
      </div>
      <button className="btn btn-warning btn-lg"
        onClick={() => props.handleClick('intro')}
        style={{marginBottom: '10px'}}>
        TAKE QUIZ AGAIN
      </button>
    </div>
  );
}

export default SuccessStage;