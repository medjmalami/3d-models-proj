
import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import type { SigninRes } from "../../shared/signin.types"
import axios from "axios"

// Custom hooks
import { useModels } from "./hooks/useModels"

// Layout components
import { Header } from "./components/layout/Header"
import { Footer } from "./components/layout/Footer"

// Model components
import { ModelCard } from "./components/models/ModelCard"
import { CategoryFilter } from "./components/models/CategoryFilter"
import { AddModelDialog } from "./components/models/AddModelDialog"
import { Spinner } from "./components/ui/spinner"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { toast } = useToast()
  const {
    filteredModels,
    selectedCategory,
    setSelectedCategory,
    showAddDialog,
    setShowAddDialog,
    newModel,
    setNewModel,
    handleDeleteModel,
    handleAddModel,
    loading,
  } = useModels()

  // Login handler
  const handleLogin = async () => {
    //see if token is in local storage
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      localStorage.removeItem("accessToken")
    }

    try {
      const { data } = await axios.post<SigninRes>(
        `${import.meta.env.VITE_API_URL}/signin`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (data.success && data.data) {
        setIsLoggedIn(true)
        // Store the access token from the response
        localStorage.setItem("accessToken", data.data.accessToken)
        toast({
          title: "Logged in successfully",
          description: "Welcome back!",
        })
      } else {
        toast({
          title: "Login failed",
          description: data.error || "Invalid credentials",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")
    setPassword("")
    setMobileMenuOpen(false)
    localStorage.removeItem("accessToken")
  }

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
          <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

          {isLoggedIn && (
            <Button onClick={() => setShowAddDialog(true)} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Model
            </Button>
          )}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Spinner size={40} className="mb-4" />
            <p className="text-gray-500">Loading models...</p>
          </div>
        ) : (
          <>
            {/* Model Grid - Responsive with different columns based on screen size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredModels.map((model) => (
                <ModelCard key={model.id} model={model} isAdmin={isLoggedIn} onDelete={handleDeleteModel} />
              ))}
            </div>

            {filteredModels.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No models found in this category</p>
              </div>
            )}
          </>
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
  )
}

export default App;
