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
import { addressObjBuilder, createDetail, detailObjBuilder, generateShop, getAllServices, shopObjBuilder, getAllShops } from '../services/shopservice';
import ShopList1 from '../components/ShopList/ShopList1';

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
    const [shops, setShops] = React.useState(data);
    const [rawShops, setRawShops] = React.useState(data);
    const categories = rawShops.map((item) => item.category);
    const categoryBox = [];

    const [fetchedShops, setFetchedShops] = React.useState([]);

    const [selectedCity, setSelectedCity] = React.useState(0);
    const [isOpenNowOption, setIsOpenNowOption] = React.useState(false);
    const [selectedService, setSelectedService] = React.useState(0);
    const [serviceList, setServiceList] = React.useState([]);

    useEffect(() => {

        console.log(localStorage.getItem('user'))

        getAllServices().then((response) => {
            setServiceList(response);
        })

        getAllShops().then((response) => {
            setFetchedShops(response);
        })

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
                <option value="0">Select a City</option>
                <option value="1">Adana</option>
                <option value="2">Adıyaman</option>
                <option value="3">Afyonkarahisar</option>
                <option value="4">Ağrı</option>
                <option value="5">Amasya</option>
                <option value="6">Ankara</option>
                <option value="7">Antalya</option>
                <option value="8">Artvin</option>
                <option value="9">Aydın</option>
                <option value="10">Balıkesir</option>
                <option value="11">Bilecik</option>
                <option value="12">Bingöl</option>
                <option value="13">Bitlis</option>
                <option value="14">Bolu</option>
                <option value="15">Burdur</option>
                <option value="16">Bursa</option>
                <option value="17">Çanakkale</option>
                <option value="18">Çankırı</option>
                <option value="19">Çorum</option>
                <option value="20">Denizli</option>
                <option value="21">Diyarbakır</option>
                <option value="22">Edirne</option>
                <option value="23">Elazığ</option>
                <option value="24">Erzincan</option>
                <option value="25">Erzurum</option>
                <option value="26">Eskişehir</option>
                <option value="27">Gaziantep</option>
                <option value="28">Giresun</option>
                <option value="29">Gümüşhane</option>
                <option value="30">Hakkâri</option>
                <option value="31">Hatay</option>
                <option value="32">Isparta</option>
                <option value="33">Mersin</option>
                <option value="34">İstanbul</option>
                <option value="35">İzmir</option>
                <option value="36">Kars</option>
                <option value="37">Kastamonu</option>
                <option value="38">Kayseri</option>
                <option value="39">Kırklareli</option>
                <option value="40">Kırşehir</option>
                <option value="41">Kocaeli</option>
                <option value="42">Konya</option>
                <option value="43">Kütahya</option>
                <option value="44">Malatya</option>
                <option value="45">Manisa</option>
                <option value="46">Kahramanmaraş</option>
                <option value="47">Mardin</option>
                <option value="48">Muğla</option>
                <option value="49">Muş</option>
                <option value="50">Nevşehir</option>
                <option value="51">Niğde</option>
                <option value="52">Ordu</option>
                <option value="53">Rize</option>
                <option value="54">Sakarya</option>
                <option value="55">Samsun</option>
                <option value="56">Siirt</option>
                <option value="57">Sinop</option>
                <option value="58">Sivas</option>
                <option value="59">Tekirdağ</option>
                <option value="60">Tokat</option>
                <option value="61">Trabzon</option>
                <option value="62">Tunceli</option>
                <option value="63">Şanlıurfa</option>
                <option value="64">Uşak</option>
                <option value="65">Van</option>
                <option value="66">Yozgat</option>
                <option value="67">Zonguldak</option>
                <option value="68">Aksaray</option>
                <option value="69">Bayburt</option>
                <option value="70">Karaman</option>
                <option value="71">Kırıkkale</option>
                <option value="72">Batman</option>
                <option value="73">Şırnak</option>
                <option value="74">Bartın</option>
                <option value="75">Ardahan</option>
                <option value="76">Iğdır</option>
                <option value="77">Yalova</option>
                <option value="78">Karabük</option>
                <option value="79">Kilis</option>
                <option value="80">Osmaniye</option>
                <option value="81">Düzce</option>
            </select>
        );
    };

    const serviceSelector = () => {
        var serviceOptions = []

        for (var i = 0; i < serviceList.length; i++) {
            serviceOptions.push(
                <option value={serviceList[i].serviceId}>{serviceList[i].name}</option>
            );
        }

        return (
            <select
                name="Servis"
                onChange={e => {
                    setSelectedService(e.target.value);
                }}
            >
                <option value={"0"}>Select a service</option>
                {serviceOptions}
            </select>
        );
    };

    const notify = () => {
        toast(selectedCity + " " + selectedService + " " + isOpenNowOption);
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
                        <span className="filterbox_label">Open Now?</span>
                        <input
                            type={"checkbox"}
                            onChange={e => {
                                setIsOpenNowOption(isOpenNowOption ? false : true)
                            }}
                        ></input>
                    </div>

                    <div className="filterbox_item">
                        <button
                            onClick={() => {
                                notify();
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
                    setShops(rawShops.filter((item) => item.category == category));
                }}
            >
                {category}
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
                <ShopList1 shops={fetchedShops} rawShops={fetchedShops} />
            </div>
        </div>

    )
}

export default Home
