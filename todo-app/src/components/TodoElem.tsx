import React from "react";
import { useSetRecoilState } from "recoil";
import { EnumCategories, IToDos, toDoState } from "../atoms";

function TodoElem({ toDoElem }: { toDoElem: IToDos }) {

    const setToDoList = useSetRecoilState(toDoState);

    const handleChangeCategory = function(e: React.MouseEvent<HTMLButtonElement>) {
        const newCategory = e.currentTarget.name as EnumCategories;

        setToDoList(oldToDoList => {

            const targetIndex = oldToDoList.findIndex(oldToDo => oldToDo.id === toDoElem.id);
            
            const updatedToDoList = [...oldToDoList];

            updatedToDoList[targetIndex] = { 
                ...oldToDoList[targetIndex], 
                category: newCategory
            };

            return updatedToDoList;
        });
    };

    return (
        <>
            <li>{ toDoElem.toDo }
                &ensp;
                <span>
                    { 
                        toDoElem.category != EnumCategories.TO_DO && 
                        <button onClick={handleChangeCategory} 
                        name={EnumCategories.TO_DO}>
                            TO-DO
                        </button> 
                    }
                    { 
                        toDoElem.category != EnumCategories.DOING && 
                        <button onClick={handleChangeCategory} 
                        name={EnumCategories.DOING}>
                            DOING
                        </button> 
                    }
                    { 
                        toDoElem.category != EnumCategories.DONE && 
                        <button onClick={handleChangeCategory} 
                        name={EnumCategories.DONE}>
                            DONE
                        </button>
                    }
                </span>
            </li>
        </>
    )
};

export default TodoElem;