import { Dispatch, SetStateAction } from 'react';
import { LogOut, Menu,  X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoginDialog } from '../auth/LoginDialog';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  isLoggedIn: boolean;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  handleLogin: () => void;
  handleLogout: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  setShowAddDialog: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({
  isLoggedIn,
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  handleLogout,
  mobileMenuOpen,
  setMobileMenuOpen,
  setShowAddDialog
}: HeaderProps) => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">Minecraft 3D Models</h1>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">Welcome, Admin</span>
              <Button variant="outline" onClick={handleLogout} size="sm" className="text-black">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <LoginDialog
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu
          isLoggedIn={isLoggedIn}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          setShowAddDialog={setShowAddDialog}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}
    </header>
  );
};