import type { NavigationItem } from "../../types";
import { classNames } from "@lib/classNames";

const Navbar = ({ navigations }: { navigations: NavigationItem[] }) => {
  return (
    <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
      <nav className="space-y-1">
        {navigations.map(({ name, href, current }) => (
          <a
            key={name}
            href={href}
            className={classNames(
              current
                ? "bg-gray-100 text-orange-600 hover:bg-white"
                : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
              "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
            )}
            aria-current={current ? "page" : undefined}
          >
            <span className="truncate">{name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Navbar;
