import { useEffect, useState } from "react";
import "../../sass/contact/_detailsView.scss";
import { tr } from "date-fns/locale";

const DetailsView = ({ fetchCustomerOrders, setTotalPrice, setTotalM2 }) => {
  /**
   *
   * @param {*} dateToTransform value from array as date type
   * @returns: Formated date as the example  "2023.07.16 01:13:22.000Z"
   */
  const formatedDate = (dateToTransform) => {
    return new Date(new Date(dateToTransform))
      .toISOString()
      .replaceAll("-", ".")
      .replace("T", " ");
  };

  useEffect(() => {
    const totalPriceCalc = fetchCustomerOrders.reduce(
      (acc, order) => acc + +order.total_price,
      0
    );
    const totalM2 = fetchCustomerOrders.reduce(
      (acc, order) => acc + +order.m2,
      0
    );

    setTotalPrice(totalPriceCalc);
    setTotalM2(totalM2);
  }, [fetchCustomerOrders, setTotalPrice, setTotalM2]);

  return (
    <div>
      <div className="details-viewTable">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Order Date</th>
              <th>Scheduled Date</th>
              <th>Service Type</th>
              <th>m²</th>
              <th>Pieces</th>
              <th>Total Price</th>
              <th>Delivery</th>
            </tr>
          </thead>
          <tbody>
            {fetchCustomerOrders.map((order, i) => {
              return (
                <tr key={i}>
                  <td data-cell="#">{i + 1}</td>
                  <td data-cell="Order Date">
                    {formatedDate(order.order_date).slice(0, 19)}
                  </td>
                  <td data-cell="Scheduled Date">
                    {formatedDate(order.scheduled_date).slice(0, 10)}
                  </td>
                  <td data-cell="Service Type">{order.service_name}</td>
                  <td data-cell="m2">{order.m2}</td>
                  <td data-cell="Pieces">{order.pieces}</td>
                  <td data-cell="Total Price">{order.total_price}</td>
                  <td data-cell="Delivery">
                    {order.delivery === 1 ? "Yes" : "No"}
                  </td>
                </tr>
              );
            })}
          </tbody>

          {!fetchCustomerOrders.length && (
            <>
              <tr>
                <td data-cell="Status" colSpan="11">
                  No order found
                </td>
              </tr>
            </>
          )}
        </table>
      </div>
    </div>
  );
};

export default DetailsView;
