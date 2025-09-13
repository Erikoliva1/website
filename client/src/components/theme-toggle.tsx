import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="apple-button-secondary h-9 w-9"
          data-testid="button-theme-toggle"
        >
          {actualTheme === "light" ? (
            <Sun className="h-4 w-4 transition-all" />
          ) : (
            <Moon className="h-4 w-4 transition-all" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="apple-card border-border"
        data-testid="dropdown-theme-options"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`cursor-pointer transition-colors ${
            theme === "light" ? "bg-accent text-accent-foreground" : ""
          }`}
          data-testid="option-theme-light"
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`cursor-pointer transition-colors ${
            theme === "dark" ? "bg-accent text-accent-foreground" : ""
          }`}
          data-testid="option-theme-dark"
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={`cursor-pointer transition-colors ${
            theme === "system" ? "bg-accent text-accent-foreground" : ""
          }`}
          data-testid="option-theme-system"
        >
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}