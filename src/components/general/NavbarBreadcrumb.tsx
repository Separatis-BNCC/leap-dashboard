import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/Breadcrumb";
import { capitalize, cn, isNumber } from "@/lib/utils";
import React from "react";

const formatPathName = (path: string) =>
  path.replace(/-/g, " ").replace(/\d+/g, "");

export default function NavbarBreadcrumb() {
  const { pathname } = useLocation();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathname.split("/").map((path, i, paths) => {
          if (isNumber(path) || !path || path.length === 0) return;

          return (
            <React.Fragment key={i}>
              <BreadcrumbItem>
                <BreadcrumbPage
                  className={cn(i !== paths.length - 1 && "text-light")}
                >
                  {capitalize(formatPathName(path))}
                </BreadcrumbPage>
              </BreadcrumbItem>
              {i !== 0 && i !== paths.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
