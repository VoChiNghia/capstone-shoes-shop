import React from 'react'
import { OrdersHistory,OrderDetail } from '../redux/configStore/userReducer'
import moment from 'moment'


type Props = {
    ordersHistory:OrdersHistory
}

const OrderCard = ({ordersHistory}: Props) => {
  const date = moment(ordersHistory.date).format('YYYY-MM-DD')


 
  return (
    <div className="container w-full my-2 md:my-12 dark:text-gray-400">
      <div className="w-full md:w-3/4 mx-auto">
        <h1 className="text-[#7D0DB1] my-3">
          + Orders have been placed on {date}
        </h1>
        <table className="w-full ">
          <thead className="">
            <tr className="bg-gray-300 dark:bg-zinc-800 ">
              <th className="px-2">id</th>
              <th className="px-2">image</th>
              <th className="px-2">name</th>
              <th className="px-2">price</th>
              <th className="px-2">quantity</th>
              <th className="px-2">total</th>
            </tr>
          </thead>
          <tbody>
            {ordersHistory.orderDetail.map(
              (item: OrderDetail, index: number) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">
                    <img className="w-20 mx-auto" src={item.image} alt="" />
                  </td>
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">{item.price}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-center">10</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderCard