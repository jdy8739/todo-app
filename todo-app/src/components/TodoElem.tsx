import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesObjAtom, IToDos, toDoState } from "../atoms";

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
        const newCategory: string = e.currentTarget.name;

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

    const categoriesObj = useRecoilValue(categoriesObjAtom);

    return (
        <>
            <li>{ toDoElem.toDo }
                &ensp;
                <span>
                    {
                        Object.keys(categoriesObj).map((categoryElem, i) => {
                            return (
                                (
                                    toDoElem.category !== categoriesObj[categoryElem] 
                                    &&
                                    categoryElem !== categoriesObj['ALL']
                                ) && 
                                <button 
                                onClick={handleChangeCategory} 
                                name={categoriesObj[categoryElem]}
                                key={i}
                                >
                                    { categoryElem }
                                </button>
                            )
                        })
                    }
                    <DeleteBtn onClick={deleteToDoElem}>x</DeleteBtn>
                </span>
            </li>
        </>
    )
};

export default React.memo(TodoElem);