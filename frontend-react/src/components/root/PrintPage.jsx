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
    if(username) {
      dispatch(fetchPersonalInfor(username));
    }
  }, [username, dispatch]);

  // Update remaining pages when personal info is loaded
  useEffect(() => {
    if (personalInfor.data) {
      setRemainingPages(personalInfor.data.page_remain);
    }
  }, [personalInfor.data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <div className="flex overflow-hidden flex-col">
        <main className="flex gap-5 w-full max-md:flex-col max-md:max-w-full">
          <div className="flex flex-col max-md:w-full w-full px-6">
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
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default PrintingSystem;