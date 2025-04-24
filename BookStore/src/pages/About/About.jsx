import React, {useContext} from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { DataContexts } from "../../AppContexts/Contexts";
import QuestionBox from "./QuestionBox";
import logo from "../../assets/images/logo.png";

import BubblesBG from "../../components/Bubbles/Bubbles";

const Introduce = () => {
    const {users, products, manufacturers, shop}  = useContext(DataContexts)
  return (
    <div className="w-full h-auto flex flex-col items-center gap-[150px] py-5 pb-20 overflow-hidden mb-20">
      <div className="w-11/12">
        <div className="w-2/3">
          <Breadcrumb pageName="Giới thiệu" />
        </div>
        <div className="w-full flex flex-col gap-[150px] mt-10">
          <div className="w-full flex flex-col lg:flex-row gap-10 items-center lg:items-start xl:items-center">
            <div className="w-full lg:w-1/2">
              <p className="text-5xl font-black mb-5 text-[#1677ff]">
                Về chúng tôi
              </p>
              <p className="text-[17px] md:text-lg ">
                <span className="font-black text-[#3e3e3e]">Book Store</span>{" "}
                tự hào là cửa hàng thương mại điện tử hàng đầu chuyên cung cấp
                các sản phẩm sách chất lượng cao, đáp ứng mọi phong cách và nhu
                cầu của khách hàng. Với sứ mệnh mang đến trải nghiệm mua sắm
                sách tiện lợi và đáng tin cậy,{" "}
                <span className="font-black text-[#3e3e3e]">Book Store</span>{" "}
                không ngừng nỗ lực xây dựng một thương hiệu uy tín, kết nối đam
                mê thời trang và sự thoải mái trong từng bước đi. Tại{" "}
                <span className="font-black text-[#3e3e3e]">Book Store</span>,
                chúng tôi cung cấp đa dạng các dòng sản phẩm: từ sách thể thao
                năng động, sách công sở lịch lãm, đến sách thời trang dành cho
                nam, nữ và trẻ em. Mỗi sản phẩm đều được tuyển chọn kỹ lưỡng từ
                các thương hiệu nổi tiếng, đảm bảo chất lượng, thiết kế hiện đại
                và giá cả hợp lý. Chúng tôi không chỉ cung cấp sản phẩm mà còn
                cam kết mang đến dịch vụ khách hàng tận tâm, chính sách đổi trả
                linh hoạt, cùng hệ thống giao hàng nhanh chóng trên toàn quốc.
                Hãy để{" "}
                <span className="font-black text-[#3e3e3e]">Book Store</span>{" "}
                đồng hành cùng bạn, bước qua mọi chặng đường với phong cách và
                sự tự tin!
              </p>
              <div className="w-full grid grid-cols-3 lg:gap-7 mt-5">
                <div className="flex flex-col gap-3 items-center md:items-start">
                  <p className="text-4xl sm:text-5xl font-bold text-green-700">
                    {products.length}+
                  </p>
                  <p className="font-bold text-sm sm:text-base">
                    Sản phẩm chất lượng
                  </p>
                </div>
                <div className="flex flex-col gap-3 items-center md:items-start">
                  <p className="text-4xl sm:text-5xl font-bold text-yellow-500">
                    {users.length}+
                  </p>
                  <p className="font-bold text-sm sm:text-base">Khách hàng</p>
                </div>
                <div className="flex flex-col gap-3 items-center md:items-start">
                  <p className="text-4xl sm:text-5xl font-bold text-red-500">
                    {manufacturers.length}+
                  </p>
                  <p className="font-bold text-sm sm:text-base">
                    Nhãn hàng
                  </p>
                </div>
              </div>
            </div>
            <img
              src={shop.logo}
              className="w-full lg:w-5/12 rounded-xl shadow-2xl"
            />
          </div>
          <div className="w-full flex flex-col lg:flex-row-reverse gap-10 items-center lg:items-start xl:items-center">
            <div className="w-full lg:w-1/2">
              <p className="text-5xl font-black mb-5 text-[#1677ff]">
                Tầm nhìn và{" "}
                <span className="block sm:inline-block">sứ mệnh</span>
              </p>
              <p className="text-[17px] md:text-lg ">
                <span className="font-black text-[#3e3e3e]">Book Store</span>{" "}
                hoạt động với sứ mệnh cao cả là mang đến cho khách hàng những
                đôi sách chất lượng, thoải mái và thời trang, góp phần nâng cao
                trải nghiệm cuộc sống và phong cách cá nhân.
              </p>
              <p className="text-lg">
                <span className="font-black text-[#3e3e3e]">Book Store</span>{" "}
                hướng đến mục tiêu trở thành thương hiệu uy tín hàng đầu trong
                lĩnh vực cung cấp sách dép tại Việt Nam, đồng hành cùng khách
                hàng trên mọi hành trình và góp phần xây dựng một cộng đồng tiêu
                dùng thông minh, bền vững. sống.
              </p>
            </div>
            <img
              src={shop.logo}
              className="w-full lg:w-5/12  rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-auto relative overflow-hidden flex items-center justify-center">
        <div className="w-11/12 md:w-4/5 bg-white z-20 flex flex-col items-center md:gap-10 border-2 border-[#3e3e3e] rounded-xl shadow-2xl py-10">
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3">
            <p className="text-5xl font-black text-[#1677ff]">Vì sao chọn</p>
            <img src={shop.logo} className="w-[200px]" />
          </div>
          <div className="w-11/12 md:w-4/5 mt-10">
            <QuestionBox
              icon={shop.logo}
              tilte={"Sản phẩm chất lượng hàng đầu"}
              context={
                "luôn chú trọng vào việc tuyển chọn kỹ lưỡng các nhà cung cấp uy tín, với quy trình sản xuất đạt chuẩn, đảm bảo chất lượng và độ bền vượt trội. Mỗi đôi sách đến tay khách hàng đều trải qua quá trình kiểm tra nghiêm ngặt, cam kết mang lại sự thoải mái và an toàn cho người sử dụng"
              }
            />
            <QuestionBox
              icon={shop.logo}
              tilte={"Nguồn gốc xuất xứ rõ ràng"}
              context={
                "minh bạch trong mọi hoạt động, cam kết cung cấp đầy đủ thông tin về nguồn gốc xuất xứ của từng sản phẩm. Khách hàng có thể dễ dàng truy xuất nguồn gốc sản phẩm thông qua hệ thống tem truy xuất điện tử được gắn trên mỗi sản phẩm."
              }
            />
            <QuestionBox
              icon={shop.logo}
              tilte={"Giá cả hợp lý"}
              context={
                "luôn nỗ lực để mang đến cho khách hàng những sản phẩm chất lượng cao với mức giá hợp lý nhất. Chúng tôi hiểu rằng giá cả là một yếu tố quan trọng ảnh hưởng đến quyết định mua sắm của khách hàng, vì vậy Book Store luôn cân nhắc kỹ lưỡng để đưa ra mức giá phù hợp với mọi đối tượng khách hàng."
              }
            />
            <QuestionBox
              icon={shop.logo}
              tilte={"Dịch vụ chuyên nghiệp, tận tâm"}
              context={
                "đặt lợi ích của khách hàng lên hàng đầu, luôn sẵn sàng hỗ trợ khách hàng tận tình, chu đáo. Đội ngũ nhân viên chuyên nghiệp, am hiểu sản phẩm sẽ luôn tư vấn và giải đáp mọi thắc mắc của khách hàng một cách nhanh chóng và hiệu quả."
              }
            />
            <QuestionBox
              icon={shop.logo}
              tilte={"Giao hàng nhanh chóng, tiện lợi"}
              context={
                " hợp tác với các nhà cung cấp dịch vụ vận chuyển uy tín để đảm bảo giao hàng nhanh chóng, đúng hẹn đến tay khách hàng. Chúng tôi cung cấp đa dạng các hình thức thanh toán để khách hàng có thể lựa chọn phương thức phù hợp nhất với nhu cầu của mình."
              }
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Introduce;
