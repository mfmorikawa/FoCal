import SignUp from "../../Auth/SignUp";
import Input from "../../components/Input";
import { Loading } from "../../components/Loading";
import Progress from "../../components/Progress";

const Focus = () => {
  let done = 0;
  return (
    <div>
      <Progress done={done} />
    </div>
  );
};

export default Focus;
