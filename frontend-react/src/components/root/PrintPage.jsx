import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PrintingForm from "./PrintPage/PrintingForm";
import PrintingResults from "./PrintPage/PrintingResults";
import Layout from "./fragments/layout/Layout";
import { useUser } from "../../store/userContext";
import { fetchPersonalInfor } from "../../store/personalInforSlice";

function PrintingSystem() {
  const [printingData, setPrintingData] = useState(null);
  const [remainingPages, setRemainingPages] = useState(0);

  const { username } = useUser();
  const dispatch = useDispatch();
  const { personalInfor, isLoading, error } = useSelector(
    (state) => state.personalInfor
  );

  // Fetch personal info when component mounts
  useEffect(() => {
    if (username) {
      dispatch(fetchPersonalInfor(username));
    }
  }, [username, dispatch]);

  // Update remaining pages when personal info is loaded
  useEffect(() => {
    if (personalInfor?.data?.page_remain) {
      setRemainingPages(personalInfor.data.page_remain);
    }
  }, [personalInfor]);

  return (
    <Layout>
      <div className="flex overflow-hidden flex-col">
        <main className="flex gap-5 w-full max-md:flex-col max-md:max-w-full">
          <div className="flex flex-col max-md:w-full w-full px-6">
            {/* Hiển thị Loading hoặc Error nếu cần */}
            {isLoading && <div className="text-center">Loading...</div>}
            {error && <div>Error: {error}</div>}

            {/* Hiển thị các component nếu không có lỗi hoặc không đang tải */}
            {!isLoading && !error && (
              <>
                <PrintingForm
                  printingData={printingData}
                  remainingPages={remainingPages}
                  setRemainingPages={setRemainingPages}
                />
                <PrintingResults
                  setPrintingData={setPrintingData}
                  remainingPages={remainingPages}
                  setRemainingPages={setRemainingPages}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default PrintingSystem;
