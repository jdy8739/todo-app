import React from "react";
import { useRecoilValue } from "recoil";
import { categoriesObjAtom, category, IToDos } from "../atoms";
import TodoElem from "./TodoElem";

function TodoList({ toDos }: { toDos: IToDos[] }) {

    const chosenCategory = useRecoilValue(category);

    const categoriesObj = useRecoilValue(categoriesObjAtom);

    return (
        <>
            <ul>
                {
                    chosenCategory === 'ALL' ?
                    <>
                        {
                            Object.keys(categoriesObj).map(category => {
                                return (
                                    <div key={category}>
                                        {   
                                            category === 'ALL' ? null :
                                            <>
                                                <p>{category}</p>
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