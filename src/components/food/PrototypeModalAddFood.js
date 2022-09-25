import React from "react";
export default class Modal extends React.Component {
    handleOKClick = () => {
        this.props.show(false)
    }
    handleCancelClick = () => {
        this.props.show(false)
    }

    render() {
        if(!this.props.show){
            return <div>Null</div>;
        }
        return <div className="   bg-zinc-600 bg-opacity-80 fixed inset-0 z-50   ">

            <div className="flex h-screen justify-center items-center">

                <div className="flex-col justify-center  bg-white py-10 px-20 border-4 drop-shadow-2xl rounded-xl ">

                    <div className="flex  text-lg  text-zinc-600   mb-10" >Add Food</div>
                    <form className="">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Food Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username" type="text" placeholder="Food"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Weight unit
                            </label>
                            <input list="weightUnits"/>
                            <datalist>

                            </datalist>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex">
                                <button onClick={() => this.handleOKClick()} className=" rounded px-4 py-2 text-white  bg-green-400 ">Yes</button>
                                <button onClick={() => this.handleOKClick()} className="rounded px-4 py-2 ml-4 text-white bg-blue-500 ">No</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>;
    }
}