using System;
using System.Collections.Generic;

namespace ExtendedLab1
{
    public class Invoice
    {
        private DateTime _saleDate;
        private int _daysUntilPaymentDue;
        private DateTime _paymentDueDate;
        private double _totalPriceNetto;
        private double _totalPriceBrutto;
        private static String _invoiceNumber;

        private List<Article> _articles = new List<Article>();

        public Invoice(String invoiceNumber, DateTime paymentDueDate, DateTime saleDate)
        {
            _invoiceNumber = invoiceNumber;
            _paymentDueDate = paymentDueDate;
            _daysUntilPaymentDue = (paymentDueDate - DateTime.Today).Days;
            _saleDate = saleDate;
        }

        public void GetInvoiceInfo()
        {
            if (_articles.Count > 0)
            {
                CalculateTotalPriceBrutto();
                CalculateTotalPriceNetto();

                Console.Write(
                    $"Invoice number: {_invoiceNumber}\n" +
                    $"Sale date: {_saleDate}\n" +
                    $"Payment due on (date): {_paymentDueDate}\n" +
                    $"Payment due in (days): {_daysUntilPaymentDue}\n" +
                    $"Price (netto): {_totalPriceNetto:F}\n" +
                    $"Price (brutto): {_totalPriceBrutto:F}\n");
            }
            else
            {
                Console.WriteLine("No products have been added to the invoice.");
            }
        }

        private void CalculateTotalPriceBrutto()
        {
            foreach (Article article in _articles)
            {
                _totalPriceBrutto += article.GetPriceTotalBrutto();
            }
        }

        private void CalculateTotalPriceNetto()
        {
            foreach (Article article in _articles)
            {
                _totalPriceNetto += article.GetPriceTotalNetto();
            }
        }

        public void AddArticle(Article article)
        {
            _articles.Add(article);
        }

        public Article GetArticle(int articleIndex)
        {
            return _articles[articleIndex];
        }

        // TODO: Find article by name and display article's attributes
        public void GetArticle(String articleName)
        {
            Article foundArticle = LookupArticleByName(articleName);

            if (foundArticle == null)
            {
                Console.WriteLine("Lookup article: No article found under that name");
            }
            else
            {
                Console.Write(
                    $"Lookup article: '{foundArticle.GetName()}'\n" +
                    $"Unit type: {foundArticle.GetUnit()}\n" +
                    $"Price Per Unit (Netto): {foundArticle.GetPricePerUnitNetto():F}\n" +
                    $"Price Per Unit (Brutto): {foundArticle.GetPriceTotalBrutto():F}\n" +
                    $"Amount: {foundArticle.GetAmount():F}\n");
            }

            Console.WriteLine("");
        }

        public Article LookupArticleByName(String articleName)
        {
            int index = 0;
            foreach (Article article in _articles)
            {
                if (article.GetName().Equals(articleName))
                {
                    return _articles[index];
                }
            }

            return null;
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
                $"Total price (Netto): {_articles[articleIndex].GetPriceTotalNetto():F}\n" +
                $"Total price (Brutto): {_articles[articleIndex].GetPriceTotalBrutto():F}\n" +
                $"Tax percent: {_articles[articleIndex].GetTaxPercent():F}%\n");
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