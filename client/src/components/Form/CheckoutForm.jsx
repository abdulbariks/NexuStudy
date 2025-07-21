import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./checkoutForm.css";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const CheckoutForm = ({ totalPrice, closeModal, orderData, fetchSession }) => {
  //   const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    const getClientSecret = async () => {
      // server request...
      const { data } = await axiosSecure.post("/create-payment-intent", {
        sessionId: orderData?.sessionId,
      });
      setClientSecret(data?.clientSecret);
    };
    getClientSecret();
  }, [axiosSecure, orderData]);

  const handleSubmit = async (e) => {
    setProcessing(true);
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError(null);
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: orderData?.student?.name,
          email: orderData?.student?.email,
        },
      },
    });

    if (result?.error) {
      setCardError(result?.error?.message);
      return;
    }
    // console.log("result?.paymentIntent?.status", result?.paymentIntent?.status);

    if (result?.paymentIntent?.status === "succeeded") {
      orderData.transactionId = result?.paymentIntent?.id;

      try {
        const { data } = await axiosSecure.post("/booked-session", orderData);
        // console.log(data);
        console.log("data?.insertedIddata?.insertedId", data?.insertedId);

        if (data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Session Booked Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        fetchSession();
        console.log(result);
      } catch (err) {
        if (err.response?.status === 409) {
          Swal.fire({
            icon: "warning",
            title: "You have already booked this session.",
          });
        } else {
          Swal.fire({ icon: "error", title: "Failed to submit Session" });
        }
      } finally {
        setProcessing(false);
        setCardError(null);
        closeModal();
      }
    }
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {cardError && <p className="text-red-500 mb-6">{cardError}</p>}
      <div className="flex justify-between">
        <button
          className="px-3 py-1 bg-green-400 rounded cursor-pointer"
          type="submit"
          disabled={!stripe || processing}
        >
          {processing ? (
            <ClipLoader size={24} className="mt-2" />
          ) : (
            `Pay ${totalPrice}$`
          )}
        </button>
        <button
          onClick={closeModal}
          className="px-3 py-1 bg-red-400 rounded cursor-pointer"
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
