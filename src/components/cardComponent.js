import { useEffect, useState, useContext } from 'react';
import Card from './card';
import styled from "styled-components";
import actionContext from "../context/actionContext";
import { DEVICE_URL } from '../util/constant';

const StyledContainer = styled.div`
      display : flex;
      justify-content: center;
      align-items: center;
      flex-wrap : wrap;
      background: yellow;
`
const ActionButtons = styled.button`
      display : inline-block;
      text-align : center;
      max-width : 150px;
      min-width : 140px;
      font-size : 14px;
      border : none;
      border-radius : 3px;
      padding : 12px;
      margin : 5px;
      cursor : pointer;
      background : ${props => props.bgColor};
`

const CardComponent = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDevices, setSelectedDevices] = useState([]);
    const { rowData, updateRows } = useContext(actionContext);
    console.log("rowData, updateRows", rowData, updateRows);

    const fetchDevices = async () => {
        const response = await fetch(`${DEVICE_URL}`)
            .then((data) => data.json())
            .then(data => {
                return data

            });
        console.log("response is :", response)
        setDevices(response);
        return response;
        // if(!response.ok){
        //   const message = `An error occured : ${response.status}`;
        //   throw new Error(message);
        // }
        // const devices = await response.json();
        // console.log("response json :",devices);

        // return devices
    }

    const selectDevice = (device) => {
        console.log("device selected :", device);
        //let clickedDevices = [];
        //selectedDevices.push(device);
        if (selectedDevices?.filter(((obj) => obj.id === device.id)).length) {
            console.log("called alternatively", selectedDevices.filter((obj) => obj.id === device.id));
            device.selected = false;
            setSelectedDevices(selectedDevices.filter((obj) => obj.id !== device.id))
        }
        else {
            device.selected = true;
            // let updatedDevices = devices.map((obj) => obj.id === device.id ? { ...obj, selected: true } : obj);
            // console.log("updated DEvices :", updatedDevices);
            //setDevices(updatedDevices);
            setSelectedDevices([...selectedDevices, device]);
            console.log("device selected :", [...selectedDevices, device]);
        }
        return null;
        //setDevices([...devices,...selectedDevices,device]);
    }
    const loadDevices = () => {
        console.log("data is :", devices);
        const deviceList = devices.length ? devices.map((device) => {
            return (<Card
                key={device.id}
                device={device}
                selectDevice={selectDevice}
            />)
        }) : 'Devices will load here...'
        return deviceList;
    }

    //list of scanned devices
    const scannedDevices = (action) => {
        updateRows(selectedDevices);
        const date = new Date();
        setSelectedDevices((prevState) => {
            const actionDevices = prevState.map((obj) => {
                obj.action = action;
                obj.timeStamp = date;
                return obj;
            });
            return actionDevices
        })

        console.log("list of scanned devices :", selectedDevices);

    }

    useEffect(() => {
        fetchDevices();
        console.log("fetch devices");
    }, []);



    // useEffect(() => {
    //     //console.log(" third Effect", devices);
    //     console.log(" selected devices are", selectedDevices, devices, rowData);
    //     loadDevices();

    // }, [selectedDevices])

    return (
        <>
            <p><b>Available Endpoints</b> | {devices?.length || 'Yet to be decided'}</p>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '15px'
            }}>

                <ActionButtons bgColor="blue" onClick={() => scannedDevices('scan')}>Scan</ActionButtons>
                <ActionButtons bgColor="grey" onClick={() => scannedDevices('terminate')}>Terminate</ActionButtons>
            </div>
            <StyledContainer>
                {loadDevices()}
            </StyledContainer>
        </>
    )
}

export default CardComponent;