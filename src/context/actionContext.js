import { createContext, useEffect, useState } from "react";

export const actionContext = createContext(
    {
        rowData : [
            {
                id : 1,
                action : "scan",
                deviceName : "XYZ",
                status : "online",
                applicationCount : 23
            }
        ],
        setRowData : () => {}
    }
    
);


export const ContextProvider = ({children}) => {
    const [rowData,setRowData] = useState([]);
    const updateRows = (selectedDevices) => {
        console.log("context update Rows Func :",selectedDevices);
        setRowData((prevState) => [...prevState,...selectedDevices]);
    }
    useEffect(() => {
        console.log("context update Rows Func : use Effect");
    },[rowData]); 
    return(
        <actionContext.Provider
            value={{
                rowData : rowData,
                updateRows : updateRows 
            }}
        >
            {children}
        </actionContext.Provider>
    )
}

export default actionContext;