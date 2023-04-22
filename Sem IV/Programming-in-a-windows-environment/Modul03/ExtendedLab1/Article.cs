using System;

namespace ExtendedLab1
{
    public class Article
    {
        private String Name { set; get; }
        private String Unit { set; get; }
        private int PricePerUnitNetto { set; get; }
        private int PricePerUnitBrutto { set; get; }
        private int Amount { set; get; }
        private int PriceTotalNetto { set; get; }
        private int PriceTotalBrutto { set; get; }
        private int TaxPercent { set; get; }

        public Article(String name, String unit, int pricePerUnitNetto, int pricePerUnitBrutto,
            int amount)
        {
            Name = name;
            Unit = unit;
            PricePerUnitNetto = pricePerUnitNetto;
            PricePerUnitBrutto = pricePerUnitBrutto;
            Amount = amount;
            PriceTotalNetto = amount * pricePerUnitNetto;
            PriceTotalBrutto = amount * pricePerUnitBrutto;
            TaxPercent = (int)((PriceTotalNetto / (double)pricePerUnitBrutto) * 10);
        }

        public String GetName()
        {
            return Name;
        }

        public String GetUnit()
        {
            return Unit;
        }

        public int GetPricePerUnitNetto()
        {
            return PricePerUnitNetto;
        }

        public int GetPricePerUnitBrutto()
        {
            return PricePerUnitBrutto;
        }

        public int GetAmount()
        {
            return Amount;
        }

        public int GetPriceTotalNetto()
        {
            return PriceTotalNetto;
        }

        public int GetPriceTotalBrutto()
        {
            return PriceTotalBrutto;
        }

        public int GetTaxPercent()
        {
            return TaxPercent;
        }
    }
}