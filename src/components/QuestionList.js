import React,{useState,useEffect}from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions,setQuestions] = useState([]);

  useEffect(function(){
    fetch("http://localhost:4000/questions")
    .then(function(r) {
      return r.json();
    })
    .then(function(questions){
      setQuestions(questions);
    })
  },[]);

  function handleDeleteClick(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
    .then(function(r){
      return r.json();
    })
    .then(function(){
      const updatedQuiz = questions.filter(e=>e.id!==id);
      setQuestions(updatedQuiz);
    })
  }

  function handleAnswerChange(id,correctIndex){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({correctIndex})
    })
    .then(function(r) {
      return r.json();
    })
    .then(function(){
      const updatedQuiz = questions.map(question=>{
        if(question.id === updatedQuiz.id){
          return updatedQuiz;
        }
        return question;
      })
      setQuestions(updatedQuiz)
    })
  }


  const questionItems = questions.map(question=>(
    <QuestionItem
      key={question.id}
      question={question}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    ></QuestionItem>
  ))
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
