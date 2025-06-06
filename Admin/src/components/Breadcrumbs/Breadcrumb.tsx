import { Link } from "react-router-dom";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  pageName?: string;
  items?: BreadcrumbItem[];
}

const Breadcrumb = ({ pageName, items }: BreadcrumbProps) => {
  const breadcrumbs =
    items || [
      { name: "Dashboard", href: "/" },
      { name: pageName || "" },
    ];

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {breadcrumbs[breadcrumbs.length - 1].name}
      </h2>
    
      <nav>
        <ol className="flex items-center gap-2">
          {breadcrumbs.map((item, index) => (
            <li key={index} className="flex items-center">
              {item.href ? (
                <Link to={item.href} className="font-medium text-black dark:text-white">
                  {item.name}
                </Link>
              ) : (
                <span className="font-medium text-primary">{item.name}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2 text-muted text-black dark:text-white">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
