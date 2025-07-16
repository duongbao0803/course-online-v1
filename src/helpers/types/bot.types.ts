import type { FC } from 'react';

export interface Message {
  type: 'message';
  sender: 'me' | 'other';
  text: string;
  time: string;
  timestamp: string;
  showOptions?: boolean;
}

export interface QuickOption {
  id: string;
  text: string;
  icon: FC<React.SVGProps<SVGSVGElement>>;
  query: string;
}

export interface QuickOptionsProps {
  show: boolean;
  onOptionClick: (option: QuickOption) => void;
  quickOptions: QuickOption[];
}

export interface ChatBotProps {
  onClose?: () => void;
}
