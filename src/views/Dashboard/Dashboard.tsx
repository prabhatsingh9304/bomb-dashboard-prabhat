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
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import { useCountdown } from '../../hooks/useCountdown';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import discord_logo_purple from '../../assets/img/discord_purple.svg'
import doc_logo from '../../assets/img/doc_logo.svg'

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
        fontFamily: 'Nunito',
        padding: '0 7.5vw',
      }}
    >
      <Card>
        <div style={{ color: 'white', fontSize: '22px', display: 'flex', margin: 'auto' }}>Bomb Finance Summary</div>
        <GreyHr />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <FinanceSummaryTable />
          <BoardRoomData />
        </div>
        <div style={{ display: 'flex' }}></div>
      </Card>

      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flex: 3, flexDirection: 'column', justifyContent: 'center' }}>
          <BlueLink
            href="https://bombbshare.medium.com/the-bomb-cycle-how-to-print-forever-e89dc82c12e5"
            style={{ marginLeft: 'auto' }}
          >
            Read Investment Strategy
          </BlueLink>
          <InvestNowButton>Invest Now</InvestNowButton>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '10px' }}>
            <WhiteButton href="https://docs.bomb.money/"> <WhiteCircle><img src={discord_logo_purple} style={{height:"100%"}} alt="" /></WhiteCircle> Chat on Discord</WhiteButton>
            <WhiteButton href="http://discord.bomb.money/"> <WhiteCircle><img src={doc_logo} style={{height:"80%"}} alt="" /></WhiteCircle> Read Docs</WhiteButton>
          </div>
        </div>
        <div style={{ display: 'flex', flex: 2 }}>
          <CardWithBorder style={{ width: '100%', flex: 1, height: '100%', margin: '10px' }}>
            <div style={{ display: 'flex', fontSize: '26px', color: 'white', fontWeight: 600 }}>Latest News</div>
          </CardWithBorder>
        </div>
      </div>
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
  margin: 10px 0;
`;

const CardWithBorder = styled.div`
  display: flex;
  padding: 10px;
  background: rgba(35, 40, 75, 0.75);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  flex-direction: column;
  margin: 10px 0;
  border: 1px solid #728cdf;
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
    <div style={{ color: 'white', display: 'flex', flexDirection: 'column', width: '45%' }}>
      <div style={{ display: 'flex', fontSize: '10px', textAlign: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flex: 2, textAlign: 'center', justifyContent: 'center' }}></div>
        <div style={{ display: 'flex', flex: 1, textAlign: 'center', justifyContent: 'center' }}>Current Supply</div>
        <div style={{ display: 'flex', flex: 1, textAlign: 'center', justifyContent: 'center' }}>Token Supply</div>
        <div style={{ display: 'flex', flex: 2, textAlign: 'center', justifyContent: 'center' }}>Price</div>
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
                flex: 2,
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

const BoardRoomData: React.FC = () => {
  const current_epoch = useCurrentEpoch();
  const { to } = useTreasuryAllocationTimes();
  const current_twap = useCashPriceInEstimatedTWAP();
  const last_twap = useCashPriceInLastTWAP();
  const tvl = useTotalValueLocked();

  const [days, hours, minutes, seconds] = useCountdown(to);
  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <div style={{ color: 'white', fontSize: '22px', padding: '0 40px' }}>Current Epoch</div>
      <div style={{ color: 'white', fontSize: '26px' }}>{Number(current_epoch)}</div>
      <div style={{ height: '1px', width: '100%', background: 'gray', margin: '10px' }}></div>
      <div style={{ color: 'white', fontSize: '26px' }}>
        {(days !== 0 ? days + ':' : '') + hours + ':' + minutes + ':' + seconds}
      </div>
      <div style={{ color: 'white', fontSize: '22px', padding: '0 40px' }}>Next Epoch in</div>
      <div style={{ height: '1px', width: '100%', background: 'gray', margin: '10px' }}></div>
      {[
        {
          name: 'Live TWAP',
          value: current_twap ? Number(current_twap.tokenInFtm) : '---',
        },
        {
          name: 'TVL',
          value: tvl ? '$' + tvl.toFixed(4) : '---',
        },
        {
          name: 'Last Epoch TWAP',
          value: last_twap ? (Number(last_twap) / 100000000000000).toFixed(4) : '---',
        },
      ].map((e) => (
        <div>
          <span style={{ color: 'white' }}>{e.name}:</span> <span style={{ color: '#00eba2' }}>{e.value}</span>
        </div>
      ))}
    </div>
  );
};

const GreyHr = styled.hr`
  border: 1px solid #4f4f4f;
  margin: 10px;
`;

const InvestNowButton = styled.button`
  box-sizing: border-box;
  height: 40px;

  background: radial-gradient(
    59345.13% 4094144349.28% at 39511.5% -2722397851.45%,
    rgba(0, 245, 171, 0.5) 0%,
    rgba(0, 173, 232, 0.5) 100%
  );
  border: none;
  outline: none;
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;
  color: white;
`;

const BlueLink = styled.a`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-decoration-line: underline;
  font-feature-settings: 'liga' off;
  color: #9ee6ff;
`;

const WhiteButton = styled.a`
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #728cdf;
  backdrop-filter: blur(12.5px);
  flex: 1;
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

const WhiteCircle = styled.div`
  background: rgba(255, 255, 255, 1);
  backdrop-filter: blur(12.5px);
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

export default Dashboard;
