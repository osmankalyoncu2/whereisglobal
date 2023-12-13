import { useEffect, useState } from "react";

type CS2EloProps = {
    eloText: string,
    size: number
};

export const CS2Elo = ({eloText, size}: CS2EloProps) => {
    
    const [rank, setRank] = useState(0);

    const sizeMap = [
        { width: '55px', height: '22px', fontSize: 13, left: '11px', top: '-26px' },
        { width: '110px', height: '44px', fontSize: 26, left: '20px', top: '-40px' },
        { width: '220px', height: '88px', fontSize: 52, left: '39px', top: '-75px' },
        { width: '440px', height: '176px', fontSize: 104, left: '78px', top: '-145px' }
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
                    color: '#c166ff',
                    textShadow: '1px 1px #3d0066',

                    font: '.95rem/1.5 Poppins,system-ui,ui-sans-serif,Ubuntu,Open Sans,Segoe UI Variable,Segoe UI,Roboto,Calibri,Helvetica Neue,Arial,sans-serif',
                    fontStyle: 'italic',
                    fontWeight: 800,
                }} 
            >
                <span style={{fontSize: sizeMap[size].fontSize + 'px'}}>
                    {eloText.split(',')[0]},
                </span>
                <span style={{fontSize: (sizeMap[size].fontSize*0.7) + 'px'}}>
                    {eloText.split(',')[1]}
                </span>
            </div>
        </div>
    )
}