import { RootState, useSelector } from "@/redux";
import { shallowEqual } from "react-redux";

const UserName: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual);
  return <span className="username">{userInfo.name}</span>;
};

export default UserName;
