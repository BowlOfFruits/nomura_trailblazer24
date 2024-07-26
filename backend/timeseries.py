from statsmodels.tsa.arima.model import ARIMA
import yfinance as yf
from datetime import datetime as dt
import pandas as pd
import matplotlib.pyplot as plt

def get_stock_prediction(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="5y")["Close"].reset_index()
    hist["Date"] = hist["Date"].apply(lambda x: dt.strftime(x, "%Y-%m-%d"))

    arima = ARIMA(hist["Close"], order=(1, 2, 1), seasonal_order=(1, 2, 1, 12)).fit()
    arima_forecast = arima.forecast(steps=30)
    arima_forecast.index = pd.date_range(start=pd.to_datetime(hist["Date"].iloc[-1]) + pd.DateOffset(1), end=pd.to_datetime(hist["Date"].iloc[-1]) + pd.DateOffset(days=+30))

    return arima_forecast

def get_historical(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1mo")["Close"].reset_index()
    hist["Date"] = hist["Date"].apply(lambda x: dt.strftime(x, "%Y-%m-%d"))
    hist.set_index("Date", inplace=True)

    return hist

#print(get_stock_prediction("AAPL"))
#print(get_historical("AAPL"))

