import React from 'react';

const IntroStage = (props) => {
	return(
  	<div>
      <div className="jumbotron">
        <h1 className="display-4">Ronik Design Quiz</h1>    
        <p className="lead">Prototype by Gary Pang</p>
        <small>To see Gary's other work, visit <a href="https://github.com/CodeWritingCow">https://github.com/CodeWritingCow</a></small>
      </div>
      <button className="btn btn-primary btn-lg" onClick={() => props.handleClick('quiz')}>START</button>
    </div>
  );
}

export default IntroStage;