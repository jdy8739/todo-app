import { atom, selector } from "recoil";
import TodoElem from "./components/TodoElem";

export enum EnumCategories {
    'TO_DO' = 'TO_DO',
    'DOING' = 'DOING',
    'DONE' = 'DONE',
    'ALL' = 'ALL'
};

export interface IToDos {
    toDo: string,
    id: number,
    category: EnumCategories
};

export const toDoState = atom<IToDos[]>({
    key: 'todo',
    default: []
});

export const category = atom<EnumCategories>({
    key: 'category',
    default: EnumCategories.TO_DO
});

export const todoSelector = selector({
    key: 'toDoSelector',
    get: ({ get }) => {
        const toDos = get(toDoState);
        const chosenCategory = get(category);
        if(chosenCategory === EnumCategories.ALL) return toDoState;
        else return toDos.filter(toDoElem => toDoElem.category === chosenCategory);
    }
});