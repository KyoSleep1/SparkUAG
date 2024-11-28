import React from 'react';
import { createPortal } from 'react-dom';

interface TooltipPortalProps {
  children: React.ReactNode;
}

export const TooltipPortal: React.FC<TooltipPortalProps> = ({ children }) => {
  const portalRoot = document.getElementById('tooltip-root');
  
  if (!portalRoot) {
    const div = document.createElement('div');
    div.id = 'tooltip-root';
    document.body.appendChild(div);
  }

  return createPortal(children, document.getElementById('tooltip-root')!);
};