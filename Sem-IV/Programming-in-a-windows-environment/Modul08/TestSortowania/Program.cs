using System;
using Sortowanie;

namespace TestSortowania
{
    class Osoba
    {
        public string Imie { get; set; }
        public string Nazwisko { get; set; }
    }

    internal class Program
    {
        public static void Main(string[] args)
        {
            double[] tab1 = { 22.3, 3.5, 1, 7.8, 6.5 };
            string[] imiona = { "Paweł", "Ania", "Karol", "Piotr" };
            
            SortowanieStogowe.Sortuj(tab1);
            SortowanieStogowe.Sortuj(imiona);
            
            Console.Write("Imiona: ");
            foreach (string imie in imiona)
            {
                Console.Write($"{imie} ");
            }
            
            Console.Write("\nLiczby: ");
            foreach (double number in tab1)
            {
                Console.Write($"{number} ");
            }

            Console.ReadKey();
        }
    }
}