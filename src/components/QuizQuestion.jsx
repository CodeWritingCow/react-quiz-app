import React from 'react';

const QuizQuestion = (props) => {
  return(
    <div>
      <p className="lead">{props.text}</p>
    </div>
  );
}

export default QuizQuestion;