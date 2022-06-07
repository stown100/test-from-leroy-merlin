import React from "react";

function Payment({ createdAt, sum }) {

  return (
    <tbody>
      <tr className="payment__body">
        <td className="payment__createdAt">{createdAt}</td>
        <td className="payment__sum">{sum}</td>
      </tr>
    </tbody>
  );
}

export default Payment;
