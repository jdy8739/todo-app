import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { category, EnumCategories, todoSelector, toDoState } from "./atoms";
import TodoList from "./components/TodoList";

interface INewToDo {
    newToDo: string
};

function App() {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<INewToDo>();

    const [toDos, setToDos] = useRecoilState(toDoState);

    const [chosenCategory, setChosenCategory] = useRecoilState<EnumCategories>(category);

    const onValid = function(newToDo: INewToDo) {
        setToDos(oldToDos => 
            [ ...oldToDos, { 
                toDo: newToDo.newToDo, 
                id: Date.now(), 
                category: chosenCategory
            } ]
        );
        setValue('newToDo', '');
    };

    const handleCategoryChange = function(e: React.FormEvent<HTMLSelectElement>) {
        const chosenCategory = e.currentTarget.value as EnumCategories;
        setChosenCategory(chosenCategory);
    };

    const filteredToDoList = useRecoilValue(todoSelector);

    return (
      <div className="App">
            <select onChange={handleCategoryChange} value={chosenCategory}>
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