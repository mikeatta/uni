using System;
using Konta;
using System.IO;

namespace TestKonta
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            Konto k1 = new Konto("JanKowalski", "password");
            Konto k2 = new Konto("AndrzejNowak", "haslo");

            Konto.PrzedZmianaHasla +=
                PolitykaBezpieczenstwa.SprawdzCzyHasloJestPowtorzone;
            Konto.PrzedZmianaHasla +=
                PolitykaBezpieczenstwa.SprawdzDlogoscHasla;

            Konto.PoZmianieHasla += PolitykaBezpieczenstwa.ZapiszDoPliku;
            
            if (k1.ZmienHaslo("password", "123"))
                Console.WriteLine("Hasło zmienione.");
            else
                Console.WriteLine("Hasła nie udało się zmienić.");
            
            if (k2.ZmienHaslo("haslo", "haslo"))
                Console.WriteLine("Hasło zmienione.");
            else
                Console.WriteLine("Hasła nie udało się zmienić.");
            
            if (k1.ZmienHaslo("password", "12345"))
                Console.WriteLine("Hasło zmienione.");
            else
                Console.WriteLine("Hasła nie udało się zmienić.");
            
            if (k2.ZmienHaslo("haslo", "123haslo"))
                Console.WriteLine("Hasło zmienione.");
            else
                Console.WriteLine("Hasła nie udało się zmienić.");

            Console.ReadKey();
        }
    }

    static class PolitykaBezpieczenstwa
    {
        public static int MinimalnaLiczbaZnakow { set; get; }
        public static string NazwaPliku { set; get; }

        static PolitykaBezpieczenstwa()
        {
            MinimalnaLiczbaZnakow = 5;
            NazwaPliku = "Audyt.txt";
        }

        public static void SprawdzDlogoscHasla(object sender,
            PrzedZmianaHaslaArgs e)
        {
            if (e.NoweHaslo.Length < MinimalnaLiczbaZnakow)
                e.Cancel = true;
        }

        public static void SprawdzCzyHasloJestPowtorzone(object sender,
            PrzedZmianaHaslaArgs e)
        {
            if (e.NoweHaslo == e.StareHaslo)
                e.Cancel = true;
        }

        public static void ZapiszDoPliku(object sender, EventArgs e)
        {
            StreamWriter sw = null;
            try
            {
                sw = new StreamWriter(NazwaPliku, true);
                Konto k = (Konto)sender;
                sw.WriteLine("Zmiana hasła dla użytkownika {0}",
                    k.NazwaUzytkownika);
            }
            finally
            {
                if (sw != null)
                    sw.Close();
            }
        }
    }
}