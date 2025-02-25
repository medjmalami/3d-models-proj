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

  const handleSubmit = () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("modelName", newModel.name || "");
    formData.append("category", newModel.category || "");
    formData.append("description", newModel.description || "");
    formData.append("modelFile", file);

    handleAddModel(formData);
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
            >
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
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setShowAddDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Model</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
