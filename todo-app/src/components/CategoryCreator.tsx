import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { categoriesObjAtom, ICategoriesObj } from "../atoms";


function CategoryCreator() {

    const [newCategoryName, setNewCategoryName] = useState('');

    const [categoriesObj, setCategoriesObj] = useRecoilState(categoriesObjAtom);

    const handleMakeNewCategorySubmit = function(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(isNotValidCategoryName(newCategoryName)) {
            alert('This category name already exists.');
            return;
        }

        setCategoriesObj(oldCategoriesObj => {
            addToDoCategoryInLocalStorage(newCategoryName);
            return { ...oldCategoriesObj, [newCategoryName]: newCategoryName };
        });
        setNewCategoryName('');
    };

    const addToDoCategoryInLocalStorage = (categoryName: string) => {
        const isSavedCategories = localStorage.getItem('categories');
        if(isSavedCategories !== null) {
            const savedCategories: ICategoriesObj = JSON.parse(isSavedCategories);
            savedCategories[categoryName] = categoryName;
            localStorage.setItem('categories', JSON.stringify(savedCategories));
        };
    };

    const handleOnChange = function(e: React.FormEvent<HTMLInputElement>) {
        setNewCategoryName(e.currentTarget.value);
    };

    const isNotValidCategoryName = function(newCategoryName: string) :boolean {
        for(let categoryElem in categoriesObj) {
            if(categoryElem === newCategoryName) return true;
        }
        return false;
    };

    return (
        <>
            <form
            style={{ textAlign: 'center' }}
            onSubmit={handleMakeNewCategorySubmit}>
                <input 
                placeholder="Make your new category!" 
                onChange={handleOnChange}
                value={newCategoryName}
                />
                &ensp;
                <button>Make New Category</button>
            </form>
        </>
    )
};

export default CategoryCreator;