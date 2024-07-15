import { useState, forwardRef, useImperativeHandle } from "react";

import { Modal, message } from "antd";

export interface PasswordModalRef {
  showModal: (params: ShowPasswordModalParams) => void;
}
export interface ShowPasswordModalParams {
  name: string;
}

const PasswordModal = forwardRef<PasswordModalRef>((_props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useImperativeHandle(ref, () => ({ showModal }));

  const showModal = (params: ShowPasswordModalParams) => {
    console.log("params: =>", params);

    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    message.success("修改个人密码成功😄");
  };
  return (
    <>
      <Modal title="修改个人密码" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
        <p>This is UserInfo...</p>
        <p>This is UserInfo...</p>
        <p>This is UserInfo...</p>
      </Modal>
    </>
  );
});

PasswordModal.displayName = "PasswordModal";

export default PasswordModal;
