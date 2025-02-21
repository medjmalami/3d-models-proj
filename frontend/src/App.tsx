import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

// Custom hooks
import { useModels } from './hooks/useModels';

// Layout components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Model components
import { ModelCard } from './components/models/ModelCard';
import { CategoryFilter } from './components/models/CategoryFilter';
import { AddModelDialog } from './components/models/AddModelDialog';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { toast } = useToast();
  const {
    filteredModels,
    selectedCategory,
    setSelectedCategory,
    showAddDialog,
    setShowAddDialog,
    newModel,
    setNewModel,
    handleDeleteModel,
    handleAddModel
  } = useModels();

  // Login handler
  const handleLogin = () => {
    // In a real app, you would validate against a backend
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      toast({
        title: "Logged in successfully",
        description: "Welcome back, admin!",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 w-full">
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setShowAddDialog={setShowAddDialog}
      />

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 sm:p-6">
        {/* Category Filter and Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          
          {isLoggedIn && (
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Model
            </Button>
          )}
        </div>

        {/* Model Grid - Responsive with different columns based on screen size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredModels.map((model) => (
            <ModelCard 
              key={model.id} 
              model={model} 
              isAdmin={isLoggedIn}
              onDelete={handleDeleteModel}
            />
          ))}
        </div>
        
        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No models found in this category</p>
          </div>
        )}
      </main>

      <Footer />
      
      {/* Add Model Dialog */}
      <AddModelDialog
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        newModel={newModel}
        setNewModel={setNewModel}
        handleAddModel={handleAddModel}
      />
      
      <Toaster />
    </div>
  );
};

export default App;