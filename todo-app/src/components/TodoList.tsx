import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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

const CategoryTitle = styled.h2`
    display: inline-block;
    margin-top: 0;
`;

const Category = styled.div`
    &:hover {
        ${CategoryTitle} {
            color: red;
        }
    }
`;

function TodoList({ toDos }: { toDos: IToDos[] }) {

    const [chosenCategory, setChosenCategory] = useRecoilState(category);

    const [categoriesObj, setCategoriesObj] = useRecoilState(categoriesObjAtom);

    const [toDoState, setToDoState] = useRecoilState(toDoStateAtom);

    const setCategory = useSetRecoilState(category);

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

        setChosenCategory('ALL');
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

    const handleOnClickCategory = (changedCategory: string) => {
        setCategory(changedCategory);
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
                                    <Category key={category} 
                                    onDoubleClick={() => handleOnClickCategory(category)}>
                                        {   
                                            category === 'ALL' ? null :
                                            <>
                                                <CategoryTitle>{category}</CategoryTitle>
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
                                    </Category>
                                )
                            })
                        }
                    </> 
                    :
                    <>
                        <CategoryTitle>{chosenCategory}</CategoryTitle>
                        &ensp;
                        <CategoryDeleteBtn 
                        onClick={() => deleteCategory(chosenCategory)}
                        >Delete Category</CategoryDeleteBtn>
                        <div style={{ clear: 'both' }}></div>
                        {
                            toDos.map((toDoElem, i) => {
                                return (
                                    <TodoElem key={toDoElem.id} toDoElem={toDoElem}/>
                                )
                            })
                        }
                        <hr></hr>
                    </>
                }
            </ul>
        </>
    )
};

export default React.memo(TodoList);