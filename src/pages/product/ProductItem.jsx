import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useProductApi from "../../service/product/useProductApi";
import Breadcrumb from "../../components/UI/Breadcrumbs/Breadcrumb";
import ProductCarousel from "../../components/UI/Carousel/ProductCarousel";
import useLikeStore from "../../store/useLikeStore";
import { Toast } from "primereact/toast";
import "./style.scss";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
   
const ProductItem = () => {
  const [counter, setCounter] = useState(0);
  let [product, setProduct] = useState([]);
  let { slug } = useParams();
  const [isLike, setIsLike] = useState(false);
  const [selected, setSelected] = useState(false);

  const { likeProd } = useLikeStore();

  const toast = useRef(null);

  const state = () => {
    useProductApi.getOneItem(slug).then((res) => {
      setProduct(res.data[0]);
    });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Tanlandi",
      detail: product.name,
      life: 3000,
    });
  };

  const showWarn = () => {
    toast.current.show({
      severity: "error",
      summary: "Diqqat",
      detail: "Mahsulot o'chirildi ",
      life: 3000,
    });
  };

  const setLikeFun = () => {
    console.log("ok");

    JSON.parse(localStorage.getItem("LIKE_COLLECTION"))?.find((item, index) => {
      console.log(item);

      if (item._id == product._id) {
        let local = JSON.parse(localStorage.getItem("LIKE_COLLECTION"));
        local.splice(index, 1);
        localStorage.setItem("LIKE_COLLECTION", JSON.stringify(local));
        showWarn();
        console.log("local:", local);
        console.log("DELETED");
        setIsLike(false);
      } else {
        setIsLike(true);
        console.log("OK 2");
        JSON.parse(localStorage.getItem("LIKE_COLLECTION"))?.find((item) => {
          if (item._id != product._id) {
            setSelected(true);
            likeProd(product);
            console.log("ADDED 2");
            setIsLike(true);
          } else {
            setSelected(false);
            console.log("DLETEED 2");
            setIsLike(true);
          }
        });
      }
    });

    if (!isLike) {
      showSuccess();
    }

    if (!JSON.parse(localStorage.getItem("LIKE_COLLECTION"))) {
      likeProd(product);
    }
  };

  useEffect(() => {
    state();

    JSON.parse(localStorage.getItem("LIKE_COLLECTION"))?.forEach((item) => {
      if (item._id == product._id) {
        setIsLike(true);
      }
    });

    console.log(JSON.parse(localStorage.getItem("LIKE_COLLECTION")));

    console.log(selected);
  }, [slug, product._id]);


  const data = [
    {
      label: "Mahsulot tavsifi",
      value: "Mahsulot tavsifi",
      desc: `TWS quloqchinlari simsiz quloqchinlarning munosib va ​​ixcham turidir. Telefoningizni zaryadlash qutisidan chiqarganingizda 
      avtomatik ravishda sinxronlanadi. Zaryadlovchiga o'rnatilganda avtomatik ravishda zaryadlanadi TWS simsiz minigarnituralari butun chastota diapazonida yaxshi ovoz sifatiga ega, bu ularni ko'p qirrali qiladi, siz har qanday 
      janr va yo'nalishdagi musiqalarni tinglashingiz mumkin. Qulay sensorli boshqaruv sizga telefoningizni olib tashlamasdan 
      treklarni o'zgartirish yoki qo'ng'iroqlarga javob berish imkonini beradi. Bluetooth 5.0 orqali aloqa o'n metrgacha bo'lgan 
      masofada barqaror qabul qilishni ta'minlaydi.`
    },
    {
      label: "Ko'rsatma",
      value: "Ko'rsatma",
      desc: `Ikki quloqchin birgalikda yoki alohida ishlaydi. i18 simsiz minigarnituralari bir vaqtning o'zida ikkita qurilmaga ulanishi mumkin, 
      agar kerak bo'lsa, biridan ikkinchisiga o'ting.  TWS simsiz minigarnituralari butun chastota diapazonida yaxshi ovoz sifatiga ega, bu ularni ko'p qirrali qiladi, siz har qanday 
      janr va yo'nalishdagi musiqalarni tinglashingiz mumkin. Qulay sensorli boshqaruv sizga telefoningizni olib tashlamasdan 
      treklarni o'zgartirish yoki qo'ng'iroqlarga javob berish imkonini beradi. Bluetooth 5.0 orqali aloqa o'n metrgacha bo'lgan 
      masofada barqaror qabul qilishni ta'minlaydi.`,
    },
    {
      label: "Sharhlar (202)",
      value: "Sharhlar (202)",
      desc: `Simsiz minigarnituralar ixchamligi va qulayligi uchun yaxshi. Karnaylarga o'rnatilgan mikrofonlar esa ularning o'lchamlarini 
      oshirmaydi. AirPods tufayli simsiz quloqchinlar odamlar orasida mashhur aksessuarga aylandi. Simsiz minigarnituralar 
      qurilmalarga Bluetooth orqali ulanadi va juda keng ulanish diapazoniga ega. Odatiy tugmalar o‘rniga mikrofonli Bluetooth 
      naushniklar sensorli boshqaruv bilan jihozlangan – datchiklar quloqchinlarda joylashgan.  TWS simsiz minigarnituralari butun chastota diapazonida yaxshi ovoz sifatiga ega, bu ularni ko'p qirrali qiladi, siz har qanday 
      janr va yo'nalishdagi musiqalarni tinglashingiz mumkin. Qulay sensorli boshqaruv sizga telefoningizni olib tashlamasdan 
      treklarni o'zgartirish yoki qo'ng'iroqlarga javob berish imkonini beradi. Bluetooth 5.0 orqali aloqa o'n metrgacha bo'lgan 
      masofada barqaror qabul qilishni ta'minlaydi.`,
    },
    // {
    //   label: "Angular",
    //   value: "angular",
    //   desc: `Because it's about motivating the doers. Because I'm here
    //   to follow my dreams and inspire other people to follow their dreams, too.`,
    // },
    // {
    //   label: "Svelte",
    //   value: "svelte",
    //   desc: `We're not always in the position that we want to be at.
    //   We're constantly growing. We're constantly making mistakes. We're
    //   constantly trying to express ourselves and actualize our dreams.`,
    // },
  ];
 

  return (
    <section id="item" className="py-8">
      <Toast ref={toast} />
      <div className="container mx-auto">
        <Breadcrumb product={product} />
      </div>

      <div className="container mx-auto">
        <div className="flex  gap-x-20 pt-6">
          <div className="w-[508px] h-[554px]">
            <ProductCarousel image={product.images} />
          </div>

          <div className="info border-4  mb-[58px]  grow p-4">
            <div className="flex justify-between">
              <span className="text-[#62656A]">
                Koʻproq 9000 buyurtma sotuvda bor
              </span>
              <button
                onClick={() => setLikeFun()}
                className="flex items-center h-[24px] gap-[10px]"
              >
                <span>
                  {!isLike ? (
                    <i className="pi pi-heart text-md mt-1"></i>
                  ) : (
                    <i className="pi pi-heart-fill text-xl mt-1"></i>
                  )}
                </span>
                <div>
                  {" "}
                  {!isLike ? (
                    <p className="text-md">Tanlash</p>
                  ) : (
                    <p>Tanlangan</p>
                  )}{" "}
                </div>
              </button>
            </div>
            <h1 className="pt-[12px] mb-2 h-auto text-[22px] leading-7  text-[#212121]">
              {product.name}
            </h1>
            <ul className="gap-y-2 gap-x-[34.33px] flex">
              <li className=" text-[14px] text-[#141415] font-normal  ">
                <p>Sotuvchi</p> <p>Yetkazib berish:</p>{" "}
              </li>
              <li className=" text-[14px] text-[#141415] font-normal  flex flex-col ">
                {" "}
                <span>{product.seller}</span>
                <span>1 kun, bepul</span>
              </li>
            </ul>

            <div className="max-w-auto  h-[25px]  border-b-2"></div>

            <div className="miqdor pt-[24px]">
              <h3 className="mb-2">Miqdor:</h3>
              <ul className="flex items-center gap-x-[16px]">
                <div className="moma  flex  items-center ">
                  <i
                    className=" text-[28px] bx bx-minus hover:text-gray-600"
                    onClick={() => setCounter((counter) => counter - 1)}
                  ></i>

                  <h4 className="w-[49px] text-[14px] flex justify-center ">
                    {counter}
                  </h4>

                  <i
                    className=" text-[28px] bx bx-plus  hover:text-gray-600"
                    onClick={() => setCounter((counter) => counter + 1)}
                  ></i>
                </div>
                <p className="sotuv">Sotuvda {product.count} dona bor</p>
              </ul>
            </div>
            <div className="pt-[24px] ">
              <h3>Narx:</h3>
              <div className="flex gap-x-[21.1px]">
                <div className="price flex items-center gap-x-[21.23px]">
                  <h2 className="narxi"> {product.price} so'm</h2>
                  <h4 className="line-through	 eski_narxi">
                    {product.old_price} so'm
                  </h4>
                </div>
                <div className="katta-sotuv  w-max">
                  <p njnj>Katta sotuvlar</p>
                </div>
              </div>
            </div>
            <div className="oyiga flex mt-[24px]  justify-between">
              <div className="flex items-center gap-1">
                <div className="ronal">
                  <p className="meses p-[6px]">Oyiga {product.month} so'mdan</p>{" "}
                </div>
                <p className="muddat"> muddatli to'lov </p>{" "}
              </div>
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15.4286 12C15.4286 12.3148 15.2583 12.4282 15.0436 12.6262L9.85718 17.4208C9.6885 17.5882 9.53241 17.7857 9.19427 17.7857C8.9565 17.7857 8.57147 17.6016 8.57147 17.0993C8.57147 16.7879 8.82364 16.6415 9.00004 16.4665L13.8148 12L8.99335 7.52679C8.82467 7.35177 8.56812 7.22211 8.56812 6.85715C8.56812 6.5692 8.79244 6.21429 9.25118 6.21429C9.50421 6.21429 9.73538 6.45201 9.90407 6.61943L15.0436 11.3572C15.2583 11.5626 15.4286 11.6853 15.4286 12Z"
                    fill="#76797F"
                    fill-opacity="0.6"
                  />
                </svg>
              </div>
            </div>
            <div className="buttonlar  gap-x-[95px] py-[24px] flex">
              <button className="btn_bir text-white">Savatga qoʻshish</button>
              <button className="btn_ikki">Tugmani 1 bosishda xarid qilish</button>
          
            </div>
            <div className="haftada mb-[32px]">
                <div className="flex items-center gap-[5px]"><div className="pl-[32px] py-[5px]" ><svg   xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4099 4.5C12.6501 4.5 11.4099 5.88779 11.4099 7.5H17.4099C17.4099 5.88779 16.1697 4.5 14.4099 4.5ZM9.90991 11.5V9H7.90991V14.25C7.90991 14.6642 7.57412 15 7.15991 15C6.74569 15 6.40991 14.6642 6.40991 14.25V8.25V7.5H7.15991H9.90991C9.90991 5.11221 11.7697 3 14.4099 3C17.0501 3 18.9099 5.11221 18.9099 7.5H21.6599H22.4099V8.25V21.75C22.4099 22.9926 21.4025 24 20.1599 24H15.6599C15.2457 24 14.9099 23.6642 14.9099 23.25C14.9099 22.8358 15.2457 22.5 15.6599 22.5H20.1599C20.5741 22.5 20.9099 22.1642 20.9099 21.75V9H18.9099V11.5H17.4099V9H11.4099V11.5H9.90991ZM14.6837 18.0323C14.9766 17.7395 14.9766 17.2646 14.6837 16.9717C14.3908 16.6788 13.9159 16.6788 13.623 16.9717L8.40539 22.1893L6.19026 19.9742C5.89736 19.6813 5.42248 19.6813 5.12958 19.9741C4.83669 20.267 4.83668 20.7419 5.12957 21.0348L7.87504 23.7803C8.0157 23.921 8.20646 24 8.40538 24C8.60429 24 8.79506 23.921 8.93571 23.7803L14.6837 18.0323Z" fill="#141415"/>
</svg> </div><p className="kishi  py-[5px]">Bu haftada 2092 kishi sotib oldi</p></div>
            </div>
            <div className="qoshimcha ">
                <h2>Mahsulot haqida qisqacha:</h2>
                <div className="pl-[19px] gap-2">
                    <p>Och koʻk - TWS i12</p>
                    <p>Shaffof - TWS i11</p>
                    <p>Akkumlyator sig'imi: 250 mAh</p>
                    <p>Turi: Simsiz quloqchinlar TWS</p>
                    <p>Ishlash vaqti: 3 soat</p>
                    <p>Och koʻk - TWS i12</p>
                    <p>Shaffof - TWS i11</p>
                    <p>Akkumlyator sig'imi: 250 mAh</p>
                    <p>Turi: Simsiz quloqchinlar TWS</p>
                    <p>Ishlash vaqti: 3 soat</p>
                </div>
            </div>
            
          </div>
        </div>
        <Tabs value="html">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
      </div>
    </section>
  );
};

export default ProductItem;
