using System;
using System.Linq;

namespace Kadry
{
    public class AdresDlaKonsoli
    {
        private Adres _adres;

        public Adres Adres
        {
            get { return _adres; }
            set { _adres = value; }
        }

        public AdresDlaKonsoli()
        {
            Console.Write("Enter city: ");
            string miejscowosc = Console.ReadLine();
            Console.Write("Enter zip code: ");
            string kod = Console.ReadLine();
            Console.Write("Enter street name: ");
            string nazwaUlicy = Console.ReadLine();

            int numerDomu;
            do
            {
                Console.Write("Enter a house number: ");
            } while (!int.TryParse(Console.ReadLine(), out numerDomu));
            
            Console.Write("Add a house number? <y/n>: ");
            char includeHouseNumber = Console.ReadKey().KeyChar;

            int? numerMieszkania;
            if (includeHouseNumber == 'y')
            {
                int houseNumber;
                Console.WriteLine();
                do
                {
                    Console.Write("Enter a house number: ");
                } while (!int.TryParse(Console.ReadLine(), out houseNumber));

                numerMieszkania = houseNumber;
            }
            else
            {
                numerMieszkania = null;
            }

            this.Adres = new Adres(numerDomu, numerMieszkania, nazwaUlicy, kod, miejscowosc);
        }

        public AdresDlaKonsoli(Adres adres)
        {
            this.Adres = adres;
        }

        public void ZmienMiejscowosc()
        {
            Console.Write("Enter new city: ");
            Adres.Miejscowosc = Console.ReadLine();
        }

        public void ZmienKod()
        {
            Console.Write("Enter new zip code: ");
            Adres.Kod = Console.ReadLine();
        }

        public void ZmienUlice()
        {
            Console.Write("Enter new city: ");
            Adres.NazwaUlicy = Console.ReadLine();
        }

        public void ZmienNumerDomu()
        {
            int numerDomu;
            do
            {
                Console.Write("Enter new house number: ");
            } while (!int.TryParse(Console.ReadLine(), out numerDomu));

            Adres.NumerDomu = numerDomu;
        }

        public void ZmienNumerMieszkania()
        {
            Console.Write("Is there a house number? <y/n>: ");
            char includeHouseNumber = Console.ReadKey().KeyChar;

            if (includeHouseNumber == 'y')
            {
                int houseNumber;
                Console.WriteLine();
                do
                {
                    Console.Write("Enter new house number: ");
                } while (!int.TryParse(Console.ReadLine(), out houseNumber));

                Adres.NumerMieszkania = houseNumber;
            }
            else
            {
                Adres.NumerMieszkania = null;
            }
        }

        public void ZmienAdres()
        {
            ZmienMiejscowosc();
            ZmienKod();
            ZmienUlice();
            ZmienNumerDomu();
            ZmienNumerMieszkania();
        }

        public void WypiszAdres()
        {
            String address = $"{Adres.Kod}, {Adres.Miejscowosc}, ul. {Adres.NazwaUlicy} nr. {Adres.NumerDomu}";
            String houseUnit = $"/{Adres.NumerMieszkania}";

            if (Adres.NumerMieszkania != null)
            {
                address.Concat(houseUnit);
            }

            Console.WriteLine(address);
        }
    }
}