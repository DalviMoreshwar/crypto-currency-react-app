import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import "./Coin.css";

const Coin = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});

  const _URL = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;

  useEffect(() => {
    axios
      .get(_URL)
      .then((response) => {
        setCoin(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {coin.market_data ? (
        <div className="coin-container">
          <div className="content">
            <h1>{coin.name}</h1>
          </div>
          <div className="content">
            <div className="rank">
              <span className="rank-btn">Rank # {coin.market_cap_rank}</span>
            </div>
            <div className="info">
              <div className="coin-heading">
                {coin.image && <img src={coin.image.large} alt="" />}
                <p className="coinName">{coin.name}</p>
                <p>{coin.symbol.toUpperCase()}/INR </p>
              </div>
              <div className="coin-price">
                {coin.market_data ? (
                  <>
                    <span style={{ marginTop: "10px" }}>₹</span>{" "}
                    <h1>
                      {coin.market_data.current_price.inr.toLocaleString()}
                    </h1>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div className="content">
            <table>
              <thead>
                <tr>
                  <th>24 H</th>
                  <th>7 D</th>
                  <th>14 D</th>
                  <th>30 D</th>
                  <th>1 Yr</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {coin.market_data.price_change_percentage_24h_in_currency.inr.toFixed(
                      1
                    )}
                    %
                  </td>
                  <td>
                    {coin.market_data.price_change_percentage_7d_in_currency.inr.toFixed(
                      1
                    )}
                    %
                  </td>
                  <td>
                    {coin.market_data.price_change_percentage_14d_in_currency.inr.toFixed(
                      1
                    )}
                    %
                  </td>
                  <td>
                    {coin.market_data.price_change_percentage_30d_in_currency.inr.toFixed(
                      1
                    )}
                    %
                  </td>
                  <td>
                    {coin.market_data.price_change_percentage_1y_in_currency.inr.toFixed(
                      1
                    )}
                    %
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="content">
            <div className="stats">
              <div className="left">
                <div className="row">
                  <h4>24 Hour Low</h4>
                  <p>₹ {coin.market_data.low_24h.inr.toLocaleString()}</p>
                </div>
                <div className="row">
                  <h4>24 Hour High</h4>
                  <p>₹ {coin.market_data.high_24h.inr.toLocaleString()}</p>
                </div>
              </div>
              <div className="right">
                <div className="row">
                  <h4>Market Cap</h4>
                  <p>₹ {coin.market_data.market_cap.inr.toLocaleString()}</p>
                </div>
                <div className="row">
                  <h4>Circulating Supply</h4>
                  <p>{coin.market_data.circulating_supply}</p>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="about">
                <h3>About</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(coin.description.en),
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            right: "0",
            marginTop: "-15px",
          }}
        >
          Loading...
        </span>
      )}
    </div>
  );
};

export default Coin;
