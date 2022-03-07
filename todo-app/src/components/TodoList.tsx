import { IToDos } from "../atoms";
import TodoElem from "./TodoElem";

function TodoList({ toDos }: { toDos: IToDos[] }) {

    return (
        <>
            <ul>
                {
                    toDos.map((toDoElem, i) => {
                        return (
                            <TodoElem key={toDoElem.id} toDoElem={toDoElem}/>
                        )
                    })
                }
            </ul>
        </>
    )
};

export default TodoList;