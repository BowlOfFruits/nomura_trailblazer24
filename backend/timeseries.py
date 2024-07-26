from statsmodels.tsa.arima.model import ARIMA
import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt

aapl = yf.Ticker("AAPL")
hist = aapl.history(period="5y")["Close"].reset_index()
hist["Date"] = hist["Date"].apply(lambda x: x.strftime("%Y-%m-%d"))
hist["Date"] = pd.to_datetime(hist["Date"], yearfirst=True)
hist.set_index("Date", inplace=True)

arima = ARIMA(hist, order=(1, 2, 1), seasonal_order=(1, 1, 1, 12)).fit()
arima_forecast = arima.forecast(steps=30)

history =
#plt.plot(hist, color="blue", label="hist")
plt.plot(arima_forecast, color="red", label="prediction")
plt.show()