import axios from 'axios'
import { dayPhotoActionTypes } from "./photo-day.types"

export const photoOfTheDayRequestStart = () => ({
    type: dayPhotoActionTypes.GET_PHOTO_OF_THE_DAY_START,
})
export const photoOfTheDayFailureReset = () => ({
    type: dayPhotoActionTypes.GET_PHOTO_OF_THE_DAY_FAILURE,
})

export const photoOfTheDayRequestSuccess = (data) => ({
    type: dayPhotoActionTypes.GET_PHOTO_OF_THE_DAY_SUCCESS,
    payload: data,
})


export function getPhotoOfTheDay() {
    return async (dispatch, getState) => {
        try {
            dispatch(photoOfTheDayRequestStart())
            const photoOfTheDayResponse = await axios.get("https://ujp-sports-hub.herokuapp.com/api/v1/photoOfTheDay", {
            })

            dispatch(photoOfTheDayRequestSuccess(photoOfTheDayResponse.data))

        } catch (error) {
            console.log(error)
            dispatch(photoOfTheDayFailureReset())
        }
    }
}

