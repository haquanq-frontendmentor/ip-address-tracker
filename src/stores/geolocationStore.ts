import { defineStore } from "pinia";
import { ref } from "vue";
import { getGeolocationByIPAddress, type GeolocationQuery } from "../services/getGeolocationByIPAddress";

const isValidDomainName = (value: string) => {
    const regex = /^(?=.{1,253}$)(?!-)([a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,63}$/;
    return regex.test(value);
};

const isValidIPV4 = (value: string) => {
    /// test for IPV4 format, not reserved ranges
    const regex =
        /^(?!(0|10|127|169\.254|172\.(1[6-9]|2\d|3[0-1])|192\.168|224|255))((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.|$)){4}$/;
    return regex.test(value);
};

export const useGeolocationStore = defineStore("geolocation", () => {
    const address = ref<string>("");
    const isError = ref<boolean>(false);
    const errorMessage = ref<string>("");

    const geolocation = ref<GeolocationQuery | null>(null);

    const findGeolocation = (ipAddress?: string) => {
        reset();

        const value = ipAddress || address.value;

        const invalidDomainName = !isValidDomainName(value);
        const invalidIPV4 = !isValidIPV4(value);

        if (invalidDomainName && invalidIPV4) {
            errorMessage.value = "Please provide a valid domain or IP address";
            isError.value = true;
        }

        if (!isError.value) {
            getGeolocationByIPAddress(value)
                .then((data) => {
                    if (data.status === "success") {
                        geolocation.value = data;
                    } else {
                        isError.value = true;
                        errorMessage.value = data.message;
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    const setAddress = (value: string) => {
        address.value = value;
    };

    const reset = () => {
        isError.value = false;
        errorMessage.value = "";
    };

    return { geolocation, address, findGeolocation, setAddress, isError, errorMessage, reset };
});
