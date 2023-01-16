import React, { useEffect } from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Categories from '../components/Categories/Categories';
import 'bootstrap/dist/css/bootstrap.css';
import ShopList from '../components/ShopList/ShopList';
import FilterBox from '../components/FilterBox/FilterBox';
import data from '../const';
import './home.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addressObjBuilder, createDetail, detailObjBuilder, generateShop, getAllServices, shopObjBuilder, getAllShops, getAllCategories } from '../services/shopservice';


const CustomLink = ({ to, pageName }) => {
    const resolved = useResolvedPath(to);
    const isActive = useMatch({ path: resolved.pathname, end: true });
    return (
        <li className={`item ${isActive ? "active" : ""}`}>
            <Link to={to}>{pageName}</Link>
        </li>
    );
};

const Home = () => {
    const [shops, setShops] = React.useState([]);
    const [rawShops, setRawShops] = React.useState([]);
    const categoryBox = [];

    const [selectedCity, setSelectedCity] = React.useState("0");
    const [isOpenNowOption, setIsOpenNowOption] = React.useState(false);
    const [selectedService, setSelectedService] = React.useState("0");
    const [serviceList, setServiceList] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

    useEffect(() => {

        console.log(localStorage.getItem('user'))

        getAllServices().then((response) => {
            setServiceList(response);
            console.log(response);
        })

        getAllCategories().then((response) => {
            setCategories(response);
            console.log(response);
        })

        getAllShops().then((response) => {
            setShops(response);
            setRawShops(response);
            console.log(response);
        })
        console.log(categories)

        // var newDetail = detailObjBuilder("masaj", "mutlu son", "531 123 45 67")
        // var newAddress = addressObjBuilder("80026 sk.", "İstanbul", "Beyoğlu", "Türkiye")
        // var newShop = shopObjBuilder(0,0,"www.google.com","google","abc@gmail.com", "123",[])
        // generateShop(newDetail, newAddress, newShop).then((response) => {
        //     console.log(response);
        // })

    }, []);


    const citySelector = () => {
        return (
            <select
                name="Sehir"
                onChange={(e) => {
                    setSelectedCity(e.target.value);
                }
                }
            >
                <option value="0">All</option>
                <option value="İstanbul">İstanbul</option>
                <option value="Ankara">Ankara</option>
                <option value="İzmir">İzmir</option>
                <option value="Adana">Adana</option>
                <option value="Adıyaman">Adıyaman</option>
                <option value="Afyonkarahisar">Afyonkarahisar</option>
                <option value="Ağrı">Ağrı</option>
                <option value="Aksaray">Aksaray</option>
                <option value="Amasya">Amasya</option>
                <option value="Antalya">Antalya</option>
                <option value="Ardahan">Ardahan</option>
                <option value="Artvin">Artvin</option>
                <option value="Aydın">Aydın</option>
                <option value="Balıkesir">Balıkesir</option>
                <option value="Bartın">Bartın</option>
                <option value="Batman">Batman</option>
                <option value="Bayburt">Bayburt</option>
                <option value="Bilecik">Bilecik</option>
                <option value="Bingöl">Bingöl</option>
                <option value="Bitlis">Bitlis</option>
                <option value="Bolu">Bolu</option>
                <option value="Burdur">Burdur</option>
                <option value="Bursa">Bursa</option>
                <option value="Çanakkale">Çanakkale</option>
                <option value="Çankırı">Çankırı</option>
                <option value="Çorum">Çorum</option>
                <option value="Denizli">Denizli</option>
                <option value="Diyarbakır">Diyarbakır</option>
                <option value="Düzce">Düzce</option>
                <option value="Edirne">Edirne</option>
                <option value="Elazığ">Elazığ</option>
                <option value="Erzincan">Erzincan</option>
                <option value="Erzurum">Erzurum</option>
                <option value="Eskişehir">Eskişehir</option>
                <option value="Gaziantep">Gaziantep</option>
                <option value="Giresun">Giresun</option>
                <option value="Gümüşhane">Gümüşhane</option>
                <option value="Hakkâri">Hakkâri</option>
                <option value="Hatay">Hatay</option>
                <option value="Iğdır">Iğdır</option>
                <option value="Isparta">Isparta</option>
                <option value="Kahramanmaraş">Kahramanmaraş</option>
                <option value="Karabük">Karabük</option>
                <option value="Karaman">Karaman</option>
                <option value="Kars">Kars</option>
                <option value="Kastamonu">Kastamonu</option>
                <option value="Kayseri">Kayseri</option>
                <option value="Kırıkkale">Kırıkkale</option>
                <option value="Kırklareli">Kırklareli</option>
                <option value="Kırşehir">Kırşehir</option>
                <option value="Kilis">Kilis</option>
                <option value="Kocaeli">Kocaeli</option>
                <option value="Konya">Konya</option>
                <option value="Kütahya">Kütahya</option>
                <option value="Malatya">Malatya</option>
                <option value="Manisa">Manisa</option>
                <option value="Mardin">Mardin</option>
                <option value="Mersin">Mersin</option>
                <option value="Muğla">Muğla</option>
                <option value="Muş">Muş</option>
                <option value="Nevşehir">Nevşehir</option>
                <option value="Niğde">Niğde</option>
                <option value="Ordu">Ordu</option>
                <option value="Osmaniye">Osmaniye</option>
                <option value="Rize">Rize</option>
                <option value="Sakarya">Sakarya</option>
                <option value="Samsun">Samsun</option>
                <option value="Siirt">Siirt</option>
                <option value="Sinop">Sinop</option>
                <option value="Sivas">Sivas</option>
                <option value="Şırnak">Şırnak</option>
                <option value="Tekirdağ">Tekirdağ</option>
                <option value="Tokat">Tokat</option>
                <option value="Trabzon">Trabzon</option>
                <option value="Tunceli">Tunceli</option>
                <option value="Şanlıurfa">Şanlıurfa</option>
                <option value="Uşak">Uşak</option>
                <option value="Van">Van</option>
                <option value="Yalova">Yalova</option>
                <option value="Yozgat">Yozgat</option>
                <option value="Zonguldak">Zonguldak</option>
            </select>
        );
    };

    const serviceSelector = () => {
        var serviceOptions = []

        for (var i = 0; i < serviceList.length; i++) {
            serviceOptions.push(
                <option value={serviceList[i].id}>{serviceList[i].name}</option>
            );
        }

        return (
            <select
                name="Servis"
                onChange={e => {
                    setSelectedService(e.target.value);
                }}
            >
                <option value="0">All</option>
                {serviceOptions}
            </select>
        );
    };

    const notify = () => {
        toast(selectedCity + " " + selectedService);
        console.log(shops);
    };

    const filterboxView = () => {
        return (
            <>
                <div className="app__filterbox">
                    <div className="filterbox_item">
                        <span className="filterbox_label">City:</span>
                        {citySelector()}
                    </div>

                    <div className="filterbox_item">
                        <span className="filterbox_label">Service:</span>
                        {serviceSelector()}
                    </div>

                    <div className="filterbox_item">
                        <button
                            onClick={() => {
                                console.log(selectedCity + " " + selectedService);
                                if (selectedCity !== "0" && selectedService === "0") {
                                    setShops(rawShops.filter((item) => item.city.toLowerCase() === selectedCity.toLowerCase()));
                                } else if (selectedService !== "0" && selectedCity === "0") {
                                    setShops(rawShops.filter((item) => item.services.includes(selectedService)));
                                } else if (selectedService !== "0" && selectedCity !== "0") {
                                    setShops(rawShops.filter((item) => item.city.toLowerCase() === selectedCity.toLowerCase() && item.services.includes(selectedService)));
                                } else {
                                    setShops(rawShops);
                                }
                            }}
                        >Apply</button>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    };

    categories.forEach((category) => {
        categoryBox.push(
            <div
                className="category_item"
                onClick={() => {
                    setShops(rawShops.filter((item) => item.category === category.id));
                }}
            >
                {category.name}
            </div>
        )
    })

    return (

        <div className='row'>
            <div className='col-lg-3'>
                <div className="app__categories">
                    <button
                        className="category_item"
                        onClick={() => {
                            setShops(rawShops);
                        }}
                    > All </button>
                    {categoryBox}
                </div>
            </div>
            <div className='col-lg-9'>
                {/* <CustomLink to="/projects" pageName="Projects" /> */}
                {/* <FilterBox shops={shops} /> */}
                {filterboxView()}
                <ShopList shops={shops} rawShops={rawShops} />
            </div>
        </div>

    )
}

export default Home
