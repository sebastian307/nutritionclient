import {useEffect, useState} from "react";

const AddFoodModal = ({ setModalOn, setChoice, entitySizeList }) => {
    const [name, setName] = useState("");
    const [sizeType, setSizeType] = useState(entitySizeList[0].entitySizeType);
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const [selectedFood, setSelectedFood] = useState("");
    const [foodInput, setFoodInput] = useState("");


    const handleOKClick = async () => {
        console.log(entitySizeList)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": name,
                "entitySizeType" : {"entitySizeType" : sizeType}
            })
        };
        fetch('/stock/add', requestOptions)
            .then(response => response.json());

        window.location.reload();

        setChoice(true)
        setModalOn(false)
    }
    const handleCancelClick = () => {
        setChoice(false)
        setModalOn(false)
    }


    const selectFood = (food) => {
        setSelectedFood(food);
        setFoodInput(food.name);
        console.log("Gewaehlte ID:"+food.id)
    }

    const foodInputChanged = (input) => {
        setQuery(input);
        setFoodInput(input);
    }
    const foodInputBlur = () => {
        if (selectFood!=""){
            setFoodInput(selectedFood.name);
        }
    }

    useEffect(() => {
        async function fetchData(){
            const response = await fetch('/food/search?' + new URLSearchParams({name: query}))
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const body = await response.json();
            setSearchResults(body);
            console.log(searchResults)
        }
        if (query.length>1){
            fetchData();
        }
    }, [query])

    return (

        <div className="   bg-zinc-600 bg-opacity-80 fixed inset-0 z-50   ">

            <div className="flex h-screen justify-center items-center">

                <div className="flex-col justify-center  bg-white py-10 px-20 border-4 drop-shadow-2xl rounded-xl ">

                    <div className="flex  text-lg  text-zinc-600   mb-10" >Add Stock</div>
                    <form className="">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Food
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username" autoComplete="off" type="text" placeholder="Start typing..." value={foodInput} onChange={e => (foodInputChanged(e.target.value))}
                                onBlur={foodInputBlur}/>

                                <ul className="overflow-auto max-h-44 rounded w-full leading-tight text-center">
                                    {searchResults.length ? searchResults.map(result => {
                                        if (result.id!=selectedFood.id){
                                        return <div onClick={() => selectFood(result)} className="p-5 mt-3 rounded-xl border-solid border-2 border-sky-500 text-sm font-bold" key={result.id}>
                                            {result.name}
                                        </div>;}

                                        //Else:
                                        return <div onClick={() => selectFood(result)} className="p-5 mt-3 rounded-xl border-solid border-2 border-sky-500 bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-sm font-bold" key={result.id}>
                                            {result.name}
                                        </div>;
                                    }) : ""}
                                </ul>

                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Weight unit
                            </label>
                            <select className="form-select shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={sizeType} onChange={e => setSizeType(e.target.value)}>
                                {entitySizeList.map(entitySize => <option value={entitySize.entitySizeType} key={entitySize.id}>{entitySize.entitySizeType}</option>)}
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                             <div className="flex">
                                <button onClick={handleOKClick} className=" rounded px-4 py-2 text-white  bg-green-400 ">Yes</button>
                                <button onClick={handleCancelClick} className="rounded px-4 py-2 ml-4 text-white bg-blue-500 ">No</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>

    );
}

export default AddFoodModal