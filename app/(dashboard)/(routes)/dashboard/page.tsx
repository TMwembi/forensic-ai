"use client"

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Activity, ArrowRight, Bug, ShieldHalf} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
    {
        label: "Pentest Report",
        icon: Bug, 
        color: "text-violet-500",
        bgcolor: "bg-violet-500/10",            
        href: "/pentest", 
    },
    {
        label: "Log Analysis",
        icon: Activity,
        color: "text-green-500",
        bgColor: "text-green-500/10",
        href: "/log",
    },
    {
        label: "CyberSec Frameworks",
        icon: ShieldHalf,
        color: "text-orange-700",
        bgColor: "text-orange-700/10",
        href: "/frameworks" 
    },
]
const DashboardPage = () => {
    const router = useRouter();
    return (
        <div>
        <div className= "mb-7 space-y-4">
       <h2 className= "text-2xl md:text-4xl font-bold text-center">
        Explore the power of AI
       </h2>
       <p className= "text-muted-foreground font-light text-sm md:text-lg text-center">
        Chat with the smartest AI - Experince the power of AI
       </p>
       <div className= "px-4 md:px-32 space-y-4"> 
       {tools.map((tool) =>(
        <Card
         onClick={() => router.push(tool.href)}
         key={tool.href}
         className="p-4 border-black/5 flex items-center
         justify-between hover:shadow-md transition
         cursor-pointer"
         >
            <div className="flex items-center gap-x-4">
             <div className={cn("p-2 w-fit rounded-md", tool.bgcolor )}>
                <tool.icon className={cn("w-8 h-8 ", tool.color)}/>
             </div>
              <div className="font-semibold">
                   {tool.label}
              </div>
            </div>
             <ArrowRight className="w-5 h-5" />
        </Card>
       ))}
       </div>
        </div>
        </div>       
    )
}

export default DashboardPage;