import { useState } from "react";
import { ArrowLeft, Delete, ArrowRight, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface QuickAddViewProps {
  onBack: () => void;
}

export function QuickAddView({ onBack }: QuickAddViewProps) {
  const [amount, setAmount] = useState("0");

  // Tags State
  const [tags, setTags] = useState([
    "Food",
    "Groceries",
    "Shopping",
    "Clothes",
    "Transport",
    "Utilities",
  ]);
  const [selectedTag, setSelectedTag] = useState("Food");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTagInput, setNewTagInput] = useState("");

  const handleNumpad = (val: string) => {
    if (val === "back") {
      setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (val === ".") {
      if (!amount.includes(".")) setAmount((prev) => prev + ".");
    } else {
      setAmount((prev) => (prev === "0" ? val : prev + val));
    }
  };

  const handleAddCustomTag = () => {
    const trimmedTag = newTagInput.trim();
    if (trimmedTag !== "" && !tags.includes(trimmedTag)) {
      setTags((prev) => [...prev, trimmedTag]);
      setSelectedTag(trimmedTag);
    } else if (tags.includes(trimmedTag)) {
      setSelectedTag(trimmedTag);
    }
    setNewTagInput("");
    setIsModalOpen(false); // Close modal after adding
  };

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "back"];

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="absolute left-0 -ml-2 rounded-full hover:bg-secondary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold w-full text-center">
          Add Expense
        </h2>
      </div>

      {/* Main Content Wrapper - Removed justify-between */}
      <div className="flex-1 flex flex-col pb-2">
        <div>
          {/* Amount Display */}
          <div className="text-center space-y-1 mb-8">
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Amount Spent
            </p>
            <div className="flex items-center justify-center gap-1 text-5xl font-bold tracking-tight">
              <span className="text-2xl text-muted-foreground mt-2">$</span>
              <span>{amount || "0"}</span>
            </div>
          </div>

          {/* Category Tags Section */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "secondary"}
                  size="sm"
                  className={`h-8 rounded-full text-xs transition-colors ${
                    selectedTag !== tag && "bg-secondary/50 hover:bg-secondary"
                  }`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Button>
              ))}

              {/* Add New Tag Modal */}
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full text-xs border-dashed border-muted-foreground/50 text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="h-3 w-3 mr-1" /> New
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[325px] rounded-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Category</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Input
                      placeholder="e.g., Subscriptions"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddCustomTag();
                      }}
                      autoFocus
                    />
                    <Button onClick={handleAddCustomTag} className="w-full">
                      Add Tag
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Numpad & Action Button - Removed mt-auto, added specific top margin (mt-8) */}
        <div className="mt-8">
          <div className="grid grid-cols-3 gap-3 mb-6">
            {keys.map((key) => (
              <Button
                key={key}
                variant="ghost"
                className="h-16 text-2xl font-medium bg-secondary/50 hover:bg-secondary rounded-2xl active:scale-95 transition-transform"
                onClick={() => handleNumpad(key)}
              >
                {key === "back" ? <Delete className="h-6 w-6" /> : key}
              </Button>
            ))}
          </div>

          <Button
            className="w-full h-14 text-lg font-semibold rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            onClick={() => {
              // Handle saving the transaction here using `amount`, `selectedTag`
              onBack();
            }}
          >
            Add Transaction <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
