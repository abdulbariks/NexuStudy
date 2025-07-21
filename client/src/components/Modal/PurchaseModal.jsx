import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { use } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AuthContext } from "../../contexts/AuthContext";
import CheckoutForm from "../Form/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);
const PurchaseModal = ({ closeModal, isOpen, session, fetchSession }) => {
  const { user } = use(AuthContext);
  console.log(user);
  const { _id, title, registrationFee, tutorName, tutorEmail } = session || {};

  const orderData = {
    sessionId: _id,
    title,
    registrationFee,
    tutorName,
    tutorEmail,
    studentName: user?.displayName,
    studentEmail: user?.email,
  };
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Review Info Before Purchase
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Session: {title}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Registration Fee: {registrationFee}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Student: {user?.displayName}
              </p>
            </div>
            <hr className="mt-2" />
            {/* Stripe Checkout form */}
            <Elements stripe={stripePromise}>
              <CheckoutForm
                totalPrice={registrationFee}
                closeModal={closeModal}
                orderData={orderData}
                fetchSession={fetchSession}
              />
            </Elements>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
