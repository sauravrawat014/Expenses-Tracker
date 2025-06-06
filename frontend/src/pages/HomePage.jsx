import { useState, useEffect } from "react";
import { Modal, Form, Select, Input, message, Table, DatePicker } from "antd";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Layout from "../components/layouts/Layout";
import axios from "axios";
import Spinner from "../components/layouts/Spinner";
import moment from 'moment';
import Analytics from "../components/layouts/Analytics";
const {RangePicker} = DatePicker;

export default function Home(){

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [frequency, setFrequency] = useState('7');
    const [selectedDate, setSelectedDate] = useState([]);
    const [type, setType] = useState('all');
    const [viewData, setViewData] = useState('table');
    const [editable, setEditable] = useState(null);
    const [form] = Form.useForm(); 

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text)=> <span>{moment(text).format('YYYY-MM-DD')}</span>
        },

        {
            title: "Amount",
            dataIndex: "amount"
        },

        {
            title: "Type",
            dataIndex: "type"
        },

        {
            title: "Category",
            dataIndex: "category"
        },

        {
            title: "Reference",
            dataIndex: "reference"
        },

        {
            title: "Actions",
            render: (text,record) => (
             <div>
                <EditOutlined onClick={()=>{
                    setEditable(record);
                    setShowModal(true);
                }}/>
                <DeleteOutlined className="mx-2" onClick={()=> handleDelete(record)}/>
             </div>
            )
        }

    ]

     const handleSubmit = async(values)=>{

        try{
            const user = JSON.parse(localStorage.getItem('user'));
            setLoading(true);
           if(editable){
             await axios.post("http://localhost:8080/api/v1/transactions/editTransaction",{payload:{
                ...values, userId:user._id
             }, transactionId: editable._id});
            setLoading(false);
            message.success("Transaction Updated Successfully");

           } else{
             await axios.post("http://localhost:8080/api/v1/transactions/addTransaction",{...values, userId:user._id});
            setLoading(false);
            message.success("Transaction Added Successfully");
           }
          
            setEditable(null);
            setShowModal(false);
             form.resetFields();
             await getTransactions(); 

        } catch(error){
            setLoading(false);
            message.error("Transaction Added Failed");

        }

     }

     const handleDelete = async(record)=>{

        try{
            setLoading(true);
          await axios.post("http://localhost:8080/api/v1/transactions/deleteTransaction",{TransactionId: record._id});
          setLoading(false);
          message.success("transaction Deleted");
          setTransactions((prev)=> prev.filter((transaction) => transaction._id != record._id));
        } catch(error){
            console.log(error);
            message.error("Transaction Deleted Failed");

        }

     }

        const getTransactions = async()=>{
        try{
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("http://localhost:8080/api/v1/transactions/showTransaction", {userId:user._id, frequency,selectedDate,type});
        setLoading(false);
        setTransactions(res.data);
        message.success("Transactions Fetched Successful");
        } catch(error){
            setLoading(false);
            message.error("Transactions fetched failed");
        }

     }


   

     useEffect(()=>{

        getTransactions();

     }, [frequency, selectedDate,type]);
    return(
        <Layout>

            {loading && <Spinner/>}
            <div className="filters">

                <div>
                    <h6>Select Frequency</h6>
                    <Select value={frequency} onChange={(values)=>{setFrequency(values)}}>
                        <Select.Option value="7">Last 1 Week</Select.Option>
                        <Select.Option value="30">Last 1 month</Select.Option>
                        <Select.Option value="365">Last 1 year</Select.Option>
                        <Select.Option value="custom">Custom</Select.Option>
                    </Select>
                    {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values)=>setSelectedDate(values)}/>}
                </div>
                 <div>
                    <h6>Select Type</h6>
                    <Select value={type} onChange={(values)=>{setType(values)}}>
                        <Select.Option value="all">ALL</Select.Option>
                        <Select.Option value="income">INCOME</Select.Option>
                        <Select.Option value="expense">EXPENSE</Select.Option>
                        
                    </Select>
                    {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values)=>setSelectedDate(values)}/>}
                </div>
                
                    <div className="switch-icon">
                        <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={()=> setViewData("table")}/>
                        <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={()=> setViewData("analytics")}/>

                    </div>
                <div>
                    <button className="btn btn-primary" onClick={()=>setShowModal(true)}>Add New </button>
                    </div>

            </div>

            <div className="content">
                {viewData == 'table' ?  <Table columns={columns} dataSource={transactions}/> : <Analytics transactions={transactions}/> }

               

            </div>

            <Modal title={editable ? "Edit Transaction" : "Add Transaction"} open={showModal} onCancel={()=>{setShowModal(false);  form.resetFields();}} footer={false}>
                <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={editable}> 
                    <Form.Item label="Amount" name="amount">
                        <Input type="text"/>
                    </Form.Item>

                    <Form.Item label="Type" name="type">
                        <Select>
                            <Select.Option value="income">Income</Select.Option>
                             <Select.Option value="expense">Expense</Select.Option>
                        </Select>

                    </Form.Item>

                      <Form.Item label="Category" name="category">
                        <Select>
                            <Select.Option value="salary">Salary</Select.Option>
                             <Select.Option value="gym">Gym</Select.Option>
                              <Select.Option value="food">Food</Select.Option>
                               <Select.Option value="travel">Travel</Select.Option>
                                <Select.Option value="biils">Bills</Select.Option>
                                 <Select.Option value="fees">Fees</Select.Option>
                                  <Select.Option value="medical">Medical</Select.Option>
                                  <Select.Option value="other">Other</Select.Option>
                        </Select>

                    </Form.Item>

                    <Form.Item label="Date" name="date">
                        <Input type="date"/>
                    </Form.Item>

                    <Form.Item label="Reference" name="reference">
                        <Input type="text"/>
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input type="text"/>
                    </Form.Item>

                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>

                </Form>
            </Modal>
        </Layout>
    )
}
