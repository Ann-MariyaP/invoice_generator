import { Modal } from "antd";

const CustomModal = ({
  open,
  title,
  children,
  onOk,
  onCancel,
  okText = "OK",
  cancelText = "Cancel",
  okButtonProps = {},
  cancelButtonProps = {},
  confirmLoading = false,
  centered = true,
  width = 500,
}) => {
  return (
    <Modal
      open={open}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      confirmLoading={confirmLoading}
      centered={centered}
      width={width}
      destroyOnHidden
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
