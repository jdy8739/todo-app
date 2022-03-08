import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoriesObjAtom, category, todoSelector, toDoStateAtom } from "./atoms";
import CategoryCreator from "./components/CategoryCreator";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

interface INewToDo {
    newToDo: string
};

const ErrorMessageDiv = styled.div`
    width: 200px;
    height: 20px;
    margin: 10px auto;
`;

let cnt = 0;

function App() {

    cnt ++;

    const { register, handleSubmit, setValue, formState: { errors }, setError } = useForm<INewToDo>();

    const toDoRegister = register('newToDo', {
        required: 'Write here!',
        minLength: {
            value: 3,
            message: 'Write down specific!'
        },
        disabled: false
    });

    const [toDos, setToDos] = useRecoilState(toDoStateAtom);

    const [chosenCategory, setChosenCategory] = useRecoilState<string>(category);

    const onValid = function({ newToDo }: INewToDo) {
        if(checkNewToDoLen(newToDo)) {
            setError('newToDo', 
                { message: 'Written To-Do is too long!' },
                { shouldFocus: true }
            );
        } else {
            setToDos(oldToDos => 
                [ ...oldToDos, { 
                    toDo: newToDo, 
                    id: Date.now(),
                    category: chosenCategory
                } ]
            );
            setValue('newToDo', '');
        }
    };

    const handleCategoryChange = function(e: React.FormEvent<HTMLSelectElement>) {
        const chosenCategory: string = e.currentTarget.value;
        setChosenCategory(chosenCategory);
    };

    const filteredToDoList = useRecoilValue(todoSelector);

    const checkNewToDoLen = (newToDo: string) :boolean => {
        const TO_DO_LEN_LIMIT = 30;
        if(newToDo.length > TO_DO_LEN_LIMIT) return true;
        else return false;
    };

    const categoriesObj = useRecoilValue(categoriesObjAtom);

    return (
      <div className="App">
            <Header />
            <form
            style={{ textAlign: 'center' }}
            onSubmit={handleSubmit(onValid)}
            >
                <select onChange={handleCategoryChange} value={chosenCategory}>
                    {
                        Object.keys(categoriesObj).map((categoryElem, i) => {
                            return (
                                <option key={i} 
                                value={categoriesObj[categoryElem]}
                                >{categoryElem}</option>
                            )
                        })
                    }
                </select>
                &ensp;
                <input {...toDoRegister} 
                placeholder="Input your to-do here!"
                disabled={ chosenCategory === categoriesObj.ALL }
                />
                &ensp;
                <button type="submit">Add</button>
                <ErrorMessageDiv>{ errors?.newToDo?.message }</ErrorMessageDiv>
            </form>
            <TodoList toDos={filteredToDoList}/>
            <CategoryCreator />
      </div>
    );
  }
  
  export default App;