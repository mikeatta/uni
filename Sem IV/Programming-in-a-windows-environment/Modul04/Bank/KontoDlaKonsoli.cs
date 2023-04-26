using System;
using System.Security.Cryptography;
using System.Xml;

namespace Bank
{
    static class KontoDlaKonsoli
    {
        private static int pobierzLiczbeInt(string s)
        {
            int pin;
            do
            {
                Console.Write(s);
            } while (!int.TryParse(Console.ReadLine(), out pin));

            return pin;
        }

        private static decimal pobierzLiczbeDecimal(string s)
        {
            decimal kwota;
            do
            {
                Console.Write(s);
            } while (!decimal.TryParse(Console.ReadLine(), out kwota));

            return kwota;
        }

        public static Konto UtworzKonto()
        {
            Console.Write("Enter a name: ");
            string imie = Console.ReadLine();

            Console.Write("Enter a surname: ");
            string nazwisko = Console.ReadLine();

            decimal saldo = pobierzLiczbeDecimal("Enter starting balance: ");
            int pin = pobierzLiczbeInt("Enter a pin: ");

            return new Konto(new Osoba(imie, nazwisko), saldo, pin);
        }

        public static void Wplac(this Konto k)
        {
            decimal kwota = pobierzLiczbeDecimal("Enter payment amount: ");
            k.DokonajWplaty(kwota);
        }

        public static void Wyplac(this Konto k)
        {
            decimal kwota = pobierzLiczbeDecimal("Enter amount to withdraw: ");
            int pin = pobierzLiczbeInt("Enter pin: ");

            if (k.DokonajWyplaty(kwota, pin))
            {
                Console.WriteLine("Operation successful");
            }
            else
            {
                Console.WriteLine("Operation rejected.");
            }
        }

        public static void WypiszInformacjeOKoncie(this Konto k)
        {
            int pin = pobierzLiczbeInt("Enter pin: ");
            Console.WriteLine(k.PobierzInformacje(pin));
            Console.WriteLine("Informacje dla konta o numerze {0}",
                k.NumerKonta);
        }

        public static void ZmienPin2(this Konto k)
        {
            int stary = pobierzLiczbeInt("Enter old pin: ");
            int nowy = pobierzLiczbeInt("Enter new pin: ");
            int nowy2 = pobierzLiczbeInt("Re-Enter new pin: ");

            if (nowy == nowy2)
            {
                if (k.ZmienPin(nowy, stary))
                {
                    Console.WriteLine("Pin has been changed.");
                    return;
                }
            }
            Console.WriteLine("Entered pin numbers are not matching.");
        }

        public static void ZmienHaslo()
        {
            Console.Write("Enter old password: ");
            string stare = Console.ReadLine();
            Console.Write("Enter new password: ");
            string nowe = Console.ReadLine();
            Console.Write("Re-Enter new password: ");
            string nowe2 = Console.ReadLine();

            if (nowe == nowe2)
            {
                if (Konto.ZmienHaslo(stare, nowe))
                {
                    Console.WriteLine("New password has been set.");
                    return;
                }
                Console.WriteLine("Entered passwords are not matching.");
            }
        }

        public static void WypiszDebet()
        {
            Console.WriteLine("Current debt limit on this account is {0}",
                Konto.Debet);
        }

        public static void WypiszOprocentowanie()
        {
            Console.WriteLine("Current account interest rate is {0}",
                Konto.Oprocentowanie);
        }

        public static void ZmienOprocentowanie()
        {
            Console.Write("Podaj haslo: ");
            string haslo = Console.ReadLine();
            decimal oprocentowanie = pobierzLiczbeDecimal(
                "Enter new interest rate: ");

            if (Konto.ZmienOprocentowanie(haslo, oprocentowanie))
            {
                Console.WriteLine("New interest rate has been set.");
            }
            else
            {
                Console.WriteLine("Operation was not completed successfully.");
            }
        }

        public static void ZmienMaksymalnyDebet()
        {
            Console.Write("Enter password: ");
            string haslo = Console.ReadLine();
            decimal maxDebet = pobierzLiczbeDecimal("Enter new debt limit: ");

            if (Konto.ZmienDebet(haslo, maxDebet))
            {
                Console.WriteLine("New debt limit has been set.");
            }
            else
            {
                Console.WriteLine("Operation was not completed successfully.");
            }
        }
    }
}