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
            
            Article article = new Article("Test item", "Unit", 17, 10,
                1, 17, 10);

            invoice.GetInvoiceInfo();
            Console.WriteLine("\n************\n");

            invoice.AddArticle(article);

            invoice.GetArticleInfo(0);
            Console.WriteLine("\n************\n");
            
            invoice.AddArticle(new Article("Lamp", "Unit", 20, 15,
                2, 40, 30));

            invoice.GetAllArticlesInfo();
            Console.WriteLine("\n************\n");

            invoice.GetInvoiceInfo();
        }
    }
}