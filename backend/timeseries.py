from statsmodels.tsa.arima.model import ARIMA
import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt

def get_stock_prediction(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="5y")["Close"].reset_index()
    arima = ARIMA(hist["Close"], order=(1, 2, 1), seasonal_order=(1, 2, 1, 12)).fit()
    arima_forecast = arima.forecast(steps=30)
    return arima_forecast

# aapl = yf.Ticker("AAPL")
# hist = aapl.history(period="5y")["Close"].reset_index()

# arima = ARIMA(hist["Close"], order=(1, 2, 1), seasonal_order=(1, 2, 1, 12)).fit()
# arima_forecast = arima.forecast(steps=30)

# print(arima_forecast)
# plt.plot(hist["Close"], color="blue", label="hist")
# plt.plot(arima_forecast, color="red", label="prediction")
# plt.xlim(1000)
# plt.show()