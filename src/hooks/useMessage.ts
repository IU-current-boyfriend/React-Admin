/**
 * useMessage中包含三种组件，Modal、Message、Notification，方便开发者调用
 * App包裹组件
 *
 */
import { App } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { ModalStaticFunctions } from "antd/es/modal/confirm";
import { NotificationInstance } from "antd/es/notification/interface";

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, "warn">;

export default () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;

  return null;
};

export { message, notification, modal };
