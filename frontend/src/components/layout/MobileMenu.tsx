import { Dispatch, SetStateAction } from 'react';
import { LogOut, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MobileMenuProps {
  isLoggedIn: boolean;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  handleLogin: () => void;
  handleLogout: () => void;
  setShowAddDialog: Dispatch<SetStateAction<boolean>>;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const MobileMenu = ({
  isLoggedIn,
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  handleLogout,
  setShowAddDialog,
  setMobileMenuOpen
}: MobileMenuProps) => {
  return (
    <div className="md:hidden mt-4 p-4 bg-gray-800 rounded-md">
      {isLoggedIn ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm">Welcome, Admin</p>
          <Button variant="outline" onClick={handleLogout} size="sm" className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
          <Button 
            variant="default" 
            onClick={() => {
              setShowAddDialog(true);
              setMobileMenuOpen(false);
            }} 
            size="sm"
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Model
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="grid gap-2">
            <Label htmlFor="mobile-username" className="text-white">Username</Label>
            <Input
              id="mobile-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mobile-password" className="text-white">Password</Label>
            <Input
              id="mobile-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={() => {
            handleLogin();
            setMobileMenuOpen(false);
          }} className="w-full">
            Login
          </Button>
        </div>
      )}
    </div>
  );
};