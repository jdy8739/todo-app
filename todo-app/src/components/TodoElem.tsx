import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { EnumCategories, IToDos, toDoState } from "../atoms";

const DeleteBtn = styled.button`
    color: red;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    box-shadow: rgba(0, 10, 10, 2);
`;

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

    const deleteToDoElem = function() {
        setToDoList(oldToDoList => {

            const updatedToDoList = [...oldToDoList];

            const targetIndex = oldToDoList.findIndex(oldToDo => oldToDo.id === toDoElem.id);

            updatedToDoList.splice(targetIndex, 1);

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
                    <DeleteBtn onClick={deleteToDoElem}>x</DeleteBtn>
                </span>
            </li>
        </>
    )
};

export default TodoElem;