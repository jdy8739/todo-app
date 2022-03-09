import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesObjAtom, IToDos, toDoStateAtom } from "../atoms";

const DeleteBtn = styled.button`
    color: red;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: rgba(0, 10, 10, 2);
    box-sizing: border-box;
    &:hover {
        background-color: red;
        color: white;
    }
`;

const TodoLiElem = styled.li`
    padding: 4px;
`;

function TodoElem({ toDoElem }: { toDoElem: IToDos }) {

    const setToDoList = useSetRecoilState(toDoStateAtom);

    const handleChangeCategory = function(e: React.MouseEvent<HTMLButtonElement>) {
        const newCategory: string = e.currentTarget.name;

        setToDoList(oldToDoList => {

            const targetIndex = oldToDoList.findIndex(oldToDo => oldToDo.id === toDoElem.id);
            
            const updatedToDoList = [...oldToDoList];

            updatedToDoList[targetIndex] = { 
                ...oldToDoList[targetIndex], 
                category: newCategory
            };

            updateToDoObjInLocalStorage(targetIndex, newCategory);

            return updatedToDoList;
        });
    };

    const updateToDoObjInLocalStorage = (targetIndex: number, newCategory: string) => {
        const isSavedToDos = localStorage.getItem('toDos');
        if(isSavedToDos !== null) {
            const savedToDos: IToDos[] = JSON.parse(isSavedToDos);
            savedToDos.splice(targetIndex, 1, 
                { ...savedToDos[targetIndex], category: newCategory });
            localStorage.setItem('toDos', JSON.stringify(savedToDos));
        }
    };

    const deleteToDoElem = function() {

        setToDoList(oldToDoList => {

            const updatedToDoList = [...oldToDoList];

            const targetIndex = oldToDoList.findIndex(oldToDo => oldToDo.id === toDoElem.id);

            updatedToDoList.splice(targetIndex, 1);

            deleteToDoObjInLocalStorage(targetIndex);

            return updatedToDoList;
        });
    };

    const deleteToDoObjInLocalStorage = (targetIndex: number) => {
        const isSavedToDos = localStorage.getItem('toDos');
        if(isSavedToDos !== null) {
            const savedToDos: IToDos[] = JSON.parse(isSavedToDos);
            savedToDos.splice(targetIndex, 1);
            localStorage.setItem('toDos', JSON.stringify(savedToDos));
        }
    };

    const categoriesObj = useRecoilValue(categoriesObjAtom);

    return (
        <>
            <TodoLiElem>{ toDoElem.toDo }
                <br></br>
                <span>
                    {
                        Object.keys(categoriesObj).map((categoryElem, i) => {
                            return (
                                (
                                    toDoElem.category !== categoriesObj[categoryElem] 
                                    &&
                                    categoryElem !== categoriesObj['ALL']
                                ) && 
                                <span key={i}>
                                    <button 
                                    onClick={handleChangeCategory} 
                                    name={categoriesObj[categoryElem]}
                                    >
                                        { categoryElem }
                                    </button>
                                    &ensp;
                                </span>
                            )
                        })
                    }
                    <DeleteBtn onClick={deleteToDoElem}>x</DeleteBtn>
                </span>
            </TodoLiElem>
        </>
    )
};

export default React.memo(TodoElem);