import ReactDOM from "react-dom/client";
import Loading from "@/components/Loading";

let needLoadingRequestCount = 0;

/**
 * @description Show FullScreen Loading
 */
export const showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) {
    let dom = document.createElement("div");
    dom.setAttribute("id", "loading");
    document.body.appendChild(dom);
    // 创建一个新的React根元素,然后挂载到该根元素下
    ReactDOM.createRoot(dom).render(<Loading />);
    // 增加请求的次数
    needLoadingRequestCount++;
  }
};

/**
 * @description Hide Loading
 */

export const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    document.body.removeChild(document.getElementById("loading") as HTMLDivElement);
  }
};
