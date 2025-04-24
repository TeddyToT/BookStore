import {
    AssessmentOutlined,
    StorefrontOutlined,
    PeopleAltOutlined,
    ShoppingBagOutlined,
    DescriptionOutlined,
    Store,
    KeyboardArrowDown,
    MoreHoriz,
  } from "@mui/icons-material";
  import { useCallback, useEffect, useRef, useState, useContext } from "react";
  import { Link, useLocation } from "react-router-dom";
  import { useSidebar } from "../context/SidebarContext";
import { DataContext } from "../context/DataContext";

  interface NavItem {
    icon: React.ReactNode;
    name: string;
    path?: string;
    subItems?: {
      name: string;
      path: string;
    }[];
  }
  
  const navItems: NavItem[] = [
    {
      icon: <AssessmentOutlined />,
      name: "Dashboard",
      subItems: [
        { name: "Tổng quan", path: "/overview" },
        { name: "Sản phẩm", path: "/top-selling" },
      ],
    },
    {
      icon: <StorefrontOutlined />,
      name: "Sản phẩm",
      subItems: [
        { name: "Tổng quan", path: "/product-overview" },
        { name: "Thể loại", path: "/category-overview" },
        { name: "Tác giả", path: "/author-overview" },
      ],
    },
    {
      icon: <PeopleAltOutlined />,
      name: "Tài khoản",
      subItems: [
        { name: "Khách hàng", path: "/users/clients" },
        { name: "Nhân viên", path: "/users/staffs" },
      ],
    },
    {
      icon: <ShoppingBagOutlined />,
      name: "Đơn hàng",
      path: "/order/management",
    },
    {
      icon: <DescriptionOutlined />,
      name: "Phiếu góp ý",
      path: "/feedbacks",
    },
    {
      icon: <Store />,
      name: "Cửa hàng",
      subItems: [
        { name: "Cửa hàng", path: "/shop/shop-info" },
        { name: "Banners", path: "/shop/banners" },
      ],
    },
  ];
  
  export default function AppSidebar() {
    const {userDetail, shop} = useContext(DataContext)
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();

    const [openSubmenu, setOpenSubmenu] = useState<{
        type: "main";
        index: number;
      } | null>(null);
      const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
        {}
      );
      const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
    
      // const isActive = (path: string) => location.pathname === path;
      const isActive = useCallback(
        (path: string) => location.pathname === path,
        [location.pathname]
      );

      useEffect(() => {
        let submenuMatched = false;
        ["main"].forEach((menuType) => {
          const items = menuType === "main" ? navItems : navItems;
          items.forEach((nav, index) => {
            if (nav.subItems) {
              nav.subItems.forEach((subItem) => {
                if (isActive(subItem.path)) {
                  setOpenSubmenu({
                    type: menuType as "main",
                    index,
                  });
                  submenuMatched = true;
                }
              });
            }
          });
        });
    
        if (!submenuMatched) {
          setOpenSubmenu(null);
        }
      }, [location, isActive]);

      useEffect(() => {
        if (openSubmenu !== null) {
          const key = `${openSubmenu.type}-${openSubmenu.index}`;
          if (subMenuRefs.current[key]) {
            setSubMenuHeight((prevHeights) => ({
              ...prevHeights,
              [key]: subMenuRefs.current[key]?.scrollHeight || 0,
            }));
          }
        }
      }, [openSubmenu]);

      const handleSubmenuToggle = (index: number, menuType: "main") => {
        setOpenSubmenu((prevOpenSubmenu) => {
          if (
            prevOpenSubmenu &&
            prevOpenSubmenu.type === menuType &&
            prevOpenSubmenu.index === index
          ) {
            return null;
          }
          return { type: menuType, index };
        });
      };

      const renderMenuItems = (items: NavItem[], menuType: "main") => (
        <ul className="flex flex-col gap-4">
          {items.map((nav, index) => (
            <li key={nav.name}>
              {nav.subItems ? (
                <button
                  onClick={() => handleSubmenuToggle(index, menuType)}
                  className={`menu-item group ${
                    openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? "menu-item-active"
                      : "menu-item-inactive"
                  } cursor-pointer ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "lg:justify-start"
                  }`}
                >
                  <span
                    className={`menu-item-icon-size  ${
                      openSubmenu?.type === menuType && openSubmenu?.index === index
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="menu-item-text">{nav.name}</span>
                  )}
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <KeyboardArrowDown
                      className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                        openSubmenu?.type === menuType &&
                        openSubmenu?.index === index
                          ? "rotate-180 text-brand-500"
                          : ""
                      }`}
                    />
                  )}
                </button>
              ) : (
                nav.path && (
                  <Link
                    to={nav.path}
                    className={`menu-item group ${
                      isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                    }`}
                  >
                    <span
                      className={`menu-item-icon-size ${
                        isActive(nav.path)
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    >
                      {nav.icon}
                    </span>
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span className="menu-item-text">{nav.name}</span>
                    )}
                  </Link>
                )
              )}
              {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                <div
                  ref={(el) => {
                    subMenuRefs.current[`${menuType}-${index}`] = el;
                  }}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    height:
                      openSubmenu?.type === menuType && openSubmenu?.index === index
                        ? `${subMenuHeight[`${menuType}-${index}`]}px`
                        : "0px",
                  }}
                >
                  <ul className="mt-2 space-y-1 ml-9">
                    {nav.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          to={subItem.path}
                          className={`menu-dropdown-item ${
                            isActive(subItem.path)
                              ? "menu-dropdown-item-active"
                              : "menu-dropdown-item-inactive"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      );
    return (
        <aside
        className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
          ${
            isExpanded || isMobileOpen
              ? "w-[290px]"
              : isHovered
              ? "w-[290px]"
              : "w-[90px]"
          }
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
        onMouseEnter={() => !isExpanded && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`py-8 flex ${
            !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
        >
          <Link to="/" >
            {isExpanded || isHovered || isMobileOpen ? (
              <>
                <img
                  className="place-self-cente dark:hidden w-[150px] h-[100px]"
                  src={shop.logo}
                  alt="Logo"

                />
                <img
                  className="hidden dark:block w-[150px] h-[100px]"
                  src={shop.logodark}
                  alt="Logo"

                />
              </>
            ) : (
              <img
                src={shop.logo}
                alt="Logo"
                width={32}
                height={32}
              />
            )}
          </Link>
        </div>
        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
          <nav className="mb-6">
            <div className="flex flex-col gap-4">
              <div>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
                >

                </h2>
                {renderMenuItems(navItems, "main")}
              </div>
              <div className="">
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
                >
                  
                </h2>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    );
  }
  