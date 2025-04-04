import { Dispatch, SetStateAction, useState } from "react";
import { Model3D, ModelCategory, ALL_CATEGORIES } from "../../types/models";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaSpinner } from "react-icons/fa"; // Importing the spinner icon

interface AddModelDialogProps {
  showAddDialog: boolean;
  setShowAddDialog: Dispatch<SetStateAction<boolean>>;
  newModel: Partial<Model3D>;
  setNewModel: Dispatch<SetStateAction<Partial<Model3D>>>;
  handleAddModel: (formData: FormData) => void;
}

export const AddModelDialog = ({
  showAddDialog,
  setShowAddDialog,
  newModel,
  setNewModel,
  handleAddModel,
}: AddModelDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    if (!newModel.name || !newModel.category) {
      alert("Please provide a name and category for the model.");
      return;
    }

    setIsSubmitting(true);

    console.log(isSubmitting)

    try {
      // Create FormData object
      const formData = new FormData();

      // Append file with the key the backend expects
      formData.append("modelFile", file);

      // Append other fields
      formData.append("modelName", newModel.name || "");
      formData.append("category", newModel.category || "");
      formData.append("description", newModel.description || "");

      // Send to parent component
      handleAddModel(formData);
    } catch (error) {
      console.error("Error preparing form data:", error);
      alert("Error preparing form data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Model</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new 3D model to your showcase
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="model-name">Model Name</Label>
            <Input
              id="model-name"
              value={newModel.name}
              onChange={(e) =>
                setNewModel({ ...newModel, name: e.target.value })
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="model-category">Category</Label>
            <select
              id="model-category"
              value={newModel.category}
              onChange={(e) =>
                setNewModel({
                  ...newModel,
                  category: e.target.value as ModelCategory,
                })
              }
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select a category</option>
              {ALL_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="model-description">Description</Label>
            <textarea
              id="model-description"
              value={newModel.description}
              onChange={(e) =>
                setNewModel({ ...newModel, description: e.target.value })
              }
              className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="model-file">Upload Model File</Label>
            <input
              type="file"
              id="model-file"
              accept=".glb,.gltf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
            {file && (
              <p className="text-xs text-green-600">Selected file: {file.name}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowAddDialog(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={isSubmitting ? "opacity-50" : ""}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <FaSpinner className="animate-spin mr-2" size={16} />
                Adding...
              </div>
            ) : (
              "Add Model"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
