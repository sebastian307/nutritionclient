import React, {Component} from "react";


class FoodList extends Component {
    state = {
        clients: []
    };

    constructor(props) {
        super(props);
        this.deleteFood = this.deleteFood.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('/food/all');
        const body = await response.json();

        for (let i = 0; i < body.length; i++) {
            if (body[i]["entitySizeType"]==null){
                body[i]["entitySizeType"]= {}
                body[i]["entitySizeType"]["entitySizeType"]="o.E."
            }
            //TODO: Test what happens if this for is removed
        }
        this.setState({clients: body});
    }

    async deleteFood(foodId) {
        await fetch('/food/delete/' + foodId, {
            method: "DELETE",
        })//.then(res => res.text())
          //  .then(res => console.log(res));

        this.componentDidMount();
    }

    render() {
        const {clients} = this.state;
        return (
            <div className="FoodList">

                    {clients.map(client =>
                        <div className="max-w-md p-7 m-6 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl" key = {client.id}>
                            <div className="flex flex-row items-baseline relative">
                                <div className="pr-3 font-medium text-2xl align-middle">
                                    {client.name}
                                </div>
                                <div className="text-slate-500 ">
                                    {client.entitySizeType.entitySizeType}


                                </div>
                                <button onClick={() => this.deleteFood(client.id)} className="absolute right-0">
                                    del
                                </button>
                            </div>
                        </div>
                    )}

            </div>
        );
    }
}
export default FoodList;