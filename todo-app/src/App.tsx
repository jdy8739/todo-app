import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoriesObjAtom, category, todoSelector, toDoState } from "./atoms";
import CategoryCreator from "./components/CategoryCreator";
import TodoList from "./components/TodoList";

interface INewToDo {
    newToDo: string
};

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

    const [toDos, setToDos] = useRecoilState(toDoState);

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
            <form onSubmit={handleSubmit(onValid)}>
                <input {...toDoRegister} 
                placeholder="Input your to-do here!"
                disabled={ chosenCategory === categoriesObj.ALL }
                />
                <button type="submit">Add</button>
                <p>{ errors?.newToDo?.message }</p>
            </form>
            <TodoList toDos={filteredToDoList}/>
            <CategoryCreator />
      </div>
    );
  }
  
  export default App;