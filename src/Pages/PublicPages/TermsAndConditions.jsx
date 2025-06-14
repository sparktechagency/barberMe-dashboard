import { Spin } from "antd";
import { useTermsAndConditionQuery } from "../../redux/apiSlices/termsAndConditionSlice";

const TermsAndConditions = () => {
  // const [activeTab, setActiveTab] = useState("USER");
  const { data: terms, isLoading } = useTermsAndConditionQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );
  }

  const termsAndConditions = terms?.content;
  // console.log(termsAndConditions);

  return (
    <div>
      <div className="h-[100px] bg-primary text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Terms and Conditions</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="prose max-w-none py-8">
          <div dangerouslySetInnerHTML={{ __html: termsAndConditions }} />
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
