using System;
using Statystyka;

namespace TestFunkcjiStatycznych
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            double[] tab = { 2, 3, 6, 9 };
            Console.WriteLine("Liczba elementów tablicy większych od " +
                        $"pięciu {FunkcjeStatystyka.Ilosc(tab, p => p > 5)}");
            
            Console.WriteLine("Suma elementów tablicy większych od " +
                        $"pięciu {FunkcjeStatystyka.Suma(tab, p => p > 5)}");
            
            Console.WriteLine("Średnia elementów tablicy większych od " +
                        $"pięciu: {FunkcjeStatystyka.SredniaArytmetyczna(tab, p => p > 5)}");
            
            Console.WriteLine("Największy z elementów tablicy większych od " +
                        $"pięciu: {FunkcjeStatystyka.Maksimum(tab, p => p > 5)}");
            
            Console.WriteLine("Najmniejszy z elementów tablicy większych od " +
                        $"pięciu: {FunkcjeStatystyka.Minimum(tab, p => p > 5)}");

            Console.ReadKey();
        }
    }
}