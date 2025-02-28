
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import * as Switch from "@radix-ui/react-switch"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-muted-foreground" />
      <Switch.Root
        className="w-[38px] h-[20px] bg-secondary rounded-full relative focus:outline-none cursor-pointer data-[state=checked]:bg-primary"
        checked={theme === "dark"}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light")
        }}
      >
        <Switch.Thumb className="block w-[16px] h-[16px] bg-white rounded-full transition-transform duration-100 translate-x-[2px] will-change-transform data-[state=checked]:translate-x-[20px]" />
      </Switch.Root>
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}
