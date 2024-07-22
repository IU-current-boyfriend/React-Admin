import { RootState, useSelector, useDispatch } from "@/redux";
import { setGlobalState } from "@/redux/modules/global";
import { shallowEqual } from "react-redux";

const Maximize: React.FC = () => {
  const dispatch = useDispatch();
  const { maximize } = useSelector(
    (state: RootState) => ({
      maximize: state.global.maximize
    }),
    shallowEqual
  );

  return (
    <>
      {maximize && (
        <div className="maximize-icon" onClick={() => dispatch(setGlobalState({ key: "maximize", value: false }))}>
          <i className="iconfont icon-tuichu"></i>
        </div>
      )}
    </>
  );
};

export default Maximize;
