import { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Main from "./main";
export default function App() {

  useEffect(function () {
    async function GetQuestions(){
      try{
        const res = await fetch("http://localhost:8000/questions");
        console.log(res);
        if(!res.ok)
        throw new Error("Something went wrong can`t load data ");
      const data =await res.json();
      console.log(data);
      }
      catch(err){
        console.log(err);
      }
      finally{}

    }
    GetQuestions();},[]);
  
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Questions?</p>
      </Main>
    </div>
  );
}
