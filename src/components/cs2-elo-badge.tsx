import { useEffect, useState } from "react";

type CS2EloProps = {
    eloText: string,
    size: number
};

export const CS2EloBadge = ({eloText, size}: CS2EloProps) => {
    
    const [rank, setRank] = useState(0);

    const sizeMap = [
        {
            width: '55px',
            height: '22px',
            fontSize: 13,
            left: '12.5px',
            top: '-27px',
            shadow: '1px',
        },
        {
            width: '110px',
            height: '44px',
            fontSize: 28,
            left: '22px',
            top: '-46px',
            shadow: '2px',
        },
        {
            width: '220px',
            height: '88px',
            fontSize: 59,
            left: '38px',
            top: '-94px',
            shadow: '3px',
        },
        {
            width: '440px',
            height: '176px',
            fontSize: 120,
            left: '75px',
            top: '-182px',
            shadow: '5px',
        }
    ];

    const colorMap = [
        { color: '#b0c3d9', shadow: '#2d435d'},
        { color: '#8cc6ff', shadow: '#00478c'},
        { color: '#6a7dff', shadow: '#000e6a'},
        { color: '#c166ff', shadow: '#3d0066'},
        { color: '#f03cff', shadow: '#37003c'},
        { color: '#c166ff', shadow: '#3d0066'},
        { color: '#c166ff', shadow: '#3d0066'},
    ];

    useEffect(() => {
        const k = parseInt(eloText.split(',')[0]);
        setRank(Math.floor(k/5));
    }, [eloText]);

    return (
        <div style={{display: 'block', width: sizeMap[size].width, height: sizeMap[size].height}}>
            <img style={{position: 'relative', width: sizeMap[size].width, height: sizeMap[size].height}} src={`/cs_rating_${rank}.svg`}></img>
            <div
                style={{
                    position: 'relative',
                    left: sizeMap[size].left,
                    top: sizeMap[size].top,
                    lineHeight: '22px',
                    color: colorMap[rank].color,
                    textShadow: `${sizeMap[size].shadow} ${sizeMap[size].shadow} ${colorMap[rank].shadow}`,

                    font: '.95rem/1.5 Poppins,system-ui,ui-sans-serif,Ubuntu,Open Sans,Segoe UI Variable,Segoe UI,Roboto,Calibri,Helvetica Neue,Arial,sans-serif',
                    fontStyle: 'italic',
                    fontWeight: 800,
                }} 
            >
                <span style={{fontSize: sizeMap[size].fontSize + 'px'}}>
                    {eloText == "0" ? '---' : `${eloText.split(',')[0]},`}
                </span>
                <span style={{fontSize: (sizeMap[size].fontSize*0.7) + 'px'}}>
                    {eloText.split(',')[1]}
                </span>
            </div>
        </div>
    )
}