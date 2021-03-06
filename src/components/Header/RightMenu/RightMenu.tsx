import React, { FC, useRef, useState } from 'react';
import Feedback from '@components/Feedback';
import Info from '@components/Header/RightMenu/Info';
import Settings from '@components/Settings';
import Icon from '@components/ui/Icon';
import useOnClickOutside from '@hooks/useClickOutside';
import './RightMenu.scss';

const RightMenu: FC = () => {
  const [rightMenu, setRightMenu] = useState<boolean>(false);
  const [settingsModal, setSettingsModal] = useState<boolean>(false);
  const [feedbackModal, setFeedbackModal] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(menuRef, () => setRightMenu(false));

  const handleClick = () => {
    setRightMenu((prev) => !prev);
  };

  const openSettingsModal = () => {
    setRightMenu(false);
    setSettingsModal(true);
  };

  const openFeedbackModal = () => {
    setRightMenu(false);
    setFeedbackModal(true);
  };

  return (
    <div className="right-menu" ref={menuRef}>
      <Icon
        className="right-menu__icon"
        type="profile"
        clickHandler={handleClick}
      />

      {rightMenu ? (
        <div className="right-menu__modal">
          <div className="right-menu__modal-wrapper">
            <Info
              openSettingsModal={openSettingsModal}
              openFeedbackModal={openFeedbackModal}
              setRightMenu={setRightMenu}
            />
          </div>
        </div>
      ) : null}

      <Settings
        isOpen={settingsModal}
        closeHandler={() => setSettingsModal(false)}
      />

      <Feedback
        isOpen={feedbackModal}
        closeHandler={() => setFeedbackModal(false)}
      />
    </div>
  );
};

export default RightMenu;
