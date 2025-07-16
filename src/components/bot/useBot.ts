import { useViewport } from '@/helpers/hooks/useWindowDimension';
import { useState } from 'react';

export const useBot = () => {
  const [open, setOpen] = useState(false);
  const { isXS } = useViewport();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    state: {
      open,
      isXS,
    },
    handler: {
      handleOpen,
      handleClose,
    },
  };
};
