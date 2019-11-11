import React from 'react';
import IntroStage from './components/IntroStage.jsx';
import QuizStage from './components/QuizStage.jsx';
import SuccessStage from './components/SuccessStage.jsx';
import mockData from './mockData';

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

export default App;