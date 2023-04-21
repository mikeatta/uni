using System;
using System.Collections.Generic;

namespace ExtendedLab1
{
    public class Invoice
    {
        private DateTime _saleDate;
        private int _daysUntilPaymentDue;
        private DateTime _paymentDueDate;
        private int _totalPriceBrutto;
        private int _totalPriceNetto;
        private static String _invoiceNumber;

        private List<Article> _articles = new List<Article>();

        public Invoice(String invoiceNumber, DateTime paymentDueDate, DateTime saleDate)
        {
            _invoiceNumber = invoiceNumber;
            _paymentDueDate = paymentDueDate;
            _daysUntilPaymentDue = (paymentDueDate - DateTime.Today).Days;
            _saleDate = saleDate;
        }

        // TODO: Calculate total value of every article on the list
        public void GetInvoiceInfo()
        {
            if (_articles.Count > 0)
            {
                Console.Write(
                    $"Invoice number: {_invoiceNumber}\n" +
                    $"Sale date: {_saleDate}\n" +
                    $"Payment due on (date): {_paymentDueDate}\n" +
                    $"Payment due in (days): {_daysUntilPaymentDue}\n" +
                    $"Price (netto): {_totalPriceNetto}\n" +
                    $"Price (brutto): {_totalPriceBrutto}\n");
            }
            else
            {
                Console.WriteLine("No products have been added to the invoice.");
            }
        }

        private int CalculateTotalPriceBrutto()
        {
            int totalBruttoPriceSum = 0;
            foreach (Article article in _articles)
            {
                totalBruttoPriceSum += article.GetPriceTotalBrutto();
            }

            return totalBruttoPriceSum;
        }

        private int CalculateTotalPriceNetto()
        {
            int totalPriceNettoSum = 0;
            foreach (Article article in _articles)
            {
                totalPriceNettoSum += article.GetPriceTotalNetto();
            }

            return totalPriceNettoSum;
        }

        public void AddArticle(Article article)
        {
            _articles.Add(article);
            _totalPriceBrutto = CalculateTotalPriceBrutto();
            _totalPriceNetto = CalculateTotalPriceNetto();
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