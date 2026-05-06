"use client"; 

import Link from "next/link";
import { Home, PackageSearch, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function SideMenu() {
  return (
    <Sidebar className="bg-zinc-950 text-zinc-600 border-r border-zinc-800">
      <SidebarHeader className="p-4 border-b border-zinc-800">
        <span className="font-bold text-lg">DEALHUNTER AI</span>
        
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <Home size={20} />
                  <span className="text-lg ">Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/monitored">
                  <PackageSearch size={18} />
                  <span className="text-lg">Meus Produtos</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3">
          <User size={18} />
          <span className="text-sm font-medium">Daniel Ayron</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}