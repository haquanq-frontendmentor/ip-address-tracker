export const getUserIPAddress = async () => {
    const res = await fetch("https://api.ipify.org?format=json");
    return (await res.json()) as { ip: string };
};
