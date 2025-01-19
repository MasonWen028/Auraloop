import React, { useState } from "react";
import { Modal, Input, Radio, Button, Checkbox, Switch } from "antd";
import './index.css';
import Toggle from "../Toggle";

interface CreatePlaylistModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (playlistName: string, isPrivate: boolean) => void;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  visible,
  onClose,
  onCreate,
}) => {
  const [playlistName, setPlaylistName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const maxLength = 30;

  const handleOk = () => {
    if (playlistName.trim()) {
      onCreate(playlistName.trim(), isPrivate);
      setPlaylistName("");
      setIsPrivate(false);
    }
  };

  const handleCancel = () => {
    onClose();
    setPlaylistName("");
    setIsPrivate(false);
  };

  return (
    <Modal
      title="Create New Playlist"
      open={visible}
      onOk={handleOk}
      centered
      closable={false}
      maskClosable={true}
      onCancel={handleCancel}
      okText="Create"
      className="black-modal"
      cancelText="Cancel"
      width={350}
      footer={[
        <Button className="warm-btn" variant="text" key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          className="warm-btn"
          variant="text"
          key="create"
          onClick={handleOk}
          disabled={!playlistName.trim()}
        >
          Create
        </Button>,
      ]}
    >
      <div>
        <label style={{ marginBottom: "8px", display: "block", userSelect: 'none' }}>Playlist Name:</label>
        <Input
          className="dark-input"
          variant="borderless"
          placeholder="Enter playlist name"
          value={playlistName}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) setPlaylistName(e.target.value);
          }}
          suffix={`${playlistName.length}/${maxLength}`}
        />
        <div style={{ marginTop: "16px" }}>
          <Toggle
            toggled={isPrivate}
            onChange={(toggled) => setIsPrivate(toggled)}
          >
            Set as private playlist
          </Toggle>
          
        </div>
      </div>
    </Modal>
  );
};

export default CreatePlaylistModal;
