import { CS2Elo } from '@/components/cs2-elo';
import { apiGET } from '@/utils/apiUtils';
import Head from 'next/head'
import { useEffect, useState } from 'react';

export default function Home() {
  
  const [globalElo, setGlobalElo] = useState(0);
  const [globalEloText, setGlobalEloText] = useState("");
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    apiGET('global')
      .then((data: any) => {
        setGlobalElo(data.elo);
        setLastUpdated(new Date(parseInt(data.timestamp)).toLocaleString());
        console.log(data);
      });
  }, []);

  useEffect(() => {
    setGlobalEloText(globalElo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }, [globalElo]);
  return (
    <>
      <Head>
        <title>Where is Global Elite?</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Where is Global Elite in CS2 Premier?</h1>
      <h3>Global Elite is at <CS2Elo eloText={globalEloText} size={0}></CS2Elo></h3>
      <h5 style={{marginTop: '10px'}}>Last updated: {lastUpdated}</h5>
      <CS2Elo eloText={globalEloText} size={0}></CS2Elo>
      <CS2Elo eloText={globalEloText} size={1}></CS2Elo>
      <CS2Elo eloText={globalEloText} size={2}></CS2Elo>
      <CS2Elo eloText={globalEloText} size={3}></CS2Elo>
    </>
  )
}
