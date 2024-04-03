'use client'

import { useState, useEffect } from "react";
import { useTheme } from "next-themes"
import { BsSun } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";
import Menu from "../menu/Menu";
import MenuItem from "../menu/MenuItem";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, systemTheme, setTheme } = useTheme()
  const menuRef = useClickOutside(() => {
    setIsOpen(false)
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentIcon = theme === "dark" ? <BsMoon size={16} /> : <BsSun size={16} />;
  const systemIcon = systemTheme === "dark" ? <BsMoon size={16} /> : <BsSun size={16} />;

  const menuBody = (
    <ol className="flex flex-col gap-1 min-w-[130px]">
      <MenuItem label='Dark' action={() => {
        setTheme('dark')
        setIsOpen(false)
      }} />
      <MenuItem label='Light' action={() => {
        setTheme('light')
        setIsOpen(false)
      }} />
      <MenuItem label='System' action={() => {
        setTheme('system')
        setIsOpen(false)
      }} />
    </ol>
  )

  return (
    <div className="relative flex hover:bg-neutral-200 hover:dark:bg-neutral-800 flex-row p-2 items-center rounded-md cursor-pointer" onClick={() => setIsOpen((prev) => !prev)} ref={menuRef}>
      {theme === 'system' ? systemIcon : currentIcon}
      <Menu isOpen={isOpen} body={menuBody} />
    </div>
  )
}
