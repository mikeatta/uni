using System;

namespace ExtendedLab1
{
    public class Article
    {
        private String Name { set; get; }
        private String Unit { set; get; }
        private double PricePerUnitNetto { set; get; }
        private double PricePerUnitBrutto { set; get; }
        private double Amount { set; get; }
        private double PriceTotalNetto { set; get; }
        private double PriceTotalBrutto { set; get; }
        private double TaxPercent { set; get; }

        public Article(String name, String unit, double pricePerUnitNetto, double pricePerUnitBrutto,
            double amount)
        {
            Name = name;
            Unit = unit;
            PricePerUnitNetto = pricePerUnitNetto;
            PricePerUnitBrutto = pricePerUnitBrutto;
            Amount = amount;
            PriceTotalNetto = amount * pricePerUnitNetto;
            PriceTotalBrutto = amount * pricePerUnitBrutto;
            TaxPercent = ((PriceTotalBrutto - PriceTotalNetto) * 100) / PriceTotalNetto;
        }

        public Article()
        {}

        public String GetName()
        {
            return Name;
        }

        public String GetUnit()
        {
            return Unit;
        }

        public double GetPricePerUnitNetto()
        {
            return PricePerUnitNetto;
        }

        public double GetPricePerUnitBrutto()
        {
            return PricePerUnitBrutto;
        }

        public double GetAmount()
        {
            return Amount;
        }

        public double GetPriceTotalNetto()
        {
            return PriceTotalNetto;
        }

        public double GetPriceTotalBrutto()
        {
            return PriceTotalBrutto;
        }

        public double GetTaxPercent()
        {
            return TaxPercent;
        }
    }
}