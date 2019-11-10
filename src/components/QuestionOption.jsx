import React from 'react';

const QuestionOption = (props) => {
	return(
  	<div className="custom-control custom-radio">
      <input type="radio"
             id={props.value}
             name="customRadio"
             className="custom-control-input"
             onChange={props.handleChange}
             value={props.value}
             checked={props.selectedAnswer === props.value}
             />
      <label className="custom-control-label"
             for={props.value}>
             {props.value}
      </label>
  	</div>
  );
}

export default QuestionOption;