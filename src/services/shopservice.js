import { API_URL } from '../config'

// Builders
export const addressObjBuilder = (address, city, district, province) => {
    return {
        address: address,
        city: city,
        district: district,
        province: province,
    }
}

export const detailObjBuilder = (category, description, phone) => {
    return {
        category: category,
        description: description,
        phone: phone,
    }
}

export const shopObjBuilder = (detailId, addressId, url, name, email, pwd, serviceList) => {
    return {
        detailId: detailId,
        addressId: addressId,
        url: url,
        name: name,
        email: email,
        pwd: pwd,
        serviceList:[]
    }
}

// Complex Functions
export const generateShop = async (detail, address, shop) => {
    var detailId = 0;
    var addressId = 0;

    await createDetail(detail).then((response) => {
        detailId = response.detailId;
        console.log(response)
    })

    await createAddress(address).then((response) => {
        addressId = response.addressId;
        console.log(response)
    })

    shop.detailId = detailId;
    shop.addressId = addressId;

    console.log(shop)
    return createShop(shop).then((response) => {
        return response;
    })
}

// Shop Functions
export const createShop = (shop) => {
    return fetch(`${API_URL}/shop`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(shop),
    }).then((response) => {
        return response.json()
    })
}

export const getAllShops = () => {
    return fetch(`${API_URL}/shop/getAll`, {
        method: "GET",
    }).then((response) => {
        return response.json()
    })
}

// Address Functions
export const createAddress = (address) => {
    return fetch(`${API_URL}/address`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
    }).then((response) => {
        return response.json()
    })
}

// Detail Functions
export const createDetail = (detail) => {
    return fetch(`${API_URL}/detail`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(detail),
    }).then((response) => {
        return response.json()
    })
}

export const getDetailByShopId = (shopId) => {
    return fetch(`${API_URL}/detail/${shopId}`, {
        method: "GET",
    }).then((response) => {
        return response.json()
    })
}

// Service Functions
export const getAllServices = () => {
    return fetch(`${API_URL}/service/getAll`, {
        method: "GET",
    }).then((response) => {
        return response.json()
    })
}
