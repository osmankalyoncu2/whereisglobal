import { CS2EloBadge } from '@/components/cs2-elo-badge';
import { apiGET } from '@/utils/apiUtils';
import Head from 'next/head'
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function Home() {
  
  const [lastUpdated, setLastUpdated] = useState<Date>();
  const [ranks, setRanks] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    apiGET('ranks')
      .then((data: any) => {
        setRanks(data.eloPerRank);
        setLastUpdated(new Date(parseInt(data.timestamp)));
        console.log(data);
      });
  }, []);

  const eloToText = (elo: number) => {
    return elo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const formatTime = (time: Date): string => {
    const day = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
    const month = time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
    return `${day}/${month}/${time.getFullYear()}`;
  }

  return (
    <>
      <Head>
        <title>Where is Global Elite?</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-adsense-account" content="ca-pub-7227273981336385"></meta>
        <meta name="google-site-verification" content="DEZKNiwwpKR2boxZcJi16wcdwqLaKKvae0wIAgltORI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="google-analyitics-container">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-PNF3RGVYTN" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-PNF3RGVYTN');
        `}
        </Script>
      </div>

      <div className="adsense-container">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7227273981336385"
        ></Script>
      </div>
      
      <div style={{marginTop: '170px'}}>
        <h4 style={{ fontFamily: 'Consolas, monaco, monospace !important', marginBottom: '10px', color: "#888297", textAlign: 'center'}}>Last updated: {lastUpdated ? formatTime(lastUpdated) : 'Loading ...'}</h4>
        <table style={{width: '100%'}}>
          <thead>
          </thead>
          <tbody>
            {Object.keys(ranks).map((rank, i) => (
              <tr key={i}>
                <td style={{ float: 'right', padding: '10px', paddingTop: '12px', paddingBottom: i == 0 ? '130px' : '10px' }}><img src={`matchmaking_${rank}.png`} style={{height: i == 0 ? '176px': '44px'}}></img></td>
                <td style={{padding: '10px', paddingBottom: i == 0 ? '180px' : '10px'}}><CS2EloBadge eloText={eloToText(ranks[rank])} size={i == 0 ? 3 : 1}></CS2EloBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer style={{ fontFamily: 'Consolas, monaco, monospace !important', padding: "5px", paddingRight: '20px', textAlign: 'right' }}>
        <span>Made with <span style={{color: 'red'}}>&lt;3</span> by <a href="https://github.com/estevE11">Roger Esteve</a></span>
      </footer>
    </>
  )
}
