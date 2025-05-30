import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X, Bookmark } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { useState } from 'react'

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='bg-white '>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
        {/* Logo */}
        <div>
          <Link to="/">
          <h1 className='text-2xl font-bold'>Job<span className='text-[#6A38C2]'>Tracker</span></h1>
          </Link>
        </div>

        {/* Menu Icon (Mobile) */}
        <div className='md:hidden'>
         {isOpen?<X onClick={() => setIsOpen(!isOpen)}/>:<Menu className='w-6 h-6 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />} 
        </div>

        <div className={`flex-col md:flex md:flex-row md:items-center md:gap-12 md:static absolute top-16 left-0 w-full bg-white md:w-auto md:bg-transparent transition-all duration-300 ease-in-out ${isOpen ? 'flex' : 'hidden'}`}>
          <ul className='flex flex-col md:flex-row font-medium items-start md:items-center gap-5 p-4 md:p-0'>
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li><Link to="/admin/companies" onClick={() => setIsOpen(false)}>Companies</Link></li>
                  <li><Link to="/admin/jobs" onClick={() => setIsOpen(false)}>Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                  <li><Link to="/jobs" onClick={() => setIsOpen(false)}>Jobs</Link></li>
                  <li><Link to="/browse" onClick={() => setIsOpen(false)}>Browse</Link></li>
                </>
              )
            }
          </ul>

          {/* Auth Buttons */}
          <div className='flex flex-col md:flex-row items-start md:items-center gap-2 p-4 md:p-0'>
            {!user ? (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}><Button variant="outline">Login</Button></Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div>
                    <div className='flex gap-2 space-y-2'>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                      </Avatar>
                      <div>
                        <h4 className='font-medium'>{user?.fullname}</h4>
                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                      </div>
                    </div>
                    <div className='flex flex-col my-2 text-gray-600'>
                      {user && user.role === 'student' && (
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                          <User2 />
                          <Button variant="link" onClick={() => setIsOpen(false)}> <Link to="/profile">View Profile</Link></Button>
                        </div>
                      )}
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <LogOut />
                        <Button onClick={() => { logoutHandler(); setIsOpen(false); }} variant="link">Logout</Button>
                      </div>
                      {user && user.role === 'student' && (
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                          <Bookmark />
                          <Button variant="link" onClick={() => setIsOpen(false)}> <Link to="/saved-jobs">Save Jobs</Link></Button>
                        </div>
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
