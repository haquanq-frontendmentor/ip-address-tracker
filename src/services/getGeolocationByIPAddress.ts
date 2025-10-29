export type GeolocationQuery = {
    query: string;
    status: "success";
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    isp: string;
    org: string;
    as: string;
};

export type BadGeolocationQuery = {
    message: string;
    status: "fail";
    query: string;
};

export const getGeolocationByIPAddress = async (address: string) => {
    const res = await fetch("https://free-ip-to-geolocation.habuiquang989.workers.dev/geolocation?address=" + address);

    if (res.status === 419) {
        return {
            status: "fail",
            message: "Rate limited",
            query: address,
        } satisfies BadGeolocationQuery;
    }

    if (res.status >= 500) {
        return {
            status: "fail",
            message: "Can't not connect to server",
            query: address,
        } satisfies BadGeolocationQuery;
    }

    return (await res.json()) as GeolocationQuery | BadGeolocationQuery;
};
