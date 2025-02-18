"use client"; 

import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import  Sidebar from './sidebar';
import { useEffect, useState } from 'react';

const MobileSidebar = () => {
  const [isMouumted, setIsMounted] = useState(false);

useEffect(() => {
   setIsMounted(true);

},[]);
if (!isMouumted) {
  return null;
}
  return ( 
    <Sheet>
        <SheetTrigger>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
           <Sidebar />
        </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;   