using System;

namespace ExtendedLab1
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            DateTime paymentDue = new DateTime(2023, 05, 20);
            DateTime saleDate = new DateTime(2023, 04, 20);

            Invoice invoice = new Invoice("INV-23-04-001", paymentDue, saleDate);
            
            Article article = new Article("Gas", "Liter", 7, 3, 48);

            invoice.AddArticle(article);

            invoice.GetArticleInfo(0);
            Console.WriteLine("\n************\n");
            
            invoice.AddArticle(new Article("Lamp", "Unit", 30, 21, 4));

            invoice.GetAllArticlesInfo();
            Console.WriteLine("\n************\n");

            invoice.GetInvoiceInfo();
        }
    }
}