using System;

namespace Bank
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            Konto k1 = KontoDlaKonsoli.UtworzKonto();
            k1.Wplac();
            k1.Wyplac();
            k1.WypiszInformacjeOKoncie();
            k1.ZmienPin2();
            
            Console.WriteLine("\n************\n");
            
            KontoDlaKonsoli.WypiszDebet();
            KontoDlaKonsoli.WypiszOprocentowanie();
            KontoDlaKonsoli.ZmienHaslo();
            KontoDlaKonsoli.ZmienMaksymalnyDebet();
            KontoDlaKonsoli.ZmienOprocentowanie();
        }
    }
}