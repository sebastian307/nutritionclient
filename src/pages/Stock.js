import React from 'react';
import { useState } from "react";

import AddStockModal from "../components/food/AddStockModal";
import StockList from "../components/food/StockList";

export default function Stock() {
    const [entitySizeList, setEntitySizeList] = useState({});
    const [modalOn, setModalOn] = useState(false);
    const [choice, setChoice] = useState(false)

    const addStockClicked = async () => {
        const response = await fetch('/food/sizeOptions/all');
        const body = await response.json();
        setEntitySizeList(body);
        setModalOn(true)
    }

    return <div>
        <h1>Food</h1>
        <div className="max-w-md mx-auto overflow-hidden md:max-w-2xl">
            <button className=" sticky bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={addStockClicked}>Add Stock</button>
        </div>
        <StockList/>

        {modalOn && < AddStockModal setModalOn={setModalOn} setChoice={setChoice} entitySizeList={entitySizeList}/>}

    </div>;
}

