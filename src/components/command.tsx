"use client"

import * as React from "react"
import {
  Pencil1Icon,
  PersonIcon,
  HomeIcon
} from "@radix-ui/react-icons"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,

} from "@/components/ui/command"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const selectPage = useCallback(
    (route: string) => {
      router.push(route);
      setOpen(false);
    },
    [router, setOpen] // Include dependencies that the callback uses
  );


  return (
    <>
      <Button onClick={()=>setOpen(true)} variant="ghost">⌘</Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Main Menu">
            <CommandItem onSelect={()=>selectPage("/")}>
              <HomeIcon className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={()=>selectPage("/blog")}>
              <Pencil1Icon className="mr-2 h-4 w-4" />
              <span>Blog</span>
            </CommandItem>
            <CommandItem onSelect={()=>selectPage("about")}>
              <PersonIcon className="mr-2 h-4 w-4" />
              <span>About</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
