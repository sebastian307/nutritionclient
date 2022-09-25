import React, {Component} from "react";

class StockList extends Component {
    state = {
        clients: []
    };

    constructor(props) {
        super(props);
        this.deleteStock = this.deleteStock.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('/stock/all');
        const body = await response.json();

        //TODO: Match these null-Handlers to what is suitable for "food" and "bestBeforeDate"
        for (let i = 0; i < body.length; i++) {
            if (body[i]["food"]==null){
                body[i]["food"]= {}
            }
        }
        for (let i = 0; i < body.length; i++) {
            if (body[i]["bestBeforeDate"]==null){
                body[i]["bestBeforeDate"]= {}
            }
        }
        this.setState({clients: body});
    }

    async deleteStock(stockId) {
        await fetch('/stock/delete/' + stockId, {
            method: "DELETE",
        })//.then(res => res.text())
          //  .then(res => console.log(res));

        this.componentDidMount();
    }

    render() {
        const {clients} = this.state;
        return (
            <div className="StockList">

                    {clients.map(client =>
                        <div className="max-w-md p-7 m-6 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl" key = {client.id}>
                            <div className="flex flex-row items-baseline relative">
                                <div className="pr-3 font-medium text-2xl align-middle">
                                    {client.food.name}
                                </div>
                                <div className="text-slate-500 ">
                                    {client.bestBeforeDate}


                                </div>
                                <button onClick={() => this.deleteStock(client.id)} className="absolute right-0">
                                    del
                                </button>
                            </div>
                        </div>
                    )}

            </div>
        );
    }
}
export default StockList;