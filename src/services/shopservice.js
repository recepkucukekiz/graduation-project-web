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

export const customerObjbuilder = (name, surname, email, phone) => {
    return {
        name: name,
        surname: surname,
        email: email,
        phone: phone,
    }
}

export const appointmentObjBuilder = (startTime, finishTime, date, customerId, workerId) => {
    return {
        startTime: startTime,
        finishTime: finishTime,
        date: date.toDateString(),
        customerId: customerId,
        workerId:workerId,
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

export const getShopById = async (shopId) => {
    return await fetch(`${API_URL}/shop/${shopId}`, {
        method: "GET",
    }).then((response) => {
        return response.json()
    })
}

export const getAllShops = () => {
    return fetch(`${API_URL}/shop/`, {
        method: "GET",
    }).then((response) => {
        return response.json()
    })
}

export const updateShop = async (shopId, shop) => {
    return await fetch(`${API_URL}/shop/` + shopId, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(shop),
    }).then((response) => {
        return response.json()
    })
}

// Worker Functions
export const getByShopId = (shopId) => {
    return fetch(`${API_URL}/worker/getByShop/${shopId}`, {
        method: "GET",
    }).then((response) => {
        return response.json()
    })
}

export const getWorkerById = async (workerId) => {
    return await fetch(`${API_URL}/worker/${workerId}`, {
        method: "GET",
    }).then((response) => {
        return response.json()
    })
}

export const updateWorker = async (workerId, worker) => {
    return await fetch(`${API_URL}/worker/` + workerId, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(worker),
    }).then((response) => {
        return response.json()
    })
}

export const deleteWorker = async (workerId) => {
    return await fetch(`${API_URL}/worker/` + workerId, {
        method: "DELETE",
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
    return fetch(`${API_URL}/service/`, {
        method: "GET",
    }).then((response) => {
        return response.json()
    })
}

export const getServiceByShopId = (shopId) => {
    return fetch(`${API_URL}/service/getByShop/${shopId}`, {
        method: "GET",
    }).then((response) => {
        return response.json()
    })
}

// Customer Functions

export const createCustomer = (customer) => {
    return fetch(`${API_URL}/customer/create`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
    }).then((response) => {
        return response.json()
    })
}

// Appointment Functions
export const createAppointment = (appointment) => {
    return fetch(`${API_URL}/appointment/create`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
    }).then((response) => {
        return response.json()
    })
}

export const getByWorkerId = (workerId) => {
    return fetch(`${API_URL}/appointment/getByWorkerId/${workerId}`, {
        method: "GET",
    }).then((response) => {
        return response.json()
    })
}

// User Functions
export const login = (username, password) => {
    return fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
    }).then((response) => {
        return response.json()
    })
}

// Category Functions
export const getAllCategories = () => {
    return fetch(`${API_URL}/category/`, {
        method: "GET",
    }).then((response) => {
        return response.json()
    })
}
