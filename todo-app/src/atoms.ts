import { atom, selector } from "recoil";

export enum EnumCategories {
    'ALL' = 'ALL',
    'TO_DO' = 'TO_DO',
    'DOING' = 'DOING',
    'DONE' = 'DONE'
};

export interface ICategoriesObj {
    [key: string]: string;
};

export const categoriesObj: ICategoriesObj = {
    'TO_DO': 'TO_DO',
    'DOING': 'DOING',
    'DONE': 'DONE',
    'ALL': 'ALL'
};

const isSavedCategories = localStorage.getItem('categories');

let savedCategories: ICategoriesObj | null = null;

if(isSavedCategories !== null) {
    savedCategories = JSON.parse(isSavedCategories);
} else {
    localStorage.setItem('categories', JSON.stringify(categoriesObj));
};

export const categoriesObjAtom = atom<ICategoriesObj>({
    key: 'categoriesObjAtom',
    default: !savedCategories ? categoriesObj : savedCategories
});

export interface IToDos {
    toDo: string,
    id: number,
    category: string
};

const isSavedToDos = localStorage.getItem('toDos');

let savedToDos;

if(isSavedToDos !== null) {
    savedToDos = JSON.parse(isSavedToDos);
} else {
    savedToDos = [];
};

export const toDoStateAtom = atom<IToDos[]>({
    key: 'todo',
    default: savedToDos
});

export const category = atom<string>({
    key: 'category',
    default: categoriesObj.ALL
});

export const todoSelector = selector({
    key: 'toDoSelector',
    get: ({ get }) => {
        const toDos = get(toDoStateAtom);
        const chosenCategory = get(category);
        if(chosenCategory === categoriesObj.ALL) return toDoStateAtom;
        else return toDos.filter(toDoElem => toDoElem.category === chosenCategory);
    }
});