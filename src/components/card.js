import styled from "styled-components";

const CardContainer = styled.div`
    position : relative;
    border : 2px solid ${props => props?.deviceStatus === "Offline" ? 'red' : "green"};
    border-radius : 10px;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
    padding: 25px 12px 18px;
    background : grey;
    flex: 1 1 0;
    margin: 15px;

    > .status {
        display : flex;
        justify-content : flex-start;
        align-items : center;
        padding : 5px;
        &:before{
            border-radius : 50%;
            width : 10px;
            height : 10px;
            background: ${props => props?.deviceStatus === "Offline" ? 'red' : "green"};
            display: block;
            content: '';
            margin-right : 5px;
        }
    }
`
const Title = styled.h2`
    color: #000000;
`

const Card = ({device,selectDevice}) => {
    const { id,deviceName,status,applicationCount,ipAddress,operatingSystem,selected } = device;
    //console.log("selected value uis :",selected);
    return(
        <CardContainer key={id} deviceStatus={status} onClick={() => selectDevice(device)}>
            <span className="status" >{status === "Offline" ? status : "Online"}</span>
            <span>{selected ? 'selected' : 'Unselected'}</span>
            <Title>{deviceName}</Title>
            <p><b>Device IP :</b>{ ipAddress }</p>
            <p><b>Applications on Device :</b> {applicationCount}</p>
            <p><b>Device OS :</b>{operatingSystem}</p>
        </CardContainer>
    ) 
}

export default Card;