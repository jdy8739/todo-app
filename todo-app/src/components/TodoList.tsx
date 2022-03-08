import React from "react";
import { useRecoilValue } from "recoil";
import { category, EnumCategories, IToDos } from "../atoms";
import TodoElem from "./TodoElem";

function TodoList({ toDos }: { toDos: IToDos[] }) {

    const chosenCategory = useRecoilValue(category);

    const categories = [EnumCategories.TO_DO, EnumCategories.DOING, EnumCategories.DONE];

    return (
        <>
            <ul>
                {
                    chosenCategory === EnumCategories.ALL ?
                    <>
                        {
                            categories.map(category => {
                                return (
                                    <div key={category}>
                                        <p>{category}</p>
                                        {
                                            toDos.filter(toDoElem => 
                                                category === toDoElem.category).map(filteredToDoElem => {
                                                    return (
                                                        <TodoElem key={filteredToDoElem.id} toDoElem={filteredToDoElem}/>
                                                    )
                                                })
                                        }
                                        <hr></hr>
                                    </div>
                                )
                            })
                        }
                    </> 
                    :
                    <>
                        {
                            toDos.map((toDoElem, i) => {
                                return (
                                    <TodoElem key={toDoElem.id} toDoElem={toDoElem}/>
                                )
                            })
                        }
                    </>
                }
            </ul>
        </>
    )
};

export default React.memo(TodoList);