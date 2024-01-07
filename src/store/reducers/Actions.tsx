import {AppDispatch} from "../store.tsx";
import axios from "axios";
import {
    IAuthResponse,
    ICargoResponse,
    ICargoWithDraft,
    IDeleteCargofromOrder,
    IOrderResponse, IRegisterResponse,
    IRequest,
    IOrder,
    mock_data,
    CargoItem
} from "../../models/data.ts";
import Cookies from 'js-cookie';
import {cargoSlice} from "./CargoSlice.tsx"
import {orderSlice} from "./OrderSlice.tsx";
import {userSlice} from "./UserSlice.tsx";


const base_url = '/api'// 'http://localhost:8000'

export const fetchCargo = (searchValue?: string) => async (dispatch: AppDispatch) => {
    const accessToken = Cookies.get('session_key')
    const isModer = Cookies.get('is_moderator')
    if (isModer=='true') {
        dispatch(userSlice.actions.setIsModer(true))
    }
    dispatch(userSlice.actions.setAuthStatus(accessToken != null && accessToken != ""));

    try {
        dispatch(cargoSlice.actions.all_cargoFetching())
        const response = await axios.get<ICargoWithDraft>( '/api/cargo', {
            
            params: {
                search: searchValue || '',
            },
           
        });
        // console.log('draftId: ',response.data.id_order_draft)
        dispatch(cargoSlice.actions.all_cargoFetched(response.data.data))
        dispatch(orderSlice.actions.OrderDraftIdFetched(response.data.id_order_draft))
    } catch (e) {
        dispatch(cargoSlice.actions.all_cargoFetchedError(`Ошибка: ${e}`))
        dispatch(cargoSlice.actions.all_cargoFetched(filterMockData(searchValue)))
    }
}

export const fetchExactCargo = (
    cargoId: string,



    setPage: (name: string, id: number) => void
) => async (dispatch: AppDispatch) => {
    try {
        dispatch(cargoSlice.actions.cargoFetching())
        // console.log('exactcargo')
        const response = await axios.get<ICargoResponse>(base_url + `/cargo/${cargoId}`)
        // console.log(response)
        const cargo = response.data
        // console.log(cargo)
        setPage(cargo.title ?? "Без названия", cargo.pk)
        dispatch(cargoSlice.actions.cargoFetched(cargo))
    } catch (e) {
        console.log(`Ошибка загрузки списка грузов: ${e}`)
        

        const finalID = cargoId !== undefined ? parseInt(cargoId, 10) - 1 : 0;
        // console.log(previewID)
        let mock_cargo = null
        mock_data.forEach(element => {
            if(element.pk = finalID) {
                mock_cargo = element
            }
        });
        

        setPage(mock_cargo.title ?? "Без названия", mock_cargo.pk)
        dispatch(cargoSlice.actions.cargoFetched(mock_cargo))
    }
}

export const CreateCargo = (
    cargoTitle: string,
    cargoWeight: number,
    cargoDescription: string | null,
    cargoImage: string | null,) => async (dispatch: AppDispatch) => {

    const accessToken = Cookies.get('session_key')
    const isModer = Cookies.get('is_moderator')
    if (isModer=='true') {
        dispatch(userSlice.actions.setIsModer(true))
    }
    dispatch(userSlice.actions.setAuthStatus(accessToken != null && accessToken != ""));

    const config = {
        method: "post",
        url: `/api/cargo/new/`,
        headers: {
            Cookies: `session_key=${accessToken}`,
        },
        data: {
            'title' : cargoTitle,
            'weight' : cargoWeight,
            'description' : cargoDescription,
            "image_binary" : cargoImage
        }
    }
    try {
        dispatch(cargoSlice.actions.all_cargoFetching())
        const response = await axios(config);
        const errorText = response.data.description ?? ""
        const successText = errorText || `Заявка создана`
        dispatch(cargoSlice.actions.all_cargoFetched())
        if (successText != "") {
            dispatch(fetchCargo())
            alert(" Груз создан!")
        }
    } catch (e) {
        // dispatch(cargoSlice.actions.all_cargoFetchedError(`Ошибка: ${e}`))
    //    alert("Груз с таким названием уже существует!")
    }
}

export const DeleteCargo = (idCargo :number)=> async (dispatch: AppDispatch) => {
    const accessToken = Cookies.get('session_key')
    const isModer = Cookies.get('is_moderator')
    if (isModer=='true') {
        dispatch(userSlice.actions.setIsModer(true))
    }
    dispatch(userSlice.actions.setAuthStatus(accessToken != null && accessToken != ""));

    const config = {
        method: "delete",
        url: `/api/cargo/${idCargo}/delete/`,
        headers: {
            Cookies: `session_key=${accessToken}`,
        },
        
    }
    try {
        dispatch(cargoSlice.actions.all_cargoFetching())
        const response = await axios(config);
        const errorText = response.data.description ?? ""
        const successText = errorText || `Заявка создана`
        dispatch(cargoSlice.actions.all_cargoFetched())
        if (successText != "") {
            dispatch(fetchCargo())
        }
    } catch (e) {
        dispatch(cargoSlice.actions.all_cargoFetchedError(`Ошибка: ${e}`))
        dispatch(cargoSlice.actions.all_cargoFetched(filterMockData()))
    }
}

export const UpdateCargo = (idCargo :number)=> async (dispatch: AppDispatch) => {
    const accessToken = Cookies.get('session_key')
    const isModer = Cookies.get('is_moderator')
    if (isModer=='true') {
        dispatch(userSlice.actions.setIsModer(true))
    }
    dispatch(userSlice.actions.setAuthStatus(accessToken != null && accessToken != ""));

    const config = {
        method: "put",
        url: `/api/cargo/${idCargo}/edit/`,
        headers: {
            Cookies: `session_key=${accessToken}`,
        },
        
    }
    try {
        dispatch(cargoSlice.actions.all_cargoFetching())
        const response = await axios(config);
        const errorText = response.data.description ?? ""
        const successText = errorText || `Заявка создана`
        dispatch(cargoSlice.actions.all_cargoFetched())
        if (successText != "") {
            dispatch(fetchCargo())
        }
    } catch (e) {
        dispatch(cargoSlice.actions.all_cargoFetchedError(`Ошибка: ${e}`))
        dispatch(cargoSlice.actions.all_cargoFetched(filterMockData()))
    }
}
export const addCargoIntoOrder = (cargoId: number) => async (dispatch: AppDispatch) => {
    const accessToken = Cookies.get('session_key');
    const config = {
        method: "post",
        url: base_url + `/cargo/${cargoId}/add/`,
        headers: {
            Cookies: `session_key=${accessToken}`,
        },
     
    }

    try {
        // dispatch(cargoSlice.actions.all_cargoLoading())
        dispatch(cargoSlice.actions.all_cargoFetching())
        const response = await axios(config);
        const errorText = response.data.description ?? ""
        const successText = errorText || `Груз c id_cargo="${cargoId}" добавлен`
        dispatch(cargoSlice.actions.cargoAddedIntoOrder([errorText, successText]));
        // dispatch(cargoSlice.actions.all_cargoLoaded())
        setTimeout(() => {
            dispatch(cargoSlice.actions.cargoAddedIntoOrder(['', '']));
        }, 6000);

        dispatch(fetchCargo())
    } catch (e) {
        dispatch(cargoSlice.actions.all_cargoFetchedError(`${e}`))
    }
}

export const deleteOrder = (id_order: number) => async (dispatch: AppDispatch) => {
    const accessToken = Cookies.get('session_key');

    const config = {
        method: "delete",
        url: base_url +  `/order/${id_order}/delete/`,
        headers: {
            Cookies: `session_key=${accessToken}`,
        }
    }
    try {
        dispatch(orderSlice.actions.ordersFetching())
        const response = await axios(config);
        const errorText = response.data.description ?? ""
        const successText = errorText || `Заявка удалена`
        dispatch(orderSlice.actions.ordersUpdated([errorText, successText]));
        if (successText != "") {
            dispatch(fetchOrders())
        }
        setTimeout(() => {
            dispatch(orderSlice.actions.ordersUpdated(['', '']));
        }, 6000);
    } catch (e) {
        dispatch(orderSlice.actions.ordersDeleteError(`${e}`))
    }
}
export const DeleteCargoFromOrder = (cargoId: number, id_draft : number) => async (dispatch: AppDispatch) => {
    const accessToken = Cookies.get('session_key');
    const config = {
        method: "delete",
        url: `/api/update_order/${cargoId}/delete/`,
        headers: {
            Cookies: `session_key=${accessToken}`,
        },
        
    }

    try {
        // dispatch(orderSlice.actions.ordersFetching())
        dispatch(cargoSlice.actions.all_cargoFetching())
        const response = await axios(config);
        const errorText = response.data.description ?? ""
        const successText = errorText || `Груз c id_cargo="${cargoId}" удален`
        dispatch(cargoSlice.actions.cargoAddedIntoOrder([errorText, successText]));
        // dispatch(orderSlice.actions.ordersLoaded())

        // dispatch(fetchDraftOrder(id_order_draft));
        // console.log('orderdraft after deleted cargo', response)

        dispatch(fetchDraftOrder(id_draft))

    } catch (e) {
        // dispatch(cargoSlice.actions.all_cargoFetchedError(`${e}`))
    }
}

export const makeOrder= (IdOrder : number) => async (dispatch: AppDispatch) => {
    const accessToken = Cookies.get('session_key');
    const isModer = Cookies.get('is_moderator')
        if (isModer=='true') {
            dispatch(userSlice.actions.setIsModer(true))
        }
    const config = {
        method: "put",
        url: `/api/update_status/${IdOrder}/set_user_status/`,
        headers: {
            Cookies: `session_key=${accessToken}`,
        },
        data : {
            "status" : 'в работе'
        }
        
    }
    try {
        dispatch(orderSlice.actions.ordersFetching())
        const response = await axios(config);
        const errorText = response.data.description ?? ""
        const successText = errorText || `Заявка создана`
        dispatch(orderSlice.actions.ordersUpdated([errorText, successText]));
        if (successText != "") {
            dispatch(fetchOrders())
        }
        // setTimeout(() => {
        //     dispatch(orderSlice.actions.ordersUpdated(['', '']));
        // }, 6000);
        dispatch(orderSlice.actions.OrderDraftIdFetched(null));
        dispatch(orderSlice.actions.DataOrderDraftFetched(null));
    } catch (e) {
        dispatch(orderSlice.actions.ordersDeleteError(`${e}`))
    }
}
export const ApproveOrder = (IdOrder : number) => async (dispatch: AppDispatch) => {
    const accessToken = Cookies.get('session_key');
    const isModer = Cookies.get('is_moderator')
        if (isModer=='true') {
            dispatch(userSlice.actions.setIsModer(true))
        }
    const config = {
        method: "put",
        url: `/api/update_status/${IdOrder}/set_moderator_status/`,
        headers: {
            Cookies: `session_key=${accessToken}`,
        },
        data : {
            "status" : 'завершён'
        }
        
    }
    try {
        dispatch(orderSlice.actions.ordersFetching())
        const response = await axios(config);
        const errorText = response.data.description ?? ""
        const successText = errorText || `Заявка завершена`
        dispatch(orderSlice.actions.ordersUpdated([errorText, successText]));
        if (successText != "") {
            dispatch(fetchOrders())
        }
        
    } catch (e) {
        dispatch(orderSlice.actions.ordersDeleteError(`${e}`))
    }
}
export const CancelOrder = (IdOrder : number) => async (dispatch: AppDispatch) => {
    const accessToken = Cookies.get('session_key');
    const isModer = Cookies.get('is_moderator')
        if (isModer=='true') {
            dispatch(userSlice.actions.setIsModer(true))
        }
    const config = {
        method: "put",
        url: `/api/update_status/${IdOrder}/set_moderator_status/`,
        headers: {
            Cookies: `session_key=${accessToken}`,
        },
        data : {
            "status" : 'отменён'
        }
        
    }
    try {
        dispatch(orderSlice.actions.ordersFetching())
        const response = await axios(config);
        const errorText = response.data.description ?? ""
        const successText = errorText || `Заявка отменена`
        dispatch(orderSlice.actions.ordersUpdated([errorText, successText]));
        if (successText != "") {
            dispatch(fetchOrders())
        }
        
        
    } catch (e) {
        dispatch(orderSlice.actions.ordersDeleteError(`${e}`))
    }
}
export const fetchOrders = (new_status:string | null, date_start: string | null, date_finish: string | null) => async (dispatch: AppDispatch) => {
    const accessToken = Cookies.get('session_key');
    const isModer = Cookies.get('is_moderator');

    if (isModer === 'true') {
        dispatch(userSlice.actions.setIsModer(true));
    }

    dispatch(userSlice.actions.setAuthStatus(accessToken != null && accessToken !== ""));
    const date_filter = `date_create=${date_start}&date_finished=${date_finish}`;

    let url = base_url+"/orders?" ;
    if ((date_start !== null && date_start !== undefined && date_start!=='') || (date_finish !== null && date_finish !== undefined && date_finish!=='')) {
        url += date_filter;
    } 
    else if (new_status !== null && new_status !== undefined && new_status!=='') {
        url +=`order_status=${new_status}`;
    }
    else{
        url = base_url + "/orders";
    }

    try {
        dispatch(orderSlice.actions.ordersFetching());
        const response = await axios.get<IOrderResponse>(url, {
            headers: {
                Cookies: `session_key=${accessToken}`,
            }
        });

        const transformedResponse: IRequest = {
            orders: response.data,
            status: response.status
        };

        dispatch(orderSlice.actions.ordersFetched(transformedResponse));
    } catch (e) {
        dispatch(orderSlice.actions.ordersFetchedError(`${e}`));
    }
}


export const fetchDraftOrder = (id_order_draft: number ) => async (dispatch: AppDispatch) => {

    const accessToken = Cookies.get('session_key');
    dispatch(userSlice.actions.setAuthStatus(accessToken != null && accessToken != ""));
    try {
        

        const response = await axios.get<IOrder>(base_url + `/order/${id_order_draft}`, {
            headers: {
                Cookies: `session_key=${accessToken}`,
            }
        });
        
        
        // console.log(response.data)
        
        dispatch(orderSlice.actions.DataOrderDraftFetched(response.data))
        
    } catch (e) {
        console.log(e)
    }
    
}

export const deleteOrderById = (id_order: number) => async (dispatch: AppDispatch) => {
    const accessToken = Cookies.get('session_key');

    try {
        dispatch(orderSlice.actions.ordersFetching())
        const response = await axios.delete<IDeleteCargofromOrder>(base_url + `/order/${id_order}/delete/`, {
            headers: {
                Cookies: `session_key=${accessToken}`,
            },
            
        });
        dispatch(orderSlice.actions.ordersDeleteSuccess(response.data))
        
    } catch (e) {
        dispatch(orderSlice.actions.ordersFetchedError(`${e}`))
    }
}

// export const updateOrder = (
//     id: number,
//     description: string,
//     hikeName: string,
//     startDate: string,
//     endDate: string,
//     leader: string
// ) => async (dispatch: AppDispatch) => {
//     const accessToken = Cookies.get('session_key');
//     const config = {
//         method: "put",
//         url: "/api/v3/hikes",
//         headers: {
//             Cookies: `session_key=${accessToken}`,
//             ContentType: "application/json"
//         },
//         data: {
//             description: description,
//             hike_name: hikeName,
//             date_start_hike: convertInputFormatToServerDate(startDate),
//             date_end: convertInputFormatToServerDate(endDate),
//             leader: leader,
//             id: id,
//         }
//     };

//     try {
//         const response = await axios(config);
//         const errorText = response.data.description ?? ""
//         const successText = errorText || "Успешно обновленно"
//         dispatch(orderSlice.actions.ordersUpdated([errorText, successText]));
//         setTimeout(() => {
//             dispatch(orderSlice.actions.ordersUpdated(['', '']));
//         }, 5000);
//     } catch (e) {
//         dispatch(orderSlice.actions.ordersFetchedError(`${e}`));
//     }
// }


export const registerSession = (f_name : string,l_name :string,login: string, password: string) => async (dispatch: AppDispatch) => {
    const config = {
        method: "post",
        url: base_url + "/users/registration/",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            first_name: f_name,
            last_name : l_name,
            "email": login,
            "passwd": password,
        }
    };

    try {
        dispatch(userSlice.actions.startProcess())
        const response = await axios<IRegisterResponse>(config);
        const errorText = response.data.login == '' ? 'Ошибка регистрации' : ''
        const successText = errorText || "Регистрация прошла успешно"
        dispatch(userSlice.actions.setStatuses([errorText, successText]))
        setTimeout(() => {
            dispatch(userSlice.actions.resetStatuses());
        }, 6000)
    } catch (e) {
        dispatch(userSlice.actions.setError(`${e}`));
    }
}

export const logoutSession = () => async (dispatch: AppDispatch) => {
    const accessToken = Cookies.get('session_key');

    const config = {
        method: "get",
        url: base_url +  "/users/logout",
        headers: {
            Cookies: `session_key=${accessToken}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        dispatch(userSlice.actions.startProcess())
        const response = await axios(config);
        const errorText = response.data.login == '' ? 'Ошибка регистрации' : ''
        const successText = errorText || "Выход из аккаунта"
        dispatch(userSlice.actions.setStatuses([errorText, successText]))
        Cookies.set('is_moderator', `false`);
        dispatch(userSlice.actions.setIsModer(false));
        if (errorText == '') {
            Cookies.remove('session_key');
            dispatch(userSlice.actions.setAuthStatus(false))
        }
        setTimeout(() => {
            dispatch(userSlice.actions.resetStatuses());
        }, 6000)
    } catch (e) {
        dispatch(userSlice.actions.setError(`${e}`));
    }
}


export const loginSession = (login: string, password: string) => async (dispatch: AppDispatch) => {
    
    const config = {
        method: "post",
        url: base_url + "/users/login/",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            'email': login,
            "passwd": password,
        }
    };
    
    try {
        dispatch(userSlice.actions.startProcess())
        const response = await axios<IAuthResponse>(config);

        

        const errorText = response.data.description ?? ""
        const successText = errorText || "Авторизация прошла успешна"
        dispatch(userSlice.actions.setStatuses([errorText, successText]));
        const session_key = response.data.access_token
        // console.log('moderator?', response.data.access_token)
        // console.log(session_key)
        if (session_key) {
            
            // console.log(Cookies.get("session_key"))
            Cookies.set('session_key', session_key);
            dispatch(userSlice.actions.setAuthStatus(true));
            
        }
        // console.log(response.data.is_moderator)
        Cookies.set('is_moderator', `${response.data.is_moderator}`);
        const isModer = Cookies.get('is_moderator')
        if (isModer=='true') {
            dispatch(userSlice.actions.setIsModer(true))
        }
        setTimeout(() => {
            dispatch(userSlice.actions.resetStatuses());
        }, 6000);
        
    } catch (e) {
        dispatch(userSlice.actions.setError(`${e}`));
    }
}

// MARK: - Mock data

function filterMockData(searchValue?: string) {
    if (searchValue) {
        const filteredCities = mock_data.filter(cargo =>
            cargo.title?.toLowerCase().includes((searchValue ?? '').toLowerCase())
        );
        if (filteredCities.length === 0) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.getElementById('search-text-field').value = ""
            alert("Ничего не найдено")

        }
        return filteredCities
    }
    return mock_data
}

export function DateFormat(dateString: string) {
    if (dateString == "0001-01-01T00:00:00Z") {
        return "Дата не указана"
    }
    const date = new Date(dateString);
    return `${date.getDate()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`
}

export function emptyString(text: string, emptyText: string) {
    return text == "" ? emptyText : text
}

export const convertServerDateToInputFormat = (serverDate: string) => {
    const dateObject = new Date(serverDate);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};

