import SignUp from "../../Auth/SignUp";
import Input from "../../components/Input";
import { Loading } from "../../components/Loading";
import Progress from "../../components/Progress";
import Clock from "../../components/Clock";

const Focus = () => {
  let done = 0;
  return (
    <div className="grid grid-cols-3 p-2">
      <Progress done={done} />
      <Clock n_minutes={1}/>
      
    </div>
  );
};

export default Focus;
