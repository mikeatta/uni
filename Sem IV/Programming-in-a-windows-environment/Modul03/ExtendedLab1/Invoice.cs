using System;
using System.Collections.Generic;

namespace ExtendedLab1
{
    public class Invoice
    {
        private DateTime _saleDate;
        private int _daysUntilPaymentDue;
        private DateTime _paymentDueDate;
        private int _totalPriceNetto;
        private int _totalPriceBrutto;
        private static String _invoiceNumber;
        private List<Article> _articles = new List<Article>();

        public Invoice(String invoiceNumber, DateTime paymentDueDate, int daysUntilPaymentDue,
            DateTime saleDate, int totalPriceBrutto, int totalPriceNetto)
        {
            _invoiceNumber = invoiceNumber;
            _paymentDueDate = paymentDueDate;
            _daysUntilPaymentDue = daysUntilPaymentDue;
            _saleDate = saleDate;
            _totalPriceBrutto = totalPriceBrutto;
            _totalPriceNetto = totalPriceNetto;
        }

        public void AddArticle(Article article)
        {
            _articles.Add(article);
        }

        public Article GetArticle(int articleIndex)
        {
            return _articles[articleIndex];
        }

        public void GetArticleInfo(int articleIndex)
        {
            Console.Write(
                $"Article #{articleIndex}\n" +
                $"Name: {_articles[articleIndex].GetName()}\n" +
                $"Unit type: {_articles[articleIndex].GetUnit()}\n" +
                $"Price Per Unit (Netto): {_articles[articleIndex].GetPricePerUnitNetto()}\n" +
                $"Price Per Unit (Brutto): {_articles[articleIndex].GetPricePerUnitBrutto()}\n" +
                $"Amount: {_articles[articleIndex].GetAmount()}\n" +
                $"Total price (Netto): {_articles[articleIndex].GetPriceTotalNetto()}\n" +
                $"Total price (Brutto): {_articles[articleIndex].GetPriceTotalBrutto()}\n" +
                $"Tax percent: {_articles[articleIndex].GetTaxPercent()}%\n");
        }

        public void GetAllArticlesInfo()
        {
            int index = 0;
            _articles.ForEach(article =>
            {
                GetArticleInfo(index);
                index++;
                Console.WriteLine("");
            });
        }
    }
}