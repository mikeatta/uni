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

            Article article = new Article("Gas", "Liter", 1.12, 6.54, 48.76);

            invoice.AddArticle(article);

            invoice.AddArticle(new Article("Lamp", "Unit", 21, 30, 4));

            invoice.GetAllArticlesInfo();
            Console.WriteLine("************\n");

            invoice.GetArticle("Gas");
            invoice.GetArticle("Tires");
            Console.WriteLine("************\n");

            invoice.GetInvoiceInfo();
        }
    }
}