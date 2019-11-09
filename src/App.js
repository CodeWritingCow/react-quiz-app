class App extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {
    	stage: 'intro',
      questions: mockData,
      submittedAnswers: [],
      selectedAnswer: '',
      currentQuestionNumber: 0,
      isSubmitButtonDisabled: true
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadQuestion = this.loadQuestion.bind(this);
  }
  
  handleClick(stage) {
  	this.setState({stage: stage});
    if(stage === 'intro') {
    	this.setState({submittedAnswers:[], currentQuestionNumber: 0})
    };
  }

  handleChange(e) {
  	this.setState({selectedAnswer: e.target.value});
    if(this.state.isSubmitButtonDisabled) {
      this.setState({isSubmitButtonDisabled: false});
    }
  }

  handleSubmit(e) {
  	this.setState(state => {
    	return {submittedAnswers: state.submittedAnswers.concat(state.selectedAnswer), isSubmitButtonDisabled: true}
    });
    
    if(this.state.currentQuestionNumber === this.state.questions.length - 1) {
      this.setState({stage: 'success'});
    } else {
    	this.setState({currentQuestionNumber: this.state.currentQuestionNumber + 1});
    }
    e.preventDefault();
  }

  loadQuestion() {
  	return this.state.questions[this.state.currentQuestionNumber];
  }

  render() {
  	let stage;
    
    if(this.state.stage === 'intro') {
    	stage = <IntroStage handleClick={this.handleClick}/>;
    }
    if(this.state.stage === 'success') {
    	stage = <SuccessStage handleClick={this.handleClick}
                            submittedAnswers={this.state.submittedAnswers}
                            questions={this.state.questions.map((question) => question.question)}/>;
    }
    if(this.state.stage === 'quiz') {
    	stage = <QuizStage handleClick={this.handleClick}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    loadQuestion={this.loadQuestion}
                    selectedAnswer={this.state.selectedAnswer}
                    isSubmitButtonDisabled={this.state.isSubmitButtonDisabled}/>;
    }
  
  	return(
    	<div className="text-center">
        {stage}
    	</div>
    );
  }
}


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
      <button className="btn btn-primary btn-sm" onClick={() => props.handleClick('intro')} style={{marginRight: '5px'}}>RESTART QUIZ</button>
      <button className="btn btn-danger btn-sm" onClick={() => props.handleClick('success')}>QUIT</button>
  	</div>
  );
}

const QuizQuestion = (props) => {
	return(
  	<div>
  	  <p className="lead">{props.text}</p>
  	</div>
  );
}

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

const QuizForm = (props) => {
  let options = props.answers.map((option, idx) => <QuestionOption handleChange={props.handleChange} id={idx} value={option} selectedAnswer={props.selectedAnswer} />);
  
	return(
    <div className="form-check text-left">
      <form onSubmit={props.handleSubmit}>
      {options}
        <button className="btn btn-primary btn-sm" style={{marginTop:'10px'}} type="submit" disabled={props.isSubmitButtonDisabled}>SUBMIT</button>
      </form>
  </div>
  );
}


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
      <button className="btn btn-warning btn-lg" onClick={() => props.handleClick('intro')} style={{marginBottom: '10px'}}>TAKE QUIZ AGAIN</button>
    </div>
  );
}

let mockData = [
	{question: 'What is your skin type?', answers:['Dry', 'Normal', 'Oily', 'Combination']},
  {question: 'Do you have sensitive skin?', answers:["Yes", "No", "Not Sure"]},
  {question: 'Do you have acne, acne scars, or rosacea?', answers:["Yes", "No"]},
  {question: 'How many hours do your spend in the sun each day?', answers:["Less than 1 hr", "1-2 hr", "2-4 hr", "More than 4 hr"]}
];

ReactDOM.render(<App/>, document.getElementById('app'));