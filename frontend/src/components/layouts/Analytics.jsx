import { Progress } from "antd";


export default function Analytics({transactions}){

    const categories = ["salary", "gym", "food","travel", "bills", "fees", "medical", "others"];

    const totalTransactions = transactions.length;
    const totalIncomeTransactions = transactions.filter(transaction=>transaction.type == 'income');
    const totalExpenseTransactions = transactions.filter(transaction=>transaction.type == 'expense');
    const totalIncomePercent = (totalIncomeTransactions.length/totalTransactions) * 100;
    const totalExpensePercent = (totalExpenseTransactions.length/totalTransactions) * 100;

    const totalTurnover = transactions.reduce((acc, transaction) => acc+transaction.amount, 0);
    const totalIncomeTurnover = transactions.filter(transaction => transaction.type == 'income').reduce((acc, transaction) => acc+transaction.amount, 0);
    const totalExpenseTurnover = transactions.filter(transaction => transaction.type == 'expense').reduce((acc, transaction) => acc+transaction.amount, 0);
    const totalIncomeTurnoverPercent = (totalIncomeTurnover/totalTurnover) * 100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover/totalTurnover) * 100;
    

    return(
        <>
        <div className="row m-3">
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        Total Transactions: {totalTransactions}
                    </div>
                    <div className="card-body">
                        <h5 className="text-success">Income: {totalIncomeTransactions.length}</h5>
                        <h5 className="text-danger">Expense: {totalExpenseTransactions.length}</h5>
                        <div>
                            <Progress type="circle" strokeColor={'green'} className="mx-2" percent={totalIncomePercent.toFixed(0)}/>
                             <Progress type="circle" strokeColor={'red'} className="mx-2" percent={totalExpensePercent.toFixed(0)}/>
                        </div>
                    </div>
                </div>

            </div>

            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        Total Transactions Turnover: {totalTurnover}
                    </div>
                    <div className="card-body">
                        <h5 className="text-success">Income: {totalIncomeTurnover}</h5>
                        <h5 className="text-danger">Expense: {totalExpenseTurnover}</h5>
                        <div>
                            <Progress type="circle" strokeColor={'green'} className="mx-2" percent={totalIncomeTurnoverPercent.toFixed(0)}/>
                             <Progress type="circle" strokeColor={'red'} className="mx-2" percent={totalExpenseTurnoverPercent.toFixed(0)}/>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <div className="row mt-3">
            <div className="col-md-4">
                <h4>Category Wise Income</h4>
                {
                    categories.map((category)=>{
                        const amount = transactions.filter((transaction)=> transaction.type == 'income' && transaction.category == category).reduce((acc, transaction)=> acc+ transaction.amount,0);
                        return(
                            amount > 0 && (
                            <div className="card">
                                <div className="card-body">
                                    <h5>{category}</h5>
                                    <Progress percent={((amount/totalIncomePercent)*100).toFixed(0)}/>
                                </div>
                            </div>
                            )
                        )
                    })
                }

            </div>

             <div className="col-md-4">
                <h4>Category Wise Income</h4>
                {
                    categories.map((category)=>{
                        const amount = transactions.filter((transaction)=> transaction.type == 'expense' && transaction.category == category).reduce((acc, transaction)=> acc+ transaction.amount,0);
                        return(
                            amount > 0 && (
                            <div className="card">
                                <div className="card-body">
                                    <h5>{category}</h5>
                                    <Progress percent={((amount/totalExpensePercent)*100).toFixed(0)}/>
                                </div>
                            </div>
                            )
                        )
                    })
                }

            </div>
        </div>
        </>
    )

}