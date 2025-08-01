import React, { Component, createRef } from "react";
import "./todo-list-app.css";
class TodoListApp extends Component{
     inputFocus = createRef();
    constructor(props){
        super(props)
    this.state = {
      inputValue: "",
      addList:  [],
      delAddBtn: "inline",
      delSaveNotsaveBtn: "none",
      edited: "",
      focusOninput: "",
      PrevEditedInput: "",
      currentEditedInput: ""
    }
        
        
    }
  
    // handling add task button
    addButtonHandling = ()=>{
        const iputItem = this.state.inputValue
        if(iputItem.trim()){
        this.setState((prevState)=>({addList: [...prevState.addList, {text: iputItem.trim(), textDecorationLine: "none", eraseContent: "Erase"}], inputValue: ""}))
        } else{
            alert("Please Enter Task")
        }  
    }
    // setting the input value into the state object
    inputHandling = (e)=>{
        this.setState({inputValue: e.target.value})
    }
    // handling delete button
    deleteButtonHandling = (indexToDelete)=>{
        this.setState(prevState => ({addList : prevState.addList.filter((item, index)=>index !== indexToDelete),inputValue: "",delAddBtn: "inline", delSaveNotsaveBtn: "none", edited: ""}))
    }
   // handling Edit Button 
   editButtonHandling = (indexFind)=>{
    const inputArrayVlaue = [...this.state.addList]
    this.setState(({inputValue : inputArrayVlaue[indexFind].text, delAddBtn: "none", delSaveNotsaveBtn: "inline", edited: indexFind, PrevEditedInput: inputArrayVlaue[indexFind].text}))
    // to make the input element is focused when edit button is clicked...
    this.inputFocus.current?.focus();
   }
   //erase button handling
   eraseButtonHandling = (indexFind)=>{ 
    const decore = [...this.state.addList];
    decore[indexFind].textDecorationLine = decore[indexFind].textDecorationLine === "none" ? "line-through": "none";
    decore[indexFind].eraseContent = decore[indexFind].eraseContent === "Erase" ? "Don't erase": "Erase";
    this.setState({addList: decore});
   }

   // save button Handling
   saveButtonHandling = ()=>{
    if(this.state.inputValue.trim() && this.state.inputValue.trim() !== this.state.PrevEditedInput){
          const changetext = [...this.state.addList];
    changetext[Number(this.state.edited)].text = this.state.inputValue; // assign input value for the exact taskList...
    this.setState({addList: changetext, delSaveNotsaveBtn: "none", delAddBtn: "inline", inputValue: "", edited: ""}) 
    } else{
         alert("Please edit the task or click Don't save button")
    }
   }
     // Don't save button handling
  notSaveButtonHandling = ()=>{
      if(this.state.PrevEditedInput.trim() || this.state.inputValue.trim() === ""){
          const changetext = [...this.state.addList];
    changetext[Number(this.state.edited)].text = this.state.PrevEditedInput; // don't assign not edited task ....
    this.setState({addList: changetext, delSaveNotsaveBtn: "none", delAddBtn: "inline", inputValue: "", edited: "", PrevEditedInput: ""}) 
    }
  }
   // reset button handling
   resetButtonHandling = ()=>{
    if(this.state.addList.length === 0){
    alert("Nothing to be reset")
    } else{
       if(window.confirm("Click 'ok' button to reset otherwise click 'Cancel'!!")){
       this.setState({addList: [], delSaveNotsaveBtn: "none", delAddBtn: "inline", inputValue: "", edited: ""})
       }else{

       }
    }
     
   
   }
    render(){
        return(
        <div id="allInOne">
        <div id="container">
            <h1>To-do list app</h1>
            <div>
                <input ref={this.inputFocus} onChange={this.inputHandling} id="addInput" type="text" placeholder="Enter task" value={this.state.inputValue}/>
                <button id="addButton" style={{display: this.state.delAddBtn}} onClick={this.addButtonHandling}>Add task</button>
                <button className="reset"style={{display: this.state.delSaveNotsaveBtn, display: this.state.delAddBtn}} onClick={this.resetButtonHandling} title="Reset">↻</button>
                <button className="save"style={{display: this.state.delSaveNotsaveBtn}}onClick={this.saveButtonHandling}>Save</button>
                <button className="notSave" style={{display: this.state.delSaveNotsaveBtn}} onClick={this.notSaveButtonHandling}>Don't save</button>
            </div>
        </div>
        <ul id="listedTodaysJob">
            {this.state.addList.map((item, index)=>(<li key={index}>
                <p className ="text"  style={{textDecorationLine : item.textDecorationLine, textDecorationThickness: "4px", textDecorationColor: "red"}}>{this.state.edited === index ? this.state.inputValue : item.text}</p>
            <button className="delBtn" onClick={()=>this.deleteButtonHandling(index)} title="Delete">
                <svg class="svg-delete" viewBox="0 0 24 24" width="18" height="18">
           <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>
          </button>
          <button className="editBtn" onClick={()=>this.editButtonHandling(index)} title="Edit">✏️</button>
          <button onClick={()=>this.eraseButtonHandling(index)} className="Erase">{item.eraseContent}</button></li>))}
        </ul>
    </div>)
    }
};
export default TodoListApp;
 
 