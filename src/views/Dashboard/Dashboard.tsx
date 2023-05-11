import React from 'react';
import styled from 'styled-components';
import background from '../../assets/img/background_dashboard.png';
import bomb1 from '../../assets/img/bomb1.png';
import bomb2 from '../../assets/img/bomb2.png';
import bomb3 from '../../assets/img/bbond.png';
import useBombStats from '../../hooks/useBombStats';
import usebShareStats from '../../hooks/usebShareStats';
import useBondStats from '../../hooks/useBondStats';
import metamask_icon from '../../assets/img/metamask-fox.svg';
import useBombFinance from '../../hooks/useBombFinance';

function convertToInternationalCurrencySystem(labelValue: number) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'K'
    : Math.abs(Number(labelValue));
}

const Dashboard: React.FC = () => {
  // console.log({bomb_stats})
  // console.log({background})
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        background: 'url(' + background + ')',
        backgroundSize: 'cover',
        flexDirection: 'column',
      }}
    >
      <Card>
        <div style={{ color: 'white', fontSize: '22px', display: 'flex', margin: 'auto' }}>Bomb Finance Summary</div>
        <GreyHr />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <FinanceSummaryTable />
        </div>
      </Card>
    </div>
  );
};

const Card = styled.div`
  display: flex;
  padding: 10px;
  background: rgba(35, 40, 75, 0.75);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  flex-direction: column;
  margin: 20px;
`;

// const FinanceSummaryTable = styled.div`
//   color: white;
//   display: flex;
//   flex-direction: column;
//   width: 40%;
// `;

const FinanceSummaryTable: React.FC = () => {
  const bomb_stats = useBombStats();
  const bshare_stats = usebShareStats();
  const bbond_stats = useBondStats();
  const bomb_finance = useBombFinance();
  return (
    <div style={{ color: 'white', display: 'flex', flexDirection: 'column', width: '40%' }}>
      <div style={{ display: 'flex', fontSize: '10px', textAlign: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flex: 2, textAlign: 'center', justifyContent: 'center' }}></div>
        <div style={{ display: 'flex', flex: 1, textAlign: 'center', justifyContent: 'center' }}>Current Supply</div>
        <div style={{ display: 'flex', flex: 1, textAlign: 'center', justifyContent: 'center' }}>Token Supply</div>
        <div style={{ display: 'flex', flex: 1, textAlign: 'center', justifyContent: 'center' }}>Price</div>
        <div style={{ display: 'flex', flex: 1, textAlign: 'center', justifyContent: 'center' }}></div>
      </div>
      <div style={{ height: '1px', width: '100%', background: 'gray', margin: '10px' }}></div>
      {[
        {
          icon: bomb1,
          symbol: 'BOMB',
          current_supply: bomb_stats?.circulatingSupply,
          total_supply: bomb_stats?.totalSupply,
          price_usd: bomb_stats?.priceInDollars,
          price_btcb: bomb_stats?.tokenInFtm,
        },

        {
          icon: bomb2,
          symbol: 'BSHARE',
          current_supply: bshare_stats?.circulatingSupply,
          total_supply: bshare_stats?.totalSupply,
          price_usd: bshare_stats?.priceInDollars,
          price_btcb: bshare_stats?.tokenInFtm,
        },
        {
          icon: bomb3,
          symbol: 'BBOND',
          current_supply: bbond_stats?.circulatingSupply,
          total_supply: bbond_stats?.totalSupply,
          price_usd: bbond_stats?.priceInDollars,
          price_btcb: bbond_stats?.tokenInFtm,
        },
      ].map((item: any, index: number) => (
        <>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flex: 2, textAlign: 'center', justifyContent: 'center' }}>
              <img alt="token-logo" src={item.icon} style={{ height: '30px', width: '30px', margin: '0 10px ' }} /> $
              {item.symbol}
            </div>
            <div style={{ display: 'flex', flex: 1, textAlign: 'center', justifyContent: 'center' }}>
              {item.current_supply ? convertToInternationalCurrencySystem(item.current_supply) : '---'}
            </div>
            <div style={{ display: 'flex', flex: 1, textAlign: 'center', justifyContent: 'center' }}>
              {item.total_supply ? convertToInternationalCurrencySystem(item.total_supply) : '---'}
            </div>
            <div
              style={{
                display: 'flex',
                flex: 1,
                textAlign: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <div>${item.price_usd ? item.price_usd : '---'}</div>
              <div>{item.price_btcb ? item.price_btcb : '---'} BTCB</div>
            </div>
            <div style={{ display: 'flex', flex: 1, textAlign: 'center', justifyContent: 'center' }}>
              <img
                alt="Metamask"
                style={{ cursor: 'pointer' }}
                src={metamask_icon}
                onClick={() => bomb_finance.watchAssetInMetamask(item.symbol)}
              />
            </div>
          </div>
          <div style={{ height: '1px', width: '100%', background: 'gray', margin: '10px' }}></div>
        </>
      ))}
    </div>
  );
};

const GreyHr = styled.hr`
  border: 1px solid #4f4f4f;
  margin: 10px;
`;

export default Dashboard;
