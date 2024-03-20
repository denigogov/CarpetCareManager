import { useOutletContext, useNavigate } from "react-router-dom";
import CreateStatusView from "../../../components/management/orderStatus/CreateStatusView";
import "../../../sass/management/orderStatus/_orderStatusCreate.scss";
import { handlePostPutDeleteRequest } from "../../../handleRequests";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import ApiSendRequestMessage from "../../../components/ApiSendRequestMessage";

const AddStatus = ({ token }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  const [setPopupOpen] = useOutletContext();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
        setPopupOpen(false);
        navigate("/management/orderStatus");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleCreateService = async (statusName) => {
    const sendData = { status_name: statusName };

    handlePostPutDeleteRequest(
      "/table/orderStatus",
      null,
      "POST",
      token,
      sendData,
      "Create Status faild, please try again",
      setErrorMessage,
      setSuccess,
      mutate,
      "tableOrderService",
      "service created"
    );
  };

  return (
    <div>
      <CreateStatusView handleCreateService={handleCreateService} />
      <ApiSendRequestMessage success={success} errorMessage={errorMessage} />
    </div>
  );
};

export default AddStatus;
