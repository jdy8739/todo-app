import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoriesObjAtom, category, ICategoriesObj, IToDos, toDoStateAtom } from "../atoms";
import TodoElem from "./TodoElem";

const CategoryDeleteBtn = styled.button`
    border: none;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 1s;
    &:hover {
        background-color: red;
        color: white;
    }
    float: right;
`;

function TodoList({ toDos }: { toDos: IToDos[] }) {

    const chosenCategory = useRecoilValue(category);

    const [categoriesObj, setCategoriesObj] = useRecoilState(categoriesObjAtom);

    const [toDoState, setToDoState] = useRecoilState(toDoStateAtom);

    const deleteCategory = (chosenCategoryName: string) => {

        let isToDoRemain = false;
        toDoState.forEach(toDoElem => {
            if(toDoElem.category === chosenCategoryName) isToDoRemain = true;
        });

        if(isToDoRemain) {
            if(!window.confirm(
                'There are some To-Dos in this category. Are you sure to delete this category?')) {
                    return;
                };
            
        };

        setToDoState(oldToDoState => {
            const updatedToDoState = [...oldToDoState];
            return deleteToDoListMatchesCategory(updatedToDoState, chosenCategoryName);;
        });

        setCategoriesObj(categoriesObj => {
            const updatedCategoriesObj = {...categoriesObj};
            return deleteToDoCategory(updatedCategoriesObj, chosenCategoryName);;
        });
    };

    const deleteToDoListMatchesCategory = (updatedToDoState: IToDos[], chosenCategoryName: string) => {
        for(let i=updatedToDoState.length - 1; i>=0; i--) {
            if(updatedToDoState[i].category === chosenCategoryName) {
                updatedToDoState.splice(i, 1);
            }
        }
        return updatedToDoState;
    };

    const deleteToDoCategory = (updatedCategoriesObj: ICategoriesObj, chosenCategoryName: string) => {
        delete updatedCategoriesObj[chosenCategoryName];
        return updatedCategoriesObj;
    };

    return (
        <>
            <ul>
                {
                    chosenCategory === categoriesObj['ALL'] ?
                    <>
                        {
                            Object.keys(categoriesObj).map(category => {
                                return (
                                    <div key={category}>
                                        {   
                                            category === 'ALL' ? null :
                                            <>
                                                <span>{category}</span>
                                                &ensp;
                                                <CategoryDeleteBtn 
                                                onClick={() => deleteCategory(category)}
                                                >Delete Category</CategoryDeleteBtn>
                                                <div style={{ clear: 'both' }}></div>
                                                {
                                                    toDos.filter(toDoElem => 
                                                        category === toDoElem.category).map(filteredToDoElem => {
                                                            return (
                                                                <TodoElem 
                                                                key={filteredToDoElem.id} 
                                                                toDoElem={filteredToDoElem}
                                                                />
                                                            )
                                                        })
                                                }
                                                <hr></hr>
                                            </>
                                        }
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