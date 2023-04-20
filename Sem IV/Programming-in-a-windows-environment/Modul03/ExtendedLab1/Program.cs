using System;

namespace ExtendedLab1
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            DateTime paymentDue = new DateTime(2023, 05, 20);
            DateTime saleDate = new DateTime(2023, 04, 20);

            Invoice invoice = new Invoice("INV-23-04-001", paymentDue, (paymentDue - DateTime.Today).Days,
                saleDate, 1000, 1700);
            
            Article article = new Article("Test item", "Unit", 10, 17,
                1, 10, 17);

            invoice.AddArticle(article);

            invoice.GetArticleInfo(0);
            Console.WriteLine("\n************\n");
            
            invoice.AddArticle(new Article("Lamp", "Unit", 15, 20,
                2, 1500, 1700));

            invoice.GetAllArticlesInfo();
        }
    }
}