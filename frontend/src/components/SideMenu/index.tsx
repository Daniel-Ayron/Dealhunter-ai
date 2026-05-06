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
    <Sidebar className="border border-black">
      <SidebarHeader className="border-b text-center border-black">
        <span className="font-bold text-1xl">DEALHUNTER AI</span>
        
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="[&_svg]:size-5">
                <Link href="/">
                  <Home />
                  <span className="text-lg ">Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild className="[&_svg]:size-5">
                <Link href="/monitored">
                  <PackageSearch size={18} />
                  <span className="text-lg">Meus Produtos</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-black">
        <div className="flex items-center gap-3">
          <User size={18} />
          <span className="text-sm font-medium">Usuario</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}