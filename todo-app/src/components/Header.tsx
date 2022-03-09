import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesObj, categoriesObjAtom, toDoStateAtom } from "../atoms";

const HeaderPart = styled.div`
    text-align: center;
    position: relative;
`;

const Title = styled.h1`
    display: inline-block;
`;

const ResetBtn = styled.button`
    position: absolute;
    top: 35px;
    right: 0;
    border: 0;
    padding: 8px;
    border-radius: 8px;
    color: red;
    font-weight: bold;
    cursor: pointer;
`;

function Header() {

    const setToDoState = useSetRecoilState(toDoStateAtom);

    const setCategoriesObj = useSetRecoilState(categoriesObjAtom);

    const resetAllToDo = () => {
        localStorage.removeItem('toDos');
        localStorage.setItem('categories', JSON.stringify(categoriesObj));

        setToDoState([]);
        setCategoriesObj({...categoriesObj});
    };

    return (
        <HeaderPart>
            <Title>Hello To-Do!</Title>
            <ResetBtn onClick={resetAllToDo}>Reset All</ResetBtn>
        </HeaderPart>
    )
};

export default Header;