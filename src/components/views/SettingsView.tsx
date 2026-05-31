import { Bell, Shield, Moon, LogOut, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useTheme } from "../theme-provider";
import { logoutUser, updateUserName } from "@/api/auth";

function formatDisplayName(rawName: string, maxLength = 12) {
  if (!rawName) return "User";

  // 1. Remove extra spaces
  const cleanName = rawName.trim();
  if (!cleanName) return "User";

  // 2. Format: Capitalize the first letter of each word
  const formattedName = cleanName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // 3. Truncate if it's too long
  if (formattedName.length > maxLength) {
    return `${formattedName.slice(0, maxLength)}...`;
  }

  return formattedName;
}

export function SettingsView() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const storedName = localStorage.getItem("name") || "User";
  const [fullName, setFullName] = useState(storedName);
  const name = useMemo(() => formatDisplayName(storedName, 12), [storedName]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-8">
      <h2 className="text-2xl font-bold tracking-tight mb-4">Settings</h2>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold shrink-0">
              {name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <Button
              className="w-full mt-2"
              disabled={isUpdating}
              onClick={async () => {
                const trimmed = fullName.trim();
                if (!trimmed) {
                  toast.error("Name is required");
                  return;
                }

                try {
                  setIsUpdating(true);
                  const response = await updateUserName(trimmed);
                  const updatedName = response.user?.name || trimmed;
                  localStorage.setItem("name", updatedName);
                  setFullName(updatedName);
                  toast.success("Profile updated");
                } catch (error: any) {
                  toast.error(error?.response?.data?.message || "Failed to update profile");
                } finally {
                  setIsUpdating(false);
                }
              }}
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferences Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider ml-1">
          Preferences
        </h3>
        <Card>
          <CardContent className="p-0">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-sm">Dark Mode</span>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
            </div>

            {/* Notifications Toggle */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-sm">Push Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>

            {/* Security Link */}
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-sm">Security & Privacy</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logout Action */}
      <Button
        variant="destructive"
        className="w-full flex items-center gap-2 mt-8"
        disabled={isLoggingOut}
        onClick={async () => {
          try {
            setIsLoggingOut(true);
            await logoutUser();
          } catch {
            // continue local logout even if API call fails
          } finally {
            localStorage.removeItem("authToken");
            localStorage.removeItem("name");
            setIsLoggingOut(false);
            navigate("/auth", { replace: true });
          }
        }}
      >
        <LogOut className="h-4 w-4" /> {isLoggingOut ? "Logging out..." : "Log Out"}
      </Button>
    </div>
  );
}
