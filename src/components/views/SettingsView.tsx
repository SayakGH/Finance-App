import { Bell, Shield, Moon, LogOut, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useTheme } from "../theme-provider";

export function SettingsView() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-8">
      <h2 className="text-2xl font-bold tracking-tight mb-4">Settings</h2>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold shrink-0">
              SG
            </div>
            <div>
              <h3 className="text-lg font-semibold">Sayak Ghosh</h3>
              <p className="text-sm text-muted-foreground">
                Kolkata, West Bengal
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Sayak Ghosh" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue="Kolkata, West Bengal" />
            </div>
            <Button className="w-full mt-2">Update Profile</Button>
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
      >
        <LogOut className="h-4 w-4" /> Log Out
      </Button>
    </div>
  );
}
