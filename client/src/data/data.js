

import { LuLaptop2 } from "react-icons/lu";
import { LuComputer } from "react-icons/lu";



export const adminCardData = [
    {
        id: 1,
        icon: <LuComputer />,
        title: "Gallery",
        link: "/admin/gallery",
        desc: "Gallery"
    },

    {
        id: 3,
        icon: <LuLaptop2 />,
        title: "Create Product Data",
        link: "/admin/addProduct",
        desc: "Create all product."
    },
    {
        id: 4,
        icon: <LuLaptop2 />,
        title: "Get All Product Information",
        link: "/admin/getProduct",
        desc: "Get All Product  Data and delete."
    },


]