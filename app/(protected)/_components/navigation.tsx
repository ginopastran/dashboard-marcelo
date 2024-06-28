"use client";

import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
  BellIcon,
  File,
  GitFork,
  Folder,
  Layers,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { toast } from "sonner";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import Link from "next/link";
import Image from "next/image";
import HomeIcon from "@/components/icons/home";
import NotificationsIcon from "@/components/icons/notifications";
import LayersIcon from "@/components/icons/layers";
import HierarchyIcon from "@/components/icons/hierarchy";
import FolderIcon from "@/components/icons/folder";
import FileDocIcon from "@/components/icons/file-doc";

export const Navigation = () => {
  const router = useRouter();

  const params = useParams();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const getLinkClass = (linkPath: string) => {
    return cn(
      "flex items-center text-slate-400 font-semibold text-base",
      pathname.startsWith(linkPath) && "text-slate-800"
    );
  };

  const getLinkClassSvg = (linkPath: string) => {
    return cn(
      "mr-3 stroke-slate-400",
      pathname.startsWith(linkPath) && "mr-3 stroke-slate-800"
    );
  };

  const getLinkClassNotificationCircleSvg = (linkPath: string) => {
    return cn(
      "mr-3 stroke-slate-400 fill-slate-400",
      pathname.startsWith(linkPath) && "mr-3 stroke-slate-800 fill-slate-800"
    );
  };

  const getLinkClassNotificationPathSvg = (linkPath: string) => {
    return cn(
      "mr-3 fill-slate-400",
      pathname.startsWith(linkPath) && "mr-3 fill-slate-800"
    );
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-white overflow-y-auto relative flex w-72 flex-col z-[10] items-center",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div className="flex items-center py-12">
          <Image
            src={"/arquimetal-logo.svg"}
            alt="Arquimetal-Logo"
            width={125}
            height={125}
          />
        </div>
        <div className="flex flex-col gap-3 mt-8">
          <Link href={"/dashboard"} className={getLinkClass("/dashboard")}>
            <HomeIcon className={getLinkClassSvg("/dashboard")} />
            Dashboard
          </Link>
          <Link
            href={"/notificaciones"}
            className={getLinkClass("/notificaciones")}
          >
            <NotificationsIcon
              svgclassName="mr-3"
              path1className={getLinkClassNotificationPathSvg(
                "/notificaciones"
              )}
              path2className={getLinkClassSvg("/notificaciones")}
              circleclassName={getLinkClassNotificationCircleSvg(
                "/notificaciones"
              )}
            />
            Notificaciones
          </Link>
          <Link href={"/clients"} className={getLinkClass("/clients")}>
            <LayersIcon className={getLinkClassSvg("/clients")} />
            Gestión de Clientes
          </Link>
          <Link
            href={"/presupuestos"}
            className={getLinkClass("/presupuestos")}
          >
            <FolderIcon className={getLinkClassSvg("/presupuestos")} />
            Presupuestos
          </Link>
          <Link href={"/obras"} className={getLinkClass("/obras")}>
            <HierarchyIcon className={getLinkClassSvg("/obras")} />
            Gestión de Obras
          </Link>
          <Link
            href={"/administracion"}
            className={getLinkClass("/administracion")}
          >
            <FileDocIcon className={getLinkClassSvg("/administracion")} />
            Administración
          </Link>
        </div>
      </aside>
    </>
  );
};
