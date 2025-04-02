package singlejartest;

import com.dukascopy.api.*;

import java.text.SimpleDateFormat;
import java.util.TimeZone;

public class SimpleMACrossEURUSD implements IStrategy {

    // --- Strategy Parameters ---
    @Configurable("Fast MA Period")
    public int fastMaPeriod = 10;
    @Configurable("Slow MA Period")
    public int slowMaPeriod = 30;
    @Configurable("Take profit (pips)")
    public int takeProfitPips = 100;
    @Configurable("Stop loss (pips)")
    public int stopLossPips = 50;
    @Configurable("Order amount")
    public double orderAmount = 0.01;
    @Configurable("Slippage")
    public double slippage = 3;

    // --- Strategy Variables ---
    private IEngine engine;
    private IConsole console;
    private IHistory history;
    private IIndicators indicators;
    private IContext context;

    private IOrder currentOrder = null;
    private int orderCounter = 1;

    private final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    // --- Strategy Methods ---
    @Override
    public void onStart(IContext context) throws JFException {
        this.context = context;
        this.engine = context.getEngine();
        this.console = context.getConsole();
        this.history = context.getHistory();
        this.indicators = context.getIndicators();

        context.setSubscribedInstruments(java.util.Collections.singleton(Instrument.EURUSD), true);

        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
        print("Strategy started. Fast MA %d, Slow MA: %d, Instrument: %s", fastMaPeriod, slowMaPeriod, Instrument.EURUSD);
    }

    @Override
    public void onTick(Instrument instrument, ITick tick) throws JFException {
    }

    @Override
    public void onBar(Instrument instrument, Period period, IBar askBar, IBar bidBar) throws JFException {
        // Ensure we ONLY run the strategy for 1HR bars on EUR/USD currency pair
        if (!instrument.equals(Instrument.EURUSD) || !period.equals(Period.ONE_HOUR)) {
            return;
        }

        double[] fastMAValues = null;
        double[] slowMAValues = null;
        try {
            fastMAValues = indicators.sma(instrument, period, OfferSide.BID, IIndicators.AppliedPrice.CLOSE, fastMaPeriod, Filter.WEEKENDS, 3, bidBar.getTime(), 0);
            slowMAValues = indicators.sma(instrument, period, OfferSide.BID, IIndicators.AppliedPrice.CLOSE, slowMaPeriod, Filter.WEEKENDS, 3, bidBar.getTime(), 0);
        } catch (JFException e) {
            print("Error calculating indicators: %s", e.getMessage());
            return;
        }

        if (fastMAValues == null || slowMAValues == null || fastMAValues.length < 2 || slowMAValues.length < 2) {
            print("Indicator data insufficient or null. Required length >= 2. Lengths: fastMA=%d, slowMA=%d",
                    (fastMAValues == null ? -1 : fastMAValues.length),
                    (slowMAValues == null ? -1 : slowMAValues.length));
            return;
        }

        double fastMA_prev = fastMAValues[1];
        double slowMA_prev = slowMAValues[1];
        double fastMA_prev2 = fastMAValues[0];
        double slowMA_prev2 = slowMAValues[0];

        // --- ENTRY CONDITION ---
        if (fastMA_prev2 < slowMA_prev2 && fastMA_prev > slowMA_prev) {
            if (currentOrder == null) {
                print("ENTRY SIGNAL: Fast MA (%f) crossed above Slow MA (%f). Placing BUY order.", fastMA_prev, slowMA_prev);
                placeOrder(IEngine.OrderCommand.BUY);
            } else {
                print("Entry signal ignored, order already open: %s", currentOrder.getLabel());
            }
        }

        // --- EXIT CONDITION ---
        if (fastMA_prev2 > slowMA_prev2 && fastMA_prev < slowMA_prev) {
            if (currentOrder != null && currentOrder.isLong()) {
                print("EXIT SIGNAL: Fast MA (%f) crossed below Slow MA (%f). Closing BUY order %s.", fastMA_prev, slowMA_prev, currentOrder.getLabel());
                currentOrder.close();
            }
        }
    }

    @Override
    public void onMessage(IMessage message) throws JFException {
        if (message.getOrder() != null) {
            print("Order Message: %s - %s - %s", message.getType(), message.getOrder().getLabel(), message.getContent());

            if (message.getType() == IMessage.Type.ORDER_FILL_OK && message.getOrder().equals(currentOrder)) {
                print("Order %s FILLED successfully.", currentOrder.getLabel());
            } else if (message.getType() == IMessage.Type.ORDER_CLOSE_OK && message.getOrder().equals(currentOrder)) {
                print("Order %s CLOSED successfully.", currentOrder.getLabel());
                currentOrder = null;
            } else if ((message.getType() == IMessage.Type.ORDER_FILL_REJECTED || message.getType() == IMessage.Type.ORDER_CLOSE_REJECTED) && message.getOrder().equals(currentOrder)) {
                print("Order %s REJECTED or failed to close: %s", currentOrder.getLabel(), message.getContent());
                if (message.getType() == IMessage.Type.ORDER_CLOSE_REJECTED) {
                    currentOrder = null;
                }
            }
        }
    }

    @Override
    public void onAccount(IAccount account) throws JFException {
    }

    @Override
    public void onStop() throws JFException {
        print("Strategy Stopped.");
        if (currentOrder != null && currentOrder.getState() == IOrder.State.FILLED) {
            print("Closing open order %s on strategy stop.", currentOrder.getLabel());
            currentOrder.close();
        }
    }

    // --- Helper Methods ---
    private void placeOrder(IEngine.OrderCommand command) throws JFException {
        String label = String.format("SMA_%s_%d", Instrument.EURUSD.name(), orderCounter++);
        double stopLossPrice = 0;
        double takeProfitPrice = 0;
        double refPrice = 0;

        try {
            ITick lastTick = history.getLastTick(Instrument.EURUSD);
            if (lastTick != null) {
                refPrice = (command == IEngine.OrderCommand.BUY) ? lastTick.getAsk() : lastTick.getBid();
            } else {
                print("Warning: Last tick was null in placeOrder. Using previous bar close for SL/TP calculation.");
                OfferSide barOfferSide = (command == IEngine.OrderCommand.BUY) ? OfferSide.ASK : OfferSide.BID;
                IBar prevBar = history.getBar(Instrument.EURUSD, Period.ONE_HOUR, barOfferSide, 1);

                if (prevBar != null) {
                    refPrice = prevBar.getClose();
                } else {
                    print("Error: Cannot get reference price (tick and previous bar are null) in placeOrder. Cannot place order %s.", label);
                    return;
                }
            }
        } catch (JFException e) {
            print("Error getting reference price in placeOrder: %s. Cannot place order %s.", e.getMessage(), label);
            return;
        }

        if (refPrice <= 0) {
            print("Error: Reference price is invalid (%.5f) in placeOrder. Cannot place order %s.", refPrice, label);
            return;
        }

        double pipValue = Instrument.EURUSD.getPipValue();
        if (command == IEngine.OrderCommand.BUY) {
            stopLossPrice = round(refPrice - stopLossPips * pipValue, Instrument.EURUSD.getPipScale());
            takeProfitPrice = round(refPrice + takeProfitPips * pipValue, Instrument.EURUSD.getPipScale());
        }

        print("Submitting %s order %s for %.5f lots at ref price %.5f, SL=%.5f, TP=%.5f", command, label, orderAmount, refPrice, stopLossPrice, takeProfitPrice);

        currentOrder = engine.submitOrder(label, Instrument.EURUSD, command, orderAmount, 0, slippage, stopLossPrice, takeProfitPrice);
    }

    private void print(String format, Object... args) {
        String timePrefix = "";
        try {
            if (this.history != null) {
                ITick lastTick = this.history.getLastTick(Instrument.EURUSD);
                if (lastTick != null) {
                    timePrefix = sdf.format(lastTick.getTime()) + " ";
                }
            }
        } catch (JFException e) {
            if (this.console != null) {
                this.console.getWarn().println("[SimpleMACrossEURUSD] JFException getting time in print method: " + e.getMessage());
            }
        } catch (Exception e) {
            if (this.console != null) {
                this.console.getWarn().println("[SimpleMACrossEURUSD] Exception getting time in print method: " + e.getMessage());
            }
        }

        if (this.console != null) {
            this.console.getInfo().format(timePrefix + "[SimpleMACrossEURUSD] " + format, args).println();
        } else {
            System.out.println(timePrefix + "[SimpleMACrossEURUSD] " + String.format(format, args));
        }
    }

    private double round(double value, int pipScale) {
        double factor = Math.pow(10, pipScale);
        return Math.round(value * factor) / factor;
    }
}
