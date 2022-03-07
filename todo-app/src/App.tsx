import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { category, EnumCategories, todoSelector, toDoState } from "./atoms";
import TodoList from "./components/TodoList";

interface INewToDo {
    newToDo: string
};

function App() {

    const { register, handleSubmit, setValue, formState: { errors }, setError } = useForm<INewToDo>();

    const [toDos, setToDos] = useRecoilState(toDoState);

    const [chosenCategory, setChosenCategory] = useRecoilState<EnumCategories>(category);

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

    const inputRef = useRef<HTMLInputElement>(null);

    const handleCategoryChange = function(e: React.FormEvent<HTMLSelectElement>) {
        const chosenCategory = e.currentTarget.value as EnumCategories;
        setChosenCategory(chosenCategory);

        if(chosenCategory === EnumCategories.ALL) {
            if(inputRef.current) {
                inputRef.current.disabled = true;
            };
        } else {
            if(inputRef.current) {
                inputRef.current.disabled = false;
            };
        }
    };

    const filteredToDoList = useRecoilValue(todoSelector);

    const checkNewToDoLen = (newToDo: string) :boolean => {
        const TO_DO_LEN_LIMIT = 30;
        if(newToDo.length > TO_DO_LEN_LIMIT) return true;
        else return false;
    };

    return (
      <div className="App">
            <select onChange={handleCategoryChange} value={chosenCategory}>
                <option value={EnumCategories.ALL}>ALL</option>
                <option value={EnumCategories.TO_DO}>TO-DO</option>
                <option value={EnumCategories.DOING}>DOING</option>
                <option value={EnumCategories.DONE}>DONE</option>
            </select>
            <form onSubmit={handleSubmit(onValid)}>
                <input {...register('newToDo', {
                    required: 'Write here!',
                    minLength: {
                        value: 3,
                        message: 'Write down specific!'
                    }
                })} 
                ref={inputRef}
                placeholder="Input your to-do here!"
                />
                <button type="submit">Add</button>
                <p>{ errors?.newToDo?.message }</p>
            </form>
            <TodoList toDos={filteredToDoList}/>
      </div>
    );
  }
  
  export default App;