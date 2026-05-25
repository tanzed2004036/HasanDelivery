import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axiosInstance from '../../../hooks/UserAxios';

export default function PaymentSuccess() {

    const [searchParams] = useSearchParams();
    const [paymentInfo,setPaymentInfo] = useState(null)
    const sessionId=searchParams.get('session_id')

     useEffect(() => {
   
        if(sessionId){
        axiosInstance.patch(`/payment-success?session_id=${sessionId}`)
        .then((res)=>{
            console.log(res.data);
            setPaymentInfo(res.data)
          
        })
    };
  }, [sessionId]);


  return (
    <div>
      payment successfull
      tracking id : {paymentInfo?.trackingId}
      transaction id : {paymentInfo?.transactionId}
      
    </div>
  )
}
