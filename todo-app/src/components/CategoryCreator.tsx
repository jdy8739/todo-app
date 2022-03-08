import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { categoriesObjAtom } from "../atoms";


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
            return { ...oldCategoriesObj, [newCategoryName]: newCategoryName };
        });
        setNewCategoryName('');
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
            <form onSubmit={handleMakeNewCategorySubmit}>
                <input 
                placeholder="Make your new category!" 
                onChange={handleOnChange}
                value={newCategoryName}
                />
                <button>Make New Category</button>
            </form>
        </>
    )
};

export default CategoryCreator;