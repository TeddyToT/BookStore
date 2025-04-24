import { Link } from "react-router-dom";
import { faHouse, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Breadcrumb = ({ pageName, items }) => {
  const breadcrumbs = items || [{ name: 'Trang chủ', href: '/' }, { name: pageName || '' }];

  return (
    <div className="flex items-center mt-3">
      {!pageName && !items ? (

        <span className="text-lg font-bold">
          <FontAwesomeIcon icon={faHouse} className="text-xl mx-3" />
          Trang chủ
        </span>
      ) : (
        <div className="flex group items-center">
          {/* Breadcrumb gốc "Trang chủ" */}
          <FontAwesomeIcon
            icon={faHouse}
            className="text-xl mx-3 hover:text-blue-500"
          />
          <Link
            to="/"
            className="sm:text-lg text-base font-bold hover:text-blue-500"
          >
            Trang chủ
          </Link>


          {breadcrumbs.slice(1).map((item, index) => (
            <div key={index} className="flex items-center ml-3">
              <FontAwesomeIcon
                icon={faChevronRight}
                className="sm:text-lg text-base mr-3"
              />
              {item.href ? (
                <Link
                  to={item.href}
                  className="sm:text-lg text-base font-bold hover:text-blue-500"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="sm:text-lg text-base font-bold">{item.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Breadcrumb;
