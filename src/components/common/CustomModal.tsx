import styled from 'styled-components';
import { Modal } from 'antd';

const CustomModal = styled(Modal)`
  .ant-modal-content {
    padding: 0 !important;
    border-radius: 16px;
  }

  .ant-modal-close {
    color: #ffffff !important;
  }

  .ant-modal-close:hover {
    color: #f0f0f0 !important;
  }
`;

export { CustomModal };
