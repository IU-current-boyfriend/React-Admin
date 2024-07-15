import { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, message } from "antd";

export interface ShowInfoModalParams {
  name: string;
}

export interface InfoModalRef {
  showModal: (params: ShowInfoModalParams) => void;
}

const InfoModal = forwardRef<InfoModalRef>((_props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useImerativeHandle应当与forwardRef一起使用，可以让你在使用ref的时候，
  // 自定义暴露给父组件的实例值
  useImperativeHandle(ref, () => ({ showModal }));

  // 提供给外界调用的方法
  const showModal = (params: ShowInfoModalParams) => {
    console.log("params: =>", params);

    setIsModalOpen(true);
  };

  const handleCancle = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    message.success("修改用户信息成功😁");
  };

  return (
    <Modal title="个人信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancle} destroyOnClose={true}>
      <p>This is UserInfo...</p>
      <p>This is UserInfo...</p>
      <p>This is UserInfo...</p>
    </Modal>
  );
});

InfoModal.displayName = "InfoModal";

export default InfoModal;
