from statsmodels.tsa.arima.model import ARIMA
import yfinance as yf
from datetime import datetime as dt
import pandas as pd
import json

def convert(json):
    res = []
    for k, v in json.items():
        res.append([k, v])

    return res

def get_stock_prediction(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1y")["Close"].reset_index()
    hist["Date"] = hist["Date"].apply(lambda x: dt.strftime(x, "%Y-%m-%d"))

    arima = ARIMA(hist["Close"], order=(1, 2, 1), seasonal_order=(1, 2, 1, 12)).fit()
    arima_forecast = arima.forecast(steps=30)
    arima_forecast.index = pd.date_range(start=pd.to_datetime(hist["Date"].iloc[-1]), freq="D", periods=31, inclusive="right").strftime("%Y-%m-%d")

    return convert(json.loads(arima_forecast.to_json()))

def get_historical(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1mo")["Close"].reset_index()
    hist["Date"] = hist["Date"].apply(lambda x: dt.strftime(x, "%Y-%m-%d"))

    hist2 = pd.Series(list(hist["Close"]))
    hist2.index = pd.bdate_range(start=pd.to_datetime(hist["Date"].iloc[0]), freq="D", periods=len(hist)).strftime("%Y-%m-%d")

    return convert(json.loads(hist2.to_json()))

#print(get_stock_prediction("AAPL"))
#print(get_historical("AAPL"))
