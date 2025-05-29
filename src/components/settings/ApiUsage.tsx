import { useNavigate } from "react-router";
import Modal from "../../ui/Modal";
import { FaCheck } from "react-icons/fa6";

const ApiUsage = () => {
  const navigate = useNavigate();

  return (
    <Modal>
      <div className="mt-5 mb-5 flex flex-col gap-[24px]">
        <div className="mb-2">
          <h1 className="text-[24px] font-semibold leading-[100%]">
            API Usage
          </h1>
        </div>

        <Modal.Open opens="open">
          <button className="bg-[#020267] text-[#fff] w-full h-[51px] rounded-[6px] cursor-pointer">
            <p className="text-left px-3 py-4 text-[16px] leading-[100%] font-semibold">
              Generate New API key
            </p>
          </button>
        </Modal.Open>

        <Modal.Window name="open">
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <div className="bg-[#020267] w-[80px] h-[80px] rounded-full flex items-center justify-center">
              <FaCheck color="#fff" size="50px" />
            </div>
            <h1 className="leading-[100%] text-[32px] font-semibold">
              API key sent to email
            </h1>
            <p className="text-[14.46px] text-[#000000A6] leading-[100%]">
              Your API key has been successfully sent to your email
            </p>
            <button
              className="w-[317px] h-[54.63px] bg-[#020267] text-[#fff] rounded-[28.12px] cursor-pointer mt-10"
              onClick={() => navigate("/dashboard")}
            >
              Return to dashboard
            </button>
          </div>
        </Modal.Window>
      </div>
    </Modal>
  );
};
export default ApiUsage;
