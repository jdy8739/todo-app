import { atom, selector } from "recoil";

export enum EnumCategories {
    'ALL' = 'ALL',
    'TO_DO' = 'TO_DO',
    'DOING' = 'DOING',
    'DONE' = 'DONE'
};

interface ICategoriesObj {
    [key: string]: string;
};

export const categoriesObj: ICategoriesObj = {
    'TO_DO': 'TO_DO',
    'DOING': 'DOING',
    'DONE': 'DONE',
    'ALL': 'ALL'
};

export const categoriesObjAtom = atom<ICategoriesObj>({
    key: 'categoriesObjAtom',
    default: categoriesObj
});

export interface IToDos {
    toDo: string,
    id: number,
    category: string
};

export const toDoState = atom<IToDos[]>({
    key: 'todo',
    default: []
});

export const category = atom<string>({
    key: 'category',
    default: categoriesObj.TO_DO
});

export const todoSelector = selector({
    key: 'toDoSelector',
    get: ({ get }) => {
        const toDos = get(toDoState);
        const chosenCategory = get(category);
        if(chosenCategory === categoriesObj.ALL) return toDoState;
        else return toDos.filter(toDoElem => toDoElem.category === chosenCategory);
    }
});