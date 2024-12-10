import { useState } from 'react';
import '../../css/Sidebar.css';
import { ChatUser } from '../../model/ChatUser';
import { CreateGroupModal } from './CreateGroupModal';
import UserService from '../../api/UserService';
import { Chat } from '../../model/Chat';


const Sidebar: React.FC<{
  user: ChatUser | null,
  setUser: any,
  createChat: any,
  activeChat: Chat | null,
  getCurrentChat: any,
  getUserChats: any
}> = ({ user, setUser, createChat, activeChat, getCurrentChat, getUserChats }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (name: string, users: string[]) => {
    createChat(name, users)
  };

  const updateUser = async (event: any) => {
    event.preventDefault()
    const name = event.target['name'].value;
    const username = event.target['username'].value;
    await UserService.update(name, username).then(
      async () => {
        setUser(await UserService.getSession())
        setIsChanging(false)
        getUserChats()
        if (activeChat != null) {
          getCurrentChat(activeChat.chatId)
        }
      }
    )
  }

  const updateUserAvatar = async (event: any) => {
    event.preventDefault()
    await UserService.updateUserAvatar(event.target.files[0]).then(
      async (newUser) => {
        setUser(newUser)
        setIsChanging(false)
        
        getUserChats()
        if (activeChat != null) {
          getCurrentChat(activeChat.chatId)
        }
      }
    )
  }

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

        {isChanging
          ?
          <div>
            <div className='flex justify-center'>
              <label htmlFor="file-upload" className="w-12 h-12 bg-white text-white rounded-full custom-file-upload">
              </label>
              <input id="file-upload" type="file" onChange={(event: any) => {
                updateUserAvatar(event);
              }} />
            </div>

            <form onSubmit={
              (event) => { updateUser(event) }
            }>
              <div className="form__group p-4">
                <div className="mt-4">
                  <div className="relative">
                    <input
                      type="input"
                      name="name"
                      placeholder="name"
                      className='bg-gray-800 w-full py-2.5 px-4 border text-sm' />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      required
                      className='bg-gray-800 w-full py-2.5 px-4 border text-sm' />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                <button
                  className='ms-4 inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:ring-offset-2 transition ease-in-out duration-150'
                  type="submit"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsChanging(false)}
                  className='ms-4 inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:ring-offset-2 transition ease-in-out duration-150'
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          :
          <div>
            <div className="flex items-center p-4 bg-black shadow">
              {user?.img 
                ?
                <img
                  src={"data:image/png;base64," + user?.img}
                  className="w-12 h-12 bg-white rounded-full">
                </img>
                :
                <div
                  className="w-12 h-12 bg-white rounded-full">
                </div>
              }
              <div className="ml-5 flex flex-col">
                <h2 className="block text-lg font-semibold text-white">
                  {user?.username}
                </h2>

                <div className="block text-sm text-gray-400">
                  {user?.name}
                </div>
              </div>
            </div>

            <ul className="sidebar-item flex flex-col justify-center items-right">
              <li>
                <div
                  className="border mr-5 text-sm text-gray-200 cursor-pointer hover:bg-gray-800 block px-4 py-2"
                  onClick={() => { setIsChanging(true); }}>
                  Change profile
                </div>
              </li>
              <li className="pt-5">
                <div
                  className="border mr-5 text-sm text-gray-200 cursor-pointer hover:bg-gray-800 block px-4 py-2"
                  onClick={() => { setIsOpen(false); setShowModal(true); }}>
                  Create group
                </div>
              </li>

              <CreateGroupModal
                isOpen={showModal}
                setOpen={setShowModal}
                onSubmit={handleSubmit}
              />
            </ul>
          </div>
        }
      </div>
    </div>
  );
};

export default Sidebar;