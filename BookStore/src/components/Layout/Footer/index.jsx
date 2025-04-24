import { Button, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor, faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DataContexts } from '../../../AppContexts/Contexts';

function Footer() {
    const { shop, categories, authors } = useContext(DataContexts);

    function upper(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="bg-white border-t-2 border-gray-200 px-4 py-8 sm:px-6 lg:px-8">
            <div className="footer__container grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
                {/* Thông tin cửa hàng */}
                <div className="footer__app__info">
                    <div className="flex flex-col items-start gap-4">
                        <Link to="/" className="cursor-pointer">
                            <img
                                className="w-16 sm:w-32"
                                src={shop.logo}
                                alt="Shop logo"
                            />
                        </Link>
                        <ul className="list-none text-sm sm:text-base m-0 p-0">
                            <li className="mb-3 flex items-center">
                                <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-lg" />
                                {shop.address}
                            </li>
                            <li className="mb-3 flex items-center">
                                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-lg" />
                                {shop.email}
                            </li>
                            <li className="mb-3 flex items-center">
                                <FontAwesomeIcon icon={faPhone} className="mr-2 text-lg" />
                                {shop.phone}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Tác giả */}
                <div className="footer__authors">
                    <p className="text-lg font-semibold mb-4">Hãng</p>
                    <ul className="list-none p-0">
                        {authors.map((author, index) => (
                            <li key={index} className="mb-2">
                                <Link
                                    to={`/san-pham?author=${author.name}`}
                                    className="text-gray-600 hover:text-blue-600 transition duration-200"
                                >
                                    {upper(author.name)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Danh mục */}
                <div className="footer__categories">
                    <p className="text-lg font-semibold mb-4">Danh mục</p>
                    <ul className="list-none p-0">
                        {categories.map((category, index) => (
                            <li key={index} className="mb-2">
                                <Link
                                     to={`/san-pham?category=${category.categoryId}`}
                                    className="text-gray-600 hover:text-blue-600 transition duration-200"
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Đăng ký */}
                <div className="footer__register">
                    <p className="capitalize text-lg font-medium mb-4">{shop.name}</p>
                    <p className="text-base tracking-wide text-gray-600 mb-4">
                        {shop.about}
                    </p>
                    
                </div>
            </div>
        </div>
    );
}

export default Footer;
