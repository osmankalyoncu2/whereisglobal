import { useEffect, useState } from "react";

type CS2EloProps = {
    eloText: string,
    size: number
};

export const CS2Elo = ({eloText, size}: CS2EloProps) => {
    
    const [rank, setRank] = useState(0);

    useEffect(() => {
        const k = parseInt(eloText.split(',')[0]);
        setRank(Math.floor(k/5));
    }, [eloText]);

    return (
        <div style={{display: 'block'}}>
            <img style={{position: 'relative'}} src={`/cs_rating_${rank}.svg`}></img>
            <div
                style={{
                    position: 'relative',
                    left: '11px',
                    top: '-26px',
                    lineHeight: '22px',
                    color: '#c166ff',
                    textShadow: '1px 1px #3d0066',

                    font: '.95rem/1.5 Poppins,system-ui,ui-sans-serif,Ubuntu,Open Sans,Segoe UI Variable,Segoe UI,Roboto,Calibri,Helvetica Neue,Arial,sans-serif',
                    fontStyle: 'italic',
                    fontWeight: 800,
                }} 
            >
                <span style={{fontSize: '13px'}}>
                    {eloText.split(',')[0]},
                </span>
                <span style={{fontSize: '9px'}}>
                    {eloText.split(',')[1]}
                </span>
            </div>
        </div>
    )
}