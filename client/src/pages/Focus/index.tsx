import SignUp from "../../Auth/SignUp";
import Input from "../../components/Input";
import { Loading } from "../../components/Loading";

const Focus = () => {
  return (
    <div>
      <Loading />
      <hr className="mt-5"/>
      <SignUp />
    </div>
  );
};

export default Focus;
