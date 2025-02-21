using System;

namespace Kadry
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            OsobaDlaKonsoli os1 = new OsobaDlaKonsoli();
            Console.WriteLine();
            
            os1.ZmienAdres();
            Console.WriteLine();
            
            os1.ZmienNazwisko();
            Console.WriteLine("\n************\n");
            
            os1.WypiszOsobe();
            Console.WriteLine("\n************\n");
            
            Osoba os2 = new Osoba(123, 1990, "Anna", "Kowalska", 12, 23,
                "Kwiatowa", "97-350", "Piotrków Tryb.");

            os1.Osoba = os2;
            os1.ZmienAdres();
            Console.WriteLine("\n************\n");
            
            os1.ZmienNazwisko();
            Console.WriteLine("\n************\n");
            
            os1.WypiszOsobe();
            Console.ReadKey();
        }
    }
}