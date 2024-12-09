import { useState } from 'react';
import '../../css/Sidebar.css';
import { ChatUser } from '../../model/ChatUser';
import { CreateGroupModal } from './CreateGroupModal';


const Sidebar: React.FC<{ user: ChatUser | null, createChat: any }> = ({ user, createChat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (name: string, users: string[]) => {
    createChat(name, users)
  };

  return (
    <div>
      <div className="w-10 h-10 pr-10 cursor-pointer" onClick={() => setIsOpen(true)}>
        ☰
      </div>

      <div className={`border z-10 sidebar bg-black ${isOpen ? 'open' : ''}`}>
        <div className="close bg-black">
          <div className={`close-void ${isOpen ? 'open' : ''}`}>

          </div>
          <button className="close-button" onClick={() => setIsOpen(false)}>
            x
          </button>
        </div>

        <div className="flex items-center p-4 bg-black shadow">
          <div className="w-12 h-12 bg-white rounded-full">
          </div>

          <div className="ml-5 flex flex-col">
            <h2 className="block text-lg font-semibold text-white">
              {user?.username}
            </h2>

            <div className="block text-sm text-gray-400">
              {user?.name}
            </div>
          </div>
        </div>

        <div className="sidebar-item flex flex-col justify-center items-right">
          <div className='hover:text-gray-400' onClick={() => { setIsOpen(false); setShowModal(true); }}>
            Create group
          </div>
          <CreateGroupModal
            isOpen={showModal}
            setOpen={setShowModal}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;