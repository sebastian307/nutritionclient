import React from 'react';
import { useState } from "react";

import FoodList from "../components/food/FoodList";
import AddFoodModal from "../components/food/AddFoodModal";
//import ModalAddFood from "../components/food/PrototypeModalAddFood";

export default function Food() {
    const [entitySizeList, setEntitySizeList] = useState({});
    const [modalOn, setModalOn] = useState(false);
    const [choice, setChoice] = useState(false)

    const addFoodClicked = async () => {
        const response = await fetch('/food/sizeOptions/all');
        const body = await response.json();
        setEntitySizeList(body);
        setModalOn(true)
    }

    /*For PrototypeModalAddFood /// To use with <ModalAddFood show={show}/>
    const showModal = () => {
        console.log("Pressed ShowModal")
        setShow(true);
    }*/


    return <div>
        <h1>Food</h1>
        <div className="max-w-md mx-auto overflow-hidden md:max-w-2xl">
            <button className=" sticky bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={addFoodClicked}>Add Food record</button>
        </div>
        <FoodList/>

        {modalOn && < AddFoodModal setModalOn={setModalOn} setChoice={setChoice} entitySizeList={entitySizeList}/>}

    </div>;
}